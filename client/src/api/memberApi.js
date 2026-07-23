import axiosClient from "./axiosClient";

export const getMembers = async (workspaceId) => {
  const res = await axiosClient.get(`/members/${workspaceId}/members`);

  return res.data;
};
