# RSC Demo

React Server Components(RSC)를 Next.js 없이 직접 구현한 데모 프로젝트입니다.

## 실행 방법

```bash
# 의존성 설치
npm install

# 클라이언트 매니페스트 생성
npm run generate

# 빌드 및 서버 실행
npm run dev

# 또는 개별적으로 실행
npm run build  # 클라이언트 및 서버 빌드
npm run start  # 서버 실행
```

## 주요 기능

- 서버 컴포넌트와 클라이언트 컴포넌트 분리
- RSC 스트림을 통한 서버-클라이언트 통신
- client manifest를 이용한 클라이언트 컴포넌트 교체

## 구조

- `/server` - 서버 컴포넌트 및 서버 코드
- `/src/components` - 클라이언트 컴포넌트
- `/client` - 클라이언트 진입점 
