import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.page.html',
  styleUrls: ['./ergebnis.page.scss'],
})
export class ErgebnisPage implements OnInit {

  ngOnInit(): void {}

  ergebnisMeilen: Number;

  ergebnisEinheit: String;


  /** Konstruktor zum Empfang des Berechnungs-Ergebnis in Form von Extras */
  constructor(private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(params => {

      if (this.router.getCurrentNavigation().extras.state) {

        this.ergebnisMeilen  = this.router.getCurrentNavigation().extras.state.ergebnisMeilen;
        this.ergebnisEinheit = this.router.getCurrentNavigation().extras.state.ergebnisEinheit;

        console.log(`Ergebnis empfangen: ${this.ergebnisMeilen} ${this.ergebnisEinheit}`);
      }
    });

    
  }

}
