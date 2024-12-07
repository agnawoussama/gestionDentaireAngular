import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Dentiste, PamService } from '../services/pam.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dentistes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule,MatDialogModule],
  template: `
    <mat-card>
      <div id="myCardHeader">
        <mat-card-header>
          <mat-card-title>Liste des dentistes</mat-card-title>
          <mat-card-subtitle>Gérez vos dentistes</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="ajouterDentiste()" >Ajouter un Dentiste</button>
        </mat-card-actions>
      </div>
      <mat-card-content>
        <table mat-table [dataSource]="dentistes" class="full-width">
          <ng-container hidden matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let dentiste">{{dentiste.id}}</td>
          </ng-container>

          <ng-container matColumnDef="nom">
            <th mat-header-cell *matHeaderCellDef>Nom</th>
            <td mat-cell *matCellDef="let dentiste">{{dentiste.nom}}</td>
          </ng-container>

          <ng-container matColumnDef="prenom">
            <th mat-header-cell *matHeaderCellDef>Prenom</th>
            <td mat-cell *matCellDef="let dentiste">{{dentiste.prenom}}</td>
          </ng-container>

          <ng-container matColumnDef="specialite">
            <th mat-header-cell *matHeaderCellDef>Specialite</th>
            <td mat-cell *matCellDef="let dentiste">{{dentiste.specialite}}</td>
          </ng-container>


          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let dentiste">
              <button mat-icon-button color="primary" (click)="navigateToEdit(dentiste)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="ouvrirConfirmationSuppression(dentiste.id)">
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
        <mat-dialog-content>Êtes-vous sûr de vouloir supprimer ce dentiste ?      
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


export class DentistesComponent implements OnInit{
  constructor(private pamService: PamService, private router: Router, private dialog: MatDialog){}
  
  @ViewChild('confirmationDialog') confirmationDialog: any;
  dentisteASupprimer: number | null = null;

  displayedColumns: string[] = ['nom', 'prenom', 'specialite', 'actions'];
  dentistes : any[] = [];

  ngOnInit(): void {
    this.chargerDentists();
  }

  chargerDentists() {
    this.pamService.obtenirDentistes().subscribe(dentistes =>{
      console.log(dentistes);
      this.dentistes = dentistes;
    });   
  }

  ajouterDentiste(){
    this.router.navigate(['/ajouter-dentiste'])
  }

  navigateToEdit(densiste: Dentiste){
    this.pamService.setSelectedDentiste(densiste);
    this.router.navigate(['/modifier-dentiste'])
  }

  supprimerDentiste(id: number){
    this.pamService.supprimerDentiste(id).subscribe(() => {
      this.chargerDentists();
    })
  }

  ouvrirConfirmationSuppression(id: number) {
    this.dentisteASupprimer = id;
    this.dialog.open(this.confirmationDialog);
  }

  fermerDialog() {
    this.dialog.closeAll();
  }

  confirmerSuppression() {
    if (this.dentisteASupprimer !== null) {
      this.pamService.supprimerDentiste(this.dentisteASupprimer).subscribe(() => {
        this.chargerDentists();
        this.fermerDialog();
      });
    }
  }
}