import axios from 'axios';
import {
  PostSignupReqDto,
  PostSignupResDto,
  PostSigninReqDto,
  PostSigninResDto,
  GetTodosResDto,
  CreateTodosReqDto,
  CreateTodosResDto,
  UpdateTodoReqDto,
  UpdateTodoResDto,
  DeleteTodoResDto,
} from './service.dto';

axios.defaults.baseURL = 'https://www.pre-onboarding-selection-task.shop/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const clientWithoutToken = axios.create();

const requestsWithoutToken = {
  post: <T, U>(url: string, body: T) =>
    clientWithoutToken.post<U>(url, body).then((response) => response),
};

const client = axios.create();
client.interceptors.request.use((config) => {
  const accessToken = window.localStorage.getItem('access_token') ?? '';
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

const requests = {
  get: <T>(url: string) => client.get<T>(url).then((response) => response),
  post: <T, U>(url: string, body: T) => client.post<U>(url, body).then((response) => response),
  put: <T, U>(url: string, body: T) => client.put<U>(url, body).then((response) => response),
  delete: <T>(url: string) => client.delete<T>(url).then((response) => response),
};

const services = {
  postSignup: (body: PostSignupReqDto): Promise<PostSignupResDto> =>
    requestsWithoutToken.post('/auth/signup', body),
  postSignin: (body: PostSigninReqDto): Promise<PostSigninResDto> =>
    requestsWithoutToken.post('/auth/signin', body),

  getTodos: (): Promise<GetTodosResDto> => requests.get('/todos'),
  createTodos: (body: CreateTodosReqDto): Promise<CreateTodosResDto> =>
    requests.post('/todos', body),
  updateTodos: (id: number, body: UpdateTodoReqDto): Promise<UpdateTodoResDto> =>
    requests.put(`/todos/${id}`, body),
  deleteTodos: (id: number): Promise<DeleteTodoResDto> => requests.delete(`/todos/${id}`),
};

export default services;
