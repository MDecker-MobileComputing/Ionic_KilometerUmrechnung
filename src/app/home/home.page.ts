import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  readonly UMRECHNUNGSFAKTOR_MEILEN_ENGLISCH = 1.609344;

  readonly UMRECHNUNGSFAKTOR_MEILEN_NAUTISCH = 1.852;

  readonly UMRECHNUNGSFAKTOR_MEILEN_CHINESISCH = 0.5


  /** Two-Way-Way-Binding definiert mit [(ngModel)]="eingabeKilometer" */
  private eingabeKilometer = "";

  /** Two-Way-Binding definiert in ion-radio-group mit [(ngModel)]="zieleinheit" */
  private zieleinheit = "englischeMeilen";


  /**
   * Konstruktor für Dependency Injection.
   */
  constructor( private alertCtrl: AlertController,
               private navCtrl  : NavController   ) {}

  /**
   * Button-Event-Handler für Umrechnung@eslint/config
   */
  async onBerechnenButton() {

    if (this.eingabeKilometer === null || this.eingabeKilometer.length === 0) {

      await this.zeigeFehlerDialog("Bitte Kilometer-Wert eingeben!");
      return;
    }

    // Wegen type="number" ist this.eingabeKilometer immer vom Typ "Number"
    const eingabeKilometerNumber = Number(this.eingabeKilometer);
    if (eingabeKilometerNumber <= 0.0) {

      await this.zeigeFehlerDialog("Kilometer-Wert darf nicht kleiner-gleich Null sein.");
      return;
    }


    let ergebnisMeilen  = 0.0;
    let ergebnisEinheit = "";

    switch (this.zieleinheit) {

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
        ergebnisEinheit = "chin. Meilen";
      break;

      default:
        await this.zeigeFehlerDialog(`Interner Fehler: Unerwartete Zieleinheit "${this.zieleinheit}".`);
        return;
    }

    ergebnisMeilen = this.kommastellenAbschneiden(ergebnisMeilen, 2);

    const navigationTarget = `/ergebnis?ergebnisMeilen=${ergebnisMeilen}&ergebnisEinheit=${ergebnisEinheit}&eingabeKilometer=${eingabeKilometerNumber}`;
    this.navCtrl.navigateForward(navigationTarget);
  }


  /**
   * Alert (Dialog) mit Fehler anzeigen, siehe auch https://ionicframework.com/docs/api/alert
   */
  async zeigeFehlerDialog(nachricht: string) {

    const meinAlert =
          await this.alertCtrl.create({ header  : "Fehler",
                                        message : nachricht,
                                        buttons : [ "Ok" ]
                                      });
    await meinAlert.present();
  }


  /**
   * Hilfs-Methode zum Abschneiden von Nachkommastellen
   * nach https://stackoverflow.com/a/9232092
   *
   * @param number  Dezimalzahl, von der Nachkommastellen abgeschnitten werden sollen.
   * @param nachkommastellen  Anzahl Nachkommastellen, die übrig bleiben soll.
   */
  kommastellenAbschneiden(zahl: number, nachkommastellen: number): number {

    const faktor = Math.pow(10, nachkommastellen);

    const zahlMalFaktor = zahl * faktor;

    let zahlAbgeschnitten = 0.0;

    if ( zahlMalFaktor < 0 ) {

      zahlAbgeschnitten = Math.ceil(zahlMalFaktor);

    } else {

      zahlAbgeschnitten = Math.floor(zahlMalFaktor);
    }

    return zahlAbgeschnitten / faktor;
  }

}