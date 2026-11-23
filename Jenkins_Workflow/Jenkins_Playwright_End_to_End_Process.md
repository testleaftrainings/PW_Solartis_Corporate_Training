# Jenkins + GitHub + Playwright Automation – End-to-End Process
## Detailed Jenkins Setup, Configuration, Scheduling, GitHub Integration, Build Execution, and Updating an Existing Job

This document explains the complete process of configuring a Jenkins job for a Playwright automation project hosted in GitHub.

The workflow covers:

- Creating a new Jenkins Item
- Selecting the job type
- Configuring the job
- Connecting Jenkins to a GitHub repository
- Configuring Git credentials
- Setting the GitHub repository URL
- Selecting the branch
- Configuring the workspace/build environment
- Installing project dependencies
- Running Playwright tests
- Publishing test results where applicable
- Configuring a periodic schedule
- Understanding Jenkins cron syntax
- Running a build manually
- Checking build status and console output
- Updating an existing Jenkins job
- Changing the GitHub repository/branch
- Updating the schedule
- Updating the Playwright execution command
- Verifying the updated configuration

---

# 1. Understand the Jenkins Workflow

Before creating the Jenkins job, understand the overall flow.

The Automation Tester develops the Playwright automation code locally and pushes the code to GitHub.

Jenkins then retrieves the code from GitHub and executes the automation.

The basic flow is:

```text
Automation Tester
       |
       | Write / Update Playwright Code
       v
Local Playwright Project
       |
       | git add
       | git commit
       | git push
       v
GitHub Repository
       |
       | Jenkins checks / retrieves code
       v
Jenkins Job
       |
       | Checkout source code
       v
Jenkins Workspace
       |
       | npm install / npm ci
       |
       | Install Playwright browsers if required
       |
       | Run Playwright tests
       v
Test Execution
       |
       v
Build Result
```

The important concept is:

> GitHub stores the automation source code, while Jenkins retrieves and executes that source code.

---

# 2. Prerequisites

Before creating the Jenkins job, make sure the following are available.

## Required

### Jenkins

A working Jenkins server should be available.

Example:

```text
http://localhost:8080
```

or the organization's Jenkins URL.

### Git

Git should be installed on the Jenkins machine/agent.

Verify:

```bash
git --version
```

### Node.js

Node.js should be installed on the Jenkins machine/agent.

Verify:

```bash
node --version
```

### npm

Verify:

```bash
npm --version
```

### Playwright project

The Playwright project should already exist.

Example:

```text
Playwright Project
|
+-- tests/
+-- pages/
+-- utils/
+-- playwright.config.ts
+-- package.json
+-- package-lock.json
```

### GitHub repository

The Playwright project should be pushed to GitHub.

Example:

```text
https://github.com/VineethRajendran7/Solartis.git
```

---

# 3. Create a New Jenkins Item

Open Jenkins.

From the Jenkins Dashboard:

```text
Dashboard
   |
   v
New Item
```

Click:

```text
New Item
```

---

# 4. Enter the Jenkins Item Name

Enter a meaningful job name.

Example:

```text
Playwright_Automation
```

Other possible names:

```text
Playwright_QA
Playwright_Regression
Playwright_Smoke_Test
Playwright_ServiceNow
```

### Naming recommendation

Use a name that clearly identifies:

- Application
- Environment
- Automation type
- Execution purpose

For example:

```text
Solartis_Playwright_QA
```

is better than:

```text
Test1
```

because the purpose of the job is immediately clear.

---

# 5. Select the Job Type

Jenkins provides multiple project types.

For a basic GitHub + Playwright setup, select:

```text
Freestyle project
```

Then click:

```text
OK
```

### What is a Freestyle project?

A Freestyle project allows us to configure:

- Source Code Management
- Build Triggers
- Build Environment
- Build Steps
- Post-build Actions

For example:

```text
Freestyle Job
      |
      +-- GitHub Repository
      |
      +-- Branch
      |
      +-- Schedule
      |
      +-- Build Command
      |
      +-- Test Execution
```

---

# 6. Configure the General Section

After clicking `OK`, Jenkins opens the job configuration page.

The first section is generally:

```text
General
```

Add a description.

Example:

```text
This Jenkins job executes Playwright automation tests
from the GitHub repository.
```

A useful description helps other team members understand the purpose of the job.

---

# 7. Configure Source Code Management

Scroll to:

```text
Source Code Management
```

Select:

```text
Git
```

This tells Jenkins that the source code is stored in a Git repository.

The configuration will generally contain:

```text
Repository URL
Credentials
Branch
```

---

# 8. Configure the GitHub Repository URL

In:

```text
Repository URL
```

enter the GitHub repository URL.

Example:

```text
https://github.com/VineethRajendran7/Solartis.git
```

The complete configuration concept is:

```text
Source Code Management
        |
        +-- Git
             |
             +-- Repository URL
             |
             +-- Credentials
             |
             +-- Branch
```

### What does Jenkins do with this URL?

When the build starts, Jenkins uses this repository information to retrieve the Playwright project.

The flow is:

```text
Jenkins
   |
   | Connect to GitHub
   v
GitHub Repository
   |
   | Checkout source code
   v
Jenkins Workspace
```

---

# 9. Configure GitHub Credentials

If the GitHub repository is private, Jenkins needs permission to access it.

Under the Git repository configuration, locate:

```text
Credentials
```

Click:

```text
Add
```

or select an already configured credential.

For a private GitHub repository, credentials may be configured using:

- Username/password
- Personal Access Token
- SSH key

The exact credential method depends on the organization's Jenkins and GitHub setup.

### Important

Do not hard-code GitHub passwords or tokens inside:

```text
Jenkins build commands
```

or:

```text
package.json
```

Credentials should be managed securely through Jenkins Credentials.

---

# 10. Select the GitHub Branch

In the Git configuration, find:

```text
Branches to build
```

Enter the branch that Jenkins should execute.

For example:

```text
*/main
```

If Jenkins should execute a feature branch:

```text
*/feature/playwright_test
```

### Example

If the repository contains:

```text
main
feature/playwright_test
feature/api_automation
```

and Jenkins should execute the main automation code:

```text
*/main
```

should be configured.

---

# 11. Understand What Jenkins Does During Checkout

When the Jenkins build starts, Jenkins performs the Git checkout.

Conceptually:

```text
GitHub
   |
   | Git checkout
   v
Jenkins Workspace
   |
   v
Playwright Project
```

The workspace may contain:

```text
workspace/
|
+-- tests/
+-- pages/
+-- utils/
+-- package.json
+-- package-lock.json
+-- playwright.config.ts
```

Jenkins then executes the configured build commands from this workspace.

---

# 12. Configure Build Triggers

The next important section is:

```text
Build Triggers
```

This determines **when Jenkins should start the job**.

Common options include:

```text
Build periodically
Poll SCM
GitHub hook trigger
Build after other projects are built
```

For a scheduled execution, select:

```text
Build periodically
```

---

# 13. Configure Periodic Schedule

When:

```text
Build periodically
```

is selected, Jenkins provides a schedule field.

Jenkins uses cron-style syntax.

Example:

```text
5 9 * * *
```

This means:

```text
Minute = 5
Hour   = 9
Day    = *
Month  = *
Weekday = *
```

Therefore, the job runs every day at:

```text
09:05
```

according to the Jenkins server's configured timezone.

---

# 14. Jenkins Cron Syntax

Jenkins commonly uses five fields:

```text
MINUTE HOUR DAY MONTH WEEKDAY
```

Format:

```text
* * * * *
```

Meaning:

```text
| | | | |
| | | | +---- Day of week
| | | +------ Month
| | +-------- Day of month
| +---------- Hour
+------------ Minute
```

---

# 15. Common Jenkins Schedule Examples

## Every day at 9:05 AM

```text
5 9 * * *
```

## Every day at 10:00 AM

```text
0 10 * * *
```

## Every day at 6:30 PM

```text
30 18 * * *
```

## Every hour

```text
0 * * * *
```

## Every 15 minutes

```text
H/15 * * * *
```

## Every weekday at 9:00 AM

```text
0 9 * * 1-5
```

## Every Sunday at 10:00 AM

```text
0 10 * * 0
```

---

# 16. `H` in Jenkins Cron

Jenkins supports the `H` symbol.

`H` means Jenkins can choose a stable hashed value to distribute jobs more efficiently.

For example:

```text
H 9 * * *
```

means the job runs at a Jenkins-determined minute during the 9 AM hour.

This can help avoid many Jenkins jobs starting at exactly the same time.

---

# 17. Important Difference: Build Periodically vs Poll SCM

These two options are often confused.

## Build periodically

Example:

```text
5 9 * * *
```

Meaning:

> Run the Jenkins job at the specified schedule.

It does not inherently mean that Jenkins only runs when GitHub changes.

---

## Poll SCM

Example:

```text
H/15 * * * *
```

Meaning:

> Check the configured source repository periodically for changes.

If changes are detected, Jenkins can trigger a build.

### Conceptual difference

```text
Build periodically
        |
        v
Run according to schedule


Poll SCM
        |
        v
Check repository
        |
        v
Changes found?
        |
      Yes
        |
        v
Build
```

If the requirement is simply:

> "Run Playwright automation every day at 9:05 AM"

use:

```text
Build periodically
```

---

# 18. Configure the Build Environment

The exact available options depend on the Jenkins installation and installed plugins.

Typical build environment settings may include:

- Delete workspace before build
- Environment variables
- Credentials binding
- Tool configuration
- Timeout settings

For a basic Playwright project, configure only the options required by the project.

---

# 19. Configure the Build Step

After Source Code Management and Build Triggers, configure:

```text
Build Steps
```

For a Playwright project running on a Linux Jenkins agent, a common option is:

```text
Execute shell
```

For a Windows Jenkins agent, use:

```text
Execute Windows batch command
```

or an appropriate PowerShell step if configured.

---

# 20. Install Project Dependencies

The Jenkins workspace contains the code retrieved from GitHub.

The Automation Tester needs to install the Node.js dependencies.

A common command is:

```bash
npm ci
```

### Why use `npm ci`?

For CI environments, `npm ci` is commonly preferred when `package-lock.json` is committed to the repository.

It installs dependencies based on the lock file.

The workflow becomes:

```text
GitHub
   |
   v
Checkout Code
   |
   v
npm ci
   |
   v
Dependencies Installed
```

---

# 21. Install Playwright Browsers

Depending on the Jenkins agent and the project setup, Playwright browser binaries may need to be installed.

A common command is:

```bash
npx playwright install
```

For Linux environments where required system dependencies are not already available, a command such as:

```bash
npx playwright install --with-deps
```

may be used.

The exact command should match the Jenkins agent operating system and the organization's environment.

---

# 22. Run Playwright Tests

After installing dependencies and required browsers, execute the Playwright tests.

Basic command:

```bash
npx playwright test
```

This runs the tests configured for the project.

The execution flow becomes:

```text
GitHub
   |
   v
Checkout
   |
   v
npm ci
   |
   v
Install Playwright
   |
   v
npx playwright test
   |
   v
Test Result
```

---

# 23. Run a Specific Playwright Test Suite

If the project contains different test suites, Jenkins can execute a specific command.

Examples:

```bash
npx playwright test tests/login.spec.ts
```

or:

```bash
npx playwright test tests/smoke/
```

or using a project configured in `playwright.config.ts`:

```bash
npx playwright test --project=chromium
```

---

# 24. Configure Environment-Specific Execution

Automation projects often have environments such as:

```text
QA
STAGING
PROD
```

The Jenkins job can pass environment variables to the Playwright execution.

Example:

```text
TEST_ENV=qa
```

Then the Playwright project can use that environment variable to select the appropriate URL or configuration.

For example:

```bash
TEST_ENV=qa npx playwright test
```

The exact syntax depends on the Jenkins agent operating system and project implementation.

### Important

Environment-specific credentials such as:

```text
username
password
API token
client secret
```

should not be committed to GitHub.

Use Jenkins Credentials or secure environment configuration.

---

# 25. Configure Test Reports

Playwright can generate reports after test execution.

For example:

```bash
npx playwright test
```

can generate the configured Playwright report.

A common Playwright report is:

```text
playwright-report/
```

The Jenkins job can be configured to publish or archive test results depending on the installed Jenkins plugins and the reporting format used by the project.

---

# 26. Save the Jenkins Job Configuration

After configuring:

- General
- Source Code Management
- GitHub URL
- Credentials
- Branch
- Build Triggers
- Build Steps
- Environment
- Reports

click:

```text
Save
```

The Jenkins job is now created.

---

# 27. Run the Build Manually

Open the Jenkins job.

On the job page, select:

```text
Build Now
```

Jenkins starts the job immediately.

The flow is:

```text
Build Now
    |
    v
Checkout GitHub Code
    |
    v
Install Dependencies
    |
    v
Install Playwright
    |
    v
Run Tests
    |
    v
Generate Results
    |
    v
Build Complete
```

---

# 28. Monitor the Build

After clicking `Build Now`, Jenkins creates a build number.

Example:

```text
Build #1
Build #2
Build #3
```

Click the build number to see details.

Then select:

```text
Console Output
```

The console output shows what Jenkins executed.

For example:

```text
Started by user
Checking out Git repository
Installing dependencies
Running Playwright tests
Tests completed
Finished: SUCCESS
```

---

# 29. Understand Jenkins Build Status

Common Jenkins build results include:

## SUCCESS

The build completed successfully.

```text
SUCCESS
```

## FAILURE

The build failed.

Possible reasons:

- Git checkout failure
- npm installation failure
- Playwright test failure
- Configuration issue
- Environment issue
- Missing dependency

## UNSTABLE

The build completed but some configured condition indicates a warning/problem.

## ABORTED

The build was manually stopped or otherwise aborted.

---

# 30. Update an Existing Jenkins Build Configuration

After the Jenkins job has been created, the Automation Tester may need to change its configuration.

Open:

```text
Jenkins
   |
   v
Existing Job
   |
   v
Configure
```

This opens the existing job configuration.

The same sections can be updated.

---

# 31. Update the GitHub Repository Path

Suppose the project moved from:

```text
https://github.com/company/old-playwright-project.git
```

to:

```text
https://github.com/company/new-playwright-project.git
```

Open:

```text
Configure
    |
    v
Source Code Management
    |
    v
Git
    |
    v
Repository URL
```

Replace the old URL with the new GitHub repository URL.

Example:

```text
https://github.com/VineethRajendran7/Solartis.git
```

Then click:

```text
Save
```

---

# 32. Update the Branch

Suppose Jenkins currently runs:

```text
*/main
```

but the team now wants Jenkins to execute:

```text
*/feature/playwright_test
```

Go to:

```text
Configure
    |
    v
Source Code Management
    |
    v
Branches to build
```

Update:

```text
*/main
```

to:

```text
*/feature/playwright_test
```

Then:

```text
Save
```

---

# 33. Update the Periodic Schedule

Suppose the existing Jenkins job runs at:

```text
5 9 * * *
```

and the Automation Tester wants it to run at 10:30 AM.

Go to:

```text
Configure
    |
    v
Build Triggers
    |
    v
Build periodically
```

Change:

```text
5 9 * * *
```

to:

```text
30 10 * * *
```

Then click:

```text
Save
```

The next scheduled execution will use the updated schedule.

---

# 34. Update the Playwright Build Command

Suppose the current build command is:

```bash
npx playwright test
```

and the Automation Tester wants to run only smoke tests.

The command could be changed to something appropriate for the project's test structure, for example:

```bash
npx playwright test tests/smoke/
```

or:

```bash
npx playwright test --grep "@smoke"
```

The actual command should match the project's Playwright configuration and tagging strategy.

Go to:

```text
Configure
    |
    v
Build Steps
```

Update the command.

Then click:

```text
Save
```

---

# 35. Update Dependencies Installation

If the project previously used:

```bash
npm install
```

and the team standardizes on lock-file-based CI installation, the build step can be updated to:

```bash
npm ci
```

For example:

```bash
npm ci
npx playwright install
npx playwright test
```

This creates a clear CI execution sequence.

---

# 36. Update the Jenkins Job to Use a Different Environment

Suppose the existing job runs against QA:

```text
TEST_ENV=qa
```

and the requirement changes to staging:

```text
TEST_ENV=staging
```

Update the relevant environment variable configuration or build command.

For example:

```bash
TEST_ENV=staging npx playwright test
```

The exact implementation should follow the project's environment-management approach.

---

# 37. Run the Updated Build

After changing the configuration:

```text
Save
   |
   v
Build Now
```

Jenkins executes the updated configuration.

Always check:

```text
Console Output
```

to verify that Jenkins is actually using the new configuration.

---

# 38. Verify the GitHub Checkout

In the Console Output, verify that Jenkins is checking out the expected repository and branch.

Conceptually, you should confirm:

```text
Repository:
https://github.com/VineethRajendran7/Solartis.git

Branch:
main
```

or whichever branch was configured.

This is important because a successful Jenkins build does not automatically mean the correct repository or branch was executed.

---

# 39. Verify the Playwright Execution

Check the Console Output for the Playwright command.

For example:

```text
npm ci

npx playwright install

npx playwright test
```

Then verify the test result.

Example:

```text
10 passed
2 failed
```

The exact output depends on the test suite.

---

# 40. Complete Jenkins Automation Workflow

The complete process can be visualized as:

```text
Automation Tester
        |
        | Develop Playwright Code
        v
Local Playwright Project
        |
        | git add
        | git commit
        | git push
        v
GitHub Repository
        |
        | Jenkins Checkout
        v
Jenkins Workspace
        |
        | npm ci
        v
Install Dependencies
        |
        | Playwright Browser Installation
        v
Playwright Environment
        |
        | npx playwright test
        v
Execute Automation
        |
        v
Test Report
        |
        v
Jenkins Build Result
```

---

# 41. Scheduled Jenkins Execution

If the job is configured with:

```text
Build periodically
```

Jenkins automatically starts the job according to the configured schedule.

Example:

```text
5 9 * * *
```

Flow:

```text
09:05
  |
  v
Jenkins Trigger
  |
  v
Checkout GitHub
  |
  v
Install Dependencies
  |
  v
Run Playwright
  |
  v
Generate Report
  |
  v
Build Result
```

The Automation Tester does not need to manually click `Build Now` for each scheduled execution.

---

# 42. Real-World Team Example

Assume an Automation Tester makes changes to:

```text
tests/login.spec.ts
```

The Automation Tester works locally:

```bash
git add .
git commit -m "Updated login automation"
git push
```

The updated code reaches GitHub.

```text
Automation Tester
       |
       | git push
       v
GitHub
```

Jenkins is configured to execute the `main` branch.

At the scheduled time:

```text
Jenkins
   |
   | Checkout
   v
GitHub main
   |
   v
Jenkins Workspace
   |
   v
npm ci
   |
   v
npx playwright install
   |
   v
npx playwright test
```

Jenkins then produces the build result.

---

# 43. When Another Automation Tester Updates the Code

Suppose Automation Tester 2 pushes additional changes to GitHub.

```text
Tester 1
   |
   | Push
   v
GitHub
   ^
   |
   | Push
   |
Tester 2
```

Jenkins is configured to use the shared branch.

At the next scheduled execution, Jenkins retrieves the latest code from the configured branch.

Therefore:

```text
GitHub
   |
   | Latest code
   v
Jenkins
   |
   v
Latest Playwright automation
```

This is one of the major benefits of CI:

> Jenkins executes the automation from the source repository rather than relying on a developer's local machine.

---

# 44. Important Difference Between Local Execution and Jenkins Execution

## Local execution

The Automation Tester runs:

```bash
npx playwright test
```

on their local machine.

```text
Automation Tester
      |
      v
Local Machine
      |
      v
Playwright
```

## Jenkins execution

Jenkins retrieves the project and runs:

```bash
npx playwright test
```

on the configured Jenkins agent.

```text
GitHub
   |
   v
Jenkins
   |
   v
Jenkins Agent
   |
   v
Playwright
```

The code should therefore be designed to run reliably in a clean CI environment.

---

# 45. Recommended Jenkins Build Sequence for Playwright

A typical sequence is:

```bash
npm ci
npx playwright install
npx playwright test
```

If the environment requires browser/system dependencies:

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

Use the command appropriate for the Jenkins agent operating system and project requirements.

---

# 46. Troubleshooting a Failed Jenkins Build

If Jenkins shows:

```text
FAILURE
```

open:

```text
Build Number
    |
    v
Console Output
```

Identify the failure.

Common categories:

## Git failure

Possible issues:

```text
Invalid repository URL
Invalid credentials
Branch does not exist
Network access issue
```

## Node/npm failure

Possible issues:

```text
Node.js not installed
npm not available
Dependency installation failure
package-lock.json issue
```

## Playwright failure

Possible issues:

```text
Browser not installed
Test failure
Incorrect environment URL
Missing environment variable
Locator failure
Timeout
```

## Jenkins configuration failure

Possible issues:

```text
Incorrect build command
Wrong branch
Wrong workspace
Incorrect environment variable
Incorrect credentials
```

---

# 47. Updating an Existing Jenkins Job – Summary

When an existing Jenkins job needs modification:

```text
Jenkins Dashboard
       |
       v
Existing Job
       |
       v
Configure
       |
       +-- General
       |
       +-- Source Code Management
       |      |
       |      +-- Repository URL
       |      +-- Credentials
       |      +-- Branch
       |
       +-- Build Triggers
       |      |
       |      +-- Periodic Schedule
       |
       +-- Build Environment
       |
       +-- Build Steps
       |      |
       |      +-- npm ci
       |      +-- Playwright install
       |      +-- Playwright test
       |
       +-- Post-build / Reports
       |
       v
Save
       |
       v
Build Now
       |
       v
Console Output
```

---

# 48. Recommended End-to-End Jenkins Process

The Automation Tester workflow can be remembered as:

```text
1. Create Playwright Project
        |
        v
2. Push Playwright Project to GitHub
        |
        v
3. Open Jenkins
        |
        v
4. Create New Item
        |
        v
5. Select Freestyle Project
        |
        v
6. Configure Job
        |
        v
7. Configure GitHub Repository
        |
        v
8. Configure Credentials
        |
        v
9. Configure Branch
        |
        v
10. Configure Build Trigger
        |
        v
11. Configure Periodic Schedule
        |
        v
12. Configure Build Steps
        |
        v
13. Install Dependencies
        |
        v
14. Install Playwright
        |
        v
15. Run Playwright Tests
        |
        v
16. Save Configuration
        |
        v
17. Build Now
        |
        v
18. Check Console Output
        |
        v
19. Verify Test Results
        |
        v
20. Update Configuration When Required
        |
        v
21. Save
        |
        v
22. Run Updated Build
```

---

# 49. Simple Real-World Explanation

The complete Jenkins process can be explained to an Automation Tester as follows:

> The Automation Tester develops the Playwright automation code in VS Code and pushes the code to the team's GitHub repository. Jenkins is configured with the GitHub repository path and the branch from which the automation code should be retrieved. When a Jenkins build starts, Jenkins checks out the configured branch into its workspace. Jenkins then installs the Node.js dependencies, installs the required Playwright browsers, and executes the Playwright test command. The test execution result is captured by Jenkins and can be viewed through the build console and configured reports.
>
> If the team wants the automation to run automatically, the Jenkins job can be configured with a periodic schedule using Jenkins cron syntax. For example, `5 9 * * *` schedules the job to run every day at 9:05 AM according to the Jenkins server's configured timezone.
>
> If the project configuration changes later, the Automation Tester does not need to create a new Jenkins job. They can open the existing job, select `Configure`, update the GitHub repository path, branch, schedule, environment, or Playwright build commands as required, save the configuration, and run a new build to verify the changes.
>
> In a team environment, the important relationship is:
>
> ```text
> Automation Tester
>        |
>        | Develop + Commit + Push
>        v
> GitHub Global Repository
>        |
>        | Jenkins Checkout
>        v
> Jenkins Workspace
>        |
>        | Install + Execute
>        v
> Playwright Automation
>        |
>        v
> Jenkins Build Result
> ```
>
> This allows the team to maintain the automation code in GitHub and execute the latest configured code through Jenkins in a repeatable CI environment.

---

# 50. Final Checklist

Before considering the Jenkins job complete, verify:

```text
[ ] Jenkins job created

[ ] Correct job type selected

[ ] Git configured

[ ] Correct GitHub repository URL configured

[ ] Correct credentials configured

[ ] Correct branch configured

[ ] Build trigger configured

[ ] Periodic schedule configured if required

[ ] Node.js available on Jenkins agent

[ ] npm available on Jenkins agent

[ ] Dependencies installation configured

[ ] Playwright browser installation configured

[ ] Playwright test command configured

[ ] Environment variables configured if required

[ ] Test reports configured if required

[ ] Job saved

[ ] Manual Build Now executed

[ ] Console Output reviewed

[ ] Playwright tests executed successfully

[ ] Existing job configuration can be updated when required
```

# Key Commands Used in the Jenkins + Playwright Process

## Git commands

```bash
git status
git add .
git commit -m "message"
git push
git pull
```

## Node/npm commands

```bash
npm ci
npm install
```

## Playwright commands

```bash
npx playwright install
npx playwright install --with-deps
npx playwright test
```

## Example Jenkins schedule

```text
5 9 * * *
```

Meaning:

```text
Every day at 09:05
```

subject to the Jenkins server's configured timezone.

# Final Concept

The complete Jenkins CI process is:

```text
CODE
  |
  v
GITHUB
  |
  v
JENKINS CHECKOUT
  |
  v
DEPENDENCY INSTALLATION
  |
  v
PLAYWRIGHT BROWSER SETUP
  |
  v
PLAYWRIGHT TEST EXECUTION
  |
  v
TEST REPORT
  |
  v
BUILD RESULT
```

The Automation Tester mainly works with the GitHub repository and Playwright code. Jenkins acts as the CI execution system that retrieves the configured source code and runs the automation according to the configured trigger or manual build request.
