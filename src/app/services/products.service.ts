import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../modelos/product.model';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../modelos/categoria.model';
import { PedidoModel } from '../modelos/pedido.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'http://localhost:3000/api/producto';
  private urlapi="http://localhost:3000/api";

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.url);
  }

  getProductById(productId: number): Observable<ProductModel> {
    const getProductUrl = `${this.url}/${productId}`;
    return this.http.get<ProductModel>(getProductUrl);
  }

  createProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.url, product);
  }
  createPedido(pedido: PedidoModel): Observable<PedidoModel> {
    const createPedidoUrl = `${this.urlapi}/crearPedido`; // Ajusta la URL según la ruta de tu backend para crear pedidos
    return this.http.post<PedidoModel>(createPedidoUrl, pedido);
  }
  getPedidosCliente(clienteId: number): Observable<PedidoModel[]> {
    const getPedidosUrl = `${this.urlapi}/pedidos/${clienteId}`;
    return this.http.get<PedidoModel[]>(getPedidosUrl);
  }

  updateProduct(productId: number, updatedProduct: ProductModel): Observable<ProductModel> {
    const updateProductUrl = `${this.url}/${productId}`;
    return this.http.put<ProductModel>(updateProductUrl, updatedProduct);
  }

  deleteProduct(productId: number): Observable<void> {
    const deleteProductUrl = `${this.url}/${productId}`;
    return this.http.delete<void>(deleteProductUrl);
  }
  getAllCategories(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(`${this.urlapi}/categoria`);
  }
}
