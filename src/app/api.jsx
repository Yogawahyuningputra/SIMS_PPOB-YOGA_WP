import axios from "axios";

export const API = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.app/",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // console.log("Authorization header set:", API.defaults.headers.common);
  } else {
    delete API.defaults.headers.common["Authorization"];
    // console.log("Authorization header removed:", API.defaults.headers.common);
  }
};
