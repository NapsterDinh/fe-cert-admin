import { _get, _post, _put, instance } from "./api";

// APIS
export const getAllSection = () => {
  return _get("/api/v1/topic/section/list");
};

export const getSectionById = (id) => {
  return _get(`/api/v1/topic/section?_id=${id}`);
};

export const addNewSection = (data) => {
  return _post("/api/v1/topic/section", data);
};

export const editSection = (data) => {
  return _put("/api/v1/topic/section", data);
};

export const deleteSection = (data) => {
  return instance.delete(`/api/v1/topic/section?_id=${data._id}`);
};
