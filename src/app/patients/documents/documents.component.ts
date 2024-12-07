import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PamService } from '../../services/pam.service';
import { Router } from '@angular/router';
import { DocService } from '../../services/doc.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class Documents implements OnInit {
  documents: any[] = [];

  patient: any;
  categorie: any;

  constructor(private docService: DocService,private pamService: PamService,private router: Router) {}

  ngOnInit(): void {
    const patient = this.pamService.getSelectedPatient();
    if (patient) {
      this.patient = patient;
      this.chargerDocumentsPatient();
    } else {
      this.router.navigate(['/patients']); 
    }
  }

  chargerDocumentsPatient() {
    this.docService.obtenirDocuments(this.patient.id).subscribe(documents =>{
      console.log(documents);
      this.documents = documents;
    });   
  }

  telechargerDocument(doc: any): void {
    this.docService.downloadDocument(doc.patientId,doc.nom).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a'); 
        a.href = url;
        a.download = doc.nom; 
        a.click();
        window.URL.revokeObjectURL(url);
        console.log(`Téléchargement réussi: ${doc.nom}`);
      },
      (error) => {
        console.error('Erreur lors du téléchargement', error);
      }
    );
  }


}
