import React from "react";
import { IUserProfile } from "../interface/userprofile";
import { Avatar, AvatarBadge, Stack, Text } from "@chakra-ui/react";

interface propsCardUser {
  usuario: IUserProfile;
}

const CardUser: React.FC<propsCardUser> = ({ usuario }) => {
  // console.log("usuarios del chat=>", usuario);
  return (
    <Stack
      direction={"row"}
      spacing={4}
      className="border-2 bg-white rounded-md my-3 max-w-[300px] mx-auto hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
    >
      <Avatar name={usuario.username} src={usuario.profilePicture}>
        <AvatarBadge boxSize={"1.25em"} bg={"green.500"} />
      </Avatar>
      <Text>{usuario.username}</Text>
    </Stack>
  );
};

export default CardUser;
