import axios from "axios";

export const BASE_URL = "https://localhost:7089/";

const instance = axios.create({
  baseURL: BASE_URL,
});

const localStorageUser = JSON.parse(localStorage.getItem("user"));

if (localStorageUser) {
  setAuthToken(localStorageUser.token);
}

// ### REQUESTS ###

//auth
export const me = () => {
  return instance.get("api/Auth/me").then((res) => res.data);
};

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

// sessions
export const createSession = (sessionData) => {
  return instance.post("api/Session", sessionData).then((res) => res.data);
};

export const getOpenSessions = () => {
  return instance.get("api/Session/openSessions").then((res) => res.data);
};

export const getUserClosedSessions = () => {
  return instance.get("api/Session/closedSessions").then((res) => res.data);
};

export const closeSession = (id) => {
  return instance.put(`api/Session/close/${id}`).then((res) => res.data);
};

export const getConsumptionsBySession = (id) => {
  return instance
    .get(`api/Session/consumptionsBySession/${id}`)
    .then((res) => res.data);
};

// ### FUNCTIONS ###

export function setAuthToken(token) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
