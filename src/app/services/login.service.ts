import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { User } from '../modelos/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api/login'; // Asegúrate de que la URL sea correcta
  private Url='http://localhost:3000/api/crearUsuario';
  private clienteIdSubject: BehaviorSubject<number | null>;
  private username: string = '';
  private sesionIniciada: boolean = false;
  constructor(private http: HttpClient) {
    const storedClienteId = this.getClienteId();
    this.clienteIdSubject = new BehaviorSubject<number | null>(storedClienteId);
   }

  createUser(userData: User): Observable<any> {
    return this.http.post<any>(this.Url, userData).pipe(
      catchError((error) => {
        console.error('Error al crear usuario:', error);
        return throwError('Error al crear usuario');
      })
    );
  }

  login(username: string, clave: string): Observable<any> {
    const userData = { username, clave };
    return this.http.post<any>(this.apiUrl, userData).pipe(
      tap((response) => {
        if (response.token) {
        // Aquí puedes manejar la respuesta exitosa, por ejemplo, guardar el token en localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('id_cliente', response.clienteId);
        }
      }),
      catchError((error) => {
        console.error('Error al iniciar sesión:', error);
        return throwError('Error al iniciar sesión');
      })
    );
  }
  getClienteId(): number | null {
    const clienteId = localStorage.getItem('id_cliente');
    return clienteId ? +clienteId : null; // Convertir a número, o null si no existe
  }
  getUsername(): string {
    return this.username;
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id_cliente');
  }
}
