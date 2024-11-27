import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ITEMS_PER_PAGE, API_URL } from "../App.config";
import { ClienteContext } from "../Context/ClienteContext";
import { obtenerClientes, eliminarCliente } from "../Services/ClienteService";

const clientesPrueba = [
  {
    id: 1,
    razonSocial: "Juan Pérez",
    celular: "2664838622",
    mail: "juan.perez@example.com",
  },
  {
    id: 2,
    razonSocial: "María González",
    celular: "3533451941",
    mail: "maria.gonzalez@example.com",
  },
  {
    id: 3,
    razonSocial: "Carlos Ramírez",
    celular: "2664838622",
    mail: "carlos.ramirez@example.com",
  },
  {
    id: 4,
    razonSocial: "Ana López",
    celular: "3533451941",
    mail: "ana.lopez@example.com",
  },
  {
    id: 5,
    razonSocial: "Pedro Martínez",
    celular: "2664838622",
    mail: "pedro.martinez@example.com",
  },
];

export default function ListadoCliente() {
  const { clientes, setClientes, deleteCliente } = useContext(ClienteContext);
  const [consulta, setConsulta] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE);
  const [totalPages, setTotalPages] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  }); //se utiliza para el orden

  useEffect(() => {
    getDatos();
   
  }, [page, pageSize, consulta]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getDatos = async () => {
    console.log("carga " + page);
    obtenerClientes(consulta, page, pageSize)
      .then((response) => {
        setClientes(response.content);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };

  const handConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const eliminar = async (id) => {
    deleteCliente(id)
  };

  ///////////////////////////////////////Para el orden de las tablas///////////////////////////////////////////////////

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sorted = [...clientes];
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
  ///////////////////////////////////////Hasta aca para el orden de las tablas///////////////////////////////////////////////////
  
  const formatPhoneNumber = (phone) => {
    // Elimina todo lo que no sea un número
    const cleaned = phone.replace(/\D/g, "");

    // Si el número tiene 10 dígitos, formatéalo con el formato argentino
    if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6, 10)}`;
    }
    // Si el número tiene 11 dígitos (incluyendo el código de país +54)
    if (cleaned.length === 11) {
      return `+54 9 ${cleaned.slice(1, 3)} ${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    }
    
    return cleaned;
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de Clientes </h1>
        <hr></hr>
      </div>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-5">
          <input
            id="consulta"
            name="consulta"
            className="form-control me-2"
            type="search"
            aria-label="Search"
            value={consulta}
            onChange={handConsultaChange}
          ></input>
        </div>
        <div className="col-1">
          <button
            onClick={() => getDatos()}
            className="btn btn-outline-success"
            type="submit"
          >
            Buscar
          </button>
        </div>
      </div>
      <hr></hr>
      <table className="table table-striped table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col" onClick={() => handleSort("id")}>
              #
              {sortConfig.key === "id" && (
                <span>
                  {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                </span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("razonSocial")}>
              Apellido y Nombre
              {sortConfig.key === "razonSocial" && (
                <span>
                  {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                </span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("celular")}>
              Cel
              {sortConfig.key === "celular" && (
                <span>
                  {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                </span>
              )}
            </th>
            <th scope="col" onClick={() => handleSort("mail")}>
              Mail
              {sortConfig.key === "mail" && (
                <span>
                  {sortConfig.direction === "ascending" ? " 🔽" : " 🔼"}
                </span>
              )}
            </th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            //iteramos empleados
            // sortedData().map((cliente, indice) => (
            clientesPrueba.map((cliente, indice) => (
              <tr key={indice}>
                <th scope="row">{cliente.id}</th>
                <td>{cliente.razonSocial}</td>
                <td>{formatPhoneNumber(cliente.celular)}</td>
                <td>{cliente.mail}</td>

                <td className="text-center">
                  <div>
                    <Link
                      to={`/cliente/${cliente.id}`}
                      className="btn btn-link btn-sm me-3"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => eliminar(cliente.id)}
                      className="btn btn-link btn-sm me-3"
                    >
                      {" "}
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div className="row d-md-flex justify-content-md-end">
        <div className="col-4">
          <Link to={`/cliente`} className="btn btn-success btn-sm me-3">
            Nuevo
          </Link>
        </div>
        <div className="col-4">
          <Link to={`/`} className="btn btn-info btn-sm me-3">
            Regresar
          </Link>
        </div>
      </div>

      {/* /////////////////////// Esto se utiliza para hacer la paginacion  ///////////////////////////////// */}

      <div className="pagination d-md-flex justify-content-md-end">
        {Array.from({ length: totalPages }, (_, i) => i).map((pageNumber) => (
          <a
            key={pageNumber}
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Previene el comportamiento predeterminado del enlace
              handlePageChange(pageNumber);
            }}
          >
            | {pageNumber} |
          </a>
        ))}
      </div>

      {/* /////////////////////// fin de la paginacion  ///////////////////////////////// */}
    </div>
  );
}
