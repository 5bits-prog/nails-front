import axios from "axios";
import { API_URL } from "../App.config";
import { API_ROUTES } from "../routes";

const api = axios.create({
  baseURL: API_URL,
});

// Obtener una lista paginada de servicios
export async function obtenerServicios(consulta, page, pageSize) {
    const url = `${API_ROUTES.SERVICIOS_PAGE_QUERY}?consulta=${consulta}&page=${page}&size=${pageSize}`;
    const { data } = await api.get(url); 
    return data;
}

// Obtener un servicio por su ID
export async function obtenerServicio(id) {
    const { data } = await api.get(API_ROUTES.SERVICIO(id))
    return data;
}

// Crear o actualizar un servicio
export async function newServicio(servicio) {
  const { data } = await api.post(API_ROUTES.SERVICIO_NUEVO, servicio);
  return data;
}
export async function actualizarServicio(servicio) {
  const { data } = await api.put(API_ROUTES.SERVICIO_ACTUALIZAR(servicio.id), servicio);
  return data;

}

export async function eliminarServicio(id) {
  const { data } = await api.delete(API_ROUTES.SERVICIO_ELIMINAR(id))
  return true;
}
