import React, { useEffect, useState } from "react";
import { Grid, Text, Spinner, Flex } from "@chakra-ui/react";
import UserCard from "./UserCard";
import { USERS } from "./dummy/dummy";



function UserGrid({users, setUsers}) {
    const [isLoading, setIsloading] = useState(true);
    const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/contacts");
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch users");
        }
        setUsers(data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error.message);
        // Fallback to dummy data if backend fails
        setUsers(USERS);
      } finally {
        setIsloading(false);
      }
    };
    
    fetchUsers();
  }, [setUsers]);

  if (isLoading) return <Spinner size={"xl"} />;
  if (error) return <Text color="red.500">Error: {error}</Text>;


  return (
    <>
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={4}
    >
      {users.map((user) => (
        <UserCard key={user.id} user={user} setUsers={setUsers} />
      ))}
    </Grid>
   {!isLoading && users.length === 0 && (
  <Flex justifyContent={"center"} >
    <Text fontSize={"xl"}>
    <Text as={"span"} fontSize={"2x1"} fontWeight={"bold"} mr={2}>
      Loading...
    </Text>
    No BUDDYZ found.
    </Text>
  </Flex>
)}
    
    </>
  );
}

export default UserGrid;
