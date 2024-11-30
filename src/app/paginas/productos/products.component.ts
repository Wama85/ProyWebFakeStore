import { Component, OnInit,OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../modelos/product.model';
import { PedidoModel } from '../../modelos/pedido.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService]
})
export class ProductsComponent implements OnInit, OnDestroy {
  layout: 'list' | 'grid' = 'list';
  products: ProductModel[] = [];
   filteredProducts: ProductModel[] = [];
  selectedProducts: ProductModel[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  clienteId: number = 0; // Variable para almacenar el ID del cliente autenticado
  cartItemCount: number = 0;
  authService: any;
  cantidadPedidos: number = 0;
  cartSubscription:Subscription;


  constructor(
    private productService: ProductsService,
    private ShoppingCartService: ShoppingCartService,
    private messageService: MessageService,
    private router: Router,
    private loginService: LoginService

  ) {
    this.clienteId=this.loginService.getClienteId() || 10;
    this.cartSubscription = new Subscription()
  }

  ngOnInit(): void {
    this.loadProducts();
    this.clienteId = this.authService.getClienteId();
     // Suscribirse a los cambios en el carrito para actualizar la cantidad
     this.cartSubscription = this.ShoppingCartService.getPedidosCliente(this.clienteId).subscribe((pedidos: PedidoModel[]) => {
      this.cartItemCount = pedidos.length;
    });
  }
  ngOnDestroy(): void {
    // Desuscribirse para evitar pérdidas de memoria
    this.cartSubscription.unsubscribe();
  }
  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (data: ProductModel[]) => {
        this.products = data;
        this.totalRecords = this.products.length;
        this.filterProducts();
      },
      (error) => {
        console.error("Error al cargar los productos:", error);
      }
    );
  }

  switchToListView() {
    this.layout = 'list';
    this.clearSelection();
  }

  switchToGridView() {
    this.layout = 'grid';
    this.clearSelection();
  }

  toggleSelection(product: ProductModel) {
    const index = this.selectedProducts.indexOf(product);
    if (index === -1) {
      this.selectedProducts.push(product);
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Item agregado con éxito' });
    } else {
      this.selectedProducts.splice(index, 1);
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Item removido con éxito' });
    }
  }

  clearSelection() {
    this.selectedProducts = [];
  }

  isSelected(product: ProductModel): boolean {
    return this.selectedProducts.includes(product);
  }

  filterProductsByCategory() {
    this.first = 0;
    this.filterProducts();
  }

  filterProducts() {
    let tempProducts = this.products;

    if (this.selectedCategory && this.selectedCategory !== 'todos') {
      tempProducts = tempProducts.filter(product =>
        product.categoria.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }

    if (this.searchQuery) {
      tempProducts = tempProducts.filter(product =>
        product.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.filteredProducts = tempProducts.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.filterProducts();
  }

  // Método para agregar al carrito de compras
  agregarAlCarrito() {
    if (this.selectedProducts.length > 0) {
      this.selectedProducts.forEach(product => {
        const pedido: PedidoModel = {
          id_pedido: 0,
          tb_cliente_id_cliente: this.clienteId,
          tb_producto_id_producto: product.id_producto,
          fecha: new Date()
        };

        this.productService.createPedido(pedido).subscribe(
          (response: PedidoModel) => {
            console.log('Pedido agregado correctamente:', response);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto agregado al carrito' });
          },
          (error: any) => {
            console.error('Error al agregar pedido:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo agregar el producto al carrito' });
          }
        );
      });
      // Limpiar productos seleccionados después de agregar al carrito
      this.clearSelection();
    } else {
      console.error('No se ha seleccionado ningún producto.');
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'Seleccione al menos un producto para agregar al carrito' });
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
