import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RdvService } from '../../services/rdv.service';
import { PamService } from '../../services/pam.service';

@Component({
  selector: 'app-ajouter-rendezvous',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './ajouter-rendezvous.component.html',
  styleUrls: ['./ajouter-rendezvous.component.css']
})
export class AjouterRendezvousComponent implements OnInit {
  rendezvous = {
    id:0,
    date: new Date(),
    description:'',
    patientId: 0,
    dentisteId: 0,
    soinId: 0
  };

  patients: any[] = [];
  dentistes: any[] = [];
  soins: any[] = [];

  constructor(private pamService: PamService, private rdvService: RdvService, private router: Router) {
    
  }

  ngOnInit() {
    this.pamService.obtenirPatients().subscribe((data: any[]) => {
      this.patients = data;
    });

    this.pamService.obtenirDentistes().subscribe((data: any[]) => {
      this.dentistes = data;
    });

    this.rdvService.obtenirListeSoins().subscribe((data: any[]) => {
      this.soins = data;
    });

  }

  ajouterRendezVous(){
    this.rdvService.ajouterRendezVous(this.rendezvous).subscribe({
      next: (response) => {        
        this.router.navigate(['/rendezvous']);
      },
      error: (err) => {
        console.error('Erreur d\'ajout rendezvous:', err);
      }
    })
  }
}
