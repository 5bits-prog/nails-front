import React, { createContext, useState } from "react";
import { obtenerClientes, obtenerClientesForCombo, obtenerCliente, newCliente,actualizarCliente,eliminarCliente } from "../Services/ClienteService";
import { useNotification } from "./NotificacionContext";

export const ClienteContext = createContext();

const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteActual, setClienteActual] = useState(null);
  const { mostrarMensaje } = useNotification();

  const getClientes = async () => {
    try {
      const data = await ClienteService.obtenerClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error cargando clientes:", error);
      mostrarMensaje("Error cargando clientes");
    }
  };

  const getCliente = async (id) => {
    try {
      const data = await ClienteService.obtenerCliente(id);
      setClienteActual(data);
    } catch (error) {
      console.error("Error cargando cliente:", error);
      mostrarMensaje("Error cargando cliente");
    }
  };

  const newCliente = async (cliente) => {
    try {
      await ClienteService.newCliente(cliente);
      mostrarMensaje("Cliente creado exitosamente");
      await cargarClientes(); 

    } catch (error) {
      console.error("Error creando cliente:", error);
      mostrarMensaje("Error creando cliente");
    }
  };

  const putCliente = async (cliente) => {
    try {
      await ClienteService.actualizarCliente(cliente);
      mostrarMensaje("Cliente actualizado exitosamente");
      await cargarClientes(); 
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      mostrarMensaje("Error actualizando cliente");
    }
  };

  const deleteCliente = async (id) => {
    try {
      await ClienteService.eliminarCliente(id);
      mostrarMensaje("Cliente eliminado exitosamente");
      await cargarClientes(); 
    } catch (error) {
      console.error("Error eliminando cliente:", error);
      mostrarMensaje("Error eliminando cliente");
    }
  };
  return (
    <ClienteContext.Provider value={{ 
      clientes,
      clienteActual,
      setClienteActual,
      getClientes,
      getCliente,
      newCliente,
      putCliente,
      deleteCliente,}}>
      {children}
    </ClienteContext.Provider>
  );
};

export default ClienteProvider;
