import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupeService } from 'src/Service/groupe.service';
import { Groupe } from 'src/Modeles/Groupe';

@Component({
  selector: 'app-groupe-form',
  templateUrl: './groupe-form.component.html',
  styleUrls: ['./groupe-form.component.css']
})
export class GroupeFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  professeurs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private groupeService: GroupeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.isEditMode = true;
      this.groupeService.getGroupeByID(id).subscribe(groupe => {
        this.form.patchValue(groupe);
      });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      anneeScolaire: ['', Validators.required],
      professeurPrincipal: [''],
      capaciteMax: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const groupe: Groupe = {
        ...this.form.value,
        id: this.isEditMode ? this.route.snapshot.params['id'] : null,
        etudiants: this.isEditMode ? this.form.value.etudiants : []
      };

      const request = this.isEditMode ? 
        this.groupeService.editGroupe(groupe) :
        this.groupeService.addGroupe(groupe);

      request.subscribe(() => {
        this.router.navigate(['/groupes']);
      });
    }
  }
}
