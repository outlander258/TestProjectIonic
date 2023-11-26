import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { last, lastValueFrom } from 'rxjs';
import { ServiciosService } from '../service/servicios.service';
import { modeloUsuario } from '../modelo/modeloUsuario';
import { ModelLog } from '../modelo/ModelLog';
import { Preferences } from '@capacitor/preferences';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  @ViewChild('card', { read: ElementRef }) card!: ElementRef;
  username: string | undefined;
  password: string | undefined;
  esDocente = false;

  


  UserLogin :ModelLog ={
    username :'',
    password :'',
    type :'',
    name: '',
    last_name: '',
    id :'',
    Correo:'',
    Secciones: '',


  }

  isToastOpen = false;
  usuarioApi: modeloUsuario | null = null;



  constructor(private router: Router, private route: ActivatedRoute, private animationCtrl: AnimationController, private alertController: AlertController, private servicio: ServiciosService) {

  }
  //zona de animacion

  private animation!: Animation;

  ngAfterViewInit() {

    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1000)
      .iterations(1)
      .fromTo('opacity', '1', '0');


  }
  async ionViewWillLeave() {


    await this.animation.play();
    await this.animation.stop();


  }



  //Fin zona animacion


  async mostrarAlertaCredencialesInvalidas() {
    const alert = await this.alertController.create({
      header: 'Credenciales inválidas',
      message: 'Por favor, verifica tus credenciales e intenta nuevamente.',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {






    localStorage.clear();

    
  }


   async demonGuardResponse(){
    const userLoginInfo: ModelLog = {
      username: this.UserLogin.username,
      password: this.UserLogin.password,
      type :this.UserLogin.type,
      name: this.UserLogin.name,
      last_name: this.UserLogin.last_name,
      id :this.UserLogin.id,
      Correo : this.UserLogin.Correo,
      Secciones: this.UserLogin.Secciones
    };

    const respuesta = await lastValueFrom(this.servicio.getLogin(userLoginInfo));

    if (respuesta.Tipo === 'ALUMNO') {
      localStorage.setItem('username','ALUMNO');
      console.log(localStorage)
      
     } else if (respuesta.Tipo === 'DOCENTE') {

       localStorage.setItem('username', 'DOCENTE');
       console.log(localStorage)
      
     }





  }


  async login() {
    const userLoginInfo: ModelLog = {
      username: this.UserLogin.username,
      password: this.UserLogin.password,
      type: this.UserLogin.type,
      name: this.UserLogin.name,
      last_name: this.UserLogin.last_name,
      id: this.UserLogin.id,
      Correo: this.UserLogin.Correo,
      Secciones: this.UserLogin.Secciones
    };
  
    const respuesta = await lastValueFrom(this.servicio.getLogin(userLoginInfo));
  
    if (respuesta && respuesta.Username === this.UserLogin.username && respuesta.Password === this.UserLogin.password) {
      console.log('Inicio de sesión exitoso');
      console.log(respuesta.Username);
      console.log(this.UserLogin.username, this.UserLogin.password);
  
      const userType = respuesta.Tipo;
      localStorage.setItem('username', userType);
      console.log(localStorage);
  
      const queryParams = {
        name: respuesta.Nombre,
        last_name: respuesta.Apellido,
        type: userType,
        id: respuesta.id,
      };
  
      if (userType === 'ALUMNO') {
        this.router.navigate(['/user'], { queryParams });
      } else if (userType === 'DOCENTE') {
        this.router.navigate(['/docente'], { queryParams });

      }
  
    } else {
      // Credenciales inválidas o usuario no encontrado
      this.mostrarAlertaCredencialesInvalidas();
      console.log('Credenciales inválidas o usuario no encontrado');
      console.log(respuesta?.Username);
      console.log(this.UserLogin.username, this.UserLogin.password);
    }
  }




  







  recuperarContrasena() {
    this.router.navigate(['/password']);


  }


}


