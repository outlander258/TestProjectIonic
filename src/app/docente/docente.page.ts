import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModelDataBase } from '../modelo/ModelDataBase';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';



@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DocentePage implements OnInit {
  @ViewChild('card', {read: ElementRef}) card!: ElementRef;
  usuarioActual: ModelDataBase | null = null;
  sesionUser: ModelDataBase[] = [];



  constructor(private router: Router,private route: ActivatedRoute,private animationCtrl: AnimationController) {}

//zona de animacion
private animation!: Animation;

ngAfterViewInit() {

  this.animation = this.animationCtrl
    .create()
    .addElement(this.card.nativeElement)
    .duration(500)
    .iterations(1)
    .fromTo('transform', 'translateX(200px)', 'translateX(0)')
    .fromTo('opacity', '1', '0');
}

async ionViewWillEnter() {
  await this.animation.play();
  await this.animation.stop();
}


//fin animacion
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const nombre = params['name'];
      const apellido = params['last_name'];
      const tipo = params['type'];
      const email = params['email'];
      const username = params['username'];
      const password = params['password'];

      this.usuarioActual = new ModelDataBase(nombre, apellido, email, tipo, username, password);
    });
  }

  cerrarSession() {
    this.router.navigate(['/login']);
  
  }
    
}