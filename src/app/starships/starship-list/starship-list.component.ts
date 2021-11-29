import { Component, OnDestroy, OnInit } from "@angular/core";
import { forkJoin, of, Subscription } from "rxjs";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { Pilot } from "src/app/pilots/pilot.model";
import { PilotService } from "src/app/pilots/pilots.service";
import { Starship } from "./starship.model";
import { StarshipService } from "./starship.service";

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss']
})
export class StarshipListComponent implements OnInit, OnDestroy {

  public starships: Array<Starship> = new Array();
  private _starshipsSub: Subscription;

  constructor(private _starshipsService: StarshipService, private _pilotService: PilotService) {

  }

  public ngOnInit(): void {  
    this._starshipsSub = this._starshipsService.starshipsChanged.subscribe((starships) => {
      this.starships = starships;
    })
  }

  public getPilots(): void {
  }

  public ngOnDestroy(): void {
    this._starshipsSub.unsubscribe();
  }

}