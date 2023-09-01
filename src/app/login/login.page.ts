import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModelDataBase } from '../modelo/ModelDataBase';
import { Router } from '@angular/router';


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



  constructor(private router: Router) {}

  ngOnInit() {
  }

  login() {
    const usuarioEncontrado = this.sesionUser.find(
      (user: ModelDataBase) => user.username === this.username && user.password === this.password
    );

    if (usuarioEncontrado) {
      // Iniciar sesión exitosa
      console.log('Inicio de sesión exitoso');

      if(usuarioEncontrado.type==='ALUMNO'){
        this.router.navigate(['/user']);


      } else if(usuarioEncontrado.type==='DOCENTE'){
        this.router.navigate(['/docente']);
      }

    } else {
      // Credenciales inválidas
      console.log('Credenciales inválidas');
    }
  }

recuperarContrasena(){
this.router.navigate(['/password']);


}

}


