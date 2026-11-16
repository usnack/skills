# 프로젝트 개요

이 저장소는 스킬을 카테고리별 Codex 플러그인으로 관리합니다.
마켓플레이스 이름은 `usnack-skills`입니다.

- `.agents/plugins/marketplace.json`: 설치 가능한 플러그인의 목록과 경로입니다.
- `plugins/<category>/plugin.json`: 카테고리에 해당하는 플러그인의 이름·버전·설명입니다.
- `plugins/<category>/skills/<name>/`: 개별 스킬의 원본입니다.
- `docs/`: 저장소를 유지보수하는 에이전트를 위한 프로젝트 지식입니다.
- `scripts/`: 저장소 검증과 로컬 개발용 연결 도구입니다.

현재 project 플러그인에 init-module, productivity 플러그인에 intern이 있습니다. 새 카테고리는 실제로 배포할 스킬이 생겼을 때 추가합니다.
카테고리는 함께 설치할 작업 묶음으로 나눕니다. 스킬 원본은 한 곳에서만 관리합니다.
AGENTS.md와 CLAUDE.md는 docs/README.md로 연결하는 역할을 유지합니다.
