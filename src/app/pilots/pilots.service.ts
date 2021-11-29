import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, forkJoin, Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Pilot } from "./pilot.model";

@Injectable({
  providedIn: 'root'
})
export class PilotService {

  private _baseUrl = `${environment.baseUrl}/people`
  private _pilots: Array<Pilot> = new Array();
  private _currentPage: number = 1;
  public allPilotLoadedSub = new Subject<Array<Pilot>>();
  public pilotPage = 0;
  public pilotsChanged = new BehaviorSubject<Array<Pilot>>([]);

  constructor(private _http: HttpClient) {

  }
  
  public getPilotById(pilotId: number): Pilot {
    return this._pilots[pilotId - 1]
  }

  public getPilotsByPage(page: number): Observable<any> {
    return this._http.get(`${this._baseUrl}/?page=${page}`);
  }

  public getAllPilots(): Observable<Array<Pilot>> {
    this._http.get<any>(`${this._baseUrl}/?page=${this._currentPage}`).subscribe((data) => {
      this._pilots = data.results;
      let requests = [];
      const pages = Math.floor(((data.count - 1) / 10) + 1);

      for (let i = 2; i <= pages; i++) {
        requests.push(this.getPilotsByPage(i));
      }

      forkJoin(requests).subscribe((data) => {        
        data.forEach((element: any) => {
          this._pilots = this._pilots.concat(element.results);
        })
        
      }, (error)=> {}, 
        () => {
          this.allPilotLoadedSub.next(this._pilots.slice());
          this.allPilotLoadedSub.complete();
          this.pilotsChanged.next(this._pilots.slice());
        }
      )
    });
    return this.allPilotLoadedSub.asObservable();
  }

}