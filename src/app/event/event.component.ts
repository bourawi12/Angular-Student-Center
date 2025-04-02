import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'; // Ensure this is imported
import { Evt } from 'src/Modeles/Evt';
import { EventService } from 'src/Service/event.service'; // Corrected the import path
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalEvtComponent } from '../modal-evt/modal-evt.component';
import { VisibilityComponent } from '../visibility/visibility.component';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Evt> = new MatTableDataSource<Evt>([]); // Initialize with empty array
  displayedColumns: string[] = ['id', 'title', 'dateDebut', 'dateFin', 'Lieu','6'];

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(private ES: EventService ,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.fetchData(); 
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchData(): void {
    this.ES.GetAllEvents().subscribe(
      (data) => {
        this.dataSource.data = data; // Set the data correctly
      },
      (error) => {
        console.error('Error fetching event data', error);
      }
    );
  }

  deleteEvent(element: Evt): void {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
      width: '300px',
    });

    // Handle the dialog result
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const id = element.id; // Get the ID of the element to delete

        // Call the service to delete the element
        this.ES.deleteEvent(id).subscribe(
          () => {
            // Update the dataSource by filtering out the deleted element
            this.dataSource.data = this.dataSource.data.filter((event) => event.id !== id);
            console.log('Deleted event with id', id);
          },
          (error) => {
            console.error('Error deleting event:', error);
          }
        );
      }
    });
  } 

  editEvent(id:String){
    const dialogConfig = new MatDialogConfig();
    //recupere event by ID
    this.ES.getEventByID(id).subscribe((Evtrecupere)=>{
      // remplir les donnes 
      dialogConfig.data=Evtrecupere
      let dialogRef=this.dialog.open(ModalEvtComponent,dialogConfig)
      dialogRef.afterClosed().subscribe((x)=>{
        if(x){
          this.ES.updateEvt(id,x).subscribe(()=>{
            this.fetchData()
          })
        }
      })
    })
    //envoyer event vers la boite 
    //ouvrir la boite 
  }
 



  // Method to open the dialog for adding a new event
  open(): void {
    const dialogRef = this.dialog.open(ModalEvtComponent, {
      width: '250px',
      data: {} // Pass any initial data if needed
    });

    // Handle dialog closing
    dialogRef.afterClosed().subscribe((result) => {
      console.log('La boîte de dialogue a été fermée');

      if (result) {
        // Call the service to add the new event
        this.ES.addEvent(result).subscribe(
          (response) => {
            console.log('Événement ajouté avec succès:', response);
            this.fetchData(); // Refresh the data after adding the event
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'événement:', error);
          }
        );
    
      }
    });
  }

  toggleVisibility(id: String) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data=id
    let dialogRef= this.dialog.open(VisibilityComponent,dialogConfig )
    
    
  }





}


  
