import axiosClient from "./axiosClient";

export const createDocument = async () => {
  const response = await axiosClient.post("/documents");

  return response.data;
};

export const getDocument = async (id) => {
  const response = await axiosClient.get(`/documents/${id}`);

  return response.data;
};

export const updateDocument = async (id, data) => {
  const response = await axiosClient.put(
    `/documents/${id}`,
    data
  );

  return response.data;
};

export const renameDocument = async (
  id,
  title
) => {
  const res = await axiosClient.patch(
    `/documents/${id}`,
    { title }
  );

  return res.data;
};

export const deleteDocument = async (
  id
) => {
  const res = await axiosClient.delete(
    `/documents/${id}`
  );

  return res.data;
};