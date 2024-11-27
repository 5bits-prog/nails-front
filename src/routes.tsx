export const API_ROUTES = {
    //CLIENTE
    CLIENTES_PAGE_QUERY: "/clientesPageQuery",
    CLIENTES: "/clientes",
    CLIENTE: (id = "") => (id ? `/cliente/${id}` : "/cliente"),
    CLIENTE_ELIMINAR:(id) => `/clienteEliminar/${id}`,

    // SERVICIOS
    SERVICIOS_PAGE_QUERY: "/serviciosPageQuery",
    SERVICIOS: "/servicios",
    SERVICIO: (id = "") => (id ? `/servicio/${id}` : "/servicio"),
    SERVICIO_NUEVO: "/servicios", // Para crear nuevos servicios
    SERVICIO_ACTUALIZAR: (id = "") => (id ? `/servicios/${id}` : "/servicios"),
    SERVICIO_ELIMINAR: (id) => `/servicioEliminar/${id}`,

    //El resto de URLS...

  };    