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
/**react-icons */
import { FaStar } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { IoCaretDown, IoCaretUpOutline } from "react-icons/io5";
import { RiExternalLinkFill } from "react-icons/ri";

import scss from "./schoolcard.module.scss";

import { ISchool } from "@models/School";
import { FC, useEffect } from "react";
import { getConcours } from "@lib/statistiques";

interface IProps {
	school: ISchool | undefined;
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}
type SchoolData = {
	ecole: string;
	classement: number;
	places: number;
	integres_rg_median: number;
	integres_rg_moyen: number;
	integres_cinq_demi: number;
	integres_filles: number;
	url: string;
	annee: number;
};

export interface ISchoolCardProps {
	data: SchoolData;
	maxPlace: number;
	navBar?: any;
	layout?: any;
}

const SchoolCardContent: FC<ISchoolCardProps> = ({ data, maxPlace }) => {
	return (
		<section className={scss["school-card"]}>
			<div className={scss["favorite-icon-container"]}>
				<FaStar className={scss["favorite-icon"]} />
			</div>
			<div className={scss["card-band"]}>
				<h2>Ecole polytechnique</h2>
				<a
					className={scss["card-band-link-container"]}
					href={data.url}
					target='_blank'
					rel='noopener noreferrer'
				>
					<RiExternalLinkFill className={scss["card-band-link"]} />
				</a>
			</div>
			<div id='card-header'>
				<div className={scss["card-leaderboard"]}>
					<div className={scss["card-leaderboard-title"]}>Classement :</div>
					<div className={scss["card-leaderboard-content"]}>
						{data.classement.toString().padStart(3, "0")}
						<span>/{maxPlace}</span>
					</div>
				</div>
			</div>
			<div className={scss["card-content"]}>
				<div className={scss["integres"]}>
					<h3>Intégrés {data.annee}</h3>
					<div className={scss["bar"]}></div>
					<div className={scss["card-icon equal-icon"]}>
						<p>
							Nombre de places: <span>{data.places}</span>
						</p>
						<IoCaretDown className={scss["card-icon up-icon"]} />
					</div>
					<div className={scss["card-icon equal-icon"]}>
						<p>
							Rang médian :{" "}
							<span>
								<span>{data.integres_rg_median}</span>
							</span>
						</p>
						<IoCaretUpOutline className={scss["card-icon up-icon"]} />
					</div>
					<div className={scss["card-icon equal-icon"]}>
						<p>
							Rang moyen: <span>{data.integres_rg_moyen}</span>
						</p>
						<GoDash className={scss["card-icon equal-icon"]} />
					</div>
					<div className={scss["card-icon equal-icon"]}>
						<p>
							% de 5/2 : <span>{data.integres_cinq_demi}%</span>
						</p>
						<GoDash className={scss["card-icon equal-icon"]} />
					</div>
					<div className={scss["integres-item"]}>
						<p>
							% de fille : <span>{data.integres_filles}%</span>
						</p>
						<GoDash className={scss["card-icon equal-icon"]} />
					</div>
				</div>
				<div className={scss["other-container"]}>
					<h3>Autre</h3>
					<div className={scss["bar"]}></div>
					<div className={scss["card-subnav-container"]}>
						<p>SubNav here</p>
					</div>
					<div className={scss["other-content"]}>
						<div className={scss["informations-container active"]}>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
								qui ex molestias repellendus, quisquam et labore explicabo
								distinctio doloribus tempora at itaque magnam reprehenderit
								earum rerum sed vitae voluptatibus. Illum?
							</p>
						</div>
						<div className={scss["graphiques-container"]}>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
								qui ex molestias repellendus, quisquam et labore explicabo
								distinctio doloribus tempora at itaque magnam reprehenderit
								earum rerum sed vitae voluptatibus. Illum? Lorem ipsum dolor,
								sit amet consectetur adipisicing elit. Ipsam laboriosam
								voluptatibus nostrum explicabo perferendis doloribus reiciendis
								enim, maiores molestias culpa facilis soluta vel vitae deserunt
								reprehenderit itaque tempora! Quis, excepturi?
							</p>
						</div>
						<div className={scss["lorem-ipsum-container"]}>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
								qui ex molestias repellendus, quisquam et labore
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

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
				{/* <ModalHeader>{school?.ecole}</ModalHeader> */}
				{/* <ModalCloseButton /> */}
				<ModalBody className={scss["modal-body"]} padding={0}>
					<SchoolCardContent
						data={{
							ecole: "Ecole polytechnique",
							classement: 1,
							places: 105,
							integres_rg_median: 81,
							integres_rg_moyen: 82,
							integres_cinq_demi: 10.5,
							integres_filles: 8.5,
							url: "https://www.google.com",
							annee: 2021,
						}}
						maxPlace={200}
					/>
				</ModalBody>
				{/* <ModalFooter>
					<Button onClick={onClose}>Close</Button>
				</ModalFooter> */}
			</ModalContent>
		</Modal>
	);
};

export default SchoolCard;
