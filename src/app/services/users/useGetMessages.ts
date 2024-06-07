"use cliente";

import usersAPI from "@/app/api/users/usersAPI";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetMessages = (
  userEmisor: number | undefined,
  userReceptor: number | undefined
) => {
  return useQuery<any[], AxiosError>({
    queryKey: ["messages", userEmisor, userReceptor],
    queryFn: () => usersAPI.getAllMessages(userEmisor, userReceptor),
    enabled: !!userEmisor && !!userReceptor, // Solo ejecuta la consulta si ambos valores están presentes
  });
};
