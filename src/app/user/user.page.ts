import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModelDataBase } from '../modelo/ModelDataBase';
import { Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { modeloUsuario } from '../modelo/modeloUsuario';
import { ServiciosService } from '../service/servicios.service';
import { ModeloSeccion } from '../modelo/modeloSeccion';
import { lastValueFrom } from 'rxjs';




@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserPage implements OnInit {

  @ViewChild('card', {read: ElementRef}) card!: ElementRef;


   //base de datos en duro(arreglo)
  usuarioActual: ModelDataBase | null = null;

  sesionUser: ModelDataBase[] = [];
  secciones: ModeloSeccion[] = [];

  // supabase
  UserLogin :modeloUsuario  | null = null;
  sesionDB :modeloUsuario[] = [];


  constructor(private router: Router, private route: ActivatedRoute, private animationCtrl: AnimationController, private servicio: ServiciosService) { }
  //zona de animacion
  private animation!: Animation;

  ngAfterViewInit() {

    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1000)
      .iterations(1)
      .fromTo('opacity', '0', '1');


  }

  async ionViewWillEnter() {
    await this.animation.play();
    await this.animation.stop();
    this.secciones = await lastValueFrom(this.servicio.getSecciones('1'));
  }


  //fin animacion
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.UserLogin = {
        Username: params['username'],
        Password: params['password'],
       Tipo: params['type'],
        Nombre: params['name'],
        Apellido: params['last_name'],
        id: params['id'],
        Correo : params ['Correo'],
        Secciones: params ['Secciones']
      };
    });



  }
  informacion(info: any) {
    console.log(info);

  }

  cerrarSession() {
    console.log(this.UserLogin?.id)
    this.router.navigate(['/login']);
    localStorage.clear();

  }
  
/*   mostrarClases(id:string){
    const info1 = lastValueFrom(this.servicio.getClaseActiva())
    console.log(info1);
  } */
}

