import { _get, _post, _delete, _put } from "./api";

// APIS
export const getAllUsers = (data) => {
  return _get("/api/v1/user");
};

export const login = (data) => {
  return _post("/api/v1/user/login", data);
};

export const register = (data) => {
  return _post("/api/v1/user/register", data);
};

export const logout = (data) => {
  return _post("/api/v1/user/logout", data);
};

export const deleteUser = (data) => {
  return _delete("/api/v1/user");
};