import { _get, _post, _delete, _put, instance } from "./api";

// APIS
export const getAllExam = (type) => {
  if (type !== undefined) {
    return _get(`/api/v1/exam/list?type=${type}`);
  }
  return _get("/api/v1/exam/list");
};

export const getQuestionById = (id) => {
  return _get(`/api/v1/exam?_id=${id}`);
};

export const addNewExam = (data) => {
  return _post("/api/v1/exam", data);
};

export const editExam = (data) => {
  return _put("/api/v1/exam", data);
};

export const deleteExam = (data) => {
  return instance.delete(`/api/v1/exam?_id=${data._id}`);
};
