import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PasswordPage implements OnInit {
  isAlertOpen = false;
  public alertButtons = ['OK'];


  constructor(private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {


  }
  //boton de alerta

  setOpen(isOpen: boolean) {
    console.log('setOpen', isOpen);
    this.isAlertOpen = isOpen;
  }

  redirect() {
    console.log('redirect');
    this.router.navigate(['/login']);
  }
}
