import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonHeader, IonToolbar, IonContent, IonFooter, IonButtons, IonButton, IonIcon],
})
export class HomePage {
  constructor() {}

scrollTo(sectionId: string) {
const el = document.getElementById(sectionId);
el?.scrollIntoView({behavior:'smooth',block:'start'});
}

openThemeModal() {
  console.log('Abrir modal de Tema');
}

openLanguageModal() {
  console.log('Abrir modal de Idioma');
}

openLoginModal() {
  console.log('Abrir modal de Login');
}
}