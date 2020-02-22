import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  /**
   * Button-Event-Handler für Umrechnung
   */
  onBerechnenButton() {

    console.log("Umrechnung-Button wurde gedrückt.");
  }

}
