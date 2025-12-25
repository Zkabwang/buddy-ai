import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";

function UserCard({ user, setUsers }) {
  const toast = useToast();
  const handleDeleteUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/contacts/" + user.id, {
        method: "DELETE",
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error)
      }
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      toast({
        title: "Buddy deleted successfully",
        status: "success",
        isClosable: true,
        duration: 2000,
        position: "top-center",
        })

      }catch (error) {
      toast({
        title: "Error deleting buddy",
        description: error.message,
        status: "error",
        isClosable: true,
        duration: 4000,
      })
    }
      return;
    }
  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex="1" gap="4" alignItems="center">
            <Avatar src={"/hacker.png"} />
            <Box>
              <Heading size="sm">{user.first_name}</Heading>
              <Text fontSize="sm" color="gray.500">{user.role}</Text>
              <Text>{user.email}</Text>
            </Box>
          </Flex>
          <Flex>
            <EditModal user={user} setUsers={setUsers} />
            <IconButton
              variant="ghost"
              colorScheme="red"
              size="sm"
              aria-label="Delete user"
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser}
            />
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
          {user.description}
        </Text>
      </CardBody>
    </Card>
  );
}

export default UserCard;