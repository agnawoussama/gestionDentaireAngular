import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export interface Soin{
  id:number;
  type:string;
  description:string;
}

export interface RendezVous{
  id:number;
  date:Date;
  description:string;
  patient?: any;
  dentiste?: any;
  soin?: any;
  patientId: number;
  dentisteId: number;
  soinId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RdvService {
  private urlRendezVous: string = "http://localhost:5264/api/rendezvous";
  private urlSoins: string = "http://localhost:5264/api/soins";

  constructor(private http: HttpClient) { }

  //RendezVous Service
  obtenirListeRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.urlRendezVous}`);
  }

  obtenirRendezVous(id: string): Observable<any> {
    return this.http.get(`${this.urlRendezVous}/${id}`);
  }
  
  ajouterRendezVous(rendezvous: RendezVous):Observable<RendezVous>{
    return this.http.post<RendezVous>(this.urlRendezVous,rendezvous);
  }

  modifierRendezVous(rendezVous: RendezVous):Observable<RendezVous>{
    return this.http.put<RendezVous>(this.urlRendezVous,rendezVous);
  }

  supprimerRendezVous(id: number):Observable<void>{
    return this.http.delete<void>(`${this.urlRendezVous}/${id}`);
  }

  private selectedRendezVous: RendezVous | null = null;

  setSelectedRendezVous(rendezVous: RendezVous): void{
    this.selectedRendezVous = rendezVous;
  }

  getSelectedRendezVous(): RendezVous | null{
    return this.selectedRendezVous;
  }

  clearSelectedRendezVous(): void{
    this.selectedRendezVous = null;
  }

  //Soin
  obtenirListeSoins(): Observable<Soin[]> {
    return this.http.get<Soin[]>(`${this.urlSoins}`);
  }
}


