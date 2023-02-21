export interface SparklineChartDataItem<V = number, L = string> {
    id: string | number;
    x: L;
    y: V;
  }