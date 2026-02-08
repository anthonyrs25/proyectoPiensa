import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';
import { LoginModalComponent } from '../auth/login-modal/login-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonContent, IonFooter, IonButton, IonButtons, IonIcon],
})

export class HomePage {

  @ViewChild('pageContent', { static: false }) content?: IonContent;
  @ViewChild('bgVideo', { static: false }) bgVideo?: ElementRef<HTMLVideoElement>;


  constructor(private modalCtrl: ModalController) { }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginModalComponent,
      breakpoints: [0, 0.5, 0.75, 1],
      initialBreakpoint: 0.75,
      handle: true
    });
    await modal.present();
  }

  scrollTop() {
    this.content?.scrollToTop(500);
  }

  ionViewDidEnter() {
    this.setupAutoplay();
  }

  private setupAutoplay() {
    const video = this.bgVideo?.nativeElement;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    (video as any).playsInline = true;

    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          video.play().catch((err) => {
            console.log('Autoplay bloqueado:', err?.name || err, err?.message || '');
          });
        });
      });
    };

    video.addEventListener('canplay', tryPlay, { once: true });
    window.addEventListener('pageshow', tryPlay);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tryPlay();
    });

    video.load();
    tryPlay();
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  goToContactoFromServicios() {
    this.scrollTo('contacto');
  }

  openThemeModal() {
    console.log('Abrir modal de Tema');
  }

  openLanguageModal() {
    console.log('Abrir modal de Idioma');
  }

}