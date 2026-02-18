import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
})
export class LoginModalComponent {
  @Input() redirectTo: string | null = '/dashboard';

  mode: 'login' | 'register' = 'login';

  username = '';
  password = '';
  confirm = '';
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private toastCtrl: ToastController
  ) {}

  onModeChange(ev: any) {
    const v = ev?.detail?.value;
    this.mode = v === 'register' ? 'register' : 'login';
  }

  close(data?: any) {
    return this.modalCtrl.dismiss(data);
  }

  async submit() {
    this.loading = true;

    try {
      if (!this.username || !this.password) {
        await this.toast('Usuario y contraseña son obligatorios.');
        return;
      }

      if (this.mode === 'register') {
        if (this.password !== this.confirm) {
          await this.toast('Las contraseñas no coinciden.');
          return;
        }

        const r = await this.auth.register(this.username, this.password);
        await this.toast(r.message);
        if (r.ok) this.mode = 'login';
        return;
      }

      const r = await this.auth.login(this.username, this.password);
      await this.toast(r.message);

      if (r.ok) {
        await this.close({ ok: true });
        if (this.redirectTo) window.location.href = this.redirectTo;
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