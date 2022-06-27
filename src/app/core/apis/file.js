import { _get, _post, _delete, _put, instance } from "./api";

export const uploadFile = (data) => {
    return instance.post("/api/File", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };