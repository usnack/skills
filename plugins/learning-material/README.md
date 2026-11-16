# learning-material

교육 과정의 단원 기획과 학습 자료 제작을 지원하는 플러그인입니다.

## 포함된 스킬

- [chapter-design](skills/chapter-design/SKILL.md): 커리큘럼, 훈련 대상, 훈련 목표를 바탕으로 인터뷰를 거쳐 이론, 미션, 프로젝트 단원 기획서를 작성합니다.

chapter-design을 실행하려면 별도로 `grill-with-docs`, `grilling`, `domain-modeling` 스킬을 사용할 수 있어야 합니다.

## 설치

```bash
codex plugin marketplace add usnack/skills
codex plugin add learning-material@usnack-skills
```

GitHub에 변경 사항이 반영된 뒤 설치할 수 있습니다. 설치 후 새 세션에서 확인합니다.

개별 스킬만 설치할 수도 있습니다.

```bash
npx skills add https://github.com/usnack/skills/tree/main/plugins/learning-material/skills/chapter-design -a codex
```
