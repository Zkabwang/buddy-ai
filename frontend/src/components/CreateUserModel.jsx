import { Button, Flex, FormControl, FormLabel, Modal,Input, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, ModalFooter, useToast } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import { useState } from "react";




function CreateUserModel({setUsers}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState({
        first_name: "",
        email: "",
        role: "",
        description: "",

    });

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("http://127.0.0.1:5000/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            })

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || data.message || "Failed to create Buddy");
            }
            toast({
                title: "Buddy created successfully",
                status: "success",
            })
            setUsers((prev) => [...prev, data]);
            setInput({
                first_name: "",
                email: "",
                role: "",
                description: "",
            });
            onClose();
        } catch (error) {
            console.error("Full error:", error);
            toast({
                title: "Error creating buddy",
                description: error.message || "Unknown error occurred",
                status: "error",
            })
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleCreateUser}>
                <ModalContent>
                    <ModalHeader>Create User 🤖</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={8}>
                        <Flex alignItems={"center"} gap={4}>
                            {/* left field */}
                            <FormControl>
                                <FormLabel>First Name</FormLabel>
                                <Input 
                                    type="text" 
                                    placeholder="Enter username"
                                    value={input.first_name}
                                    onChange={(e) => setInput({...input, first_name: e.target.value})}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input 
                                    type="email" 
                                    placeholder="Enter email"
                                    value={input.email}
                                    onChange={(e) => setInput({...input, email: e.target.value})}
                                />
                            </FormControl>
                            </Flex>

                            <FormControl mt={4}>
                                <FormLabel>Role</FormLabel>
                                <Input 
                                    type="text" 
                                    placeholder="AI Engineer"
                                    value={input.role}
                                    onChange={(e) => setInput({...input, role: e.target.value})}
                                />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflowY={"hidden"}
                                    placeholder="Enter user description"
                                    value={input.description}
                                    onChange={(e) => setInput({...input, description: e.target.value})}
                                /> 
                            </FormControl>

                            <RadioGroup defaultValue="Male" mt={4}>
                                <Flex gap={5}>
                                    <Radio value="Male">Male</Radio>
                                    <Radio value="Female">Female</Radio>
                                </Flex>
                            </RadioGroup>
                        <ModalFooter>
                            <Button 
                                colorScheme="blue" 
                                mr={3} 
                                type="submit"
                                isLoading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading ? "Creating..." : "Add"} 
                            </Button>
                            <Button onClick={onClose} isDisabled={isLoading}>Cancel</Button>
                        </ModalFooter>
              
                          
                      
                      
                    </ModalBody>
                </ModalContent>
                </form>
            </Modal>
        </>
    );
}

export default CreateUserModel;
