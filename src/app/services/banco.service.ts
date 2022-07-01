import { Injectable } from '@angular/core';
import { Respuesta } from '../modelos/respuesta';
import { AuthService } from './auth.service';
import { Gestor } from '../modelos/gestor';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private servidorBanco = 'http://localhost:4200/api';

  constructor(private authService: AuthService) { }

  async loginGestor(
    usuario: string,
    password: string): Promise<boolean> {

    const response = await fetch(
      `${this.servidorBanco}/login/gestor/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `usuario=${usuario}&password=${password}`
      }
    );

    const datos: Respuesta = await response.json();

    // si la autenticación ha sido exitosa, invocamos al método autenticado del servicio auth
    if(datos.ok) {
      this.authService.autenticado(datos.data.token, usuario, 'gestor');
    }

    return datos.ok;
  }

  async loginCliente(
    usuario: string,
    password: string): Promise<boolean> {

    const response = await fetch(
      `${this.servidorBanco}/login/cliente/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `usuario=${usuario}&password=${password}`
      }
    );

    const datos: Respuesta = await response.json();

    if(datos.ok) {
      this.authService.autenticado(datos.data.token, usuario, 'cliente');
    }

    return datos.ok;
  }

  async obtenerGestores(): Promise<Gestor[]> {
    return new Promise(async (resolve, reject) => {

      const response = await fetch(
        `${this.servidorBanco}/gestores/`, {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${localStorage.getItem('token')}`
          }
        }
      );

      const datos: Respuesta = await response.json();
      const gestores: Gestor[] = datos.data;
      resolve(gestores);
    });
  }

  async eliminarGestor(id: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      const response = await fetch(
        `${this.servidorBanco}/gestores/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Basic ${localStorage.getItem('token')}`
          }
        }
      );

      const datos: Respuesta = await response.json();
      resolve(datos.ok);
    });
  }
}
