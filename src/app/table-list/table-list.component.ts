import { Component, OnInit } from '@angular/core';
import { TableListService } from './table-list.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsModalComponent } from '../user-details-modal/user-details-modal.component';

/**
 * Componente para la visualización y gestión de la lista de usuarios.
 *
 * @class
 */
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  /** Lista de todos los usuarios. */
  users: any[] = [];

  /** Lista de usuarios filtrados. */
  filteredUsers: any[] = [];

  /** Tipos de identificación disponibles. */
  identificationTypes: string[] = ['Cédula', 'Pasaporte', 'Tarjeta de identidad', 'Otro'];


  constructor(public tableListService: TableListService, public dialog: MatDialog) { }

  
  ngOnInit() {
    this.getUsers();
  }

  /**
   * Obtiene la lista completa de usuarios y la asigna a las listas de usuarios y usuarios filtrados.
   *
   * @method
   * @return {void}
   */
  getUsers() {
    this.tableListService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data.map(user => {
          user.imc = +user.imc.toFixed(2);
          return user;
        });

        this.filteredUsers = [...this.users];
      },
      error => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  /**
   * Aplica un filtro a la lista de usuarios basado en el texto de búsqueda.
   *
   * @method
   * @param {string} searchText
   * @return {void}
   */
  applyFilter(searchText: string) {
    if (!searchText) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.idType.toLowerCase().includes(searchText.toLowerCase()) ||
        user.idNumber.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }

  /**
   * Abre el modal pata editar los datos de un usuario.
   *
   * @method
   * @param {any} user
   * @return {void}
   */
  openUserDetailsModal(user: any) {
    const dialogRef = this.dialog.open(UserDetailsModalComponent, {
      width: '1100px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });
  }
}
