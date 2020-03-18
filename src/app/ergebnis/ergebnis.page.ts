import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.page.html',
  styleUrls: ['./ergebnis.page.scss'],
})
export class ErgebnisPage {

  /** Wird auf Seite mit {{eingabeKilometer}} referenziert. */
  private eingabeKilometer: string;

  /** Wird auf Seite mit {{ergebnisMeilen}} referenziert. */
  private ergebnisMeilen: string;

  /** Wird auf Seite mit {{ergebnisEinheit}} referenziert. */
  private ergebnisEinheit: string;


  /**
   * Konstruktor zum Auslesen des Berechnungs-Ergebnisses aus den URL-Parametern.
   */
  constructor(private activatedRoute: ActivatedRoute) {

    this.ergebnisMeilen   = activatedRoute.snapshot.queryParamMap.get( "ergebnisMeilen"   );
    this.ergebnisEinheit  = activatedRoute.snapshot.queryParamMap.get( "ergebnisEinheit"  );
    this.eingabeKilometer = activatedRoute.snapshot.queryParamMap.get( "eingabeKilometer" );
  }

}
