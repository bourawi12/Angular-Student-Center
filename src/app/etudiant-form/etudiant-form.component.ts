import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudiantService } from 'src/Service/etudiant.service';
import { Etudiant } from 'src/Modeles/Etudiant';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;

  constructor(
    private etudiantService: EtudiantService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idcourant = this.activatedRoute.snapshot.params['id'];

    if (idcourant) {
      this.isEditMode = true;
      this.etudiantService.getEtudiantByID(idcourant).subscribe((etudiant: Etudiant) => {
        this.initForm(etudiant);
      });
    } else {
      this.initForm();
    }
  }

  private initForm(etudiant?: Etudiant) {
    this.form = new FormGroup({
      nom: new FormControl(etudiant?.nom || null, Validators.required),
      prenom: new FormControl(etudiant?.prenom || null, Validators.required),
      dateNaissance: new FormControl(etudiant?.dateNaissance || null, Validators.required),
      telephone: new FormControl(etudiant?.telephone || null, Validators.required)
    });
  }

  Onsub(): void {
    if (this.form.valid) {
      if (this.isEditMode) {
        const updatedEtudiant: Etudiant = { 
          id: this.activatedRoute.snapshot.params['id'], 
          ...this.form.value 
        };
        this.etudiantService.editEtudiant(updatedEtudiant).subscribe({
          next: () => this.router.navigate(['/etudiants']),
          error: (error: any) => console.error('Error updating student:', error)
        });
      } else {
        this.etudiantService.addEtudiant(this.form.value).subscribe({
          next: () => this.router.navigate(['/etudiants']),
          error: (error: any) => console.error('Error adding student:', error)
        });
      }
    }
  }
}