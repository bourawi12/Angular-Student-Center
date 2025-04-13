import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesseurService } from 'src/Service/professeur.service';
import { Professeur } from 'src/Modeles/Professeur';

@Component({
  selector: 'app-professeur-form',
  templateUrl: './professeur-form.component.html',
  styleUrls: ['./professeur-form.component.css']
})
export class ProfesseurFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private professeurService: ProfesseurService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    const id = this.route.snapshot.params['id'];
    
    if (id) {
      this.isEditMode = true;
      this.professeurService.getProfesseurByID(id).subscribe(professeur => {
        this.form.patchValue(professeur);
      });
    }
  }

  private initForm() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      adresse: [''],
      specialite: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const professeur: Professeur = {
        ...this.form.value,
        id: this.isEditMode ? this.route.snapshot.params['id'] : null,
        coursDonnes: this.isEditMode ? this.form.value.coursDonnes : []
      };

      const request = this.isEditMode ? 
        this.professeurService.editProfesseur(professeur) :
        this.professeurService.addProfesseur(professeur);

      request.subscribe(() => {
        this.router.navigate(['/professeurs']);
      });
    }
  }
}
