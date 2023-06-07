import { TodoType } from './model';

type Status = {
  status: number;
};

export type PostSignupReqDto = {
  email: string;
  password: string;
};
export type PostSignupResDto = Status;

export type PostSigninReqDto = PostSignupReqDto;
export type PostSigninResDto = Status & {
  data: {
    access_token: string;
  };
};

export type CreateTodosReqDto = {
  todo: TodoType['todo'];
};
export type CreateTodosResDto = Status & {
  data: TodoType;
};

export type GetTodosResDto = Status & {
  data: TodoType[];
};

export type UpdateTodoReqDto = {
  todo: TodoType['todo'];
  isCompleted: TodoType['isCompleted'];
};
export type UpdateTodoResDto = Status & {
  data: TodoType;
};

export type DeleteTodoResDto = Status;
