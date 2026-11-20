# productivity

업무 조사, 선행 작업과 의사결정 보고를 지원하는 플러그인입니다.

| 스킬 | 역할 |
| --- | --- |
| [intern](skills/intern/SKILL.md) | Notion과 Slack 내부 링크 조사, 1차 작업 수행, TASK.md 보고 |

`$intern 이 Notion 페이지에 있는 작업을 진행해줘: {URL}`처럼 요청합니다. 결과는 작업 디렉터리의 `{작업명}/TASK.md`에 저장됩니다.

설치는 [저장소 안내](../../README.md)를 참고합니다.

사용자 결정이 필요한 작업에서는 `grill-with-docs`, `grilling`, `domain-modeling` 스킬을 사용할 수 있어야 합니다. `TASK.md`의 frontmatter에는 작업을 수행한 Codex 세션 ID를 기록합니다.
