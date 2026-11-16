# usnack-skills

재사용 가능한 에이전트 스킬을 카테고리별 Codex 플러그인으로 제공하는 저장소입니다.
마켓플레이스 이름은 `usnack-skills`이며, 개별 스킬로도 설치할 수 있습니다.

## 제공하는 플러그인

| 플러그인 | 스킬 | 용도 |
| --- | --- | --- |
| [project](plugins/project/README.md) | init-module | 프로젝트 지식 문서와 모듈 구조 초기화·갱신 |
| [productivity](plugins/productivity/README.md) | intern | 업무 맥락 조사, 1차 수행과 의사결정 보고 |
| [learning-material](plugins/learning-material/README.md) | chapter-design | 인터뷰 기반 이론, 미션, 프로젝트 단원 기획 |

## Codex 플러그인 설치

아래 명령을 지원하는 Codex CLI에서 실행합니다.

```bash
codex plugin marketplace add usnack/skills
codex plugin add project@usnack-skills
codex plugin add productivity@usnack-skills
codex plugin add learning-material@usnack-skills
```

플러그인은 카테고리 안의 스킬을 함께 설치합니다. 설치 후 새 세션에서 확인합니다.
이 명령은 변경 사항이 GitHub에 반영된 이후 사용할 수 있습니다.

## 개별 스킬 설치

```bash
npx skills add https://github.com/usnack/skills/tree/main/plugins/project/skills/init-module -a codex
```

기본은 현재 프로젝트 설치입니다. 사용자 전역에 설치하려면 `-g`를 추가합니다.
저장소 전체에서 선택하려면 중첩된 플러그인 경로까지 탐색하도록 지정합니다.

```bash
npx skills add usnack/skills --full-depth --skill init-module -a codex
```

## 로컬 개발

Node.js로 저장소 검증과 프로젝트용 스킬 연결을 실행합니다.

```bash
npm run validate
npm run fetch-project-skills
```

두 번째 명령은 `.agents/skills/`와 `.claude/skills/`에 개발용 링크를 만듭니다.
플러그인 설치까지 확인하려면 저장소 루트에서 실행합니다.

```bash
codex plugin marketplace add .
codex plugin add project@usnack-skills
codex plugin add productivity@usnack-skills
codex plugin add learning-material@usnack-skills
```

같은 스킬을 개발용 링크와 플러그인으로 동시에 로드하지 않도록 테스트 환경을 구분합니다.
작성 및 배포 규칙은 [프로젝트 문서](docs/README.md)를 참고합니다.
라이선스는 아직 지정하지 않았습니다.
