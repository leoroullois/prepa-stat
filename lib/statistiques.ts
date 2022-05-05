import { IConcours } from "@components/DashboardInfos";

// export const getConcours = (concours: string | undefined): string => {
//    let x = concours ?? "";
//    switch (x) {
//       case "banque_ens":
//          return "Banque ENS";
//       case "concours_ecole_polytechnique":
//          return "Concours école Polytechnique";
//       case "banque_centrale_supelec":
//          return "Banque Centrale Supélec";
//       case "concours_commun_mines_ponts":
//          return "Concours Commun Mines-Ponts";
//       case "concours_mines_télécom":
//          return "Concours Mines Télécom";
//       case "banque_epreuves_ccinp":
//          return "Banque épreuves CCINP";
//       case "banque_epreuves_ccinp_inter_filière":
//          return "Banque épreuves CCINP inter filière";
//       case "concours_commun_inp":
//          return "Concours Commun INP";
//       case "concours_polytech_inter_filière":
//          return "Concours Polytech Inter Filière";
//       case "puissance_alpha":
//          return "Puissance alpha";
//       case "avenir_prépas":
//          return "Avenir prépas";
//       case "autres_écoles_e3a":
//          return "Autres écoles E3A";
//       default:
//          return "Error";
//    }
// };
export const getDashboardConcours = (concours: string): IConcours => {
   switch (concours) {
      case "Banque Ens":
         return IConcours.XENS;
      case "Concours Ecole Polytechnique":
         return IConcours.XENS;
      case "Banque Centrale-Supelec":
         return IConcours.CENTRALE;
      case "Concours Commun Mines-Ponts":
         return IConcours.MINES;
      case "Concours Mines - Télécom":
         return IConcours.MINES;
      case "Banque Epreuves Ccinp":
         return IConcours.CCINP;
      case "Banque Epreuves Ccinp  Inter-Filière":
         return IConcours.CCINP;
      case "Concours Commun Inp":
         return IConcours.CCINP;
      case "Concours Polytech Inter-Filière":
         return IConcours.E3A;
      case "Puissance Alpha":
         return IConcours.E3A;
      case "Avenir Prépas":
         return IConcours.E3A;
      case "Autres Écoles E3A":
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
         return ["Concours Ecole Polytechnique"];
      case "ens":
         return ["Banque Ens"];
      case "centrale":
         return ["Banque Centrale-Supelec"];
      case "mines":
         return ["Concours Commun Mines-Ponts", "Concours Mines - Télécom"];
      case "e3a":
         return [
            "Concours Polytech Inter-Filière",
            "Puissance Alpha",
            "Avenir Prépas",
            "Autres Écoles E3A",
         ];
      case "ccinp":
         return [
            "Banque Epreuves Ccinp",
            "Banque Epreuves Ccinp  Inter-Filière",
            "Concours Commun Inp",
         ];
      default:
         return [""];
   }
};

