import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login.service';
import { User } from '../../modelos/user.model';

@Component({
  selector: 'app-modal-login-register',
  templateUrl: './modal-login-register.component.html',
  styleUrls: ['./modal-login-register.component.scss']
})
export class ModalLoginRegisterComponent {
  userForm: FormGroup;
  visible: boolean = true;

  @Output() close = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private messageService: MessageService
  ) {
    this.userForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      carnet: [''],
      username: ['', Validators.required],
      clave: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      tipo: ['']
    });
  }

  closeModal(): void {
    this.visible = false;
    this.close.emit();
  }

  saveUser() {
    if (this.userForm.valid) {
      const userData: User = {
        id_cliente: 0, // Puedes asignar un valor temporal o dejar que el servidor asigne uno
        carnet: 0, // Puedes asignar un valor temporal o dejar que el servidor asigne uno
        nombre: this.userForm.value.nombre,
        apellido: this.userForm.value.apellido,
        username: this.userForm.value.username,
        clave: this.userForm.value.clave,
        direccion: this.userForm.value.direccion || '', // Asigna una cadena vacía si no se proporciona
        telefono: this.userForm.value.telefono ? parseInt(this.userForm.value.telefono) : undefined, // Convierte a entero si se proporciona
        tipo: this.userForm.value.tipo || 'estandar' // Asigna 'root' si no se proporciona
      };

      this.loginService.createUser(userData).subscribe(
        (response) => {
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado correctamente' });
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar el usuario' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Por favor complete todos los campos' });
    }
  }
}
