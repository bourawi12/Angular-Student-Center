import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/Service/member.service';
import { Member } from 'src/Modeles/Member';

@Component({
  selector: 'app-member-from',
  templateUrl: './member-from.component.html',
  styleUrls: ['./member-from.component.css']
})
export class MemberFromComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(private MS: MemberService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // 1. Recupere la route active
    const idcourant = this.activatedRoute.snapshot.params['id'];
    console.log(idcourant);

    // 2. Chercher id
    if (idcourant) {
      console.log('Je suis dans edit');
      this.isEditMode = true;

      this.MS.getMemberByID(idcourant).subscribe((member: Member) => {
        this.form = new FormGroup({
          cin: new FormControl(member.cin, Validators.required),
          name: new FormControl(member.name, Validators.required),
          type: new FormControl(member.type, Validators.required),
          created_at: new FormControl(member.created_at, Validators.required)
        });
      });
    } else {
      this.form = new FormGroup({
        cin: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
        type: new FormControl(null, Validators.required),
        created_at: new FormControl(null, Validators.required)
      });
    }
  }

  Onsub() {
    if (this.isEditMode) {
    
      const updatedMember: Member = { id: this.activatedRoute.snapshot.params['id'], ...this.form.value };
      this.MS.editMember(updatedMember).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      
      this.MS.addMember(this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}
