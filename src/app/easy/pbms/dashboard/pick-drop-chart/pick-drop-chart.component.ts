import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ServiceRequestSummary } from '../../../models/ServiceRequestSummary';
import { CommonService } from '../../../services/common.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'ngx-pick-drop-chart',
  templateUrl: './pick-drop-chart.component.html',
  styleUrls: ['./pick-drop-chart.component.scss']
})
export class PickDropChartComponent implements OnInit {
  custhistory = 'red';
  data : ServiceRequestSummary[];
  private svg: any;
  private margin = 20;
  private width = 650;
  private height = 400;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;
  color = [];
  constructor(private _CommonService: CommonService, private _sessionService: SessionService) { }

  ngOnInit(): void {
    this.getSummary();
}

getSummary(){
  this._CommonService.commonGet('ServiceRequest/getSummary?roleid=' + this._sessionService.getRole() + "&&branchcode=" + this._sessionService.getBranch() + "&&userid=" + this._sessionService.getUser() + "&&servicecode=" + this._sessionService.getPickandDrop())
  .subscribe(
    response => {
      this.data = JSON.parse(JSON.stringify(response)).summary;
      this.data.forEach(x => {
        this.color.push(x.color);
      });
      this.createSvg();
      this.createColors();
      this.drawChart();
      d3.select("text").style("fill", "white")
    },
    error => {
    },
    () => {
    },
  );
}

  private createSvg(): void {
    this.svg = d3.select("figure#piepick")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
}

private createColors(): void {
  this.colors = d3.scaleOrdinal()
  .domain(this.data.map(d => d.count.toString()))
  .range(this.color);
}

private drawChart(): void {
  // Compute the position of each group on the pie:
  const piepick = d3.pie<any>().value((d: any) => d.count);

  // Build the pie chart
  this.svg
  .selectAll('pieces')
  .data(piepick(this.data))
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(this.radius)
  )
  .attr('fill', (d: any, i: any) => (this.colors(i)))
  .attr("stroke", "white")
  .style("stroke-width", "2px");

  // Add labels
  const labelLocation = d3.arc()
  .innerRadius(100)
  .outerRadius(this.radius);

  this.svg
  .selectAll('pieces')
  .data(piepick(this.data))
  .enter()
  .append('text')
  .text((d: any)=> d.data.status_code + "(" + d.data.count + ")")
  .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
  .style("text-anchor", "middle")
  .style("font-size", 12)
  .selectAll("text").style("fill", "red");

  
  
}

}
