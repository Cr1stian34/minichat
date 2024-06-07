import { ILogin } from "@/app/interface/login";
import { IUserProfile } from "@/app/interface/userprofile";
import axios from "axios";
import { register } from "module";

const loginAPI = {
  login: async (data: ILogin) => {
    const response = await axios.post("http://localhost:3000/auth/login", data);
    return response.data as any;
  },
  register: async (data: Partial<IUserProfile>) => {
    const response = await axios.post(
      "http://localhost:3000/auth/register",
      data
    );
    return response.data as any;
  },
};

export default loginAPI;
