import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = () =>
  window.location.hostname === "localhost"
    ? "http://localhost:8000"
    : window.location.origin;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.error(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  apiUrl,
};

export default http;
