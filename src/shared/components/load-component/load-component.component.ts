import { Component, OnDestroy, OnInit } from "@angular/core";
import { LoadComponentService } from "src/shared/services/load-component.service";

@Component({
  selector: 'app-load-component',
  templateUrl: './load-component.component.html',
  styleUrls: ['./load-component.component.scss']
})
export class LoadComponent implements OnInit, OnDestroy {

  public loader: string = '';
  private readonly SECOND_UNITS: number = 1000;
  private readonly QUARTER_SECOND = this.SECOND_UNITS / 4;
  private interval;

  constructor(public loadComponentService: LoadComponentService) {}

  public ngOnInit(): void {
    this.interval = setInterval(() => {
      this.loader += '.';
      if (this.loader.length === 4) {
        this.loader = '';
      }
    }, this.QUARTER_SECOND);
  }

  public ngOnDestroy(): void {
    this.interval.clearInterval();
  }

}