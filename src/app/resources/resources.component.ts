import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Resources Inventory</mat-card-title>
        <mat-card-subtitle>Equipment and Supplies</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <table mat-table [dataSource]="resources" class="full-width">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let resource">{{resource.name}}</td>
          </ng-container>

          <ng-container matColumnDef="category">
            <th mat-header-cell *matHeaderCellDef>Category</th>
            <td mat-cell *matCellDef="let resource">{{resource.category}}</td>
          </ng-container>

          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef>Quantity</th>
            <td mat-cell *matCellDef="let resource">{{resource.quantity}}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let resource">
              <mat-progress-bar
                [mode]="'determinate'"
                [value]="resource.status"
                [color]="resource.status < 30 ? 'warn' : 'primary'">
              </mat-progress-bar>
              {{resource.status}}%
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let resource">
              <button mat-icon-button color="primary">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="accent">
                <mat-icon>add_shopping_cart</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    table {
      width: 100%;
    }
    .mat-column-actions {
      width: 120px;
    }
    .mat-column-status {
      width: 200px;
    }
  `]
})
export class ResourcesComponent {
  displayedColumns: string[] = ['name', 'category', 'quantity', 'status', 'actions'];
  resources = [
    { name: 'Dental Chairs', category: 'Equipment', quantity: 5, status: 85 },
    { name: 'Surgical Masks', category: 'Supplies', quantity: 500, status: 25 },
    { name: 'Dental Instruments', category: 'Tools', quantity: 100, status: 60 },
  ];
}