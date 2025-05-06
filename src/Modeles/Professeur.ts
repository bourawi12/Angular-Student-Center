export interface Professeur {
    id: string;
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
    
    email: string;
    cin: string;
    specialite: string;
    coursDonnes: string[]; // Array of course IDs
    dateCreation?: Date;
}