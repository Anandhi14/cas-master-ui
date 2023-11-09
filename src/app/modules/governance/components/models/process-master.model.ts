export interface processMaster 
{
    processId:string
    level:any
    processName: string;
    description: string;
    criticality:any
    MatuarityLevel:any
    activeProcess:any
    owner:    {
      id: number,
      name: string,
      functionGroup: {
          "id": number,
          "name": string
      }
  },
    metrics:any
    risks:any
    parentProcess: any;
    matricCategory: any[];
    impectArea: any[];
    enablers: any[];
    rasci: any[];
    lastModified:any
    function:any
    subFunction:any       
  }