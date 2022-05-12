import { IConcours } from "@components/DashboardInfos";

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

