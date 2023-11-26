import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicSafeString } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../service/servicios.service';
import { Router } from '@angular/router';
import { ModeloSeccion } from '../modelo/modeloSeccion';
import type { Animation } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AnimationController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ModeloAsistencia } from '../modelo/ModeloAsistencia';
import { ModeloClaseOUT } from '../modelo/ModeloClaseOUT';
import { modeloUsuario } from '../modelo/modeloUsuario';
import { ModeloClaseIN } from '../modelo/modeloClaseIN';
import { ModalController } from '@ionic/angular';




@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DocentePage implements OnInit {
  //Alerta con QR
  alertButtons= ['Aceptar']
  srcQr="https://api.qrserver.com/v1/create-qr-code/?data="
  srcQrMod=""

  isModalOpen = false;
  isModalOpen2 = false;
  isModalOpen3 = false;
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
  claseActiva: ModeloClaseIN[] = [];





  constructor(private router: Router, private route: ActivatedRoute, private alertController: AlertController,
              private animationCtrl: AnimationController, private servicio: ServiciosService, private modalController: ModalController) { }

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

    this.secciones = await lastValueFrom(this.servicio.getSecciones(this.UserLogin?.id));
    console.log(this.secciones);
    
    

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async setOpen2(isOpen: boolean, ) {
    this.isModalOpen2 = isOpen;
    this.asistencia = await lastValueFrom(this.servicio.getConsulaAsistencia("5"));
  }

  async setOpen3(isOpen: boolean) {
    this.isModalOpen3 = isOpen;
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

  async mostrarClasesActivas(id_seccion: string) {
    this.claseActiva = await lastValueFrom(this.servicio.getClaseActiva(id_seccion));
  }

  async mostrarAsistencia(id_clase: string) {
    this.asistencia = await lastValueFrom(this.servicio.getConsulaAsistencia(id_clase));
    console.log(this.asistencia);

  }

/* ******** Alerta con codigo QR (no funca) *************
    async mostrarAlertaClaseCreada(fecha: string) {
    const alert = await this.alertController.create({
      header: 'Clase creada',
      message: new IonicSafeString(`<img src="https://api.qrserver.com/v1/create-qr-code/?data=123" alt="">`),
                    //'<img src="${this.srcQr+fecha}" alt="">'
      buttons: ['OK']
    });
    await alert.present();
  } */ 

  async crearClase(id_seccion: string) {

    const fechaActual: Date = new Date();
    const soloFecha: string = fechaActual.toISOString().split('T')[0];

    const clase: ModeloClaseOUT = {
      
      id_seccion: id_seccion,
      cod_unico: soloFecha
    }
    const response =await lastValueFrom(this.servicio.postClase(clase))
    //await this.mostrarAlertaClaseCreada(soloFecha);
    this.srcQrMod= this.srcQr+soloFecha;
  }

    
  }


