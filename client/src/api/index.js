import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// venues
export const getVenues = async () => {
  const res = await client.get("venues");
  return res;
};

export const deleteVenue = async (id) => {
  const res = await client.delete(`venues/${id}`);
  return res;
};

export const addVenue = async (name) => {
  const res = await client.post("venues", { name });
  return res;
};

// products
export const getProductsByVenue = async (id) => {
  const res = await client.get(`products/${id}`);
  return res;
};

export const addProduct = async (product) => {
  const res = await client.post("products", product);
  return res;
};

export const deleteProduct = async (id) => {
  const res = await client.delete(`products/${id}`);
  return res;
};

// registered user methods
export const registerUser = async (user) => {
  const response = await client.post("registeredUser", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const loginUser = async (user) => {
  const response = await client.post("registeredUser/login", user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
