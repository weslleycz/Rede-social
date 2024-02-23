import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.API_Url,
});

// Adiciona um interceptor para requisições
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    config.headers.token = token;
    return config;
  },
  (error) => {
    // Faça algo com erros de requisição
    return Promise.reject(error);
  }
);

// Adiciona um interceptor para respostas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Faça algo com erros de resposta
    if (error.response.status === 401) {
      deleteCookie("token");
      window.location.href = "/";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export { api };
