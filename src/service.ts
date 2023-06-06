import axios from 'axios';
import {
  PostSignupReqDto,
  PostSignupResDto,
  PostSigninReqDto,
  PostSigninResDto,
} from './service.dto';

axios.defaults.baseURL = 'https://www.pre-onboarding-selection-task.shop/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const clientWithoutToken = axios.create();
const requestsWithoutToken = {
  post: <T, U>(url: string, body: T) =>
    clientWithoutToken.post<U>(url, body).then((response) => response),
};

const accessToken = window.localStorage.getItem('access_token') ?? '';
const client = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
const requests = {
  get: <T>(url: string) => client.get<T>(url).then((response) => response),
  post: <T, U>(url: string, body: T) => client.post<U>(url, body).then((response) => response),
};

const services = {
  postSignup: (body: PostSignupReqDto): Promise<PostSignupResDto> =>
    requestsWithoutToken.post('/auth/signup', body),
  postSignin: (body: PostSigninReqDto): Promise<PostSigninResDto> =>
    requestsWithoutToken.post('/auth/signin', body),
};

export default services;
