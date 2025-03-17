export interface IAnswer {
    title: string;
    point: number;
  }
  
  export interface IQuestion {
    _id: string;
    title: string;
    answers: IAnswer[];
  }