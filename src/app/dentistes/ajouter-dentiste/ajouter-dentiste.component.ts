import { Component } from '@angular/core';
import { PamService } from '../../services/pam.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ajouter-dentiste',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './ajouter-dentiste.component.html',
  styleUrls: ['./ajouter-dentiste.component.css']
})
export class AjouterDentisteComponent {
  dentiste = {
    id:0,
    nom:'',
    prenom:'',
    specialite:''
  };

  constructor(private pamService: PamService, private router: Router) {}

  ajouterDentiste(){
    this.pamService.ajouterDentiste(this.dentiste).subscribe(() => {
      this.router.navigate(['/dentistes']);
    })
  }
}
