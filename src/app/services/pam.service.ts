import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface Patient{
  id:number;
  nom: string;
  prenom: string;
  age: number;
  derniereVisite: string;
}

export interface Dentiste{
  id:number;
  nom:string;
  prenom:string;
  specialite:string;
}


export interface DocumentDTO{
  id:number;
  nom:String;
  categorieNom:string;
  cheminDocument: string;
  PatientId: string;
}


@Injectable({
  providedIn: 'root'
})
export class PamService {
  private urlPatients: string = "http://localhost:5264/api/patients";
  private urlDentistes: string = "http://localhost:5264/api/dentistes";

  //Patients Service
  constructor(private http: HttpClient) { }

  obtenirPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.urlPatients}`);
  }

  obtenirPatient(id: string): Observable<any> {
    return this.http.get(`${this.urlPatients}/${id}`);
  }

  ajouterPatient(patient: Patient): Observable<Patient>{
    return this.http.post<Patient>(this.urlPatients,patient);
  }

  modifierPatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.urlPatients}`, patient);
  }

  supprimerPatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlPatients}/${id}`);
  }

  private selectedPatient: Patient | null = null;

  setSelectedPatient(patient: Patient): void {
    this.selectedPatient = patient;
  }

  getSelectedPatient(): Patient | null {
    return this.selectedPatient;
  }

  clearSelectedPatient(): void {
    this.selectedPatient = null;
  }


  //Medecins Service
  obtenirDentistes(): Observable<Dentiste[]> {
    return this.http.get<Dentiste[]>(`${this.urlDentistes}`);
  }

  obtenirDentiste(id: string): Observable<any> {
    return this.http.get(`${this.urlDentistes}/${id}`);
  }
  
  ajouterDentiste(dentiste: Dentiste):Observable<Dentiste>{
    return this.http.post<Dentiste>(this.urlDentistes,dentiste);
  }

  modifierDentiste(dentiste: Dentiste):Observable<Dentiste>{
    return this.http.put<Dentiste>(this.urlDentistes,dentiste);
  }

  supprimerDentiste(id: number):Observable<void>{
    return this.http.delete<void>(`${this.urlDentistes}/${id}`);
  }

  private selectedDentiste: Dentiste | null = null;

  setSelectedDentiste(dentiste: Dentiste): void{
    this.selectedDentiste = dentiste;
  }

  getSelectedDentiste(): Dentiste | null{
    return this.selectedDentiste;
  }

  clearSelectedDentiste(): void{
    this.selectedDentiste = null;
  }

}


