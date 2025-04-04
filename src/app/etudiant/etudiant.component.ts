import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/Service/etudiant.service';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Etudiant } from 'src/Modeles/Etudiant';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  dataSource:Etudiant[] = [
    
  ];
  //appeler le service EtudiantService
  //injection de dependances : mecanisme permet de injecter le service dans un composant
  //Service dans le composant
  constructor(private ES:EtudiantService,private dialog:MatDialog){
    
  } 
  //nkhaliw lcode fel ngOnInit moouch fel constructor bech yetloadi asra3 
  ngOnInit(): void {
    this.ES.GetAllEtudiants().subscribe((a)=>{
      this.dataSource=a
    })
}


  displayedColumns: string[] = ['id', 'nom','prenom','dateNaissance', 'telephone','groupe', 'date_inscription', 'edit&delete'];

  // Edit element function
  editElement(element: any) {
    console.log('Edit', element);
  }

  deleteElement(element: Etudiant) {

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = element.id; // Convert id to a number (if necessary)
        
        // Call the service to delete the element
        this.ES.deleteElement(id).subscribe(
          () => {
            // Update the dataSource by filtering out the deleted element
            this.dataSource = this.dataSource.filter(etudiant => etudiant.id !== id);
            console.log('Deleted etudiant with id', id);
          },
          (error) => {
            console.error('Error deleting etudiant:', error);
          }
        );
      }
    });

    
  }
  // Add new etudiant function
  addEtudiant(newEtudiant: Etudiant) {
    this.ES.addEtudiant(newEtudiant).subscribe((createdEtudiant) => {
      this.dataSource.push(createdEtudiant);
      this.dataSource = [...this.dataSource]; // Update the dataSource
      console.log('Added etudiant', createdEtudiant);
    });
  
  
}}