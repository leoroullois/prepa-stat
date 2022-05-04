import { IConcours } from "@components/DashboardInfos";

export const getConcours = (concours: string | undefined): string => {
   let x = concours ?? "";
   switch (x) {
      case "banque_ens":
         return "Banque ENS";
      case "concours_ecole_polytechnique":
         return "Concours école Polytechnique";
      case "banque_centrale_supelec":
         return "Banque Centrale Supélec";
      case "concours_commun_mines_ponts":
         return "Concours Commun Mines-Ponts";
      case "concours_mines_télécom":
         return "Concours Mines Télécom";
      case "banque_epreuves_ccinp":
         return "Banque épreuves CCINP";
      case "banque_epreuves_ccinp_inter_filière":
         return "Banque épreuves CCINP inter filière";
      case "concours_commun_inp":
         return "Concours Commun INP";
      case "concours_polytech_inter_filière":
         return "Concours Polytech Inter Filière";
      case "puissance_alpha":
         return "Puissance alpha";
      case "avenir_prépas":
         return "Avenir prépas";
      case "autres_écoles_e3a":
         return "Autres écoles E3A";
      default:
         return "Error";
   }
};
export const getDashboardConcours = (concours: string): IConcours => {
   switch (concours) {
      case "banque_ens":
         return IConcours.XENS;
      case "concours_ecole_polytechnique":
         return IConcours.XENS;
      case "banque_centrale_supelec":
         return IConcours.CENTRALE;
      case "concours_commun_mines_ponts":
         return IConcours.MINES;
      case "concours_mines_télécom":
         return IConcours.MINES;
      case "banque_epreuves_ccinp":
         return IConcours.CCINP;
      case "banque_epreuves_ccinp_inter_filière":
         return IConcours.CCINP;
      case "concours_commun_inp":
         return IConcours.CCINP;
      case "concours_polytech_inter_filière":
         return IConcours.E3A;
      case "puissance_alpha":
         return IConcours.E3A;
      case "avenir_prépas":
         return IConcours.E3A;
      case "autres_écoles_e3a":
         return IConcours.E3A;
      default:
         return IConcours.E3A;
   }
};

export const matchConcours = (concours: string): string[] => {
   switch (concours) {
      case "generale":
         return ["generale"];
      case "x":
         return ["concours_ecole_polytechnique"];
      case "ens":
         return ["banque_ens"];
      case "centrale":
         return ["banque_centrale_supelec"];
      case "mines":
         return ["concours_commun_mines_ponts", "concours_mines_télécom"];
      case "e3a":
         return [
            "concours_polytech_inter_filière",
            "puissance_alpha",
            "avenir_prépas",
            "autres_écoles_e3a",
         ];
      case "ccinp":
         return [
            "banque_epreuves_ccinp",
            "banque_epreuves_ccinp_inter_filière",
            "concours_commun_inp",
         ];
      default:
         return [""];
   }
};

