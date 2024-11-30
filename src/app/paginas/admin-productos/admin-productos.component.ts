import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductModel } from '../../modelos/product.model';
import { ProductsService } from '../../services/products.service';
import { SelectItem, MessageService, ConfirmationService } from 'primeng/api';
import { CategoriaModel } from '../../modelos/categoria.model';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.scss']
})
export class AdminProductosComponent implements OnInit {
  productos: ProductModel[] = [];
  productoForm: FormGroup;
  estadoOptions: SelectItem[];
  categorias: SelectItem[] = [];
  productoSeleccionado: ProductModel | null = null; // Producto que se está editando
  displayModal: boolean = false;
  titulo:string='';
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.productoForm = this.fb.group({
      id_producto: [null], // Campo oculto para almacenar el ID del producto en edición
      nombre: ['', Validators.required],
      detalle: [''],
      costo: ['', Validators.required],
      imagen: [''],
      estado: [''],
      stock: ['', Validators.required],
      categoria: ['', Validators.required]
    });
    this.estadoOptions = [
      { label: 'Activo', value: true },
      { label: 'Inactivo', value: false }
    ];
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerProductos(): void {
    this.productService.getAllProducts().subscribe(
      (data: ProductModel[]) => {
        this.productos = data;
      },
      (error: any) => {
        console.error('Error al obtener productos:', error);
        // Manejar el error
      }
    );
  }

  obtenerCategorias(): void {
    this.productService.getAllCategories().subscribe(
      (data: CategoriaModel[]) => {
        this.categorias = data.map(cat => ({ label: cat.detalle, value: cat.detalle }));
      },
      (error: any) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  guardarProducto(): void {
    if (this.productoForm.valid) {
      const nuevoProducto: ProductModel = {
        id_producto: this.productoForm.value.id_producto || 0, // Usamos 0 si es nuevo producto, o el ID existente si se está editando
        nombre: this.productoForm.value.nombre,
        detalle: this.productoForm.value.detalle,
        costo: this.productoForm.value.costo,
        imagen: this.productoForm.value.imagen,
        estado: this.productoForm.value.estado,
        stock: this.productoForm.value.stock,
        categoria: this.productoForm.value.categoria
      };

      if (nuevoProducto.id_producto === 0) {
        // Crear nuevo producto
        this.productService.createProduct(nuevoProducto).subscribe(
          (response: ProductModel) => {
            console.log('Producto creado:', response);
            this.obtenerProductos(); // Actualizar lista de productos
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto creado correctamente'
            });
            this.cerrarModalEdicion();
          },
          (error: any) => {
            console.error('Error al crear producto:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al crear producto'
            });
          }
        );
      } else {
        // Actualizar producto existente
        this.productService.updateProduct(nuevoProducto.id_producto, nuevoProducto).subscribe(
          (response: ProductModel) => {
            console.log('Producto actualizado:', response);
            this.obtenerProductos(); // Actualizar lista de productos
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto actualizado correctamente'
            });
            this.cerrarModalEdicion();
          },
          (error: any) => {
            console.error('Error al actualizar producto:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al actualizar producto'
            });
          }
        );
      }
    } else {
      // Formulario no válido, mostrar mensaje de error o hacer alguna acción
    }
  }

  editarProducto(producto: ProductModel): void {
    // Cargar datos del producto en el formulario para editar
    this.productoSeleccionado = { ...producto }; // Copiar el producto para evitar modificar el original
    this.productoForm.patchValue({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      detalle: producto.detalle,
      costo: producto.costo,
      imagen: producto.imagen,
      estado: producto.estado,
      stock: producto.stock,
      categoria: producto.categoria
    });
    this.mostrarModalEdicion();
  }

  eliminarProducto(producto: ProductModel): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este producto?',
      accept: () => {
        this.productService.deleteProduct(producto.id_producto).subscribe(
          () => {
            console.log('Producto eliminado:', producto);
            this.obtenerProductos();
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto eliminado correctamente'
            });
          },
          (error: any) => {
            console.error('Error al eliminar producto:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al eliminar producto'
            });
          }
        );
      }
    });
  }

  mostrarModalEdicion(): void {
    // Mostrar el modal de edición
    this.titulo='EDITAR PRODUCTO';
    this.displayModal = true;
  }
  mostrarModalAgregar(): void {
    this.titulo='CREAR NUEVO PRODUCTO';
    this.productoForm.reset();
    this.displayModal = true;
  }

  cerrarModalEdicion(): void {
    // Cerrar el modal de edición y resetear formulario
    this.displayModal = false;
    this.productoForm.reset();
    this.productoSeleccionado = null;
  }
}
