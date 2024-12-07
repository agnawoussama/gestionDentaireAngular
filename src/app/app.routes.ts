import { Routes } from '@angular/router';
import { AjouterPatientComponent } from './patients/ajouter-patient/ajouter-patient.component';
import { ModifierPatientComponent } from './patients/modifier-patient/modifier-patient.component';
import { AjouterDentisteComponent } from './dentistes/ajouter-dentiste/ajouter-dentiste.component';
import { ModifierDentisteComponent } from './dentistes/modifier-dentiste/modifier-dentiste.component';
import { AjouterRendezvousComponent } from './rendezvous/ajouter-rendezvous/ajouter-rendezvous.component';
import { ModifierRendezvousComponent } from './rendezvous/modifier-rendezvous/modifier-rendezvous.component';
import { Documents } from './patients/documents/documents.component';
import { ResourcesComponent } from './resources/resources.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'patients',
    loadComponent: () => import('./patients/patients.component').then(m => m.PatientsComponent)
  },
  {
    path: 'dentistes',
    loadComponent: () => import('./dentistes/dentistes.component').then(m => m.DentistesComponent)
  },
  {
    path: 'rendezvous',
    loadComponent: () => import('./rendezvous/rendezvous.component').then(m => m.RendezvousComponent)
  },
  { path: 'ajouter-patient', component: AjouterPatientComponent },  
  { path: 'modifier-patient', component: ModifierPatientComponent },
  { path: 'ajouter-dentiste', component: AjouterDentisteComponent},
  { path: 'modifier-dentiste', component: ModifierDentisteComponent},
  { path: 'ajouter-rendezvous', component: AjouterRendezvousComponent },  
  { path: 'modifier-rendezvous', component: ModifierRendezvousComponent },
  { path: 'documents', component: Documents },
  { path: 'resources', component: ResourcesComponent},
  { path: 'reports', component: ReportsComponent}
];