import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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

export class DocService {
  private urlDocuments: string = "http://localhost:5264/api/Documents"

  constructor(private http: HttpClient) { }

  //obtenir documents d'un patient
  obtenirDocuments(patientId: number): Observable<DocumentDTO[]> {
    return this.http.get<DocumentDTO[]>(`${this.urlDocuments}/${patientId}`);
  }

  downloadDocument(patientId: string, nom: string) {
    return this.http.get(`${this.urlDocuments}/download/${patientId}/${nom}`, {
      responseType: 'blob',
    });
  }
}


