import { Axios } from "axios";

const server = new Axios({
  baseURL: "http://localhost:8000",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

server.interceptors.response.use(
  function (response) {
    try {
      if (typeof response.data === "string") {
        response.data = JSON.parse(response.data);
      }
    } catch {
      /* empty */
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default server;
