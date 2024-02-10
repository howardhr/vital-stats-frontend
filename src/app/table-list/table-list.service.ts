import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.prod';

/**
 * Servicio para la gestión de la tabla de usuarios.
 *
 * @class
 * @@Injectable
 */
@Injectable({
  providedIn: 'root'
})
export class TableListService {
  /** URL de la API para la gestión de usuarios. */
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de usuarios.
   *
   * @method
   * @return {Observable<any[]>} - Observable que representa la lista de usuarios.
   */
  getUsers(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.get<any[]>(this.apiUrl, options);
  }

  /**
   * Actualiza la información de un usuario.
   *
   * @method
   * @param {any} user - Los datos actualizados del usuario.
   * @return {Observable<any>} - Observable que representa la respuesta de la solicitud.
   */
  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.put(url, user, options);
  }

  /**
   * Elimina un usuario por su ID.
   *
   * @method
   * @param {any} id - ID del usuario a ser eliminado.
   * @return {Observable<any>} - Observable que representa la respuesta de la solicitud.
   */
  deleteUser(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };
    return this.http.delete(url, options);
  }
}
