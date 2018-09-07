설정 순서
1. Yarn 이든 npm이든 사용해서 node_module 설지

2. 시작
Yarn srart or npm start

3. 최신 상태 유지
yarn upgrade

4. Prettier 설정
Prettier 를 사용하려면 우선 VSCode 익스텐션 마켓플레이스에서 Prettier – Code Formatter 를 설치하세요. 설치하고 나서, Shift + CMD + F 를 누르면 코드가 정리됩니다.


페이지 추가하기 절차
* container(components) 하위 폴더에 컴포넌트 추가
* container(components) 하위 폴더에 컴포넌트 폴더의 index.js 에서 export
* 추가한 container(components) 에서 사용할 Module 생성
* Module 에서는 action, action create, reducer를 구현
* Module 하위 폴더의 index.js 에서 export
* 추가한 action을 container(components)에서 사용