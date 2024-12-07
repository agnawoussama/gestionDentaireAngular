import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PamService } from '../services/pam.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RdvService, RendezVous } from '../services/rdv.service';


@Component({
  selector: 'app-rendezvous',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule,MatDialogModule],
  template: `
    <mat-card>
      <div id="myCardHeader">
        <mat-card-header>
          <mat-card-title>Liste des rendezvous</mat-card-title>
          <mat-card-subtitle>Gérez vos rendezvous</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="ajouterRendezVous()" >Ajouter un RendezVous</button>
        </mat-card-actions>
      </div>
      <mat-card-content>
        <table mat-table [dataSource]="listerendezvous" class="full-width">
          <ng-container hidden matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let rendezvous">{{rendezvous.id}}</td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let rendezvous">{{ rendezvous.date }}</td>
          </ng-container>

          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let rendezvous">{{rendezvous.description}}</td>
          </ng-container>

          <ng-container matColumnDef="patient">
            <th mat-header-cell *matHeaderCellDef>Patient</th>
            <td mat-cell *matCellDef="let rendezvous">{{rendezvous.patient.nom}}</td>
          </ng-container>

          <ng-container matColumnDef="dentiste">
            <th mat-header-cell *matHeaderCellDef>Dentiste</th>
            <td mat-cell *matCellDef="let rendezvous">{{rendezvous.dentiste.nom}}</td>
          </ng-container>

          <ng-container matColumnDef="soin">
            <th mat-header-cell *matHeaderCellDef>Soin</th>
            <td mat-cell *matCellDef="let rendezvous">{{rendezvous.soin.type}}</td>
          </ng-container>


          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let rendezvous">
              <button mat-icon-button color="primary" (click)="navigateToEdit(rendezvous)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="ouvrirConfirmationSuppression(rendezvous.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>

      <!-- Modal de confirmation de suppression -->
      <ng-template #confirmationDialog aria-modal="true">
        <h2 mat-dialog-title>Confirmer la Suppression</h2>
        <mat-dialog-content>Êtes-vous sûr de vouloir supprimer ce rendezvous ?      
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



export class RendezvousComponent implements OnInit{
  constructor(private rdvService: RdvService, private pamService: PamService, private router: Router, private dialog: MatDialog){}
  
  @ViewChild('confirmationDialog') confirmationDialog: any;
  rendezVousASupprimer: number | null = null;

  displayedColumns: string[] = ['date', 'description', 'patient','dentiste','soin', 'actions'];
  listerendezvous : any[] = [];

  ngOnInit(): void {
    this.chargerListeRendezVous();  
  }

  chargerListeRendezVous() {
    this.rdvService.obtenirListeRendezVous().subscribe(listerendezvous =>{
      this.listerendezvous = listerendezvous;
      console.log(this.listerendezvous);
    });   
  }

  ajouterRendezVous(){
    this.router.navigate(['/ajouter-rendezvous'])
  }

  navigateToEdit(rendezvous: RendezVous){
    this.rdvService.setSelectedRendezVous(rendezvous);
    this.router.navigate(['/modifier-rendezvous'])
  }

  supprimerRendezVous(id: number){
    this.rdvService.supprimerRendezVous(id).subscribe(() => {
      this.chargerListeRendezVous();
    })
  }


  ouvrirConfirmationSuppression(id: number) {
    this.rendezVousASupprimer = id;
    this.dialog.open(this.confirmationDialog);
  }

  fermerDialog() {
    this.dialog.closeAll();
  }

  confirmerSuppression() {
    if (this.rendezVousASupprimer !== null) {
      this.rdvService.supprimerRendezVous(this.rendezVousASupprimer).subscribe(() => {
        this.chargerListeRendezVous();
        this.fermerDialog();
      });
    }
  }
}