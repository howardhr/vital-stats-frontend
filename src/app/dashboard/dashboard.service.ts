import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  /** URL de la API para la gestión de usuarios. */
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Guarda los datos de un nuevo usuario.
   *
   * @method
   * @param {any} userData - Los datos del nuevo usuario.
   * @return {Observable<any>} - Observable que representa la respuesta de la solicitud.
   */
  saveUserData(userData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.post(this.apiUrl, userData, options);
  }
}
