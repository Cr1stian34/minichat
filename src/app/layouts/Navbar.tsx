import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <Box bg="white" p={4}>
      <Flex
        maxW="1200px"
        mx="auto"
        justifyContent="space-between"
        alignItems="center"
      >
        <Link href={"/"} className="flex justify-center items-center gap-2">
          <FaHome color="black" size="24px" />
          <Text fontSize="2xl" fontWeight="bold" color="black">
            ChatApp
          </Text>
        </Link>

        <Flex gap={4}>
          <Link href="/pages/login">
            <Button
              colorScheme="white"
              className="bg-slate-900 hover:bg-slate-950"
              variant="solid"
            >
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/pages/register">
            <Button colorScheme="teal" variant="solid">
              Registrarse
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
