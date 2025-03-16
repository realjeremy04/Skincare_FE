export interface IUserQuizResult {
    title: string;
    answer: string;
    point: number;
  }
  
  export interface IUserQuiz {
    _id: string;
    accountId: string;
    scoreBandId: string;
    result: IUserQuizResult[];
    totalPoint: number;
  }
  