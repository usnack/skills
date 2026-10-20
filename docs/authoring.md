# 작성 규칙

## 플러그인과 스킬

- 플러그인 이름과 폴더 이름을 일치시키고 소문자 kebab-case를 사용합니다.
- 스킬 이름은 저장소 전체에서 고유하게 지정합니다. SKILL.md의 name과 폴더 이름을 일치시킵니다.
- SKILL.md는 YAML frontmatter의 name과 description으로 시작합니다. 현재 검증기는 두 값을 한 줄 문자열로 작성하는 규칙을 사용합니다.
- description에는 무엇을 하는지와 언제 사용하는지를 작성합니다.
- 상세 자료는 references/, 실행 도구는 scripts/, 템플릿은 assets/에 필요할 때만 추가합니다.
- 개별 설치가 가능하도록 실행에 필요한 파일은 스킬 폴더 안에 포함하고 상대 경로로 참조합니다.
- 저장소 docs/는 유지보수 문서입니다. 설치된 스킬의 실행 의존성으로 사용하지 않습니다.
- 새 플러그인을 추가하면 marketplace.json과 루트 README의 목록도 갱신합니다.

## 검증

`npm run validate`는 저장소 규칙에 따른 메타데이터·경로·이름 중복 및 Markdown 상대 링크를 검사합니다.
JSON Schema 전체 검증이나 실제 에이전트 동작 검증을 대체하지 않습니다.
스킬 동작을 바꾸면 대표 요청과 적용하면 안 되는 요청을 새 세션에서 확인합니다.
`npm run fetch-project-skills`는 plugins/*/skills의 스킬만 개발용 디렉터리에 연결합니다.
