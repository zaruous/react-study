# React-Study

학습 목적으로 만든 React/nodejs 프로젝트.

1.express-erver
  nodejs express server. 
  mysql 연동 및 database poll, jest unit test. 단리복리 계산, 실시간 검색어, 환율, 카카오맵 연동,카카오로그인
  
2.my-app
  react 클라이언트,카카오 로그인, 인증처리 개발중.





## 환경설정
1. 사용자 환경설정은 config.json 파일에 정의하고 있으며 
데이터베이스는 아래와 같이 데이터베이스 생성 및 계정 생성 필요.
"mysql": {
      "host": "localhost",
      "port": 3306,
      "user": "tester1",
      "password":"tester1",
      "database" : "investar",
      "timeout" : 10000
}
