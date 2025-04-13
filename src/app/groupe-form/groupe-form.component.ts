import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupeService } from 'src/Service/groupe.service';
import { ProfesseurService } from 'src/Service/professeur.service';
import { Groupe } from 'src/Modeles/Groupe';
import { Professeur } from 'src/Modeles/Professeur';

@Component({
  selector: 'app-groupe-form',
  templateUrl: './groupe-form.component.html',
  styleUrls: ['./groupe-form.component.css']
})
export class GroupeFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  professeurs: Professeur[] = [];

  constructor(
    private fb: FormBuilder,
    private groupeService: GroupeService,
    private professeurService: ProfesseurService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadProfesseurs();
    this.initForm();
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.isEditMode = true;
      this.groupeService.getGroupeByID(id).subscribe(groupe => {
        this.form.patchValue(groupe);
      });
    }
  }

  private loadProfesseurs() {
    this.professeurService.getAllProfesseurs().subscribe(
      profs => this.professeurs = profs
    );
  }

  private initForm() {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      niveau: ['', Validators.required],
      specialite: ['', Validators.required],
      anneeScolaire: ['', [Validators.required, Validators.pattern(/^\d{4}\/\d{4}$/)]],
      professeurPrincipal: ['', Validators.required],
      capaciteMax: ['', [Validators.required, Validators.min(1), Validators.max(50)]]
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
