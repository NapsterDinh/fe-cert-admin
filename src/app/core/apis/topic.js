import { _get, _post, _put, instance } from "./api";

// APIS
export const getAllTopic= () => {
    return _get("/api/v1/topic/list");
};

export const getQuestionById = (id) => {
    return _get(`/api/v1/topic?_id=${id}`);
};

export const addNewTopic= (data) => {
    return _post("/api/v1/topic", data);
};

export const editTopic= (data) => {
    return _put("/api/v1/topic", data);
};

export const deleteTopic= (data) => {
    return instance.delete(`/api/v1/topic?_id=${data._id}`);
};