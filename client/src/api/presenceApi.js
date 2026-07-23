import axiosClient from "./axiosClient";

export const getPresence = async (workspaceId) => {
  const res = await axiosClient.get(`/presence/${workspaceId}`);

  return res.data;
};
