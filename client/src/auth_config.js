
const {
        VITE_AUTH0_DOMAIN,
        VITE_AUTH0_CLIENT_ID,
        VITE_AUTH0_AUDIENCE
    } = import.meta.env


const config = {
    domain: VITE_AUTH0_DOMAIN,
    clientId: VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
        audience :VITE_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin, // Ruta a donde regresara despues del login, por ahora se regresa al comienzo, deberia ser donde se quedo navegando
    }
}

export default config