import { Component, Input, viewChild, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, ModalController, IonicModule, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls:['./login-modal.component.scss'],
})

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  @Input() redirectTo: string | null = '/dashboard';

  @ViewChild('userInput') userInput!: IonInput;
  @ViewChild('passInput') passInput!: IonInput;

  mode: 'login' | 'register' = 'login';
  username = '';
  password = '';
  confirm = '';
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ionViewDidEnter() {
    setTimeout(() => this.userInput?.setFocus(), 150);
  }

  close(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

  async submit() {
    this.loading = true;
    try {
      if (this.mode === 'register') {
        if (this.password !== this.confirm) {
          await this.toast('Las contraseñas no coinciden.');
          return;
        }
        const r = await this.auth.register(this.username, this.password);
        await this.toast(r.message);
        if (r.ok) this.mode = 'login';
      } else {
        const r = await this.auth.login(this.username, this.password);
        await this.toast(r.message);
        if (r.ok) {
          await this.close({ ok: true });
          if (this.redirectTo) this.router.navigateByUrl(this.redirectTo);
        }
      }
    } finally {
      this.loading = false;
    }
  }

  private async toast(message: string) {
    const t = await this.toastCtrl.create({
      message,
      duration: 1600,
      position: 'top',
    });
    await t.present();
  }
}