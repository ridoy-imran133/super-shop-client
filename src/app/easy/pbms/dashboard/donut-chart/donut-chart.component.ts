import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {
  scaleBand as d3_scaleBand,
  scaleLinear as d3_scaleLinear,
  scaleOrdinal as d3_scaleOrdinal
} from 'd3-scale';
import {
  max as d3_max
} from 'd3-array';
import 
{
  pie as d3_pie,
  arc as d3_arc,
  PieArcDatum
} from 'd3-shape';

export interface DonutChartDataItem {
  id: string;
  x: string;
  y: string;
}

export interface PieArcModel {
  path: string;
  color: string;
}

@Component({
  selector: 'ngx-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent<EntityType = DonutChartDataItem> implements AfterViewInit {
  private _updateLayout$ = new Subject<void>();

  width: number;
  height: number;
  arcs: PieArcModel[];

  @Input() xValue = 'x';
  @Input() yValue = 'y';
  @Input() data: EntityType[] = [];
  @Input() radius: number;
  @Input() arcWidth = 40;

  @ViewChild('svgContainer', { static: false, read: ElementRef }) svgContainer: ElementRef<HTMLDivElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._updateLayout$.next();
  }

  constructor() {
    this._updateLayout$
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this._render();
      })
  }

  ngAfterViewInit() {
    this._updateLayout$.next();
  }

  private _render() {
    this.width = this.svgContainer.nativeElement.offsetWidth;
    this.height = this.svgContainer.nativeElement.offsetHeight;
    const radius = this.radius ||  (Math.min(this.width, this.height) / 2);
  
    const colorScale = d3_scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]); 

    const pieLayout = d3_pie<EntityType>()
      .sort(null)
      .value((d, i) => +d[this.yValue]);

    const arcLayout = d3_arc<PieArcDatum<EntityType>>()
      .outerRadius(radius - 10)
      .innerRadius(radius - 10 - this.arcWidth);


    const pies = pieLayout(this.data);

    this.arcs = pies.map((pie) => arcLayout(pie)).map((d, i) => ({
      path: d,
      color: colorScale('' + i)
    }));
  }

}
