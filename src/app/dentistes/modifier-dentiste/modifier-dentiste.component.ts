import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PamService } from '../../services/pam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier-dentiste',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './modifier-dentiste.component.html',
  styleUrls: ['./modifier-dentiste.component.css']
})

export class ModifierDentisteComponent implements OnInit {
  dentiste = {
    id:0,
    nom:'',
    prenom:'',
    specialite:''
  };

  constructor(private pamService: PamService, private router: Router) {}

  ngOnInit(): void {
    const dentiste = this.pamService.getSelectedDentiste();

    if(dentiste){
      this.dentiste = dentiste
    }else{
      this.router.navigate(['/dentistes']);
    }
  }

  modifierDentiste(){
    this.pamService.modifierDentiste(this.dentiste).subscribe(() => {
      this.router.navigate(['/dentistes']);
    })
  }

}
