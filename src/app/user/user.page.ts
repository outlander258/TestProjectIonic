import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { usuariosValidos, Usuario } from './usuarios-validos'; // Importa desde el nuevo archivo

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserPage implements OnInit {
  usuariosValidos: Usuario[] = usuariosValidos; // Usa el arreglo importado

  constructor() {}

  ngOnInit() {}
}