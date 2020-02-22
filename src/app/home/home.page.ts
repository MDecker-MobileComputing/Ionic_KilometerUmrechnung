import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  readonly UMRECHNUNGSFAKTOR_MEILEN_ENGLISCH = 1.609344;
  
  readonly UMRECHNUNGSFAKTOR_MEILEN_NAUTISCH = 1.852;

  readonly UMRECHNUNGSFAKTOR_MEILEN_CHINESISCH = 0.5


  /** Way-Way-Binding definiert mit [(ngModel)]="eingabeKilometer" */
  private eingabeKilometer : String = "";

  /** Two-Way-Binding definiert in ion-radio-group mit [(ngModel)]="zieleinheit" */
  private zieleinheit : any = "englischeMeilen";


  /** Konstruktor für Dependency Injection. */
  constructor(private alertCtrl: AlertController,
              private router   : Router   ) {}


  /**
   * Button-Event-Handler für Umrechnung
   */
  async onBerechnenButton() {

    if (this.eingabeKilometer === null || this.eingabeKilometer.length === 0) {

      await this.zeigeDialog("Bitte Kilometer-Wert eingeben!");
      return;
    }

    // Wegen type="number" ist this.eingabeKilometer immer vom Typ "Number"
    let eingabeKilometerNumber : number = Number(this.eingabeKilometer);

    if (eingabeKilometerNumber <= 0.0) {

      await this.zeigeDialog("Kilometer-Wert darf nicht kleiner-gleich Null sein.");
      return;                                  
    }


    let ergebnisMeilen  : Number = 0.0;
    let ergebnisEinheit : String

    switch(this.zieleinheit) {

      case "englischeMeilen":
        ergebnisMeilen  = eingabeKilometerNumber / this.UMRECHNUNGSFAKTOR_MEILEN_ENGLISCH;
        ergebnisEinheit = "engl. Meilen";
      break;

      case "seeMeilen":
        ergebnisMeilen  = eingabeKilometerNumber / this.UMRECHNUNGSFAKTOR_MEILEN_NAUTISCH;
        ergebnisEinheit = "Seemeilen";
      break;

      case "chinesischeMeilen":
        ergebnisMeilen  = eingabeKilometerNumber / this.UMRECHNUNGSFAKTOR_MEILEN_CHINESISCH;
        ergebnisEinheit = "Chinesische Meilen";
      break;

      default: 
        await this.zeigeDialog(`Interner Fehler: Unerwartete Zieleinheit "${this.zieleinheit}".`);
        return
    }

    // Navigation zur Ergebnis-Seite nach https://ionicacademy.com/pass-data-angular-router-ionic-4/
    let ergebnisExtras: NavigationExtras = {
      state: {
        ergebnisMeilen:  ergebnisMeilen,
        ergebnisEinheit: ergebnisEinheit
      }
    };
    this.router.navigate(["ergebnis"], ergebnisExtras);
  }


  /**
   * Alert anzeigen, siehe auch https://ionicframework.com/docs/api/alert
   */
  async zeigeDialog(nachricht: string) {
   
    const meinAlert = 
          await this.alertCtrl.create({header  : "Fehler",
                                       message : nachricht,
                                       buttons : [ "Ok" ]
                                      }); 
    await meinAlert.present();
  }  

}
