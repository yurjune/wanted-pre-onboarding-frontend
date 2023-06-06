import axios, { AxiosRequestConfig } from 'axios';
import {
  PostSignupReqDto,
  PostSignupResDto,
  PostSigninReqDto,
  PostSigninResDto,
} from './service.dto';

const axiosConfig: AxiosRequestConfig = {
  baseURL: `https://www.pre-onboarding-selection-task.shop/`,
};
const client = axios.create(axiosConfig);

type PostHeaderType = {
  headers: {
    'Content-Type': 'application/json';
    Authrization?: string;
  };
};

const requests = {
  post: <T, U>(url: string, body: T, headers: PostHeaderType) =>
    client.post<U>(url, body, headers).then((response) => response),
};

const services = {
  postSignup: (body: PostSignupReqDto): Promise<PostSignupResDto> =>
    requests.post('/auth/signup', body, { headers: { 'Content-Type': 'application/json' } }),
  postSignin: (body: PostSigninReqDto): Promise<PostSigninResDto> =>
    requests.post('/auth/signin', body, { headers: { 'Content-Type': 'application/json' } }),
};

export default services;
