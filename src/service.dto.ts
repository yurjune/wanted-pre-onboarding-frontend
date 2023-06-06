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
