import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServicioContext } from "../Context/ServicioContext";
import { ClienteContext } from "../Context/ClienteContext";
import { obtenerTiposServiciosForCombo } from "../Services/TipoServicioService";


export default function Servicio({ title }) {
  let navegacion = useNavigate();
  const { id } = useParams();
  const {
    crearServicio,
    actualizarServicioPorId,
    cargarServicioPorId,
    loading,
    error,
  } = useContext(ServicioContext);

  const{getClientes, clientes }= useContext(ClienteContext)

  const [servicio, setServicio] = useState({
    denominacion: "",
    listaItems: [],
  });
  const [selectedCliente, setSelectedCliente] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [tiposServicio, setTiposServicio] = useState([]);
  const [errors, setErrors] = useState({});
  const [totalServicio, setTotalServicio] = useState(0); //calcular el total

  // Cargar datos iniciales
  useEffect(() => {
    getClientes();
    cargarTipoServicios();
    if (id > 0) cargarServicioExistente();
  }, [id]);

  const cargarTipoServicios = async () => {
    const resultado = await obtenerTiposServiciosForCombo();
    setTiposServicio(resultado);
    
  };
  const cargarServicioExistente = async () => {
    const data = await cargarServicioPorId(id);
    if (data) {
      setServicio(data);
      setSelectedCliente(String(data.cliente?.id || ""));
      setFecha(new Date(data.fechaDocumento).toISOString().split("T")[0]);
    }
  };

  const handleAddServicio = () => {
    setServicio((prev) => ({
      ...prev,
      listaItems: [
        ...prev.listaItems,
        { tipoServicio: "", tipoServicioId: "", precio: "", observaciones: "" },
      ],
    }));
  };

  const handleRemoveServicio = (index) => {
    setServicio((prev) => ({
      ...prev,
      listaItems: prev.listaItems.filter((_, i) => i !== index),
    }));
  };


  const handleServicioChange = (index, event) => {
    const { name, value } = event.target;
    setServicio((prev) => {
      const listaItems = [...prev.listaItems];

      if (name === "tipoServicio") {
        const tipoServicioSeleccionado = tiposServicio.find(
          (tipo) => tipo.id === parseInt(value)
        );
        listaItems[index] = {
          ...listaItems[index],
          tipoServicioId: tipoServicioSeleccionado.id,
          tipoServicio: tipoServicioSeleccionado.denominacion,
        };
      } else if (name === "precio") {
        // Convertir el valor ingresado a número (sin símbolos de moneda)
        const precioFormateado = parseFloat(value.replace(/[^0-9.-]+/g, "")); // Eliminar símbolos de moneda y convertir a número
        listaItems[index] = { ...listaItems[index], [name]: precioFormateado };
      } else {
        listaItems[index] = { ...listaItems[index], [name]: value };
      }
  
      // Calcular el total sumando los precios de todos los items
      const total = listaItems.reduce(
        (sum, item) => sum + (parseFloat(item.precio) || 0), // Sumar el precio de cada item (usamos parseFloat para asegurar que sea un número)
        0
      );
  
      // Actualizar el total en el estado si es necesario
      setTotalServicio(total);
      return { ...prev, listaItems };
    });
  };

  const onSubmit = async (e) => {
  e.preventDefault();

    // Validaciones
    if (fecha < new Date().toISOString().split("T")[0]) {
      setErrors({ ...errors, fecha: "La fecha no puede ser menor a la actual" });
      return;
    }
    if (!selectedCliente) {
      setErrors({ ...errors, cliente: "Debe seleccionar un cliente" });
      return;
    }

    const data = {
      ...servicio,
      fechaDocumento: fecha,
      cliente: selectedCliente,
      // total: totalServicio,
    };
    try {
      if (id > 0) {
        await actualizarServicioPorId(data);
      } else {
        await crearServicio(data);
      }
      navegacion("/servicioList");
    } catch (err) {
      console.error(err);
    }
  };

  const contar =()=>{
    const total = servicioPrueba.listaItems.reduce((sum, item) => {
      return sum + (parseFloat(item.precio) || 0); // Sumamos el precio de cada item
    }, 0);
    setTotalServicio(total)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  return (
    <div className="container">
      <div>
        <h1>Gestión de servicio / {title}</h1>
        <hr />
      </div>
      {loading && <div>Cargando...</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <div>
            <label htmlFor="listaClientes">Selecciona un cliente: </label>
            <br />
            <select
              id="listaClientes"
              value={selectedCliente} // Usamos la variable correctamente como string
              onChange={(e) => setSelectedCliente(e.target.value)}
            >
              <option value="">Seleccione...</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={String(cliente.id)}>
                  {" "}
                  {/* Convertimos el id a string */}
                  {cliente.razonSocial}
                </option>
              ))}
            </select>

            {errors.cliente && <div className="error">{errors.cliente}</div>}
          </div>

          <div>
            <label htmlFor="fecha">Fecha: </label>
            <br />
            <input
              type="date"
              id="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
            {errors.fecha && <div className="error">{errors.fecha}</div>}
          </div>
        </div>

        <label>Detalle del Servicio:</label>
        <hr />

        {servicio.listaItems.map((item, index) => (
          <div key={index}>
            <select
              name="tipoServicio"
              value={item.tipoServicioId || ""}
              onChange={(e) => handleServicioChange(index, e)}
            >
              <option value="">Seleccione un tipo de servicio</option>
              {tiposServicio.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.denominacion}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="precio"
              value={item.precio ? item.precio : ""}
              onChange={(e) => handleServicioChange(index, e)}
            />
            <input
              type="text"
              name="observaciones"
              value={item.observaciones || ""}
              onChange={(e) => handleServicioChange(index, e)}
            />
            <button type="button" onClick={() => handleRemoveServicio(index)}>
              Eliminar
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddServicio}>
          Agregar Servicio
        </button>
        <button type="submit">Guardar</button>
        <div>

        <label onClick={()=> contar()}>Total del servicio: </label>
          <strong>{formatPrice(totalServicio.toFixed(2))}</strong> {/* Mostrar el total con dos decimales */}
      </div>
      </form>
    </div>
  );
}
