import axios from "axios";

const api = axios.create({
   baseURL: "http://Blog-Portal-mobile-app.nexusov.repl.co/",
});

export default api;