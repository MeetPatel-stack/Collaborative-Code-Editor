import axiosClient from "./axiosClient";

export const getCurrentUser =
async () => {
  const res = await axiosClient.get(
    "/auth/me"
  );

  return res.data;
};