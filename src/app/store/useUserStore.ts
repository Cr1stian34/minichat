import { create } from "zustand";
import { IUserProfile } from "../interface/userprofile";

interface UserState {
  userProfile: IUserProfile | undefined;
  usersData: IUserProfile[];
  setUserProfile: (profile: IUserProfile) => void;
  setUsersData: (users: IUserProfile[]) => void;
  updateUser: (updatedUser: IUserProfile) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userProfile: undefined,
  usersData: [],
  setUserProfile: (profile) => set({ userProfile: profile }),
  setUsersData: (users) => set({ usersData: users }),
  updateUser: (updatedUser) =>
    set((state) => ({
      usersData: state.usersData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      ),
    })),
}));
