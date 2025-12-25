import {Box, Button, Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import CreateUserModel from "./CreateUserModel";


function Navbar({setUsers}) {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
  <><Container maxW={"900px"}>
    <Box px={4} my={4} borderRadius={5} bg={"blue.700"}>
        <Flex h="16" alignItems={"center"} justifyContent={"space-between"}>
         
        {/*Left side */}

        <Flex alignItems={"center"} justifyContent={"center"} gap={3} display={{base:"none", sm:"flex"}}>
            
        <img src="/Kobe.JPG" alt="kid logo" width={30} height={50}/>
        <Text fontSize={"40px"}>+</Text> 
        <img src="/KB.webp" alt="python logo" width={50} height={50}/>
        <Text fontSize={"40px"}>=</Text>     
        <img src="/Python-PNG.webp" alt="python logo" width={50} height={50}/>
          
        </Flex>  
    


        {/*Right side */} 
 
            <Flex gap={3} alignItems={"center"}>
            <Text fontSize={"lg"} fontWeight={500} display={{base: "none", md:"block"}}>Buddyz🎶</Text>

            <Button onClick={toggleColorMode}>{colorMode === "light" ? "🌙" : "☀️" }</Button>
            <CreateUserModel setUsers={setUsers} />
            </Flex> 
        </Flex>
    </Box>Buddyz LLC</Container></> 

  );
}

export default Navbar;

