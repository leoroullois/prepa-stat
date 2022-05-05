import {
   Modal,
   ModalBody,
   ModalContent,
   ModalOverlay,
   useColorMode,
} from "@chakra-ui/react";

import scss from "@components/SchoolCard/schoolcard.module.scss";

import { FC } from "react";
import SchoolCardContent from "@components/SchoolCard/SchoolCardContent";

interface IProps {
   school: SchoolData | undefined;
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
         isCentered
      >
         <ModalOverlay />
         <ModalContent>
            <ModalBody padding='20px 40px'>
               {school && <SchoolCardContent data={school} maxPlace={200} />}
            </ModalBody>
         </ModalContent>
      </Modal>
   );
};

export default SchoolCard;

