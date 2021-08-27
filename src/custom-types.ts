export interface IQuestions {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IAnswers {
  question: string;
  anse: string;
  correct: boolean;
  difficulty: string;
}

export interface IUserStorage {
  name: string;
  password: string;
  score: number;
  date: Date;
}
