type Status = {
  status: number;
};

export type PostSignupReqDto = {
  email: string;
  password: string;
};

export type PostSignupResDto = Status;
