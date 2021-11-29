import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AsyncSubject, BehaviorSubject, forkJoin, Observable, Subject } from "rxjs";
import { PilotService } from "src/app/pilots/pilots.service";
import { environment } from "src/environments/environment";
import { LoadComponentService } from "src/shared/services/load-component.service";
import { Starship } from "./starship.model";

@Injectable({
  providedIn: 'root'
})
export class StarshipService {

  private _baseUrl = `${environment.baseUrl}/starships`
  private _currentPage: number = 1;
  private _starships: Array<Starship> = [];
  public starshipsChanged = new BehaviorSubject<Array<Starship>>([]);
  public allStarshipLoadedSub = new AsyncSubject<Array<Starship>>();

  constructor(private _http: HttpClient, private _pilotService: PilotService, private loadComponentService: LoadComponentService) {

  }

  public getStarshipsByPage(page: number) {
    return this._http.get(`${this._baseUrl}/?page=${page}`);
  }

  private getStarships(): Array<Starship> {
    return this._starships.slice();
  }

  public getAllStarships(): Observable<Array<Starship>> {
    this.loadComponentService.startLoading()
    this._http.get<{count: number, next: string, previous: string, results: Array<Starship>}>(`${this._baseUrl}/?page=${this._currentPage}`).subscribe((data) => {
      this._starships = data.results;
      let requests = [];
      const pages = Math.floor(((data.count - 1) / 10) + 1);

      for (let i = 2; i <= pages; i++) {
        requests.push(this.getStarshipsByPage(i));
      }

      forkJoin(requests).subscribe((data) => {
        data.forEach((element: any) => {
          this._starships = this._starships.concat(element.results);
        })
       }, (error)=> {}, 
        () => {
          this._pilotService.getAllPilots().subscribe((pilots) => {
            this._starships = this._starships.map((starship) => {
              starship.pilots = starship.pilots.map((pilot) => {
                //NEEDS HELPER
                const pilotId = ((pilot).split('/').join('').replace('https:swapi.devapipeople', ''));
                return pilots[pilotId - 1]
              });            
              return starship;
            })
            this.loadComponentService.stopLoading()
            this.starshipsChanged.next(this.getStarships());
          }, (error) => {}, () => {});
          this.allStarshipLoadedSub.next(this.getStarships())
          this.allStarshipLoadedSub.complete();
        }
      )
    });
    return this.allStarshipLoadedSub.asObservable();
  }

}