import axios from "axios";
import { API_URL } from "../App.config";
import { API_ROUTES } from "../routes";
import { useNotification } from "../Context/NotificacionContext";

const api = axios.create({
  baseURL: API_URL,
});

const { mostrarMensaje } = useNotification();

export async function obtenerClientesForCombo (consulta, page, pageSize) {
  try {
    const url = `${API_ROUTES.CLIENTES_PAGE_QUERY}?consulta=${consulta}&page=${page}&size=${pageSize}`;
    const { data } = await api.get(url); 
    return data;

  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

export async function obtenerClientes() {
  try {
    const { data } = await api.get(API_ROUTES.CLIENTES)
    return data;
  } catch (error) {
    console.error("Error buscando clientes:", error);
    throw error;
  }
}

export async function obtenerCliente(id) {
  try {
    const { data } = await api.get(API_ROUTES.CLIENTE(id))
    return data;
  } catch (error) {
    console.error("Error en buscar un cliente:", error);
    throw error;
  }
}

export async function newCliente(cliente) {
  try {
    const { data } = await api.post(API_ROUTES.CLIENTE(), cliente);
    mostrarMensaje("Cliente creado exitosamente");
    return data;
  } catch (e) {
    mostrarMensaje(e);
    return null;
  }
}

export async function actualizarCliente(cliente) {
  try {
    const { data } = await api.put(API_ROUTES.CLIENTE(cliente.id), cliente);
    return data;
  } catch (e) {
    mostrarMensaje(e);
    return null;
  }
}

export async function eliminarCliente(id) {
  try{
  const { data } = await api.delete(API_ROUTES.CLIENTE_ELIMINAR)
  mostrarMensaje("Cliente eliminado exitosamente");
  return true;
}catch(error){
  mostrarMensaje(error);
  throw error;
}
}
