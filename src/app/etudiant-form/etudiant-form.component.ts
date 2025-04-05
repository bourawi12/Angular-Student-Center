import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EtudiantService } from 'src/Service/etudiant.service';
import { GroupeService } from 'src/Service/groupe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  groupes: any[] = [];

  constructor(
    private etudiantService: EtudiantService,
    private groupeService: GroupeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadGroupes();
    this.initForm();
    const idcourant = this.activatedRoute.snapshot.params['id'];
    if (idcourant) {
      this.isEditMode = true;
      this.etudiantService.getEtudiantByID(idcourant).subscribe(etudiant => {
        this.form.patchValue(etudiant);
      });
    }
  }

  private loadGroupes() {
    this.groupeService.GetAllGroupes().subscribe(groupes => {
      this.groupes = groupes;
    });
  }

  private initForm() {
    this.form = new FormGroup({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      dateNaissance: new FormControl('', Validators.required),
      telephone: new FormControl('', Validators.required),
      groupeId: new FormControl('', Validators.required)
    });
  }

  Onsub() {
    if (this.form.valid) {
      if (this.isEditMode) {
        const updatedEtudiant = {
          id: this.activatedRoute.snapshot.params['id'],
          ...this.form.value
        };
        this.etudiantService.editEtudiant(updatedEtudiant).subscribe(() => {
          this.router.navigate(['/etudiant']);
        });
      } else {
        this.etudiantService.addEtudiant(this.form.value).subscribe(() => {
          this.router.navigate(['/etudiant']);
        });
      }
    }
  }
}