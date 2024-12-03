// LineaContext.js
import React, { createContext, useState } from "react";
import { useNotification } from "./NotificacionContext";
import { obtenerServicio, obtenerServicios,newServicio, actualizarServicio,eliminarServicio } from "../Services/ServicioService";

export const ServicioContext = createContext();

const ServicioProvider = ({ children }) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const {mostrarMensaje} = useNotification();

   // Función para cargar servicios paginados
   const cargarServicios = async () => {
    setLoading(true);
    try {
      const data = await obtenerServicios();
      setServicios(data.content || data); // Ajustar según estructura del backend
      console.log(data)
    } catch (err) {
      setError(err.message);
      mostrarMensaje("Error cargando servicios");
    } finally {
      setLoading(false);
    }
  };

   // Función para obtener un servicio por ID
   const cargarServicioPorId = async (id) => {
    setLoading(true);
    try {
      const data = await obtenerServicio(id);
      return data;
    } catch (err) {
      setError(err.message);
      mostrarMensaje(`Error al cargar el servicio con ID ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  };
    // Función para crear un nuevo servicio
    const crearServicio = async (servicio) => {
      setLoading(true);
      try {
        const data = await newServicio(servicio);
        mostrarMensaje("Servicio creado con éxito");

        // const serviciosActualizados = await obtenerServicios("", 0, 10);
        // setServicios(serviciosActualizados);
        return data;

      } catch (err) {
        setError(err.message);
        // mostrarNotificacion("Error al crear el servicio", "error");
        throw err;
      } finally {
        setLoading(false);
      }
    };

  // Función para actualizar un servicio existente
  const actualizarServicioPorId = async (servicio) => {
    setLoading(true);
    try {
      const data = await actualizarServicio(servicio);
      mostrarMensaje("Servicio actualizado con éxito", "success");
      return data;
    } catch (err) {
      setError(err.message);
      mostrarMensaje("Error al actualizar el servicio", "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un servicio
  const eliminarServicioPorId = async (id) => {
    setLoading(true);
    try {
      await eliminarServicio(id);
      mostrarMensaje("Servicio eliminado con éxito", "success");
      setServicios((prevServicios) => prevServicios.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
      mostrarMensaje(`Error al eliminar el servicio con ID ${id}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServicioContext.Provider value={{
      servicios,
      cargarServicios,
      cargarServicioPorId,
      crearServicio,
      actualizarServicioPorId,
      eliminarServicioPorId,
      loading,
      error,
    }}>
      {children}
    </ServicioContext.Provider>
  );
};

export default ServicioProvider;
