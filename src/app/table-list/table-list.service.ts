import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';

/**
 * Servicio para la gestión de la tabla de usuarios.
 *
 * @class
 * @Injectable
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
    const options = { headers: this.getHeaders() };
    return this.http.get<any[]>(this.apiUrl, options)
      .pipe(catchError(this.handleError));
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
    const options = { headers: this.getHeaders() };
    return this.http.put(url, user, options)
      .pipe(catchError(this.handleError));
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
    const options = { headers: this.getHeaders() };
    return this.http.delete(url, options)
      .pipe(catchError(this.handleError));
  }

  /**
   * Método privado para obtener las cabeceras estándar.
   *
   * @private
   * @method
   * @return {HttpHeaders} - Cabeceras HTTP.
   */
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  /**
   * Maneja errores de solicitudes HTTP.
   *
   * @private
   * @method
   * @param {any} error - Objeto de error.
   * @return {Observable<never>} - Observable de error.
   */
  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    throw error;
  }
}
