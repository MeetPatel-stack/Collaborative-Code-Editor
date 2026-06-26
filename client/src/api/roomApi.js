import axiosClient from "./axiosClient";

export const createRoom = async (payload) => {
  const res = await axiosClient.post("/rooms", payload);

  return res.data;
};

export const getRoom = async (roomId) => {
  const res = await axiosClient.get(`/rooms/${roomId}`);

  return res.data;
};

export const getRoomDocuments = async (roomId) => {
  const res = await axiosClient.get(`/rooms/${roomId}/documents`);

  return res.data;
};

export const createRoomDocument = async (roomId, payload) => {
  const res = await axiosClient.post(`/rooms/${roomId}/documents`, payload);

  return res.data;
};
