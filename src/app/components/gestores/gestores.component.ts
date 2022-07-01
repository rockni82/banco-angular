import { Component, OnInit } from '@angular/core';
import { BancoService } from '../../services/banco.service';
import { Gestor } from '../../modelos/gestor';

@Component({
  selector: 'app-gestores',
  templateUrl: './gestores.component.html',
  styleUrls: ['./gestores.component.css']
})
export class GestoresComponent implements OnInit {

  gestores: Gestor[] = [];

  constructor(private bancoService: BancoService) { }

  ngOnInit(): void {
    this.obtenerGestoresDelServicio();
  }

  async obtenerGestoresDelServicio() {
    this.gestores = await this.bancoService.obtenerGestores();
  }

  async onEliminarGestor(id: number) {
    const ok = await this.bancoService.eliminarGestor(id);
    if(ok) {
      this.gestores =this.gestores.filter(gestor => gestor.id !== id);
    }
  }
}
