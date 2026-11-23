# Playwright Project – Git End-to-End Workflow
## Detailed Explanation of Steps 1 to 30

This document explains the complete Git workflow for an Automation Tester working on a Playwright project.

The workflow assumes that:

- The Automation Tester develops the Playwright automation code in VS Code.
- Git is used for version control.
- GitHub is the global/remote repository.
- `main` is the common/shared branch.
- `feature/playwright_test` is the Automation Tester's working branch.
- The Automation Tester commits changes locally and pushes them to GitHub.
- The Automation Tester pulls the latest code from GitHub whenever the shared code needs to be updated.
- Before continuing development, the Automation Tester synchronizes the feature branch with the latest `main` branch.

---

# Phase 1 – Create the Playwright Project and Initialize Git

## Step 1 – Create the Playwright project

```bash
npm init playwright@latest
```

### What happens?

The Automation Tester creates a new Playwright project using the Playwright project generator.

This creates the basic Playwright project structure, including files such as:

- Playwright configuration
- Test folder
- Example test files
- Package configuration
- TypeScript configuration, if TypeScript is selected

### Why is this required?

Before using Git, the Automation Tester needs a local project that contains the Playwright automation framework.

### Real-world flow

The Automation Tester starts a new automation project on the local machine.

```text
Automation Tester
      |
      v
Create Playwright Project
      |
      v
Local Playwright Project
```

---

## Step 2 – Initialize the Git repository

```bash
git init
```

### What happens?

Git is initialized inside the Playwright project folder.

A hidden `.git` directory is created.

This tells Git:

> "Start tracking the changes made inside this project."

### Why is this required?

Without `git init`, the project is only a normal folder. Git will not track changes or create commits.

### Real-world flow

```text
Playwright Project
       |
       | git init
       v
Git-enabled Project
```

The Automation Tester can now start tracking automation code changes.

---

## Step 3 – Rename the default branch to `main`

```bash
git branch -M main
```

### What happens?

The current Git branch is renamed to `main`.

`main` is commonly used as the primary/shared branch of a repository.

### Why is this required?

The team needs a standard branch name for the primary codebase.

The shared repository will generally look like:

```text
GitHub Repository
       |
       +-- main
       |
       +-- feature/playwright_test
       |
       +-- other feature branches
```

The `main` branch represents the common/shared code.

---

## Step 4 – Check Git status

```bash
git status
```

### What happens?

Git displays the current state of the project.

It tells the Automation Tester:

- Which branch they are currently on
- Which files are untracked
- Which files are modified
- Which files are staged

### Why is this important?

Before adding or committing files, the Automation Tester should know what Git currently sees.

For example:

```text
On branch main

Untracked files:
    playwright.config.ts
    tests/
    package.json
```

This means Git sees these files but they have not yet been added to the staging area.

---

## Step 5 – Add all files

```bash
git add .
```

### What happens?

All new and modified files in the current project are added to the Git staging area.

### Why is this required?

Git does not automatically include every file in a commit.

The Automation Tester explicitly tells Git which changes should be included in the next commit.

### Real-world example

Suppose the Automation Tester has:

```text
tests/login.spec.ts
tests/createLead.spec.ts
playwright.config.ts
```

Running:

```bash
git add .
```

prepares these changes for the next commit.

### Important concept

```text
Working Directory
       |
       | git add .
       v
Staging Area
```

---

## Step 6 – Commit the initial Playwright project

```bash
git commit -m "Initial Playwright setup"
```

### What happens?

Git creates a permanent checkpoint containing the staged changes.

The commit message describes what was included.

### Why is this required?

A commit gives the Automation Tester a versioned point in the project history.

The first commit represents the initial Playwright framework setup.

### Real-world meaning

The Automation Tester is saying:

> "This is the first stable version of my Playwright automation project. Save this version in Git history."

---

# Phase 2 – Connect the Local Repository to GitHub

## Step 7 – Add the GitHub remote repository

```bash
git remote add origin https://github.com/VineethRajendran7/Solartis.git
```

### What happens?

The local Git repository is connected to the GitHub repository.

`origin` is the name given to the remote repository.

### Local vs Remote

```text
LOCAL MACHINE
    |
    | Git
    |
    v
LOCAL REPOSITORY

        <---- Internet ---->

REMOTE MACHINE
    |
    v
GITHUB REPOSITORY
```

### Why is this required?

Until the remote repository is configured, Git only knows about the local repository.

By adding `origin`, the Automation Tester tells Git where the global/shared repository is located.

### Real-world meaning

The Automation Tester is saying:

> "This local Playwright project belongs to this GitHub repository."

---

## Step 8 – Push the `main` branch to GitHub

```bash
git push -u origin main
```

### What happens?

The local `main` branch and its commits are uploaded to GitHub.

### Why is this required?

The Automation Tester has created the project locally. Now the project needs to be available in the global/shared GitHub repository.

### Real-world flow

```text
Automation Tester
       |
       | Local Playwright Code
       v
Local main
       |
       | git push
       v
GitHub main
```

### Important concept

`push` means:

> Send local commits to the remote GitHub repository.

---

# Phase 3 – Create and Push a Feature Branch

## Step 9 – Create a feature branch

```bash
git switch -c feature/playwright_test
```

### What happens?

A new branch called:

```text
feature/playwright_test
```

is created and the Automation Tester is automatically switched to it.

### Why is this required?

The Automation Tester should normally avoid making feature-level changes directly on `main`.

Instead, development happens on a separate feature branch.

### Real-world example

Suppose the Automation Tester needs to implement:

```text
Playwright wait handling
```

They create:

```text
feature/playwright_test
```

and implement the changes there.

### Branch structure

```text
main
  |
  +---- feature/playwright_test
```

---

## Step 10 – Check the current branch

```bash
git branch
```

### What happens?

Git displays the available local branches.

The current branch is marked with `*`.

Example:

```text
* feature/playwright_test
  main
```

### Why is this important?

Before making changes, the Automation Tester should confirm that they are working on the correct branch.

This helps prevent accidental changes to `main`.

---

## Step 11 – Add modified/new files

```bash
git add .
```

### What happens?

The Automation Tester's new or modified automation files are added to the staging area.

For example:

```text
tests/waits.spec.ts
pages/LoginPage.ts
utils/testData.ts
```

can be staged for the next commit.

---

## Step 12 – Commit the changes

```bash
git commit -m "Waits added"
```

### What happens?

The staged changes are saved as a Git commit.

### Real-world meaning

The Automation Tester is saying:

> "I have completed this unit of work. Save this version in my local Git history."

The commit exists locally until it is pushed.

---

## Step 13 – Push the feature branch to GitHub

```bash
git push -u origin feature/playwright_test
```

### What happens?

The feature branch and its commits are uploaded to GitHub.

### Real-world flow

```text
Automation Tester
       |
       | Code changes
       v
Local feature/playwright_test
       |
       | git push
       v
GitHub feature/playwright_test
```

### Important concept

The feature branch now exists both locally and remotely.

```text
LOCAL                         GITHUB
-----                         ------

main       ----------------> main

feature/                  --> feature/
playwright_test               playwright_test
```

---

# Phase 4 – Continue Development

## Step 14 – Continue working on the feature branch

```text
Make code changes in VS Code
```

### What happens?

The Automation Tester continues implementing Playwright automation.

For example:

- Add new test cases
- Create page objects
- Add locators
- Add assertions
- Add API automation
- Update configuration
- Add test data

The changes happen in the local working directory.

### Important

At this point, the changes are not automatically available in GitHub.

The Automation Tester must eventually:

```text
git add
git commit
git push
```

to make the changes available in the remote repository.

---

## Step 15 – Check what has changed

```bash
git status
```

### What happens?

Git shows the current state of the working directory.

It may show:

```text
modified:
    tests/login.spec.ts

untracked:
    tests/createLead.spec.ts
```

### Why is this important?

The Automation Tester can verify what changes are waiting to be committed.

---

## Step 16 – Check the exact changes

```bash
git diff
```

### What happens?

Git displays the actual line-by-line changes made to tracked files.

For example:

```text
- old code
+ new code
```

### Why is this important?

Before committing, the Automation Tester can review the exact code changes.

This is especially useful in automation projects because it helps identify:

- Accidental changes
- Debug statements
- Incorrect locators
- Unwanted configuration changes
- Temporary code

---

## Step 17 – Add the modified/new files

```bash
git add .
```

### What happens?

The Automation Tester moves the required changes into the staging area.

```text
Working Directory
       |
       | git add .
       v
Staging Area
```

---

## Step 18 – Commit the changes

```bash
git commit -m "Updated Playwright test cases"
```

### What happens?

The staged automation changes are saved as a new commit.

### Real-world meaning

The Automation Tester is creating another checkpoint in the local project history.

For example:

```text
Initial Playwright setup
        |
        v
Waits added
        |
        v
Updated Playwright test cases
```

Each commit represents a version of the code.

---

## Step 19 – Push the latest feature branch changes

```bash
git push
```

### What happens?

The latest local commits are uploaded to the remote feature branch.

```text
Local feature branch
        |
        | git push
        v
GitHub feature branch
```

### Real-world meaning

The Automation Tester has completed a piece of work and makes that work available in the global GitHub repository.

---

# Phase 5 – Synchronize with the Latest Main Code

This is an important part of a team-based automation project.

While the Automation Tester is working on the feature branch, other team members may also push changes to `main`.

Therefore, the Automation Tester needs to get the latest shared code before continuing.

---

## Step 20 – Switch to the `main` branch

```bash
git switch main
```

### What happens?

The Automation Tester leaves the feature branch and switches to the local `main` branch.

```text
feature/playwright_test
          |
          | git switch main
          v
        main
```

### Why?

The Automation Tester needs to update the local `main` branch with the latest code from GitHub.

---

## Step 21 – Pull the latest changes from GitHub `main`

```bash
git pull origin main
```

### What happens?

Git downloads the latest commits from the remote GitHub `main` branch and updates the local `main` branch.

### Real-world meaning

Suppose another Automation Tester has pushed:

```text
New login test
New API utility
Updated Playwright config
```

to GitHub `main`.

Your local `main` may not have these changes.

Running:

```bash
git pull origin main
```

gets the latest shared code.

### Flow

```text
GitHub main
    |
    | git pull
    v
Local main
```

### Important concept

`pull` means:

> Get the latest remote changes and update the local branch.

---

# Phase 6 – Update the Feature Branch with the Latest Main

## Step 22 – Switch back to the feature branch

```bash
git switch feature/playwright_test
```

### What happens?

The Automation Tester returns to the feature branch.

```text
Local main
    |
    | git switch
    v
feature/playwright_test
```

The feature branch contains the Automation Tester's work.

---

## Step 23 – Get the latest changes from the remote feature branch

```bash
git pull origin feature/playwright_test
```

### What happens?

Git checks GitHub for any commits that may have been pushed to the remote feature branch.

### Why is this useful?

If the feature branch was updated from another machine or by another team member, the Automation Tester gets those latest changes.

### Real-world meaning

The Automation Tester is saying:

> "Before I continue, give me the latest version of my feature branch from GitHub."

---

## Step 24 – Merge the latest `main` into the feature branch

```bash
git merge main
```

### What happens?

The latest local `main` code is merged into:

```text
feature/playwright_test
```

### Why is this required?

The Automation Tester wants the feature branch to contain the latest shared code.

### Before merge

```text
main
  |
  +--- A --- B --- C
                                         feature              D --- E
```

Here:

- `C` = latest shared `main` code
- `D`, `E` = Automation Tester's feature changes

### After merge

```text
main
  |
  +--- A --- B --- C
                                         M
                    / feature            D   E
```

The feature branch now includes the latest changes from `main`.

### Real-world meaning

The Automation Tester is saying:

> "I have my feature code, but I also need the latest code that the team has added to the shared main branch."

---

# Merge Conflict

Sometimes the Automation Tester's changes and another developer's changes affect the same lines of the same file.

Git may report a merge conflict.

Example:

```text
CONFLICT (content): Merge conflict in tests/login.spec.ts
```

The Automation Tester must:

1. Open the conflicting file.
2. Review the changes.
3. Decide which code should remain.
4. Remove the conflict markers.
5. Save the file.
6. Run the Playwright tests.
7. Add the resolved file.
8. Commit the merge.

Typical commands:

```bash
git status

git add .

git commit -m "Resolved merge conflicts"
```

Then continue with:

```bash
git push
```

The important principle is:

> Do not blindly overwrite another Automation Tester's changes. Review the conflict and preserve the correct functionality.

---

## Step 25 – Push the updated feature branch

```bash
git push
```

### What happens?

The feature branch containing:

- The Automation Tester's existing changes
- The latest changes from `main`
- Any merge resolution

is pushed to GitHub.

### Flow

```text
Local feature branch
        |
        | git push
        v
GitHub feature branch
```

Now the remote feature branch is synchronized with the updated local feature branch.

---

# Phase 7 – Continue Development Again

## Step 26 – Continue making changes in the feature branch

```text
Make your Playwright code changes
```

### What happens?

The Automation Tester continues developing.

For example:

```text
Add new test
      |
Add locator
      |
Add assertion
      |
Update Page Object
      |
Run Playwright tests
```

The new changes are again made locally.

---

## Step 27 – Check status

```bash
git status
```

### What happens?

The Automation Tester checks which files have changed.

Example:

```text
modified:
    tests/createLead.spec.ts

modified:
    pages/LeadPage.ts

untracked:
    test-data/lead.json
```

This helps verify what will be committed.

---

## Step 28 – Add changes

```bash
git add .
```

### What happens?

The Automation Tester stages the new and modified files.

```text
Working Directory
       |
       | git add .
       v
Staging Area
```

---

## Step 29 – Commit changes

```bash
git commit -m "Added Playwright test scenarios"
```

### What happens?

The latest changes are saved as a new local Git commit.

### Real-world meaning

The Automation Tester is creating another version/checkpoint of the automation code.

For example:

```text
Commit 1
Initial Playwright setup

Commit 2
Waits added

Commit 3
Updated Playwright test cases

Commit 4
Added Playwright test scenarios
```

---

## Step 30 – Push changes

```bash
git push
```

### What happens?

The latest local commit is uploaded to the remote GitHub feature branch.

```text
Automation Tester
       |
       | Commit
       v
Local feature branch
       |
       | git push
       v
GitHub feature branch
```

The latest automation code is now available in the global repository.

---

# Complete End-to-End Workflow

The entire workflow can be understood as:

```text
1. Create Playwright Project
          |
          v
2. Initialize Git
          |
          v
3. Create main branch
          |
          v
4. Check status
          |
          v
5. Stage files
          |
          v
6. Commit initial code
          |
          v
7. Connect GitHub
          |
          v
8. Push main
          |
          v
9. Create feature branch
          |
          v
10. Verify branch
          |
          v
11. Stage changes
          |
          v
12. Commit changes
          |
          v
13. Push feature branch
          |
          v
14. Continue development
          |
          v
15. Check status
          |
          v
16. Review changes
          |
          v
17. Stage changes
          |
          v
18. Commit
          |
          v
19. Push
          |
          v
20. Switch to main
          |
          v
21. Pull latest main
          |
          v
22. Switch to feature branch
          |
          v
23. Pull latest feature branch
          |
          v
24. Merge main into feature
          |
          v
25. Push updated feature branch
          |
          v
26. Continue development
          |
          v
27. Check status
          |
          v
28. Stage changes
          |
          v
29. Commit changes
          |
          v
30. Push changes
```

# Important Git Concepts for an Automation Tester

## `git add`

Moves changes from the working directory to the staging area.

```text
Working Directory
       |
       | git add
       v
Staging Area
```

---

## `git commit`

Creates a version/checkpoint from the staged changes.

```text
Staging Area
       |
       | git commit
       v
Local Git History
```

---

## `git push`

Sends local commits to GitHub.

```text
Local Git Repository
       |
       | git push
       v
GitHub Repository
```

---

## `git pull`

Gets the latest changes from GitHub and updates the current local branch.

```text
GitHub Repository
       |
       | git pull
       v
Local Repository
```

---

## `git merge`

Combines changes from one branch into another.

In this workflow:

```bash
git merge main
```

means:

> Take the latest local `main` changes and merge them into the current feature branch.

---

# Real-World Automation Team Example

Imagine three Automation Testers are working on the same Playwright project.

```text
                    GitHub
                       |
             +---------+---------+
             |                   |
           main          feature/playwright_test
             |                   |
       Shared Code          Tester 1 Code
             |
       +-----+-----+
       |           |
    Tester 2     Tester 3
    changes       changes
```

Tester 1 creates a feature branch and develops a new Playwright test.

Tester 2 updates the shared `main` branch with another automation utility.

Tester 1 then needs the latest shared code.

Tester 1 performs:

```bash
git switch main
git pull origin main

git switch feature/playwright_test
git merge main
```

Now Tester 1 has:

```text
Latest shared main code
+
Tester 1's feature code
```

Tester 1 runs the Playwright tests and verifies that the automation still works.

Then:

```bash
git push
```

The updated feature branch is available in GitHub.

---

# Simple Meaning of the Entire Workflow

The workflow can be remembered using this sequence:

```text
CREATE
   ↓
INIT
   ↓
ADD
   ↓
COMMIT
   ↓
PUSH
   ↓
CREATE FEATURE BRANCH
   ↓
WORK
   ↓
ADD
   ↓
COMMIT
   ↓
PUSH
   ↓
PULL LATEST MAIN
   ↓
MERGE MAIN
   ↓
TEST
   ↓
PUSH
   ↓
CONTINUE DEVELOPMENT
   ↓
ADD
   ↓
COMMIT
   ↓
PUSH
```

The key idea is:

> **The Automation Tester works locally, commits the completed changes, pushes the commits to the global GitHub repository, pulls the latest shared code from GitHub when required, merges the latest `main` changes into the feature branch, tests the combined code, and pushes the updated feature branch again.**

This process allows multiple Automation Testers to work on the same Playwright project while maintaining version history and keeping their work synchronized with the shared codebase.
