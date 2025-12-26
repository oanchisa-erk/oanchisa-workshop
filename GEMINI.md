# GEMINI.md - Generic AI Assistant Guidelines

## 📚 Table of Contents

1. Executive Summary
2. Quick Start Guide
3. Project Context
4. Critical Safety Rules
5. Development Environment
6. Development Workflows
7. Context Management & Short Codes
8. Technical Reference
9. Development Practices
10. Lessons Learned
11. Troubleshooting
12. Appendices

## Executive Summary

This document provides comprehensive guidelines for an AI assistant working on any software development project. It establishes safe, efficient, and well-documented workflows to ensure high-quality contributions.

### Key Responsibilities

• Code development and implementation
• Testing and quality assurance
• Documentation and session retrospectives
• Following safe and efficient development workflows
• Maintaining project context and history

### Quick Reference - Short Codes

#### Context & Planning Workflow (Core Pattern)

•  `ccc`  - Create context issue and compact the conversation.
•  `nnn`  - Smart planning: Auto-runs  `ccc`  if no recent context → Create a detailed implementation plan.
•  `gogogo`  - Execute the most recent plan issue step-by-step.
•  `lll`  - List project status (issues, PRs, commits) ✅

#### Project Management

•  `rrr`  - Create a detailed session retrospective.

## Quick Start Guide

### Prerequisites

    # Check required tools (customize for your project)
    node --version
    python --version
    git --version
    gh --version      # GitHub CLI
    tmux --version    # Terminal multiplexer

### Initial Setup

    # 1. Clone the repository
    git clone [repository-url]
    cd [repository-name]

    # 2. Install dependencies
    # (e.g., pnpm install, npm install, pip install -r requirements.txt)
    [package-manager] install

    # 3. Setup environment variables
    cp .env.example .env
    # Edit .env with required values

    # 4. Setup tmux development environment
    # Use short code 'sss' for automated setup

### First Task

1. Run  `lll`  to see the current project status.
2. Run  `nnn`  to analyze the latest issue and create a plan.
3. Use  `gogogo`  to implement the plan.

## Project Context

### Project Overview

A browser-based 2D "Neon Snake" game developed using native web technologies. The project focuses on high performance, zero-dependency implementation, and a "Cyberpunk/Neon" visual aesthetic.

### Architecture

• **Frontend:** HTML5 Canvas, CSS3, Vanilla JavaScript (ES6+)
• **Deployment:** Static file serving (Client-side execution)
• **Key Technologies:** 
    *   **Single File Component (SFC):** `index.html` contains Structure, Style, and Logic.
    *   **Canvas Rendering:** Immediate mode rendering for graphics.
    *   **Game Loop:** `setInterval` based fixed time-step (15 FPS).

### Current Features

• **Classic Gameplay:** Snake movement, food consumption, and collision mechanics.
• **Visuals:** Neon glow effects using CSS box-shadows and Canvas shadowBlur.
• **Game State:** Score tracking, Game Over screen, and Restart functionality.
• **Controls:** Keyboard (Arrow keys) with input buffering (Direction locking).

## 🔴 Critical Safety Rules

### Repository Usage

• NEVER create issues/PRs on upstream

### Command Usage

• NEVER use  `-f`  or  `--force`  flags with any commands.
• Always use safe, non-destructive command options.
• If a command requires confirmation, handle it appropriately without forcing.

### Git Operations

• Never use  `git push --force`  or  `git push -f` .
• Never use  `git checkout -f` .
• Never use  `git clean -f` .
• Always use safe git operations that preserve history.
• ⚠️ NEVER MERGE PULL REQUESTS WITHOUT EXPLICIT USER PERMISSION
• Never use  `gh pr merge`  unless explicitly instructed by the user
• Always wait for user review and approval before any merge

### File Operations

• Never use  `rm -rf`  - use  `rm -i`  for interactive confirmation.
• Always confirm before deleting files.
• Use safe file operations that can be reversed.

### Package Manager Operations

• Never use  `[package-manager] install --force` .
• Never use  `[package-manager] update`  without specifying packages.
• Always review lockfile changes before committing.

### General Safety Guidelines

• Prioritize safety and reversibility in all operations.
• Ask for confirmation when performing potentially destructive actions.
• Explain the implications of commands before executing them.
• Use verbose options to show what commands are doing.

## Development Environment

### Environment Variables

(This section should be customized for the project)

#### Backend (.env)

    DATABASE_URL=
    API_KEY=

#### Frontend (.env)

    NEXT_PUBLIC_API_URL=

## Development Workflows

### Testing Discipline

#### Automated Tests
(Add test commands here)

#### Manual Testing Checklist

Before pushing any changes:

[ ] Run the build command successfully.
[ ] Verify there are no new build warnings or type errors.
[ ] Test all affected pages and features.
[ ] Check the browser console for errors.
[ ] Test for mobile responsiveness if applicable.
[ ] Verify all interactive features work as expected.

### GitHub Workflow

#### Creating Issues

When starting a new feature or bug fix:

    # 1. Update main branch
    git checkout main && git pull

    # 2. Create a detailed issue
    gh issue create --title "feat: Descriptive title" --body "$(cat <<'EOF'
    ## Overview
    Brief description of the feature/bug.

    ## Current State
    What exists now.

    ## Proposed Solution
    What should be implemented.

    ## Technical Details
    - Components affected
    - Implementation approach

    ## Acceptance Criteria
    - [ ] Specific testable criteria
    - [ ] Performance requirements
    - [ ] UI/UX requirements
    EOF
    )"

#### Standard Development Flow

    # 1. Create a branch from the issue
    git checkout -b feat/issue-number-description

    # 2. Make changes
    # ... implement feature ...

    # 3. Test thoroughly
    # Use 'ttt' short code for the full test suite

    # 4. Commit with a descriptive message
    git add -A
    git commit -m "feat: Brief description

    - What: Specific changes made
    - Why: Motivation for the changes
    - Impact: What this affects

    Closes #issue-number"

    # 5. Push and create a Pull Request
    git push -u origin branch-name
    gh pr create --title "Same as commit" --body "Fixes #issue_number"

    # 6. ⚠️ CRITICAL: NEVER MERGE PRs YOURSELF
    # DO NOT use: gh pr merge
    # DO NOT use: Any merge commands
    # ONLY provide the PR link to the user
    # WAIT for explicit user instruction to merge
    # The user will review and merge when ready

## Context Management & Short Codes

### Why the Two-Issue Pattern?

The  `ccc`  →  `nnn`  workflow uses a two-issue pattern:

1. Context Issues ( `ccc` ): Preserve session state and context.
2. Task Issues ( `nnn` ): Contain actual implementation plans.

This separation ensures a clear distinction between context dumps and actionable tasks, leading to better
organization and cleaner task tracking.  `nnn`  intelligently checks for a recent context issue and creates one if
it's missing.

### Core Short Codes

####  `ccc`  - Create Context & Compact

Purpose: Save the current session state and context to forward to another task.

1. Gather Information:  `git status --porcelain` ,  `git log --oneline -5`
2. Create GitHub Context Issue: Use a detailed template to capture the current state, changed files, key discoveries,
and next steps.
3. Compact Conversation:  `/compact`

####  `nnn`  - Next Task Planning (Analysis & Planning Only)

Purpose: Create a comprehensive implementation plan based on gathered context. NO CODING - only research, analysis,
and planning.

1. Check for Recent Context: If none exists, run  `ccc`  first.
2. Gather All Context: Analyze the most recent context issue or the specified issue ( `nnn #123` ).
3. Deep Analysis: Read context, analyze the codebase, research patterns, and identify all affected components.
4. Create Comprehensive Plan Issue: Use a detailed template to outline the problem, research, proposed solution,
implementation steps, risks, and success criteria.
5. Provide Summary: Briefly summarize the analysis and the issue number created.

####  `lll`  - List Project Status ✅

When you see  `lll` , execute relevant  `gh`  and  `git`  commands in parallel to get a full overview of the project's
state, then provide a visual summary of open issues, recent PRs, and current focus.

####  `rrr`  - Retrospective

Purpose: Document the session's activities, learnings, and outcomes.

⚠️ CRITICAL: The AI Diary and Honest Feedback sections are MANDATORY. These provide essential context and continuous
improvement insights. Never skip these sections.

1. Gather Session Data:  `git diff --name-only main...HEAD` ,  `git log --oneline main...HEAD` , and session timestamps.
2. Create Retrospective Document: Use the template to create a markdown file in  `retrospectives/`  with ALL required
sections, especially:
  • AI Diary: First-person narrative of the session experience
  • Honest Feedback: Frank assessment of what worked and what didn't
3. Validate Completeness: Use the retrospective validation checklist to ensure no sections are skipped.
4. Update GEMINI.md: Copy any new lessons learned to the main guidelines. ** Append to to bottom only **
5. Link to GitHub: Commit the retrospective and comment on the relevant issue/PR.

Time Zone Note:

• PRIMARY TIME ZONE: [Your Time Zone] - Always show the primary time zone first.
• UTC time can be included for reference (e.g., in parentheses).
• Filenames may use UTC for technical consistency.

Step 3: Create Retrospective Document

    # Get session date and times
    SESSION_DATE=$(date +"%Y-%m-%d")
    END_TIME_UTC=$(date -u +"%H:%M")
    END_TIME_LOCAL=$(TZ='Asia/Bangkok' date +"%H:%M")

    # Create directory structure
    mkdir -p retrospectives/$(date +%Y/%m)

    # Create retrospective file with auto-filled date/time
    cat > retrospectives/$(date +%Y/%m)/${SESSION_DATE}_${END_TIME_UTC//:/-}_retrospective.md << EOF
    # Session Retrospective

    **Session Date**: ${SESSION_DATE}
    **Start Time**: [FILL_START_TIME] GMT+7 ([FILL_START_TIME] UTC)
    **End Time**: ${END_TIME_LOCAL} GMT+7 (${END_TIME_UTC} UTC)
    **Duration**: ~X minutes
    **Primary Focus**: Brief description
    **Session Type**: [Feature Development | Bug Fix | Research | Refactoring]
    **Current Issue**: #XXX
    **Last PR**: #XXX
    **Export**: retrospectives/exports/session_${SESSION_DATE}_${END_TIME_UTC//:/-}.md

    ## Session Summary
    [2-3 sentence overview of what was accomplished]

    ## Timeline
    - HH:MM - Started session, reviewed issue #XXX
    - HH:MM - [Event]
    - HH:MM - [Event]
    - HH:MM - Completed implementation

    ## Technical Details

    ### Files Modified

    [paste git diff --name-only output]


    ### Key Code Changes
    - Component X: Added Y functionality
    - Module Z: Refactored for better performance

    ### Architecture Decisions
    - Decision 1: Rationale
    - Decision 2: Rationale

    ## 📝 AI Diary (REQUIRED - DO NOT SKIP)
    **⚠️ MANDATORY: This section provides crucial context for future sessions**
    [Write a detailed first-person narrative of your experience during this session. Include:
    - Initial understanding and assumptions
    - How your approach evolved
    - Moments of confusion or clarity
    - Decisions made and why
    - What surprised you
    - Internal thought process]

    ## What Went Well
    - Success 1
    - Success 2
    - Success 3

    ## What Could Improve
    - Area 1
    - Area 2

    ## Blockers & Resolutions
    - **Blocker**: Description
      **Resolution**: How it was solved

    ## 💭 Honest Feedback (REQUIRED - DO NOT SKIP)
    **⚠️ MANDATORY: This section ensures continuous improvement**
    [Provide frank, unfiltered assessment of:
    - Session effectiveness
    - Tool performance and limitations
    - Communication clarity
    - Process efficiency
    - What frustrated you
    - What delighted you
    - Suggestions for improvement]

    ## Lessons Learned
    - **Pattern**: [Description] - [Why it matters]
    - **Mistake**: [What happened] - [How to avoid]
    - **Discovery**: [What was learned] - [How to apply]

    ## Next Steps
    - [ ] Immediate task 1
    - [ ] Follow-up task 2
    - [ ] Future consideration

    ## Related Resources
    - Issue: #XXX
    - PR: #XXX
    - Export: [session_YYYY-MM-DD_HH-MM.md](../exports/session_YYYY-MM-DD_HH-MM.md)

    ## ✅ Retrospective Validation Checklist
    **BEFORE SAVING, VERIFY ALL REQUIRED SECTIONS ARE COMPLETE:**
    - [ ] AI Diary section has detailed narrative (not placeholder)
    - [ ] Honest Feedback section has frank assessment (not placeholder)
    - [ ] Session Summary is clear and concise
    - [ ] Timeline includes actual times and events
    - [ ] Technical Details are accurate
    - [ ] Lessons Learned has actionable insights
    - [ ] Next Steps are specific and achievable

    ⚠️ **IMPORTANT**: A retrospective without AI Diary and Honest Feedback is incomplete and loses significant value
    for future reference.
    EOF

Step 4: Update GEMINI.md

• Copy any new lessons learned to the Lessons Learned section
• Add any new patterns or anti-patterns discovered
• Update user preferences if any were observed

Step 5: Link to GitHub

    # Add retrospective to git
    git add retrospectives/
    git commit -m "docs: Add session retrospective $(date +%Y-%m-%d)"

    # Comment on relevant issue/PR with actual path
    RETRO_PATH="retrospectives/$(date +%Y/%m)/$(date +%Y-%m-%d_%H-%M)_retrospective.md"
    gh issue comment XXX --body "Session retrospective created: ${RETRO_PATH}"

Time Zone Note:

• PRIMARY TIME ZONE: GMT+7 (Bangkok time) - Always show GMT+7 time first
• UTC time included for reference only (shown in parentheses)
• File names may use UTC for technical consistency
• In all displays and retrospectives, prioritize GMT+7 for user clarity

####  `gogogo`  - Execute Planned Implementation

1. Find Implementation Issue: Locate the most recent  `plan:`  issue.
2. Execute Implementation: Follow the plan step-by-step, making all necessary code changes.
3. Test & Verify: Run all relevant tests and verify the implementation works.
4. Commit & Push: Commit with a descriptive message, push to the feature branch, and create/update the PR.

## Technical Reference

(This section should be filled out for each specific project)

### Available Tools

#### Version Control

    # Git operations (safe only)
    git status
    git add -A
    git commit -m "message"
    git push origin branch

    # GitHub CLI
    gh issue create
    gh pr create

#### Search and Analysis

    # Ripgrep (preferred over grep)
    rg "pattern" --type [file-extension]

    # Find files
    fd "[pattern]"

## Development Practices

### Code Standards

• Follow the established style guide for the language/framework.
• Enable strict mode and linting where possible.
• Write clear, self-documenting code and add comments where necessary.
• Avoid  `any`  or other weak types in strongly-typed languages.

### Git Commit Format

    [type]: [brief description]

    - What: [specific changes]
    - Why: [motivation]
    - Impact: [affected areas]

    Closes #[issue-number]

Types:  `feat` ,  `fix` ,  `docs` ,  `style` ,  `refactor` ,  `test` ,  `chore`

### Error Handling Patterns

• Use  `try/catch`  blocks for operations that might fail.
• Provide descriptive error messages.
• Implement graceful fallbacks in the UI.
• Use custom error types where appropriate.

## Lessons Learned

### Browser-Based 2D Game Development (Project Specific)
*   **State Management Separation:** Separating Game State (`isGameRunning`, `score`) from Render logic eases debugging.
*   **Performance vs Visuals:** `ctx.shadowBlur` is expensive. Use sparingly or consider alternatives like sprites for complex scenes.
*   **Input Handling Logic:** Implement "Direction Locking" to prevent logical conflicts (e.g., 180-degree turns in one frame).
*   **UX in Canvas:** Overlays (HTML elements positioned absolutely) are often better than drawing text/buttons directly on the Canvas for UI interaction.

### Planning & Architecture Patterns (General)

• Pattern: Use parallel agents for analyzing different aspects of complex systems
• Anti-Pattern: Creating monolithic plans that try to implement everything at once
• Pattern: Ask "what's the minimum viable first step?" before comprehensive implementation
• Pattern: 1-hour implementation chunks are optimal for maintaining focus and seeing progress

### Common Mistakes to Avoid

• Creating overly comprehensive initial plans - Break complex projects into 1-hour phases instead
• Trying to implement everything at once - Start with minimum viable implementation, test, then expand
• Skipping AI Diary and Honest Feedback in retrospectives - These sections provide crucial context and self-
reflection that technical documentation alone cannot capture
• Example: Forgetting to update a lockfile after changing dependencies.
• Example: Not checking build logs for warnings that could become errors.
• Example: Making assumptions about API responses instead of checking the spec.

### Useful Tricks Discovered

• Parallel agents for analysis - Using multiple agents to analyze different aspects speeds up planning significantly
• ccc → nnn workflow - Context capture followed by focused planning creates better structured issues
• Phase markers in issues - Using "Phase 1:", "Phase 2:" helps track incremental progress

### User Preferences (Observed)

• Prefers manageable scope - "i love this - Can be completed in under 1 hour" shows preference for achievable tasks
• Values phased approaches - Recognizes when plans are "too huge" and appreciates splitting work
• Appreciates workflow patterns - Likes using established patterns like "ccc nnn gh flow"
• Time zone preference: GMT+7 (Bangkok/Asia)

## Troubleshooting

### Common Issues

#### Build Failures

    # Check for type errors or syntax issues
    [build-command] 2>&1 | grep -A 5 "error"

    # Clear cache and reinstall dependencies
    rm -rf node_modules .cache dist build
    [package-manager] install

#### Port Conflicts

    # Find the process using a specific port
    lsof -i :[port-number]

    # Kill the process
    kill -9 [PID]

## Appendices

### A. Glossary

(Add project-specific terms here)

• Term: Definition.

### B. Quick Command Reference

    # Development
    [run-command]          # Start dev server
    [test-command]         # Run tests
    gh issue create        # Create issue
    gh pr create           # Create PR

    # Tmux
    tmux attach -t dev     # Attach to session
    Ctrl+b, d              # Detach from session

### C. Environment Checklist

[ ] Correct version of [Language/Runtime] installed
[ ] [Package Manager] installed
[ ] GitHub CLI configured
[ ] Tmux installed
[ ] Environment variables set
[ ] Git configured

Last Updated: [Date]
Version: 1.0.0