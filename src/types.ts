export interface ApiEndpoint {
  id: string;
  name: string;
  endpoint: string;
  url: string;
  description: string;
  detail: string;
  tag: string;
  icon: string;
  color: string;
  bgColor: string;
  accentColor: string;
}

export interface StatsData {
  totalCalls: number;
  todayCalls: number;
  avgLatency: number;
  sla: string;
}
