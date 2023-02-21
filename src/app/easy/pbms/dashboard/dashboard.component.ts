import { Component, OnInit } from '@angular/core';
import { OrderProfitChartSummary } from '../../../@core/data/orders-profit-chart';
import { ServiceRequestSummary } from '../../models/ServiceRequestSummary';
import { CommonService } from '../../services/common.service';
import { SessionService } from '../../services/session.service';
import * as d3 from 'd3';
import { SparklineChartDataItem } from '../../models/SparklineChartDataItem';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  //another pie chart

}
