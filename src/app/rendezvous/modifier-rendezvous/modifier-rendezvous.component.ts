import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PamService } from '../../services/pam.service';
import { Router } from '@angular/router';
import { RdvService } from '../../services/rdv.service';

@Component({
  selector: 'app-modifier-rendezvous',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './modifier-rendezvous.component.html',
  styleUrls: ['./modifier-rendezvous.component.css']
})
export class ModifierRendezvousComponent implements OnInit {
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

  constructor(private pamService: PamService,private rdvService: RdvService, private router: Router) {
    
  }
  ngOnInit(): void {
    const rendezvous = this.rdvService.getSelectedRendezVous();

    this.pamService.obtenirPatients().subscribe((data: any[]) => {
      this.patients = data;
    });

    this.pamService.obtenirDentistes().subscribe((data: any[]) => {
      this.dentistes = data;
    });

    this.rdvService.obtenirListeSoins().subscribe((data: any[]) => {
      this.soins = data;
    });
    
    if(rendezvous){
      this.rendezvous = rendezvous
    }else{
      this.router.navigate(['/rendezvous']);
    }
  }

  modifierRendezVous(){
    this.rdvService.modifierRendezVous(this.rendezvous).subscribe(() => {
      this.router.navigate(['/rendezvous']);
    })
  }

  
}
