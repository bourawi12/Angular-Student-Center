import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Evt } from 'src/Modeles/Evt';
import { EventService } from 'src/Service/event.service';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.css']
})
export class VisibilityComponent {
  //forçage de type => Modal 
  EventAffiche!:Evt
  constructor(public dialgRef:MatDialogRef<VisibilityComponent>,@Inject(MAT_DIALOG_DATA) data:any,private ES:EventService){
    console.log("idddddddddddddddddddddddd",5)
    this.ES.getEventByID(data).subscribe((EvtRecup)=>{
      this.EventAffiche=EvtRecup

    })


    
  }

}
