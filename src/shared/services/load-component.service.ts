import { Injectable } from "@angular/core";

@Injectable()
export class LoadComponentService {

  private _loading: boolean = false;

  public startLoading() {
    this._loading = true;
  }

  public stopLoading() {
    this._loading = false;
  }

  public isLoading() {
    return this._loading;
  }

}