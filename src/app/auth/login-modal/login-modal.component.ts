import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonInput, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent implements AfterViewInit {
  @Input() redirectTo: string | null = '/dashboard';

  @ViewChild('userInput', { static: false }) userInput?: IonInput;

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

  ngAfterViewInit() {
    // Dar tiempo a que el modal termine de pintar en producción
    setTimeout(async () => {
      try {
        await this.userInput?.setFocus();
      } catch {}
    }, 350);
  }

  close(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

  async submit() {
    console.log('Submit', {mode:this.mode, username:this.username}),
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