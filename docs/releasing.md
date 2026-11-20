# 배포 절차

1. `npm run validate`와 `git diff --check`를 실행합니다.
2. `npx skills add . --full-depth --list`로 스킬 목록을 확인합니다. 이 명령은 설치하지 않습니다.
3. 별도 테스트 환경에서 `codex plugin marketplace add .`와 `codex plugin add project@usnack-skills`로 설치를 확인합니다.
4. 새 세션에서 대표 요청을 실행해 스킬 선택과 템플릿 접근을 확인합니다. init-module은 임시 대상 디렉터리로 확인합니다.
5. 변경한 플러그인의 plugin.json 버전과 CHANGELOG.md를 함께 갱신합니다. 버전은 포함된 스킬 폴더 전체(템플릿과 참고 자료 포함)의 마지막 Git 커밋 날짜를 Asia/Seoul 기준 `YY-MM-DD-시퀀스` 형식으로 기록합니다. 여러 스킬이 포함된 경우 가장 최근 날짜를 사용합니다. 버전 메타데이터만 바꾼 날짜는 기준으로 삼지 않습니다. 시퀀스는 플러그인별로 관리하며, 해당 날짜의 첫 배포는 `1`부터 시작하고 같은 날짜로 추가 배포할 때마다 1씩 증가시킵니다. 기준 날짜가 바뀌면 시퀀스를 `1`로 초기화합니다.
6. 검토한 변경을 커밋하고 GitHub에 반영합니다. 태그는 `project-v26-10-21-1`처럼 플러그인 이름과 버전을 사용합니다.

커밋·푸시·태그 생성은 사용자가 요청한 범위에서 수행합니다.
현재 라이선스는 미정입니다. 공개 재사용 조건을 정하면 LICENSE와 플러그인 메타데이터에 함께 반영합니다.

## 근거 문서

- [OpenAI 플러그인 패키징](https://developers.openai.com/plugins/build/plugins)
- [Skills CLI 설치 명령](https://github.com/vercel-labs/skills/blob/main/docs/commands.md)
- [Skills CLI 탐색 규칙](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md)
