import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { map, switchMap, tap } from "rxjs/operators";
import { StarshipService } from "src/app/starships/starship-list/starship.service";
import { Pilot } from "../pilot.model";
import { PilotService } from "../pilots.service";

@Component({
  selector: 'app-pilot-detail',
  templateUrl: 'pilot-detail.component.html',
  styleUrls: ['pilot-detail.component.scss']
})
export class PilotDetailComponent implements OnInit {

  public pilot: Pilot = new Pilot();

  constructor(
    private _route: ActivatedRoute, 
    private _pilotService: PilotService,
    private _starshipService: StarshipService) {

  }

  public ngOnInit(): void {
    this._route.params
    .subscribe((params) => {
      this._starshipService.allStarshipLoadedSub.subscribe(
        (starships)=> {  
          this._pilotService.pilotsChanged.subscribe((pilots) => {
            if (pilots.length > 0) {
              this.pilot = pilots[+params.pilotId - 1];
              this.pilot.starships = starships.filter((starship) => {
                let isOnArray = false;
                starship.pilots.forEach((pilot) => {  
                  //NEEDS HELPER
                  const pilotId = (pilot.url.split('/').join('').replace('https:swapi.devapipeople', ''));
                  if (+pilotId === +params.pilotId) {
                    isOnArray = true;
                  }
                })
                return isOnArray;
              }).map((starship) => {
                return starship.name
              }) 
            }         
          })      
        }
      )
    })
  }
}