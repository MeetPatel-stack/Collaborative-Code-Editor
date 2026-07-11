import axiosClient from "./axiosClient";

export const createWorkspace = async (payload) => {
  const res = await axiosClient.post("/workspaces", payload);

  return res.data;
};

export const getWorkspace = async (workspaceId) => {
  const res = await axiosClient.get(`/workspaces/${workspaceId}`);

  return res.data;
};

export const getWorkspaceDocuments = async (workspaceId) => {
  const res = await axiosClient.get(`/workspaces/${workspaceId}/documents`);

  return res.data;
};

export const createWorkspaceDocument = async (workspaceId, payload) => {
  const res = await axiosClient.post(`/workspaces/${workspaceId}/documents`, payload);

  return res.data;
};
