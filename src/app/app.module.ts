import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './paginas/home/home.component';
import { FooterComponent } from './paginas/footer/footer.component';
import { HeaderComponent } from './paginas/header/header.component';
import { ProductsComponent } from './paginas/productos/products.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { TruncatePipe } from './paginas/pipes/truncate.pipe';
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutoFocusModule } from 'primeng/autofocus';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { LoginComponent } from './paginas/login/login.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ModalLoginRegisterComponent } from './paginas/modal-login-registro/modal-login-register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminProductosComponent } from './paginas/admin-productos/admin-productos.component';
import { TableModule } from 'primeng/table';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    ProductsComponent,
    TruncatePipe,
    LoginComponent,
    ModalLoginRegisterComponent,
    AdminProductosComponent,
    PedidosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    CardModule,
    MenubarModule,
    StyleClassModule,
    PanelModule,
    TooltipModule,
    PaginatorModule,
    BrowserAnimationsModule,
    TagModule,
    RatingModule,
    CommonModule,
    DataViewModule,
    IconFieldModule,
    InputIconModule,
    AutoFocusModule,
    ColorPickerModule,
    ToastModule,
    ToggleButtonModule,
    InputTextModule,
    RadioButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    ConfirmDialogModule,
    TableModule
  ],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
