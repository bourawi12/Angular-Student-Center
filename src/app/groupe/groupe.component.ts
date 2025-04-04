import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Groupe } from 'src/Modeles/Groupe';
import { GroupeService } from 'src/Service/groupe.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {
  dataSource: Groupe[] = [];
  displayedColumns: string[] = [
    'id', 
    'nom', 
    'niveau', 
    'specialite', 
    'anneeScolaire', 
    'capaciteMax', 
    'actions'
  ];

  constructor(
    private groupeService: GroupeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadGroupes();
  }

  loadGroupes() {
    this.groupeService.GetAllGroupes().subscribe(groupes => {
      this.dataSource = groupes;
    });
  }

  deleteElement(element: Groupe) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupeService.deleteGroupe(element.id).subscribe(() => {
          this.dataSource = this.dataSource.filter(groupe => groupe.id !== element.id);
        });
      }
    });
  }
}
