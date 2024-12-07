import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Injectable } from '@angular/core';

import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [mode]="'side'"
          [opened]="true">
        <mat-toolbar>Tableau de bord dentaire</mat-toolbar>
        <mat-nav-list>
          <a hidden mat-list-item routerLink="/dashboard">
            <mat-icon>dashboard</mat-icon>
            <span class="nav-caption">Tableau de bord</span>
          </a>
          <a mat-list-item routerLink="/patients">
            <mat-icon>people</mat-icon>
            <span class="nav-caption">Patients</span>
          </a>
          <a mat-list-item routerLink="/dentistes">
            <mat-icon>medical_services</mat-icon>
            <span class="nav-caption">Dentistes</span>
          </a>
          <a mat-list-item routerLink="/rendezvous">
            <mat-icon>event</mat-icon>
            <span class="nav-caption">Rendez-vous</span>
          </a>
          <a hidden mat-list-item routerLink="/resources">
            <mat-icon>inventory</mat-icon>
            <span class="nav-caption">Resources</span>
          </a>
          <a hidden mat-list-item routerLink="/reports">
            <mat-icon>assessment</mat-icon>
            <span class="nav-caption">Facturation</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Gestion de clinique dentaire</span>
          <span class="toolbar-spacer"></span>
          <button mat-icon-button (click)="toggleNotifications()">
            <mat-icon>notifications</mat-icon>
            <span *ngIf="notifications.length > 0" class="badge">{{ notifications.length }}</span>
          </button>
          <div *ngIf="showNotifications && notifications.length > 0" class="notifications-list">
            <ul>
              <li *ngFor="let notification of notifications">{{ notification }}</li>
            </ul>
          </div>
          <button hidden mat-icon-button>
            <mat-icon>account_circle</mat-icon>
          </button>
        </mat-toolbar>
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container {
      height: 100%;
    }
    .sidenav {
      width: 250px;
    }
    .nav-caption {
      margin-left: 16px;
    }
    .toolbar-spacer {
      flex: 1 1 auto;
    }
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .container {
      padding: 20px;
    }

    .badge {
      color: #ffff27;
      border-radius: 50%;
      padding: 0.2em 0.6em;
      font-size: 0.8em;
      position: absolute;
      top: 5px;
      right: -13px;
    }

    .notifications-list {
      position: absolute;
      top: 50px;
      right: 19px;
      width: 400px;
      max-height: 300px;
      overflow-y: auto;
      background: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      padding: 10px;
      z-index: 1000;
    }

    .notifications-list ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .notifications-list li {
      margin: 5px 0;
      padding: 5px;
      border-bottom: 1px solid #ddd;
    }

    .notifications-list li:last-child {
      border-bottom: none;
    }

    .ng-star-inserted{
      color: black;
    }
  `]
})

export class AppComponent implements OnInit, OnDestroy {
  notifications: string[] = [];
  showNotifications = false;

  private stompClient: Client | null = null;
  private serverUrl = 'ws://127.0.0.1:15674/ws'; 

  ngOnInit() {
    console.log('AppComponent initialized');
    this.connectToRabbitMQ();
  }

  connectToRabbitMQ() {
    this.stompClient = new Client({
      brokerURL: this.serverUrl,
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected to RabbitMQ via STOMP', frame);
      this.subscribeToNotifications();
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP error:', frame.headers['message']);
    };

    this.stompClient.activate();
  }

  subscribeToNotifications() {
    if (this.stompClient) {
      console.log(this.stompClient)
      this.stompClient.subscribe('/exchange/notifications/notifications.#', (message) => {
        const notification = message.body;+
        console.log('Received notification:', notification);
        this.notifications.push(notification);
      });
    }
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  ngOnDestroy() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }
}