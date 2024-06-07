"use client";
import usersAPI from "@/app/api/users/usersAPI";
import { IUserProfile } from "@/app/interface/userprofile";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetProfile = () => {
  return useQuery<IUserProfile, AxiosError>({
    queryKey: ["profile"],
    queryFn: () => usersAPI.getProfile(),
  });
};

export const useGetAllUsers = () => {
  return useQuery<IUserProfile[], AxiosError>({
    queryKey: ["profiles"],
    queryFn: () => usersAPI.getAllUsers(),
  });
};

export const useUpdateProfile = () => {
  return useMutation<
    IUserProfile,
    AxiosError,
    { actualizarData: Partial<IUserProfile> }
  >({ mutationFn: (params) => usersAPI.updateProfile(params.actualizarData) });
};
