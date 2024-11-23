import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClienteContext } from "../Context/ClienteContext";

export default function Cliente({ title }) {
  
  let navegacion = useNavigate();
  const { id } = useParams();
  const { getCliente, clienteActual, setClienteActual, newCliente, putCliente } = ClienteContext();

  useEffect(() => {
    if (id) {
      getCliente(parseInt(id));
    } else {
      // Limpiar el estado si no hay ID
      setClienteActual({ razonSocial: "", celular: "", mail: "" });
    }
  }, [id]);

  const onInputChange = ({ target: { name, value } }) => {
    //spread operator ... (expandir los atributos)
    setClienteActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await putCliente(clienteActual);
    } else {
      await newCliente(clienteActual);
    }
    // Redirigimos a la pagina de inicio
    navegacion("/clienteList");
  };

  return (
    <div className="container">
      <div>
        <h1> Gestión de Clientes / {title} </h1>
        <hr></hr>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="razonSocial" className="form-label">
            {" "}
            Apellido Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="razonSocial"
            name="razonSocial"
            required={true}
            value={razonSocial}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="celular" className="form-label">
            {" "}
            celular
          </label>
          <input
            type="number"
            className="form-control"
            id="celular"
            name="celular"
            required={true}
            value={celular}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            {" "}
            mail
          </label>
          <input
            type="email"
            className="form-control"
            id="mail"
            name="mail"
            value={mail}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="row d-md-flex justify-content-md-end">
          <div className="col-4">
            <button type="submit" className="btn btn-success btn-sm me-3">
              Guardar
            </button>
          </div>
          <div className="col-4">
            <a href="/clienteList" className="btn btn-info btn-sm me-3">
              Regresar
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
