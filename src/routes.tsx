export const API_ROUTES = {
    //CLIENTE
    CLIENTES_PAGE_QUERY: "/clientesPageQuery",
    CLIENTES: "/clientes",
    CLIENTE: (id = "") => (id ? `/cliente/${id}` : "/cliente"),
    CLIENTE_ELIMINAR:"/clienteEliminar"

    //El resto de URLS...

  };