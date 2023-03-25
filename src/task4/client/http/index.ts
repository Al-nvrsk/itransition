import axios from "axios";

const $host = axios.create({
    baseURL: __BASE_URL__,
});

const $authHost = axios.create({
    baseURL: __BASE_URL__,
});

const authInterceptor = (config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
