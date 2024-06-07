import { IUserProfile } from "@/app/interface/userprofile";
import useAuthStore from "@/app/store/authStore";
import axios from "axios";

const usersAPI = {
  getProfile: async () => {
    const token = useAuthStore.getState().token;
    const response = await axios.get(`http://localhost:3000/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  getAllUsers: async () => {
    const token = useAuthStore.getState().token;
    const response = await axios.get("http://localhost:3000/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
  updateProfile: async (dataActualizar: Partial<IUserProfile>) => {
    const token = useAuthStore.getState().token;
    const response = await axios.patch(
      "http://localhost:3000/users/me",
      dataActualizar,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
  getAllMessages: async (
    userEmisor: number | undefined,
    userReceptor: number | undefined
  ) => {
    const response = await axios.get(
      `http://localhost:3000/messages?userEmisor=${userEmisor}&userReceptor=${userReceptor}`
    );
    return response.data;
  },
};

export default usersAPI;
