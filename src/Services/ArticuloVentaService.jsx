import axios from "axios";
import { API_URL } from "../App.config";

const urlBase = API_URL + "/articulosPageQuery";


export async function obtenerArticulosVenta(consulta, page, pageSize) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `http://localhost:8080/nails_back/articulosPageQuery?consulta=Denominacion`,
    });
    return data;
  } catch (error) {
    console.error("Error buscando articulos:", error);
    throw error;
  }
}

export async function obtenerArticuloVenta(id) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `http://localhost:8080/nails_back/articulos/${id}`,
    });
    return data;
  } catch (error) {
    console.error("Error en buscar una articulo:", error);
    throw error;
  }
}

export async function newArticuloVenta(model) {
  try {
    if (model.id > 0) {
      window.alert("entra por el put");
      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:8080/nails_back/articulos/${model.id}`,
        data: model,
      });
    } else {
      window.alert("entra por el post");
      const { data } = await axios({
        method: "POST",
        url: `http://localhost:8080/nails_back/articulos`,
        data:model
      });
    }

    return data;
  } catch (e) {
     console.error(e);
    if (e.response && e.response.status === 400) {
        setMensaje('Error: Los datos proporcionados son inválidos');
        alert('Error: Los datos proporcionados son inválidos');
    }
    else {
        alert(e.response);
        alert(e.response.status);
        setMensaje('Error al conectarse con el servidor');
    }
    return null;
  }
}

export async function eliminarArticulosVenta(id) {
  const urlBase = API_URL + "/articulosEliminar";
  try{
  const { data } = await axios({
    method: "DELETE",
    url: `http://localhost:8080/nails_back/articuloEliminar/${id}`,
  });
  return true;
}catch(error){
  alert("Error al eliminar el articulo:", error);
  throw error;
}
}
