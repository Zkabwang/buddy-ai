import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	IconButton,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	Radio,
	RadioGroup,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";

// Default EditModal - updates local state via setUsers
function EditModal({ setUsers, user }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		first_name: user?.first_name || "",
		email: user?.email || "",
		role: user?.role || "",
		description: user?.description || "",
	});
	const toast = useToast();

	const handleEditUser = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const res = await fetch("http://127.0.0.1:5000/contacts/" + user.id, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			if (!res.ok) {
				const error = await res.json();
				throw new Error(error.error || error.message || "Failed to update buddy");
			}
			// Update local state
			setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...inputs } : u)));
			toast({ status: "success", title: "Updated", description: "Buddy updated.", duration: 2000, position: "top-center" });
			onClose();
		} catch (err) {
			toast({ status: "error", title: "Error", description: err.message || "Update failed", duration: 4000, position: "top-center" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<IconButton onClick={onOpen} variant="ghost" colorScheme="blue" aria-label="Edit user" size={"sm"} icon={<BiEditAlt size={20} />} />

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleEditUser}>
					<ModalContent>
						<ModalHeader>Edit Buddy</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								<FormControl>
									<FormLabel>Full Name</FormLabel>
									<Input placeholder="Buddy" value={inputs.first_name} onChange={(e) => setInputs((p) => ({ ...p, first_name: e.target.value }))} />
								</FormControl>
								<FormControl>
									<FormLabel>Email</FormLabel>
									<Input type="email" placeholder="buddy@email.com" value={inputs.email} onChange={(e) => setInputs((p) => ({ ...p, email: e.target.value }))} />
								</FormControl>
								<FormControl>
									<FormLabel>Role</FormLabel>
									<Input placeholder="Software Engineer" value={inputs.role} onChange={(e) => setInputs((p) => ({ ...p, role: e.target.value }))} />
								</FormControl>
							</Flex>

							<FormControl mt={4}>
								<FormLabel>Description</FormLabel>
								<Textarea resize={"none"} overflowY={"hidden"} placeholder="Description" value={inputs.description} onChange={(e) => setInputs((p) => ({ ...p, description: e.target.value }))} />
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
								Update
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
}

// Starter variant — simple, no-op add modal provided as a named export
function StarterEditModal() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<IconButton onClick={onOpen} variant="ghost" colorScheme="blue" aria-label="Open starter edit" size={"sm"} icon={<BiEditAlt size={20} />} />

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>My new Buddy</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Flex alignItems={"center"} gap={4}>
							<FormControl>
								<FormLabel>Full Name</FormLabel>
								<Input placeholder="John Doe" />
							</FormControl>

							<FormControl>
								<FormLabel>Role</FormLabel>
								<Input placeholder="Software Engineer" />
							</FormControl>
						</Flex>
						<FormControl mt={4}>
							<FormLabel>Description</FormLabel>
							<Textarea resize={"none"} overflowY={"hidden"} placeholder="He's a software engineer who loves to code and build things." />
						</FormControl>
						<RadioGroup defaultValue="male" mt={4}>
							<Flex gap={5}>
								<Radio value="male">Male</Radio>
								<Radio value="female">Female</Radio>
							</Flex>
						</RadioGroup>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3}>
							Add
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default EditModal;
export { StarterEditModal };

