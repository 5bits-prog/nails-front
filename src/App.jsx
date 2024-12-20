import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ListadoCliente from "./Clientes/ListadoCliente";
import Cliente from "./Clientes/Cliente";
import ClienteProvider from "./Context/ClienteContext";
import Menu from "./Menu";
import ListadoLinea from "./Articulos/ListadoLinea";
import Linea from "./Articulos/Linea";
import ListadoArticulosVenta from "./Articulos/ListadoArticulosVenta";
import ArticuloVenta from "./Articulos/ArticuloVenta";
import LineaProvider from "./Context/LineaContext";
import TipoServicioProvider from "./Context/TipoServicioContext";
import TipoServicio from "./GServicios/TipoServicio";
import ListadoTipoServicio from "./GServicios/ListadoTipoServicio";
import ArticuloVentaProvider from "./Context/ArticuloVentaContext";
import ServicioProvider from "./Context/ServicioContext";
import Servicio from "./GServicios/Servicio";
import ListadoServicio from "./GServicios/ListadoServicio";
import { NotificationProvider } from "./Context/NotificacionContext";
import Home from "./extras/home/Home";

function App() {
  return (
    <div className="conteiner">
      <BrowserRouter>
      <NotificationProvider>
        <Menu />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
              exact
              path="/home"
              element={
                <Home></Home>
              }
            />
          
          <Route
            exact
            path="/clienteList"
            element={
              <ClienteProvider>
                <ListadoCliente />
              </ClienteProvider>
            }
          />

          <Route
            exact
            path="/cliente"
            element={
              <ClienteProvider>
                <Cliente title="Nuevo" />
              </ClienteProvider>
            }
          />
          <Route
            exact
            path="/cliente/:id"
            element={
              <ClienteProvider>
                <Cliente title="Editar" />
              </ClienteProvider>
            }
          />

          <Route
            exact
            path="/lineaList"
            element={
              <LineaProvider>
                <ListadoLinea />
              </LineaProvider>
            }
          />
          <Route
            exact
            path="/linea"
            element={
              <LineaProvider>
                <Linea title="Nuevo" />
              </LineaProvider>
            }
          />
          <Route
            exact
            path="/linea/:id"
            element={
              <LineaProvider>
                <Linea title="Editar" />
              </LineaProvider>
            }
          />

          <Route
            exact
            path="/articuloList"
            element={
              <ArticuloVentaProvider>
                <ListadoArticulosVenta />
              </ArticuloVentaProvider>
            }
          />

          <Route
            exact
            path="/articulo"
            element={
              <ArticuloVentaProvider>
                <ArticuloVenta title="Nuevo" />
              </ArticuloVentaProvider>
            }
          />
          <Route
            exact
            path="/articulo/:id"
            element={
              <ArticuloVentaProvider>
                <ArticuloVenta title="Editar" />
              </ArticuloVentaProvider>
            }
          />

          <Route
            exact
            path="/tipoServicioList"
            element={
              <TipoServicioProvider>
                <ListadoTipoServicio />
              </TipoServicioProvider>
            }
          />
          <Route
            exact
            path="/tipoServicio"
            element={
              <TipoServicioProvider>
                <TipoServicio title="Nuevo" />
              </TipoServicioProvider>
            }
          />
          <Route
            exact
            path="/tipoServicio/:id"
            element={
              <TipoServicioProvider>
                <TipoServicio title="Editar" />
              </TipoServicioProvider>
            }
          />

          <Route
            exact
            path="/servicioList"
            element={
              <ServicioProvider>
                <ListadoServicio />
              </ServicioProvider>
            }
          />
          <Route
            exact
            path="/servicio"
            element={
              <ClienteProvider>
              <ServicioProvider>
                <Servicio title="Nuevo" />
              </ServicioProvider>
              </ClienteProvider>
            }
          />
          <Route
            exact
            path="/servicio/:id"
            element={
              <ClienteProvider>
              <ServicioProvider>
                <Servicio title="Editar" />
              </ServicioProvider>
              </ClienteProvider>
            }
          />
          
        </Routes>
        </NotificationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
