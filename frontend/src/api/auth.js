import api from "./axios";

export const loginUser = async (data) => {
  const res = await api.post("/login", data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};
export const registerUser = async (data) => {
    const res = await api.post("/register", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  };
  export const logoutUser = () => {
    localStorage.removeItem("token"); // remove token
    window.location.href = "/login";   // redirect to login page
  };
    