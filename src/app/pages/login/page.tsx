"use client";
import { ILogin } from "@/app/interface/login";
import { useLogin } from "@/app/services/auth/useLogin";
import useAuthStore from "@/app/store/authStore";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string(),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

const Login = () => {
  const [redirect, setRedirect] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ILogin>({ resolver: zodResolver(schema) });

  const { mutate: loginUsuario, isPending, isError } = useLogin();
  const toast = useToast();
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);

  const onSubmit = useCallback(
    (data: ILogin) => {
      console.log("data del login =>", data);
      loginUsuario(
        { loginData: data },
        {
          onSuccess: (res: any) => {
            console.log("token=> ", res.accessToken);
            setToken(res.accessToken);
            toast({
              title: "Logeo exitoso",
              description: "session iniciada",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            reset();
            router.push("/pages/profile");
          },
          onError: (error) => {
            console.log("error al iniciar session=>", error);
            toast({
              title: "Logeo fallido",
              description: "datos incorrectos",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          },
        }
      );
    },
    [loginUsuario, toast, reset, router, setToken]
  );

  return (
    <Box
      border="2px"
      borderColor="gray.200"
      maxW="500px"
      mx="auto"
      my="4"
      p="10"
      borderRadius="md"
      bg="white"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" textAlign="center" mb="5" color="teal.600">
        Iniciar Session
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              {...register("email")}
              // type="email"
              placeholder="Correo Electrónico"
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              {...register("password")}
              type="password"
              placeholder="Contraseña"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="blue" type="submit" width="full" mt={4}>
            Iniciar session
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Login;
