import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import scss from "./schoolcard.module.scss";

import { ISchool } from "@models/School";
import { FC } from "react";
import { getConcours } from "@lib/statistiques";

interface IProps {
	school: ISchool | undefined;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const SchoolCard: FC<IProps> = ({ isOpen, onClose, school }) => {
	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			scrollBehavior='inside'
			size='6xl'
			isCentered
		>
			<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(2px)' />
			<ModalContent width='full' height='full'>
				<ModalHeader>{school?.ecole}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>{JSON.stringify(school)}</Text>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SchoolCard;
