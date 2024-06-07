import {
  Box,
  Button,
  Textarea,
  Avatar,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { IUserProfile } from "../interface/userprofile";
import { io } from "socket.io-client";
import { useUserStore } from "../store/useUserStore";
import { useGetMessages } from "../services/users/useGetMessages";

const socket = io("http://localhost:3000/chat");

interface propsChatBox {
  chatUser: IUserProfile | undefined;
  isOpenChat: boolean;
  onOpenChat: () => void;
  onCloseChat: () => void;
}

const ChatBox: React.FC<propsChatBox> = ({
  chatUser,
  isOpenChat,
  onOpenChat,
  onCloseChat,
}) => {
  const {
    userProfile,
    setUserProfile,
    usersData: newUsersData,
    setUsersData,
  } = useUserStore();

  const {
    data: messagesEnviados,
    isLoading,
    isError,
  } = useGetMessages(userProfile?.id, chatUser?.id);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<any[] | undefined>(messagesEnviados);

  useEffect(() => {
    console.log(
      `todos los mensaes enviados ${userProfile?.id}=>${chatUser?.id}: `,
      messagesEnviados
    );
    setMessages(messagesEnviados);
    if (chatUser && userProfile) {
      const room = `${userProfile.id}-${chatUser.id}`;
      socket.emit("joinRoom", room);

      socket.on("receiveMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatUser, userProfile, messagesEnviados]);

  const handleSendMessage = () => {
    if (message.trim() && chatUser && userProfile) {
      const newMessage = {
        senderId: userProfile.id,
        recipientId: chatUser.id,
        content: message,
      };

      const room = `${userProfile.id}-${chatUser.id}`;
      socket.emit("sendMessage", { ...newMessage, room });
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  return (
    <>
      {isOpenChat ? (
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          width="300px"
          height="400px"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          overflow="hidden"
          display="flex"
          flexDirection="column"
        >
          <Flex
            bg="blue.500"
            color="white"
            p="4"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <Avatar
                size="sm"
                name={chatUser?.username}
                src={chatUser?.profilePicture}
                mr="2"
              />
              <Text fontWeight="bold">{chatUser?.username}</Text>
            </Flex>
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              aria-label="Cerrar chat"
              onClick={onCloseChat}
            />
          </Flex>
          <Box
            flex="1"
            p="4"
            overflowY="auto"
            bg="gray.100"
            display="flex"
            flexDirection="column"
          >
            {userProfile &&
              messages &&
              messages.map((msg, index) => (
                <Box
                  key={index}
                  alignSelf={
                    msg.senderId === userProfile.id ? "flex-end" : "flex-start"
                  }
                  bg={msg.senderId === userProfile.id ? "blue.100" : "gray.300"}
                  color="black"
                  p="2"
                  my="1"
                  borderRadius="md"
                  maxWidth="80%"
                >
                  {msg.content}
                </Box>
              ))}
          </Box>
          <Box p="4" bg="white" borderTop="1px solid #ddd">
            <Textarea
              placeholder="Escribe un mensaje..."
              resize="none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              mb="2"
            />
            <Button colorScheme="blue" width="100%" onClick={handleSendMessage}>
              Enviar
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default ChatBox;
