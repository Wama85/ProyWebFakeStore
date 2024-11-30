import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PedidoModel } from '../../modelos/pedido.model';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

  pedidos: PedidoModel[] = [];
  clienteId: number = 10; // Reemplaza con el ID del cliente adecuado
  cantidadPedidos: number = 0;
  username: string = ''; // Variable para almacenar el nombre de usuario


  constructor(private ProductsService: ProductsService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getPedidos();
    this.username = this.loginService.getUsername();
  }

  getPedidos(): void {
    this.ProductsService.getPedidosCliente(this.clienteId)
      .subscribe(pedidos => {
        this.pedidos = pedidos;
        this.cantidadPedidos = pedidos.length;
      });
  }
}
