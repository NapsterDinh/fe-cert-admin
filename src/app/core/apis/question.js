import { _get, _post, _delete, _put, instance } from "./api";

// APIS
export const getAllQuestions = () => {
  return _get("/api/v1/question/list");
};

export const getQuestionById = (id) => {
  return _get(`/api/v1/question?_id=${id}`);
};

export const addNewQuestion = (data) => {
  return _post("/api/v1/question", data);
};

export const addNewQuestionWithExam = (data) => {
  return _post("/api/v1/question/with-exam", data);
};

export const editQuestion = (data) => {
  return _put("/api/v1/question", data);
};

export const deleteQuestion = (data) => {
  return instance.delete(`/api/v1/question?_id=${data._id}`);
};
