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
async submit(user?: string, pass?: string, conf?: string) {
  const username = (user ?? '').trim();
  const password = (pass ?? '').trim();
  const confirm  = (conf ?? '').trim();

  console.log('SUBMIT DATA =>', { mode: this.mode, username, hasPass: !!password });

  this.loading = true;
  try {
    if (this.mode === 'register') {
      if (!username || !password) {
        await this.toast('Usuario y contraseña son obligatorios.');
        return;
      }
      if (password !== confirm) {
        await this.toast('Las contraseñas no coinciden.');
        return;
      }
      const r = await this.auth.register(username, password);
      console.log('REGISTER RESULT =>', r);
      await this.toast(r.message);
      if (r.ok) this.mode = 'login';
      return;
    }

    // LOGIN
    if (!username || !password) {
      await this.toast('Usuario y contraseña son obligatorios.');
      return;
    }

    const r = await this.auth.login(username, password);
    console.log('LOGIN RESULT =>', r);
    await this.toast(r.message);

    if (r.ok) {
      await this.modalCtrl.dismiss({ ok: true });
      if(this.redirectTo)await
      this.router.navigateByUrl(this.redirectTo);
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