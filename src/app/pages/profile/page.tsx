"use client";
import CardUser from "@/app/components/CardUser";
import ChatBox from "@/app/components/ChatBox";
import ModalActualizarProfile from "@/app/components/ModalActualizarProfile";
import { IUserProfile } from "@/app/interface/userprofile";
import {
  useGetAllUsers,
  useGetProfile,
} from "@/app/services/users/useGetProfile";
import { useUserStore } from "@/app/store/useUserStore";
import {
  AvatarBadge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";

const Profile = () => {
  const { data: userData, isLoading, isError } = useGetProfile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenChat,
    onOpen: onOpenChat,
    onClose: onCloseChat,
  } = useDisclosure();
  const [chatUser, setChatUser] = useState<IUserProfile | undefined>();
  const {
    userProfile,
    setUserProfile,
    usersData: newUsersData,
    setUsersData,
  } = useUserStore();
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetAllUsers();

  useEffect(() => {
    if (userData) {
      setUserProfile(userData);
    }
  }, [setUserProfile, userData]);

  useEffect(() => {
    if (usersData) {
      setUsersData(usersData);
    }
  }, [usersData, setUsersData]);

  const handleHola = useCallback(
    (usuario: IUserProfile) => {
      console.log("usuario seleccionado=>", usuario);
      console.log("isopen =>", isOpenChat);
      setChatUser(usuario);
      onOpenChat();
    },
    [setChatUser, onOpenChat, isOpenChat]
  );

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar el perfil</div>;
  }

  // console.log("usuario=>", userData);

  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow={"hidden"}
        variant={"outline"}
        maxW={"70%"}
        bgColor={""}
        className="mx-auto bg-slate-400 relative mt-5"
      >
        <Image
          objectFit={"cover"}
          maxW={{ base: "100%", sm: "200px" }}
          src={userProfile?.profilePicture}
          alt="profile"
        />

        <Stack>
          <CardBody>
            <Heading size={"md"}>{userProfile?.username}</Heading>
            <Text py="2">{userProfile?.email}</Text>
          </CardBody>
          <CardFooter>
            <Button variant={"solid"} colorScheme="blue" onClick={onOpen}>
              Actualizar Perfil
            </Button>
          </CardFooter>
        </Stack>
        <div
          className={`absolute top-[5%] right-[3%] rounded-full w-[40px] h-[40px] ${
            userData?.status == "active" ? "bg-green-700" : "bg-black"
          }`}
        ></div>
      </Card>

      {userData &&
        usersData &&
        newUsersData.map((usuario) => (
          <a key={usuario.id} onClick={() => handleHola(usuario)}>
            <CardUser key={usuario.id} usuario={usuario} />
          </a>
        ))}

      {userData && isOpen && (
        <ModalActualizarProfile
          isOpen={isOpen}
          onClose={onClose}
          userData={userData}
        />
      )}

      {chatUser && (
        <ChatBox
          key={chatUser.id}
          chatUser={chatUser}
          isOpenChat={isOpenChat}
          onCloseChat={onCloseChat}
          onOpenChat={onOpenChat}
        />
      )}
    </>
  );
};

export default Profile;
