import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  /** URL de la API para la gestión de usuarios . */
  private apiUrl = 'http://localhost:3000/api/v1/healt/healty/user';

 
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la listado de usuarios .
   *
   * @method
   * @return {Observable<any[]>}
   */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Actualiza la información de un usuario .
   *
   * @method
   * @param {any} user.
   * @return {Observable<any>}.
   */
  updateUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`; 
    return this.http.put(url, user);
  }

  /**
   * Elimina un usuario  por su ID.
   *
   * @method
   * @param {any} id.
   * @return {Observable<any>}.
   */
  deleteUser(id: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`; 
    return this.http.delete(url);
  }
}
