import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'; 
import { PamService, Patient } from '../services/pam.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule, MatIconModule,MatDialogModule],
  template: `
    <mat-card>
      <div id="myCardHeader">
      <mat-card-header>
        <mat-card-title>Liste des patients</mat-card-title>
        <mat-card-subtitle>Gérez vos patients</mat-card-subtitle>
      </mat-card-header>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="ajouterPatient()" >Ajouter un Patient</button>
      </mat-card-actions>
      </div>
      <mat-card-content>
        <table mat-table [dataSource]="patients" class="full-width">
          <ng-container hidden matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let patient">{{patient.id}}</td>
          </ng-container>

          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let patient">{{patient.nom}}</td>
          </ng-container>

          <ng-container matColumnDef="prenom">
            <th mat-header-cell *matHeaderCellDef>Prenom</th>
            <td mat-cell *matCellDef="let patient">{{patient.prenom}}</td>
          </ng-container>

          <ng-container matColumnDef="age">
            <th mat-header-cell *matHeaderCellDef>Age</th>
            <td mat-cell *matCellDef="let patient">{{patient.age}}</td>
          </ng-container>

          <ng-container matColumnDef="derniereVisite">
            <th mat-header-cell *matHeaderCellDef>Derniere Visite</th>
            <td mat-cell *matCellDef="let patient">{{patient.derniereVisite}}</td>
          </ng-container>

          <ng-container matColumnDef="documents">
            <th mat-header-cell *matHeaderCellDef>Documents</th>
            <td mat-cell *matCellDef="let patient">
              <button mat-icon-button color="primary" (click)="navigateToDocuments(patient)">
                <mat-icon>description</mat-icon>
              </button>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let patient">
            <button mat-icon-button color="primary" (click)="navigateToEdit(patient)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="ouvrirConfirmationSuppression(patient.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
      
      <!-- Modal de confirmation de suppression -->
      <ng-template #confirmationDialog>
        <h2 mat-dialog-title>Confirmer la Suppression</h2>
        <mat-dialog-content>Êtes-vous sûr de vouloir supprimer ce patient ?      
        </mat-dialog-content>
        <div class="divDialogConfirmationAnnuler">
          <mat-dialog-actions>
            <button mat-button (click)="fermerDialog()">Annuler</button>
            <button mat-button color="warn" (click)="confirmerSuppression()">Supprimer</button>
          </mat-dialog-actions>
        </div>
      </ng-template>
    </mat-card>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .mat-column-actions {
      width: 120px;
    }
    #myCardHeader{
      display: flex;
      justify-content: space-between;
    }
    .divDialogConfirmationAnnuler{
      padding: 0px 20px 10px 20px;
    }
  `]
})
export class PatientsComponent implements OnInit{
  @ViewChild('confirmationDialog') confirmationDialog: any;
  patientASupprimer: number | null = null;

  ouvrirConfirmationSuppression(id: number) {
    this.patientASupprimer = id;
    this.dialog.open(this.confirmationDialog);
  }

  fermerDialog() {
    this.dialog.closeAll();
  }

  confirmerSuppression() {
    if (this.patientASupprimer !== null) {
      this.pamService.supprimerPatient(this.patientASupprimer).subscribe(() => {
        this.chargetPatients();
        this.fermerDialog();
      });
    }
  }

  constructor(private pamService: PamService, private router: Router, private dialog: MatDialog){}

  displayedColumns: string[] = ['nom','prenom', 'age','derniereVisite','documents', 'actions'];
  patients : any[] = [];

  ngOnInit(): void {
    this.chargetPatients();
  }

  chargetPatients() {
    this.pamService.obtenirPatients().subscribe(data => {
      console.log(data);
      this.patients = data;
    });
  }

  ajouterPatient() {
    this.router.navigate(['/ajouter-patient'])
  }

  navigateToEdit(patient: Patient) {
    this.pamService.setSelectedPatient(patient); 
    this.router.navigate(['/modifier-patient']);
  }

  navigateToDocuments(patient: Patient){
    this.pamService.setSelectedPatient(patient); 
    this.router.navigate(['/documents']);
  }

  supprimerPatient(id: number) {
    this.pamService.supprimerPatient(id).subscribe(() => {
      this.chargetPatients();
    });
  }
}