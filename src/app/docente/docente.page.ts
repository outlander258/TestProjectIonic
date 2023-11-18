import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../service/servicios.service';
import { Router } from '@angular/router';
import { ModeloSeccion } from '../modelo/modeloSeccion';
import type { Animation } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ModeloAsistencia } from '../modelo/ModeloAsistencia';
import { ModeloClaseOUT } from '../modelo/ModeloClaseOUT';
import { modeloUsuario } from '../modelo/modeloUsuario';




@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DocentePage implements OnInit {
  isModalOpen = false;
  @ViewChild('card', { read: ElementRef }) card!: ElementRef;

  // secciones
  secciones: ModeloSeccion[] = [];
  asistencia: ModeloAsistencia[] = [];
  clase= {
    id: '',
    id_seccion: '',
    cod_unico: ''
  }

  //supaBase
  UserLogin :modeloUsuario  | null = null;
  sesionDB :modeloUsuario[] = [];





  constructor(private router: Router, private route: ActivatedRoute, private animationCtrl: AnimationController, private servicio: ServiciosService) { }

  //zona de animacion
  private animation!: Animation;

  ngAfterViewInit() {

    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(500)
      .iterations(1)
      .fromTo('opacity', '0', '1');
  }

  async ionViewWillEnter() {
    await this.animation.play();
    await this.animation.stop();

    this.secciones = await lastValueFrom(this.servicio.getSecciones('4'));
    console.log(this.secciones);

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  ngOnInit() {

    const userStorage = localStorage.getItem('username');

    if (userStorage !== 'DOCENTE') {
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

  cerrarSession() {
    this.router.navigate(['/login']);
    localStorage.clear();

  }

  async crearClase(id_seccion: string) {

    const fechaActual: Date = new Date();
    const soloFecha: string = fechaActual.toISOString().split('T')[0];

    const clase: ModeloClaseOUT = {
      
      id_seccion: id_seccion,
      cod_unico: soloFecha
    }
    const response =await lastValueFrom(this.servicio.postClase(clase))
    }
  }


