import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { IUserProfile } from "../interface/userprofile";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfile } from "../services/users/useGetProfile";
import { useUserStore } from "../store/useUserStore";

interface propsModalActualizarProfile {
  isOpen: boolean;
  onClose: () => void;
  userData: IUserProfile;
}

const schema = z.object({
  username: z
    .string()
    .nonempty()
    .min(4, "El nombre de usuario debe de tener mas de 4 carcteres"),
  email: z.string().email(),
  profilePicture: z.string().url().nonempty(),
});

const ModalActualizarProfile: React.FC<propsModalActualizarProfile> = ({
  isOpen,
  onClose,
  userData,
}) => {
  const { mutate: actualizarPerfil, isPending, isError } = useUpdateProfile();
  const toast = useToast();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { setUserProfile, updateUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IUserProfile>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: userData.username,
      email: userData.email,
      profilePicture: userData.profilePicture,
    },
  });

  const onSubmit = useCallback(
    (dataForm: Partial<IUserProfile>) => {
      console.log("data del formulario: ", dataForm);
      actualizarPerfil(
        { actualizarData: dataForm },
        {
          onSuccess: (res) => {
            console.log("datos al formulario: ", res);
            setUserProfile(res);
            updateUser(res);
            toast({
              title: "Perfil actualizado",
              description: "Datos actualizados correctamente",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            onClose();
          },
          onError: (err) => {
            console.log("error al actualizar los datos: ", err);
            toast({
              title: "Ocurrio un error",
              description: "No se pudo actualizar el perfil",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          },
        }
      );
    },
    [actualizarPerfil, toast, onClose, setUserProfile, updateUser]
  );

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Actualizar Perfil</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel>Nombre de usuario</FormLabel>
              <Input
                type="text"
                placeholder="Nombre de usuario"
                {...register("username")}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={4} isInvalid={!!errors.email}>
              <FormLabel>Correo electronico</FormLabel>
              <Input
                {...register("email")}
                type="text"
                placeholder="correo electronico"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4} isInvalid={!!errors.profilePicture}>
              <FormLabel>Url foto de perfil</FormLabel>
              <Input
                type="text"
                placeholder="imagen de perfil"
                {...register("profilePicture")}
              />
              <FormErrorMessage>
                {errors.profilePicture?.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Actualizar
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ModalActualizarProfile;
