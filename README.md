# 원티드 프리온보딩 프론트엔드 인턴십 선발 과제

원티드 프리온보딩 6월 프론트엔드 인턴십 선발 과제 레포지토리입니다.

https://github.com/walking-sunset/selection-task
<br /><br />

## 1. 데모 영상

배포링크로 대체 <br />
https://wanted-pre-onboarding-yongheon.netlify.app/
<br /><br />

## 2. 기술 스택

- React, React-Router
- Typescript
- Sass
- Axios
  <br /><br />

## 3. 페이지 구현 사항

### 1) /

- 빈 페이지로 접근 시 토큰이 있으면 /todo 경로로, 없으면 /signup 경로로 리다이렉트 처리

### 2) /signup

- 회원가입 기능 구현, 가입 성공 시 /signin 경로로 리다이렉트

- Signup, Signin 컴포넌트는 AuthForm 컴포넌트를 공유하여 UI를 공유<br/>
  각각 회원가입/로그인 api요청을 수행하는 handleSubmit 핸들러를 AuthForm 컴포넌트에 주입

### 3) /signin

- 로그인 기능 구현, 로그인 성공 시 토큰을 설정하고 /todo 경로로 리다이렉트

### 4) /todo

- 할일 목록 구현, 토큰 없이 접속 시 /signin 경로로 리다이렉트

- Todo 컴포넌트에서 useReducer 를 활용하여 할일 리스트 상태를 정의

- CRUD 이벤트 발생 시 api 요청 후 action 을 dispatch 하는 각각의 메소드를 Todo 컴포넌트에 정의하고 하위 컴포넌트 TodoCreate, TodoItem 에 전달.
  <br /><br />

## 4. 기타 구현 사항

- Axios 의 interceptor 를 활용하여 api 요청 시 토큰을 담은 헤더를 매 번 수동으로 삽입하지 않도록 한 번에 처리

- api.ts 파일에서 api 호출 메소드들을 한 곳에서 관리하고 각 요청과 응답의 DTO 를 정의하여 타입 안정성 강화

- React-Router 의 Navigate 를 활용하여 토큰이 없으면 사전에 리다이렉트

- custom hook 을 사용하여 공통 로직 추출
  <br /><br />

## 5. 실행 방법

```
git clone https://github.com/yurjune/wanted-pre-onboarding-frontend.git
cd wanted-pre-onboarding-frontend
npm install
npm start
```
