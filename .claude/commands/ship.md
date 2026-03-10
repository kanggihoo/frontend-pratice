# /ship - Commit, Push, Issue, PR Automation

Automate the full shipping workflow: **commit → push → issue → PR**.

Use this command after completing work on a feature branch. It will stage changes, commit, push, create a GitHub Issue, and open a Pull Request with consistent conventions.

## Arguments

- `$ARGUMENTS`: Optional description of the changes (used to generate commit message, issue, and PR content)

If no arguments are provided, analyze the staged/unstaged changes and generate appropriate messages automatically.

---

## Workflow

Execute the following steps **in order**. Stop and report if any step fails.

### Step 1: Investigate

Before doing anything, gather context:

```
git status
git diff --stat
git log --oneline -3
git branch --show-current
gh repo view --json nameWithOwner,defaultBranchRef
```

- Identify the **current branch name** and the **default branch** (base for PR)
- Read changed/new files to understand what was done
- If there are no changes to commit, inform the user and stop

### Step 2: Stage & Commit

- Stage files explicitly by name (never use `git add .` or `git add -A`)
- Do NOT stage files that look like secrets (`.env`, credentials, keys)
- Write a commit message following **Conventional Commits**:

```
<type>(<optional-scope>): <short summary>

- bullet point describing change 1
- bullet point describing change 2

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

**Commit types**:
| Type | When to use |
|------|-------------|
| `feat` | New feature or content |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no logic change |
| `refactor` | Code restructure, no behavior change |
| `test` | Adding or updating tests |
| `chore` | Build, config, tooling |

### Step 3: Push

```bash
git push origin <current-branch>
```

If the remote branch doesn't exist yet, use `git push -u origin <current-branch>`.

### Step 4: Create GitHub Issue

Use `gh issue create` with this template:

```markdown
## Description

<1-2 sentences: what this change does and why>

## Changes

- [ ] <change 1>
- [ ] <change 2>
- [ ] <change 3>

## Acceptance Criteria

- [ ] <criterion 1>
- [ ] <criterion 2>
```

**Issue conventions**:
- Title: `<type>: <concise description>` (match the commit type)
- Labels: add relevant labels (`enhancement`, `bug`, `documentation`, etc.). Create labels with `gh label create` if they don't exist
- Keep description focused and actionable

### Step 5: Create Pull Request

Use `gh pr create` with base set to the **default branch** and this template:

```markdown
## Summary

- <bullet 1: what changed>
- <bullet 2: what changed>
- <bullet 3: why it matters>

Closes #<issue-number>

## Changes

| File | Description |
|------|-------------|
| `path/to/file1` | <what was changed> |
| `path/to/file2` | <what was changed> |

## Test Plan

- [ ] <verification step 1>
- [ ] <verification step 2>
- [ ] <verification step 3>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

**PR conventions**:
- Title: match commit message (same `<type>: <summary>` format)
- Always include `Closes #<issue-number>` to auto-link the issue
- Test Plan should contain concrete, actionable verification steps
- Keep the summary concise (3 bullets max)

### Step 6: Report Results

After all steps complete, report:

```
Commit:  <hash> <message>
Push:    <branch> → origin/<branch>
Issue:   <url>
PR:      <url>
```

---

## Error Handling

- If `gh` is not authenticated, tell the user to run `gh auth login`
- If push fails due to upstream changes, suggest `git pull --rebase` first
- If on the default branch (main/master), warn the user and ask before proceeding
- Never force push. Never use `--no-verify`
