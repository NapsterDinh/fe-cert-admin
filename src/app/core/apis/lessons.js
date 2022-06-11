import { _get, _post, _put, instance } from "./api";

// APIS
export const getAllLesson = () => {
  return _get("/api/v1/topic/lesson/list");
};

export const getLessonById = (id) => {
  return _get(`/api/v1/topic/lesson?_id=${id}`);
};

export const addNewLesson = (data) => {
  return _post("/api/v1/topic/lesson", data);
};

export const editLesson = (data) => {
  return _put("/api/v1/topic/lesson", data);
};

export const deleteLesson = (data) => {
  return instance.delete(`/api/v1/topic/lesson?_id=${data}`);
};
