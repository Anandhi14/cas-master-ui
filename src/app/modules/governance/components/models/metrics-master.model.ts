export interface MetricsMaster 
{
  metricsId:string;
  criticality:any
  group:any;
  metricsName:string
  description:string
  owner:any;
  matricCategory: any[];
  impectArea: any[];
  enablers: any[];
  rasci: any[];
  activeMetrics:any;
  lastModified:any ; 
  location:any;
  selectedAcessList:any ; 
  AggregationType:any;
  maturityLevel :any;       
  calculationCurrencies :any;       
  reportingfrequency :any;       
  reportingformats :any; 
  calculation:any ;
  controlMetric:any;
  dataSource:any 
  Benchmark:any 
  autoCalculation:any
  autoSource:any
  usedFor:any 
  upperThreshold  
  lowerThreshold  
  target 
  subFunction
  function,
  lowerValue,
  upperValue,
  hashValue,
  noGoal
  }