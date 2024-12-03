import axios from "axios";
import { API_URL } from "../App.config";
import { API_ROUTES } from "../routes";

const api = axios.create({
  baseURL: API_URL,
});

export async function obtenerClientesForCombo (consulta, page, pageSize) {
    const url = `${API_ROUTES.CLIENTES_PAGE_QUERY}?consulta=${consulta}&page=${page}&size=${pageSize}`;
    const { data } = await api.get(url); 
    return data;
  
}

export async function obtenerClientes() {
    const { data } = await api.get(API_ROUTES.CLIENTES)
    return data;
}

export async function obtenerCliente(id) {
    const { data } = await api.get(API_ROUTES.CLIENTE(id))
    return data;
}

export async function newCliente(cliente) {
    const { data } = await api.post(API_ROUTES.CLIENTE(), cliente);
    return data;
}

export async function actualizarCliente(cliente) {
    const { data } = await api.put(API_ROUTES.CLIENTE_PUT(cliente.id), cliente);
    return data;
 
}

export async function eliminarCliente(id) {
  const { data } = await api.put(API_ROUTES.CLIENTE_ELIMINAR(id))
  return true;
}
