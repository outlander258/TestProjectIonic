import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModelDataBase } from '../modelo/ModelDataBase';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


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
  usuarioActual: ModelDataBase | null = null;
  esDocente = false;

  isToastOpen = false;



  sesionUser : ModelDataBase [] =[
    new ModelDataBase('Carlos','Valverde','cvalverde@gmail.com','DOCENTE','carlosv123','valverdec123'),
    new ModelDataBase('Leopoldo','Ramirez','lramirez@gmail.com','DOCENTE','leopoldor123','ramirezl123'),
    new ModelDataBase('Danilo','Jara','djara@gmail.com','ALUMNO','daniloj123','dinoneednumpy'),
    new ModelDataBase('Jean','Guital','jguital@gmail.com','ALUMNO','jeang123','sutrofromvalpo'),
    new ModelDataBase('Gonzalo','Ulloa','gulloa@gmail.com','ALUMNO','gonzalou123','simphentai123'),
    new ModelDataBase('Eduardo','Rojas','erojas@gmail.com','DOCENTE','eduardor123','comunista123'),
    new ModelDataBase('Hernan','Saavedra','hsaavedra@gmail.com','DOCENTE','hernans123','saavedrah123')




  ];
  constructor(private router: Router,private route: ActivatedRoute,private animationCtrl: AnimationController, private alertController: AlertController) {
    this.username = ''; 
    this.password = '';
    this.usuarioActual = new ModelDataBase('', '', '', '', '', '');
  }
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


async mostrarAlertaCredencialesInvalidas() {
  const alert = await this.alertController.create({
    header: 'Credenciales inválidas',
    message: 'Por favor, verifica tus credenciales e intenta nuevamente.',
    buttons: ['OK']
  });

  await alert.present();
}

  ngOnInit() {
  }

  login() {
  
    const usuarioEncontrado = this.sesionUser.find(
      (user: ModelDataBase) => user.username === this.username && user.password === this.password
    );
  
    if (usuarioEncontrado) {
      console.log('Inicio de sesión exitoso');
      this.ionViewWillLeave();
    
      if (usuarioEncontrado.type === 'ALUMNO') {
        this.router.navigate(['/user'], {
          queryParams: {
            name: usuarioEncontrado.name,
            last_name: usuarioEncontrado.last_name,
            type: usuarioEncontrado.type,
          }
        });
      } else if (usuarioEncontrado.type === 'DOCENTE') {
        this.router.navigate(['/docente'], {
          queryParams: {
            name: usuarioEncontrado.name,
            last_name: usuarioEncontrado.last_name,
            type: usuarioEncontrado.type,
          }
        });
      }
    } else {
      // Credenciales inválidas

      this.mostrarAlertaCredencialesInvalidas();

      console.log('Credenciales inválidas');


    }
  }
recuperarContrasena(){
this.router.navigate(['/password']);


}


}


