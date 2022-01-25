import React from "react";
// Redux
import { connect } from "react-redux";
import { RootState } from "../../store";
/**react-icons */
import { FaStar } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { IoCaretDown, IoCaretUpOutline } from "react-icons/io5";
import { RiExternalLinkFill } from "react-icons/ri";
/** CSS */
import "./schoolcard.css";
/**components */
import { SubNav } from "../SubNav/SubNav";
type SchoolData = {
	nom: string;
	classement: number;
	nb_places: number;
	rg_median: number;
	rg_moyen: number;
	pourcent5_2: number;
	fille: number;
	url: string;
	annee: number;
};
export interface ISchoolCardProps {
	data: SchoolData;
	maxPlace: number;
	navBar?: any;
	layout?: any;
}
export interface ISchoolCardState {}

class Presentational extends React.Component<
	ISchoolCardProps,
	ISchoolCardState
> {
	componentDidMount() {
		const link = document.querySelector(".informations") as HTMLAnchorElement;
		if (link) {
			link.classList.toggle("active");
		}
		const name = this.props.data.nom.replace(" ", "-").toLowerCase();
		const cardBlur = document.querySelector("." + name) as HTMLDivElement;
		if (cardBlur) {
			cardBlur.addEventListener("click", this.exitCard);
		}
	}
	componentWillUnmount() {
		const name = this.props.data.nom.replace(" ", "-").toLowerCase();
		const cardBlur = document.querySelector("." + name) as HTMLDivElement;
		if (cardBlur) {
			cardBlur.removeEventListener("click", this.exitCard);
		}
	}
	exitCard(e: Event) {
		const cardBlur = e.target as HTMLDivElement;
        if(cardBlur.id==="card-blur") {
            cardBlur.style.display = "none";
        }
	}
	render() {
		const color =
			this.props.navBar.darkMode === false
				? this.props.layout.mainBlack
				: this.props.layout.mainWhite;
		const bgc =
			this.props.navBar.darkMode === true
				? this.props.layout.mainBlack
				: this.props.layout.mainWhite;
		const style = { backgroundColor: bgc, color: color };
		const barStyle = { backgroundColor: color, opacity: 0.2 };
		return (
			<div
				id='card-blur'
				className={this.props.data.nom.replace(" ", "-").toLowerCase()}
			>
				<section className='school-card' style={style}>
					<div className='favorite-icon-container'>
						<FaStar className='favorite-icon' />
					</div>
					<div className='card-band'>
						<h2>Ecole polytechnique</h2>
						<a
							className='card-band-link-container'
							href={this.props.data.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							<RiExternalLinkFill className='card-band-link' />
						</a>
					</div>
					<div id='card-header'>
						<div className='card-leaderboard'>
							<div className='card-leaderboard-title'>Classement :</div>
							<div className='card-leaderboard-content'>
								{this.props.data.classement.toString().padStart(3, "0")}
								<span>/{this.props.maxPlace}</span>
							</div>
						</div>
					</div>
					<div className='card-content'>
						<div className='integres'>
							<h3>Intégrés {this.props.data.annee}</h3>
							<div className='bar' style={barStyle}></div>
							<div className='integres-item'>
								<p>
									Nombre de places: <span>{this.props.data.nb_places}</span>
								</p>
								<IoCaretDown className='card-icon down-icon' />
							</div>
							<div className='integres-item'>
								<p>
									Rang médian :{" "}
									<span>
										<span>{this.props.data.rg_median}</span>
									</span>
								</p>
								<IoCaretUpOutline className='card-icon up-icon' />
							</div>
							<div className='integres-item'>
								<p>
									Rang moyen: <span>{this.props.data.rg_moyen}</span>
								</p>
								<GoDash className='card-icon equal-icon' />
							</div>
							<div className='integres-item'>
								<p>
									% de 5/2 : <span>{this.props.data.pourcent5_2}%</span>
								</p>
								<GoDash className='card-icon equal-icon' />
							</div>
							<div className='integres-item'>
								<p>
									% de fille : <span>{this.props.data.fille}%</span>
								</p>
								<GoDash className='card-icon equal-icon' />
							</div>
						</div>
						<div className='other-container'>
							<h3>Autre</h3>
							<div className='bar' style={barStyle}></div>
							<div className='card-subnav-container'>
								<SubNav
									links={["Informations", "Graphiques", "Lorem ipsum"]}
									path={""}
									changeUrl={false}
								/>
							</div>
							<div className='other-content'>
								<div className='informations-container active'>
									<p>
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
										Sint qui ex molestias repellendus, quisquam et labore
										explicabo distinctio doloribus tempora at itaque magnam
										reprehenderit earum rerum sed vitae voluptatibus. Illum?
									</p>
								</div>
								<div className='graphiques-container'>
									<p>
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
										Sint qui ex molestias repellendus, quisquam et labore
										explicabo distinctio doloribus tempora at itaque magnam
										reprehenderit earum rerum sed vitae voluptatibus. Illum?
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Ipsam laboriosam voluptatibus nostrum explicabo perferendis
										doloribus reiciendis enim, maiores molestias culpa facilis
										soluta vel vitae deserunt reprehenderit itaque tempora!
										Quis, excepturi?
									</p>
								</div>
								<div className='lorem-ipsum-container'>
									<p>
										Lorem ipsum, dolor sit amet consectetur adipisicing elit.
										Sint qui ex molestias repellendus, quisquam et labore
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}
// ? REDUX
const mapStateToProps = (state: RootState) => {
	return {
		layout: state.layout,
		navBar: state.navBar,
	};
};

export const SchoolCard = connect(mapStateToProps, null)(Presentational);
