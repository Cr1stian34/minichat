import loginAPI from "@/app/api/auth/loginAPI";
import { ILogin } from "@/app/interface/login";
import { IUserProfile } from "@/app/interface/userprofile";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useLogin = () => {
  return useMutation<string, AxiosError, { loginData: ILogin }>({
    mutationFn: (params) => loginAPI.login(params.loginData),
  });
};

export const useRegister = () => {
  return useMutation<
    IUserProfile,
    AxiosError,
    { registerData: Partial<IUserProfile> }
  >({ mutationFn: (params) => loginAPI.register(params.registerData) });
};
