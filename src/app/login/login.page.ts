import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModelDataBase } from '../modelo/ModelDataBase';
import { Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  @ViewChild('card', {read: ElementRef}) card!: ElementRef;
  username: string  | undefined;
  password: string | undefined;


  sesionUser : ModelDataBase [] =[
    new ModelDataBase('Carlos','Valverde','cvalverde@gmail.com','DOCENTE','carlosv123','valverdec123'),
    new ModelDataBase('Leopoldo','Ramirez','lramirez@gmail.com','DOCENTE','leopoldor123','ramirezl123'),
    new ModelDataBase('Danilo','Jara','djara@gmail.com','ALUMNO','daniloj123','dinoneednumpy')

  ];
  constructor(private router: Router,private animationCtrl: AnimationController) {}
//zona de animacion

private animation!: Animation;

ngAfterViewInit() {

  this.animation = this.animationCtrl
    .create()
    .addElement(this.card.nativeElement)
    .duration(300)
    .iterations(1)
    .fromTo('transform', 'translateX(0px)', 'translateX(-200px)')
    .fromTo('opacity', '1', '0');


}
async ionViewWillLeave() {
 

  await this.animation.play();
  await this.animation.stop();


}



//Fin zona animacion

  

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
        this.ionViewWillLeave();
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


