export interface Etudiant {
    id: string;
    nom: string;
    prenom: string;
    dateNaissance: Date;
    email: string;
    telephone: string;
    adresse: string;
    niveau: string;
    specialite: string;
    groupeId: string;
    coursInscrits: string[]; // IDs of enrolled courses
    dateInscription: Date;
}