import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PedidoModel } from '../modelos/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private urlapi = 'http://localhost:3000/api/pedidos';
  private pedidos: PedidoModel[] = [];
  private pedidosSubject: BehaviorSubject<PedidoModel[]> = new BehaviorSubject<PedidoModel[]>([]);

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  getPedidosCliente(clienteId: number): BehaviorSubject<PedidoModel[]> {
    this.fetchPedidosCliente(clienteId);
    return this.pedidosSubject;
  }

  addToCart(pedido: PedidoModel) {
    this.pedidos.push(pedido);
    this.saveCart();
    this.updateCartCount();
  }

  clearCart() {
    this.pedidos = [];
    this.saveCart();
    this.updateCartCount();
  }

  private saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.pedidos));
    this.updateCartCount();
  }

  private loadCart() {
    const cart = localStorage.getItem('shoppingCart');
    if (cart) {
      this.pedidos = JSON.parse(cart);
      this.updateCartCount();
    }
  }

  private updateCartCount() {
    this.pedidosSubject.next(this.pedidos);
  }

  getTotalCartItems(): number {
    return this.pedidos.length;
  }

  fetchPedidosCliente(clienteId: number): void {
    this.http.get<PedidoModel[]>(`${this.urlapi}?clienteId=${clienteId}`)
      .subscribe(
        (pedidos: PedidoModel[]) => {
          this.pedidos = pedidos;
          this.updateCartCount();
        },
        (error) => {
          console.error('Error al obtener los pedidos del cliente:', error);
        }
      );
  }
}
