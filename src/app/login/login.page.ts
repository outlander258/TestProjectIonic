import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { usuariosValidos, Usuario } from './usuarios-validos'; // Importa desde el nuevo archivo

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  username: string  | undefined;
  password: string | undefined;

  constructor() { }

  ngOnInit() {
  }

  login() {
    const usuarioEncontrado = usuariosValidos.find(
      (user: Usuario) => user.username === this.username && user.password === this.password
    );

    if (usuarioEncontrado) {
      // Iniciar sesión exitosa
      console.log('Inicio de sesión exitoso');
    } else {
      // Credenciales inválidas
      console.log('Credenciales inválidas');
    }
  }
}


