// Nouvelle Page : Ajouter un Patient
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PamService } from '../../services/pam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './ajouter-patient.component.html',
  styleUrls: ['./ajouter-patient.component.css']
})
export class AjouterPatientComponent {
  patient = {
    id:0,
    nom: '',
    prenom: '',
    age: 0,
    derniereVisite: ''
  };

  constructor(private pamService: PamService, private router: Router) {}

  ajouterPatient() {
    this.pamService.ajouterPatient(this.patient).subscribe(() => {
      this.router.navigate(['/patients']);
    });
  }

  
}
