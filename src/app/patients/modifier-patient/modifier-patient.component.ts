import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PamService } from '../../services/pam.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modifier-patient',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './modifier-patient.component.html',
  styleUrls: ['./modifier-patient.component.css']
})
export class ModifierPatientComponent implements OnInit {
  patient = {
    id: 0,
    nom: '',
    prenom: '',
    age: 0,
    derniereVisite: ''
  };

  constructor(
    private pamService: PamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const patient = this.pamService.getSelectedPatient();
    if (patient) {
      this.patient = patient;
    } else {
      this.router.navigate(['/patients']); 
    }
  }

  modifierPatient() {
    this.pamService.modifierPatient(this.patient).subscribe(() => {
      this.router.navigate(['/patients']);
    });
  }
}