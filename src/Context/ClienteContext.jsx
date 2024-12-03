import React, { createContext, useState } from "react";
import { obtenerClientes, obtenerClientesForCombo, obtenerCliente, newCliente,actualizarCliente,eliminarCliente } from "../Services/ClienteService";
import { useNotification } from "./NotificacionContext";

export const ClienteContext = createContext();

const ClienteProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [clienteActual, setClienteActual] = useState(
    { razonSocial: "",
    celular: "",
    mail: ""});
  const { mostrarMensaje } = useNotification();

  const getClientes = async () => {
    try {
      const data = await obtenerClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error cargando clientes:", error);
      mostrarMensaje("Error cargando clientes");
    }
  };

  const getCliente = async (id) => {
    try {
      const data = await obtenerCliente(id);
      setClienteActual(data);
    } catch (error) {
      console.error("Error cargando cliente:", error);
      mostrarMensaje("Error cargando cliente");
    }
  };

  const postCliente = async (cliente) => {
    try {
      await newCliente(cliente);
      mostrarMensaje("Cliente creado exitosamente");
      
    } catch (error) {
      console.error("Error creando cliente:", error);
      mostrarMensaje("Error creando cliente");
    } finally{
      await getClientes(); 
    }
  };

  const putCliente = async (cliente) => {
    try {
      await actualizarCliente(cliente);
      mostrarMensaje("Cliente actualizado exitosamente");
      await getClientes();  
    } catch (error) {
      console.error("Error actualizando cliente:", error);
      mostrarMensaje("Error actualizando cliente");
    }
  };

  const deleteCliente = async (id) => {
    try {
      await eliminarCliente(id);
      mostrarMensaje("Cliente eliminado exitosamente");
      await getClientes();  
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
      postCliente,
      putCliente,
      deleteCliente,}}>
      {children}
    </ClienteContext.Provider>
  );
};

export default ClienteProvider;
