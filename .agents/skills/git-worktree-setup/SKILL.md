---
name: git-worktree-setup
description: Git worktree를 활용해 독립적인 작업 환경을 셋업하는 스킬. "worktree 만들어줘", "독립적인 환경에서 작업하고 싶어", "여러 모델에게 동시에 작업 돌리고 싶어", "병렬로 개발하고 싶어", "격리된 환경 셋업해줘" 등의 요청이 있을 때 사용한다.
---

# Git Worktree Setup

본격적인 코드 작업 전에 격리된 worktree 환경을 구성한다.

## 실행 절차

### 1. 상태 파악 및 필요 정보 수집 (먼저 한 번에)

아래를 모두 확인한 뒤, 문제나 부족한 정보가 있으면 사용자에게 **한 번에** 알리고 받는다.

```bash
git rev-parse --is-inside-work-tree  # Git 리포지토리인지 확인
git status --porcelain               # uncommitted changes 확인
git worktree list                    # 기존 worktree 목록 확인
```

확인 후 사용자에게 보고할 항목:
- Git 리포지토리가 아니면 → 중단
- uncommitted changes가 있으면 → 정리(commit/stash/discard) 요청
- 브랜치명을 아직 모르면 → 작업 내용 확인 후 제안, 승인 받기
- 여러 모델에게 동시에 돌리는지 불명확하면 → 에이전트 식별자 필요 여부 확인

> 한 번의 메시지로 필요한 모든 정보를 요청한다. 단계마다 중간에 끊지 않는다.

### 2. .gitignore에 `.worktrees/` 등록

```bash
grep -qxF '.worktrees/' .gitignore 2>/dev/null || echo '.worktrees/' >> .gitignore
```

### 3. 브랜치명 / worktree 경로 결정

브랜치 네이밍: `<prefix>/<작업명>` (소문자 + 하이픈)
- `feat/`, `fix/`, `refactor/`, `docs/`, `chore/`, `test/`

worktree 경로: 브랜치명의 `/`를 `-`로 변환
- `feat/add-auth` → `.worktrees/feat-add-auth`

에이전트 식별자가 있으면 suffix로 추가: `feat/add-auth-claude` → `.worktrees/feat-add-auth-claude`

이미 존재하는 경로는 숫자 suffix로 자동 해소 (`-2`, `-3`, ...).

### 4. Worktree 생성

```bash
mkdir -p .worktrees
git worktree add .worktrees/<worktree-name> -b <branch-name>
```

생성 후 경로, 브랜치명, 기반 브랜치를 사용자에게 알린다.

### 5. 이후 작업 규칙

> **모든 파일 작업은 반드시 worktree 경로 안에서 수행한다.**

```
✅ .worktrees/feat-add-auth/src/main.py
❌ ./src/main.py  ← 루트(main 브랜치)
```

작업 완료 후 commit, merge, worktree 삭제는 **사용자가 직접** 한다. 자동으로 하지 않는다.
