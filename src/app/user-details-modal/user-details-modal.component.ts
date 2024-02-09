import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableListService } from 'app/table-list/table-list.service';
import Swal from 'sweetalert2';

/**
 * Componente para mostrar y actualizar los detalles de un usuario en un cuadro de diálogo modal.
 *
 * @class
 */
@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.scss']
})
export class UserDetailsModalComponent implements OnInit {
  /** Formulario para la actualización de los datos del usuario. */
  updateForm: FormGroup;

  /** Tipos de identificación disponibles. */
  identificationTypes: string[] = ['Cédula', 'Pasaporte', 'Tarjeta de identidad', 'Otro'];

 
  constructor(
    @Inject(MAT_DIALOG_DATA) public userData: any,
    public dialogRef: MatDialogRef<UserDetailsModalComponent>,
    private fb: FormBuilder,
    public tableListService: TableListService
  ) {}

  /**
   * Método que ejecuta al iniciar el componente. Inicializa el formulario con los datos del usuario.
   *
   * @method
   * @return {void}
   */
  ngOnInit() {
    this.updateForm = this.fb.group({
      id: [this.userData.id],
      name: [this.userData.name, Validators.required],
      idType: [this.userData.idType, Validators.required],
      idNumber: [this.userData.idNumber, Validators.required],
      dateBirth: [this.userData.dateBirth, Validators.required],
      Weight: [this.userData.Weight, Validators.required],
      Height: [this.userData.Height, Validators.required],
    });
  }

  /**
   * ciera el mopdal.
   *
   * @method
   * @return {void}
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Envia el formulario de actualización y realiza la actualización del usuario.
   *
   * @method
   * @return {void}
   */
  submitForm() {
    if (this.updateForm.valid) {
      const updatedUser = this.updateForm.value;
      this.tableListService.updateUser(updatedUser).subscribe(
        (response) => {
          console.log('Usuario actualizado con éxito', response);

          Swal.fire({
            icon: 'success',
            title: 'Usuario Actualizado',
            text: 'El usuario se ha actualizado correctamente.',
          });
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error al actualizar el usuario', error);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al actualizar el usuario. Por favor, inténtalo de nuevo.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario Inválido',
        text: 'Por favor, completa todos los campos correctamente.',
      });
    }
  }

  /**
   * Elimina al usuario y muestra un cuadro de confirmación.
   *
   * @method
   * @return {void}
   */
  deleteUser() {
    const userId = this.updateForm.value.id;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tableListService.deleteUser(userId).subscribe(
          (response) => {
            console.log('Usuario eliminado con éxito', response);
            Swal.fire({
              icon: 'success',
              title: 'Usuario Eliminado',
              text: 'El usuario se ha eliminado correctamente.'
            });
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error al eliminar el usuario', error);

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error al eliminar el usuario. Por favor, inténtalo de nuevo.'
            });
          }
        );
      }
    });
  }
}
