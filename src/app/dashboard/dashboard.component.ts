import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatGridListModule, NgChartsModule],
  template: `
    <div class="dashboard-container">
      <mat-grid-list cols="4" rowHeight="150px" gutterSize="16">
        <mat-grid-tile>
          <mat-card class="dashboard-card stats-card">
            <mat-card-content>
              <mat-icon color="primary">people</mat-icon>
              <h2>Nombre total de patients</h2>
              <h3>1,234</h3>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card class="dashboard-card stats-card">
            <mat-card-content>
              <mat-icon color="accent">medical_services</mat-icon>
              <h2>Dentistes actifs</h2>
              <h3>42</h3>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card class="dashboard-card stats-card">
            <mat-card-content>
              <mat-icon color="warn">event</mat-icon>
              <h2>Rendez-vous d'aujourd'hui</h2>
              <h3>28</h3>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
        <mat-grid-tile>
          <mat-card class="dashboard-card stats-card">
            <mat-card-content>
              <mat-icon color="primary">inventory</mat-icon>
              <h2>Resources</h2>
              <h3>156</h3>
            </mat-card-content>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>

      <div class="charts-row">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Aperçu des rendez-vous</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <canvas baseChart
              [data]="appointmentsData"
              [options]="chartOptions"
              [type]="'line'">
            </canvas>
          </mat-card-content>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>Analyse des revenus</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <canvas baseChart
              [data]="revenueData"
              [options]="chartOptions"
              [type]="'bar'">
            </canvas>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    .charts-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-top: 20px;
    }

    .stats-card {
      width: 90%;
      height: 90%;
    }
    .stats-card h2 {
      margin: 10px 0 5px;
      font-size: 1.1rem;
    }
    .stats-card h3 {
      margin: 0;
      font-size: 1.8rem;
      font-weight: bold;
    }
  `]
})
export class DashboardComponent {
  appointmentsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Appointments',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: '#3f51b5',
      tension: 0.1
    }]
  };

  revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [50, 40, 40, 20, 40, 40],
      backgroundColor: '#ff4081'
    }]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
}