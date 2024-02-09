import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** Tipos de identificación disponibles. */
  identificationTypes: string[] = ['Cédula', 'Pasaporte',  'Tarjeta de identidad', 'Otro'];

  /** Formulario de registro de usuario. */
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, public dashboardService: DashboardService) { }
  
 
  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      dateBirth: ['', Validators.required],
      Weight: ['', Validators.required],
      Height: ['', Validators.required]
    });
  }

  /**
   * Método para guardar los datos del formulario de registro.
   *
   * @method
   * @return {void}
   */
  onSave() {
    if (this.registrationForm.valid) {
      const userData = this.registrationForm.value;
      this.dashboardService.saveUserData(userData).subscribe(
        response => {
          console.log('Datos guardados con éxito', response);

          Swal.fire({
            icon: 'success',
            title: 'Usuario creado correctamente',
            showConfirmButton: false,
            timer: 4500  
          });

          this.registrationForm.reset();
        },
        error => {
          console.error('Error al guardar los datos', error);

          Swal.fire({
            icon: 'error',
            title: 'Error al crear usuario',
            text: 'Por favor, inténtalo de nuevo',
          });
        }
      );
    } 
  }
}
