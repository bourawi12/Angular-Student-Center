import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/Service/member.service';
import {Member} from 'src/Modeles/Member';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  dataSource:Member[] = [
    
  ];
  //appeler le service MemberService
  //injection de dependances : mecanisme permet de injecter le service dans un composant
  //Service dans le composant
  constructor(private MS:MemberService,private dialog:MatDialog){
    
  } 
  //nkhaliw lcode fel ngOnInit moouch fel constructor bech yetloadi asra3 
  ngOnInit(): void {
    this.MS.GetAllMembers().subscribe((a)=>{
      this.dataSource=a
    })
}


  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'created_at', 'edit&delete'];

  // Edit element function
  editElement(element: any) {
    console.log('Edit', element);
  }

  deleteElement(element: Member) {

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = element.id; // Convert id to a number (if necessary)
        
        // Call the service to delete the element
        this.MS.deleteElement(id).subscribe(
          () => {
            // Update the dataSource by filtering out the deleted element
            this.dataSource = this.dataSource.filter(member => member.id !== id);
            console.log('Deleted member with id', id);
          },
          (error) => {
            console.error('Error deleting member:', error);
          }
        );
      }
    });

    
  }
  // Add new member function
  addMember(newMember: Member) {
    this.MS.addMember(newMember).subscribe((createdMember) => {
      this.dataSource.push(createdMember);
      this.dataSource = [...this.dataSource]; // Update the dataSource
      console.log('Added member', createdMember);
    });
  
  
}}
