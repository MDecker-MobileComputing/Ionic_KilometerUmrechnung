import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.page.html',
  styleUrls: ['./ergebnis.page.scss'],
})
export class ErgebnisPage {

  /** Wird auf Seite mit {{eingabeKilometer}} referenziert. */
  public eingabeKilometer: string | null;

  /** Wird auf Seite mit {{ergebnisMeilen}} referenziert. */
  public ergebnisMeilen: string | null;

  /** Wird auf Seite mit {{ergebnisEinheit}} referenziert. */
  public ergebnisEinheit: string | null;


  /**
   * Konstruktor zum Auslesen des Berechnungs-Ergebnisses aus den URL-Parametern.
   */
  constructor( private activatedRoute: ActivatedRoute ) {

    this.ergebnisMeilen   = activatedRoute.snapshot.queryParamMap.get( "ergebnisMeilen"   );
    this.ergebnisEinheit  = activatedRoute.snapshot.queryParamMap.get( "ergebnisEinheit"  );
    this.eingabeKilometer = activatedRoute.snapshot.queryParamMap.get( "eingabeKilometer" );
  }

}