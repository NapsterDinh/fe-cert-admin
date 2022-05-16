import { _get, _post, _delete, _put } from "./api";

// APIS
export const getDocument = (data) => {
  return _get("/api/v1/tutorial");
};

export const createDocument = (data) => {
  return _post("/api/v1/tutorial", data);
};
