import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTabsModule, NgChartsModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Analytics & Reports</mat-card-title>
        <mat-card-subtitle>Performance Metrics</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <mat-tab-group>
          <mat-tab label="Revenue">
            <div class="chart-container">
              <canvas baseChart
                [data]="revenueData"
                [options]="chartOptions"
                [type]="'bar'">
              </canvas>
            </div>
          </mat-tab>
          <mat-tab label="Appointments">
            <div class="chart-container">
              <canvas baseChart
                [data]="appointmentsData"
                [options]="chartOptions"
                [type]="'line'">
              </canvas>
            </div>
          </mat-tab>
          <mat-tab label="Procedures">
            <div class="chart-container">
              <canvas baseChart
                [data]="proceduresData"
                [options]="chartOptions"
                [type]="'pie'">
              </canvas>
            </div>
          </mat-tab>
        </mat-tab-group>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .chart-container {
      height: 400px;
      margin: 20px;
    }
  `]
})
export class ReportsComponent {
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [12000, 19000, 15000, 17000, 22000, 20000],
      backgroundColor: '#ff4081'
    }]
  };

  appointmentsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Appointments',
      data: [65, 59, 80, 81, 56, 55],
      borderColor: '#3f51b5',
      tension: 0.1
    }]
  };

  proceduresData = {
    labels: ['Cleaning', 'Fillings', 'Root Canal', 'Crowns', 'Others'],
    datasets: [{
      data: [30, 25, 15, 20, 10],
      backgroundColor: ['#3f51b5', '#ff4081', '#4caf50', '#ffd740', '#90a4ae']
    }]
  };
}