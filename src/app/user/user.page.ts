import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModelDataBase } from '../modelo/ModelDataBase';
import { Router } from '@angular/router';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { modeloUsuario } from '../modelo/modeloUsuario';
import { ServiciosService } from '../service/servicios.service';
import { ModeloSeccion } from '../modelo/modeloSeccion';
import { lastValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ModeloClaseIN } from '../modelo/modeloClaseIN';
import { ModeloAsistencia } from '../modelo/ModeloAsistencia';




@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],

})
export class UserPage implements OnInit {
  isModalOpen = false;
  @ViewChild('card', { read: ElementRef }) card!: ElementRef;


  //base de datos en duro(arreglo)
  usuarioActual: ModelDataBase | null = null;

  sesionUser: ModelDataBase[] = [];
  secciones: ModeloSeccion[] = [];
  clases: ModeloClaseIN[] = [];


  // supabase
  UserLogin: modeloUsuario | null = null;
  sesionDB: modeloUsuario[] = [];
  datos: modeloUsuario[] = [];


  constructor(private router: Router, private route: ActivatedRoute, private animationCtrl: AnimationController, private servicio: ServiciosService, private alerta: AlertController) { }
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async ionViewWillEnter() {
    await this.animation.play();
    await this.animation.stop();
    this.secciones = await lastValueFrom(this.servicio.getSecciones(this.UserLogin?.id));
    this.datos = await lastValueFrom(this.servicio.getDatos(this.UserLogin?.id));
    console.log("datos nuevos:" + this.datos);
  }


  //fin animacion
  ngOnInit() {
   
    const userStorage = localStorage.getItem('username');

    if (userStorage !== 'ALUMNO') {
      // Si el usuario no es de tipo DOCENTE, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
    }




    
    this.route.queryParams.subscribe(params => {
      this.UserLogin = {
        Username: params['username'],
        Password: params['password'],
        Tipo: params['type'],
        Nombre: params['name'],
        Apellido: params['last_name'],
        id: params['id'],
        Correo: params['Correo'],
        Secciones: params['Secciones']
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

  async mostrarClases(id: string) {
    this.clases = await lastValueFrom(this.servicio.getClaseActiva(id))
    console.log(this.clases);
  }


  async cargarAsistencia(id_clase: string, id_alumno: any) {
    const asistencia: ModeloAsistencia = {
      id_clase: id_clase,
      id_alumno: id_alumno
    }
    await lastValueFrom(this.servicio.postCargaAsistencia(asistencia))

  }
}




