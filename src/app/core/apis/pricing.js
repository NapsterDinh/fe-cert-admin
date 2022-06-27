import { _get, _post, _put, instance } from "./api";

// APIS
export const getAllPricing = () => {
  return _get("/api/v1/pricing/list");
};

export const getPricingById = (id) => {
  return _get(`/api/v1/pricing?_id=${id}`);
};

export const addNewPricing = (data) => {
  return _post("/api/v1/pricing", data);
};

export const editPricing = (data) => {
  return _put("/api/v1/pricing", data);
};

export const deletePricing = (data) => {
  return instance.delete(`/api/v1/pricing?_id=${data}`);
};

export const getAllAbilityPricing = () => {
  return _get("/api/v1/pricing/ability/list");
};

export const getAllPurchase = () => {
  return _get("/api/v1/pricing/get-all-purchase");
};
