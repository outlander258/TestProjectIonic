import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { usuariosValidos, Usuario } from './usuarios-validos'; // Importa desde el nuevo archivo
import { ModelDataBase } from '../modelo/ModelDataBase';


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


  sesionUser : ModelDataBase [] =[
    new ModelDataBase('Carlos','Valverde','cvalverde@gmail.com','DOCENTE','carlosv123','valverdec123'),
    new ModelDataBase('Leopoldo','Ramirez','lramirez@gmail.com','DOCENTE','leopoldor123','ramirezl123'),
    new ModelDataBase('Danilo','Jara','djara@gmail.com','ALUMNO','daniloj123','dinoneednumpy')

  ];



  constructor() { }

  ngOnInit() {
  }

  login() {
    const usuarioEncontrado = this.sesionUser.find(
      (user: ModelDataBase) => user.username === this.username && user.password === this.password
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


