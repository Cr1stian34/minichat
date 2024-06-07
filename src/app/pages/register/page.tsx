"use client";
import { IRegister } from "@/app/interface/register";
import { useRegister } from "@/app/services/auth/useLogin";
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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(2, "El nombre de usuario debe tener al menos dos caracteres."),
  email: z.string().email("Correo electrónico inválido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
});

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IRegister>({ resolver: zodResolver(schema) });

  const { mutate: registerUsuario, isPending, isError } = useRegister();
  const toast = useToast();
  const router = useRouter();

  const onSubmit = (data: IRegister) => {
    console.log("data del formulario =>", data);
    registerUsuario(
      { registerData: data },
      {
        onSuccess: (res: any) => {
          console.log("datos registro: ", res);
          toast({
            title: "Registrado exitosamente",
            description: "usuario registrado",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          reset(); // Resetea el formulario después del envío
          router.push("/pages/login");
        },
        onError: (err: any) => {
          console.log("error al registra los datos: ", err);
          toast({
            title: "Registro fallido",
            description: "El usuario no se a podidio registrar",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        },
      }
    );
  };

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
        Regístrate para Chatear
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired isInvalid={!!errors.username}>
            <FormLabel>Nombre de Usuario</FormLabel>
            <Input
              {...register("username")}
              type="text"
              placeholder="Nombre de usuario"
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="email" isRequired isInvalid={!!errors.email}>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              {...register("email")}
              type="email"
              placeholder="Correo Electrónico"
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isRequired isInvalid={!!errors.password}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              {...register("password")}
              type="password"
              placeholder="Contraseña"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="blue" type="submit" width="full" mt={4}>
            Registrarse
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default Register;
