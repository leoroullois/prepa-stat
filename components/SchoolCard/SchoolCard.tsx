import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";

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
         size='6xl'
         isCentered
      >
         <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(2px)' />
         <ModalContent width='80%' height='90%'>
            <ModalBody className={scss["modal-body"]} padding={0}>
               {school && <SchoolCardContent data={school} maxPlace={200} />}
            </ModalBody>
         </ModalContent>
      </Modal>
   );
};

export default SchoolCard;
