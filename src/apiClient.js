import axios from "axios";

const api = axios.create({
   baseURL: "https://Blog-Portal-mobile-app.nexusov.repl.co/",
});

export default api;