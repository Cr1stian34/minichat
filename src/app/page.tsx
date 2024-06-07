import { Heading, Image, Text } from "@chakra-ui/react";
import { Box, Button, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="88vh"
      p={24}
      position="relative"
    >
      <Box
        position="absolute"
        left="10%"
        top="50%"
        transform="translateY(-50%)"
      >
        <Image
          src="/batman_principal.png"
          alt="Landscape picture"
          boxSize="500px"
          objectFit="cover"
          boxShadow="xl"
        />
      </Box>
      <Box
        bg="blackAlpha.700"
        color="white"
        maxW="500px"
        px={10}
        py={7}
        rounded="md"
        position="absolute"
        right="10%"
        top="50%"
        transform="translateY(-50%)"
        boxShadow="xl"
      >
        <Heading as="h3" size="lg" textAlign="center" mb={5}>
          Conéctate y Chatea
        </Heading>
        <Text textAlign="center" mb={7}>
          Descubre una nueva forma de comunicación con ChatApp. Haz nuevos
          amigos, comparte momentos especiales y mantén charlas animadas. Únete
          hoy mismo.
        </Text>
        <Flex gap={5} justify="center">
          <Button colorScheme="teal" size="lg">
            Start Chatting
          </Button>
          <Button colorScheme="white" variant="outline" size="lg">
            Join Now
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}
