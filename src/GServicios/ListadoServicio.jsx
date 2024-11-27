import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGEN_EDIT, IMAGEN_DELETE, ITEMS_PER_PAGE } from "../App.config";
import { ServicioContext } from "../Context/ServicioContext";
import {
  eliminarServicio,
  obtenerServicios,
} from "../Services/ServicioService";

export default function ListadoServicio() {
  const servicios = [
    { id: 1, clienteRazonSocial: "Cliente A", fechaDocumento: "2024-11-25", tipoServicio: "Consultoría", precio: 1500 },
    { id: 2, clienteRazonSocial: "Cliente B", fechaDocumento: "2024-11-26", tipoServicio: "Soporte", precio: 800 },
    { id: 3, clienteRazonSocial: "Cliente C", fechaDocumento: "2024-11-27", tipoServicio: "Implementación", precio: 2000 },
  ];

  // const { servicios, setServicios } = useContext(ServicioContext);
  const [consulta, setConsulta] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDatos();

    console.log("Servicios actualizados:", servicios); // Agrega este log para verificar los datos
  }, [page, pageSize, consulta]);

  const getDatos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await obtenerServicios(consulta, page, pageSize);
      setServicios(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError("Error fetching items");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este servicio?")) {
      try {
        const eliminacionExitosa = await eliminarServicio(id);
        if (eliminacionExitosa) {
          getDatos();
        } else {
          console.error("Error al eliminar servicio");
        }
      } catch (error) {
        console.error("Error al eliminar la línea:", error);
      }
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...servicios];
    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sorted;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };
 
  const formatDate = (date) => {
    const fecha = new Date(date);
    return new Intl.DateTimeFormat("es-ES").format(fecha);
  };

  return (
    <div className="container">
      <div>
        <h1>Gestión de servicios</h1>
        <hr />
      </div>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-5">
          <input
            id="consulta"
            name="consulta"
            className="form-control"
            type="search"
            placeholder="Buscar servicio"
            value={consulta}
            onChange={handleConsultaChange}
          />
        </div>
        <div className="col-1">
          <button
            onClick={() => getDatos()}
            className="btn btn-outline-success"
          >
            Buscar
          </button>
        </div>
      </div>

      <hr />

      {/* {loading ? (
        <div className="text-center">Cargando...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : ( */}
        <>
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col" onClick={() => handleSort("id")}>
                #
                {sortConfig.key === "id" && (
                  <span>
                    {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                  </span>
                )}
              </th>
              <th scope="col" onClick={() => handleSort("cliente")}>
                Cliente
                {sortConfig.key === "cliente" && (
                  <span>
                    {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                  </span>
                )}
              </th>
              <th scope="col" onClick={() => handleSort("fecha")}>
                Fecha
                {sortConfig.key === "fecha" && (
                  <span>
                    {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                  </span>
                )}
              </th>
              <th scope="col">Tipo de Servicio</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedData().map((servicio, indice) => (
              <tr key={indice}>
                <th scope="row">{servicio.id}</th>
                <td>{servicio.clienteRazonSocial}</td>
                <td>{formatDate(servicio.fechaDocumento)}</td>
                <td>{servicio.tipoServicio || "No especificado"}</td>
                <td>{servicio.precio ? `${formatPrice(servicio.precio.toFixed(2))}` : "N/A"}</td>
                <td className="text-center">
                  <div>
                    {/* <Link
                      to={`/servicio/${servicio.id}`}
                      className="btn btn-link btn-sm me-3"
                    >
                      <img
                        src={IMAGEN_EDIT}
                        style={{ width: "20px", height: "20px" }}
                        alt="Editar"
                      />
                      Editar
                    </Link> */}
                    <button
                      onClick={() => eliminar(servicio.id)}
                      className="btn btn-link btn-sm me-3"
                    >
                      <img
                        src={IMAGEN_DELETE}
                        style={{ width: "20px", height: "20px" }}
                        alt="Eliminar"
                      />
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

          {/* Paginación */}
          <div className="d-md-flex justify-content-md-end">
            <button
              className="btn btn-outline-primary me-2"
              disabled={page === 0}
              onClick={() => handlePageChange(page - 1)}
            >
              Anterior
            </button>
            <button
              className="btn btn-outline-primary"
              disabled={page >= totalPages - 1}
              onClick={() => handlePageChange(page + 1)}
            >
              Siguiente
            </button>
          </div>

          <div className="row d-md-flex justify-content-md-end mt-3">
            <div className="col-4">
              <Link to={`/servicio`} className="btn btn-success btn-sm">
                Nuevo
              </Link>
            </div>
            <div className="col-4">
              <Link to={`/`} className="btn btn-info btn-sm">
                Regresar
              </Link>
            </div>
          </div>
        </>
    
    </div>
  );
}
