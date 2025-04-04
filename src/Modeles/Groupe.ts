export interface Groupe {
    id: string;
    nom: string;
    niveau: string;
    specialite: string;
    anneeScolaire: string;
    professeurPrincipal: string; // ID of main professor
    etudiants: string[]; // Array of student IDs
    //emploiDuTemps: EmploiDuTemps[];
    capaciteMax: number;
}