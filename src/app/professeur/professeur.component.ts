import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfesseurService } from 'src/Service/professeur.service';
import { Professeur } from 'src/Modeles/Professeur';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.css']
})
export class ProfesseurComponent implements OnInit {
  dataSource: Professeur[] = [];
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'specialite', 'telephone', 'actions'];

  constructor(
    private professeurService: ProfesseurService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProfesseurs();
  }

  loadProfesseurs() {
    this.professeurService.getAllProfesseurs().subscribe({
      next: (professeurs) => {
        this.dataSource = professeurs;
      },
      error: (error) => {
        console.error('Error loading professors:', error);
      }
    });
  }

  deleteProfesseur(professeur: Professeur) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmation',
        message: `Voulez-vous vraiment supprimer le professeur ${professeur.nom} ${professeur.prenom}?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.professeurService.deleteProfesseur(professeur.id).subscribe({
          next: () => {
            this.dataSource = this.dataSource.filter(p => p.id !== professeur.id);
          },
          error: (error) => {
            console.error('Error deleting professor:', error);
          }
        });
      }
    });
  }
}
