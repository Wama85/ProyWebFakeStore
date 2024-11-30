import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  visible: boolean = false;
  isTokenPresent: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  //funcion para iniciar sesion
  login(): void {
    this.isTokenPresent = !!localStorage.getItem('token');
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const clave = this.loginForm.value.clave;

      this.loginService.login(username, clave).subscribe(
        (response:any) => {

           console.log(response);
          // Guardar token en local storage u otra forma de almacenamiento
          localStorage.setItem('token', response.token);
          // Redirigir al usuario a la página deseada
          if(response.tipo=="root"){
            this.router.navigate(['/administrador']);

          }
          else if(response.tipo=="estandar"){
            this.router.navigate(['/home']);

          }
          else {
            console.error('Tipo de usuario no reconocido:', response.tipo);
            // Manejar otros tipos de usuario aquí si es necesario
          }

        },
        (error: any) => { // Especifica el tipo de 'error' como 'any' o el tipo específico que esperas recibir
          console.error('Error al iniciar sesión:', error);
          // Aquí puedes manejar el error (mostrar mensaje de error, limpiar campos, etc.)
          this.messageService.add({ severity: 'error', summary: 'Error al iniciar sesión', detail: 'Credenciales incorrectas' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Por favor complete todos los campos' });
    }
  }

  openSignUpModal(event: Event) {
    event.preventDefault();
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
      this.isTokenPresent = false;
      // Redirigir o realizar otras acciones necesarias después del logout

  }
}
