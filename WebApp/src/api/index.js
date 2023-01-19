import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5089/",
});

// ### REQUESTS ###

//auth
export const register = (user) => {
  return instance.post("api/Auth", user).then((res) => res.data);
};

export const login = (user) => {
  return instance.post("api/Auth/login", user).then((res) => res.data);
};

//venues
export const getVenues = () => {
  return instance.get("api/Venue").then((res) => res.data);
};

export const addVenue = (venue) => {
  return instance.post("api/Venue", venue).then((res) => res.data);
};

export const deleteVenue = (id) => {
  return instance.delete(`api/Venue/${id}`).then((res) => res.data);
};

//products
export const addProduct = (product) => {
  return instance.post("api/Product", product).then((res) => res.data);
};

export const getProductsByVenue = (id) => {
  return instance.get(`api/Product/byVenue/${id}`).then((res) => res.data);
};

export const deleteProduct = (id) => {
  return instance.delete(`api/Product/${id}`).then((res) => res.data);
};

// ### FUNCTIONS ###

export const setAuthToken = (token) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
