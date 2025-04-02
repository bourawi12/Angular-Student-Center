import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evt } from 'src/Modeles/Evt';
import { EventService } from 'src/Service/event.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-modal-evt',
  templateUrl: './modal-evt.component.html',
  styleUrls: ['./modal-evt.component.css']
})
export class ModalEvtComponent  {

  //forçcage de type => boite de dialogue
  constructor(private ES: EventService,public dialogRef:MatDialogRef<ModalEvtComponent>,@Inject(MAT_DIALOG_DATA) data:any){
    if(data){
      console.log('data reçu',data)
      this.form = new FormGroup({
        title : new FormControl(data.title),
        dateDebut : new FormControl(data.dateDebut),
        dateFin : new FormControl(data.dateFin),
        Lieu : new FormControl(data.Lieu),
      })
      
    }
  }
  //declaration de form 
  form!:FormGroup;
  
  // save et close 
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
      this.dialogRef.close();
  }


}
