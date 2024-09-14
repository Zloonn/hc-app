import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditScoreService {

  private apiUrl = 'http://127.0.0.1:8000/api/score/';  // Assurez-vous que l'URL pointe vers le bon endpoint

  constructor(private http: HttpClient) { }

  getCreditScore(data: { clientId: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
