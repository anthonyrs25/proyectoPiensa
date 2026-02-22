import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonItem, IonLabel, IonInput
  ],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  async enter() {
    // Sin validaciones: solo cierra el modal y navega al dashboard.
    await this.modalCtrl.dismiss();
    await this.router.navigateByUrl('/dashboard');
  }
}
