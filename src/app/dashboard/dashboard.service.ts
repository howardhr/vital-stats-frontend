import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  /** URL de la API para la gestión de usuarios. */
  private apiUrl = 'http://localhost:3000/api/v1/healt/healty/user';

  constructor(private http: HttpClient) { }

  /**
   * Guarda los datos de un nuevo usuario.
   *
   * @method
   * @param {any} userData
   * @return {Observable<any>} 
   */
  saveUserData(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
