# Alerts and Their Handling Using Playwright

## 1. Definition

A **browser alert** is a browser-generated dialog that interrupts the current page and requires the user or automation script to respond.

In Playwright, browser dialogs are handled using the **`page.on("dialog")`** event or the **`page.once("dialog")`** event.

---

## 2. What Does It Mean?

Playwright can handle common browser dialogs such as:

| Dialog Type | Purpose | Playwright Method |
|---|---|---|
| `alert` | Displays an informational message | `dialog.accept()` |
| `confirm` | Asks the user to confirm or cancel | `dialog.accept()` / `dialog.dismiss()` |
| `prompt` | Accepts text input from the user | `dialog.accept("text")` |
| `beforeunload` | Appears when leaving a page with unsaved changes | `dialog.accept()` / `dialog.dismiss()` |

### In simple terms

Think of a browser dialog as a temporary window controlled by the browser.

```text
Web Page
   ↓
JavaScript triggers dialog
   ↓
Browser displays dialog
   ↓
Playwright detects dialog
   ↓
Playwright accepts / dismisses / enters text
   ↓
Browser continues execution
```

> **Important:** A dialog must be handled when it appears. If Playwright encounters an unexpected dialog that is not handled, the action that triggered it can remain blocked.

---

## 3. Why Is It Used?

Dialog handling is required when an application uses native browser dialogs for:

- Notifications
- Confirmation messages
- Delete confirmations
- User input
- Unsaved-change warnings
- Simple validation messages

### Example

A user clicks **Delete**:

```text
Click Delete
     ↓
Confirm dialog appears
     ↓
"Are you sure?"
     ↓
Accept
     ↓
Record is deleted
```

Automation must reproduce the required user action.

---

## 4. Key Terminology

| Term | Meaning |
|---|---|
| `dialog` | Playwright object representing the browser dialog |
| `dialog.type()` | Returns the dialog type |
| `dialog.message()` | Returns the dialog message |
| `dialog.accept()` | Accepts the dialog |
| `dialog.dismiss()` | Dismisses the dialog |
| `dialog.defaultValue()` | Returns the default value of a prompt |
| `dialog.accept("text")` | Accepts a prompt and supplies text |
| `page.on()` | Registers an event listener |
| `page.once()` | Registers a listener that runs only once |

---

## 5. Core Concepts

### 5.1 Alert

An `alert` displays a message and normally has an **OK** button.

Example:

```javascript
alert("Login successful");
```

Playwright handling:

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});
```

---

### 5.2 Confirm

A `confirm` dialog asks the user to confirm an action.

Example:

```javascript
confirm("Are you sure you want to delete?");
```

The user can:

- Click **OK** → accept
- Click **Cancel** → dismiss

Playwright:

```typescript
await dialog.accept();
```

or:

```typescript
await dialog.dismiss();
```

---

### 5.3 Prompt

A `prompt` asks the user to enter text.

Example:

```javascript
prompt("Enter your name");
```

Playwright:

```typescript
await dialog.accept("Vineeth");
```

---

### 5.4 Beforeunload

A `beforeunload` dialog can appear when a page is being closed or navigated away from while there may be unsaved changes.

Playwright can handle it using:

```typescript
await dialog.accept();
```

or:

```typescript
await dialog.dismiss();
```

---

## 6. Syntax / Structure

### Event Listener

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});
```

### One-Time Event Listener

```typescript
page.once("dialog", async dialog => {
    await dialog.accept();
});
```

### Accept an Alert

```typescript
await dialog.accept();
```

### Dismiss a Confirm Dialog

```typescript
await dialog.dismiss();
```

### Enter Text in a Prompt

```typescript
await dialog.accept("Vineeth");
```

### Read Dialog Information

```typescript
console.log(dialog.type());
console.log(dialog.message());
console.log(dialog.defaultValue());
```

---

## 7. Example

### Example 1 — Accept an Alert

Suppose clicking a button displays:

```text
Alert:
"Welcome to Playwright"
```

The automation should:

1. Register a dialog handler.
2. Click the button.
3. Capture the dialog.
4. Verify the message.
5. Accept the dialog.

---

## 8. Example Code

### Accept an Alert

```typescript
import { test, expect } from "@playwright/test";

test("Handle alert", async ({ page }) => {

    page.on("dialog", async dialog => {

        console.log("Dialog type:", dialog.type());
        console.log("Dialog message:", dialog.message());

        await dialog.accept();
    });

    await page.goto("https://leafground.com/alert.xhtml");

    // Click the button that triggers the alert
    await page.getByText("Show").first().click();
});
```

### Code Explanation

```typescript
page.on("dialog", async dialog => {
```

Registers a listener for browser dialogs.

```typescript
dialog.type()
```

Returns the type of dialog.

Example:

```text
alert
confirm
prompt
beforeunload
```

```typescript
dialog.message()
```

Returns the message displayed by the dialog.

```typescript
await dialog.accept();
```

Clicks the equivalent of **OK**.

---

## 9. How It Works

```text
Test starts
    ↓
Register dialog listener
    ↓
Perform action that triggers dialog
    ↓
Browser creates dialog
    ↓
Playwright receives "dialog" event
    ↓
Read type/message if required
    ↓
Accept / Dismiss / Enter text
    ↓
Dialog closes
    ↓
Test continues
```

### Important Sequence

The dialog handler should generally be registered **before** the action that triggers the dialog.

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});

await page.getByText("Show Alert").click();
```

This makes the handler ready when the dialog appears.

---

# 10. Step-by-Step Implementation

## Step 1 — Prerequisites

Required:

- Node.js
- VS Code
- Playwright
- TypeScript
- Playwright Test project

---

## Step 2 — Installation

Create a Playwright project if required:

```bash
npm init playwright@latest
```

Install Playwright:

```bash
npm install -D @playwright/test
```

---

## Step 3 — Setup

A simple project structure:

```text
playwright-project/
├── tests/
│   └── alert.spec.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Step 4 — Configuration

A basic Playwright configuration:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    use: {
        browserName: "chromium",
        headless: false
    }
});
```

---

## Step 5 — Implementation

### Handle Alert

```typescript
test("Handle alert", async ({ page }) => {

    page.once("dialog", async dialog => {
        console.log(dialog.message());
        await dialog.accept();
    });

    await page.goto("https://leafground.com/alert.xhtml");

    await page.getByText("Show").first().click();
});
```

### Handle Confirm — Accept

```typescript
test("Accept confirm dialog", async ({ page }) => {

    page.once("dialog", async dialog => {
        expect(dialog.type()).toBe("confirm");
        await dialog.accept();
    });

    await page.goto("https://leafground.com/alert.xhtml");

    // Click the control that triggers the confirm dialog
});
```

### Handle Confirm — Dismiss

```typescript
test("Dismiss confirm dialog", async ({ page }) => {

    page.once("dialog", async dialog => {
        expect(dialog.type()).toBe("confirm");
        await dialog.dismiss();
    });

    await page.goto("https://leafground.com/alert.xhtml");

    // Click the control that triggers the confirm dialog
});
```

### Handle Prompt

```typescript
test("Handle prompt dialog", async ({ page }) => {

    page.once("dialog", async dialog => {

        expect(dialog.type()).toBe("prompt");

        console.log("Message:", dialog.message());

        await dialog.accept("Vineeth");
    });

    await page.goto("https://leafground.com/alert.xhtml");

    // Click the control that triggers the prompt
});
```

---

## Step 6 — Execution

Run all Playwright tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/alert.spec.ts
```

Run in headed mode:

```bash
npx playwright test tests/alert.spec.ts --headed
```

---

## Step 7 — Verification

Verify that:

- The expected dialog appears.
- The dialog type is correct.
- The expected message is displayed.
- The dialog is accepted or dismissed as required.
- Prompt text is entered correctly.
- The test continues after the dialog closes.
- The expected page behavior occurs.

Example:

```typescript
page.once("dialog", async dialog => {

    expect(dialog.message()).toContain("Welcome");

    await dialog.accept();
});
```

---

## Step 8 — Troubleshooting

| Problem | Cause | Solution |
|---|---|---|
| Dialog blocks the test | Dialog is not handled | Register a dialog handler |
| Handler does not execute | Handler registered after the triggering action | Register it before the action |
| Wrong dialog action | Accept/dismiss used incorrectly | Use `accept()` for OK and `dismiss()` for Cancel |
| Prompt text not entered | `accept()` called without text | Use `accept("value")` |
| Wrong dialog type | Test assumes the wrong dialog | Check `dialog.type()` |
| Wrong message | Message was not validated | Use `dialog.message()` |
| Multiple dialogs appear | Only one dialog was expected | Use an appropriate listener strategy |

---

# 11. Real-World Example

### Scenario

An e-commerce application allows a user to delete an item from a shopping list.

When the user clicks **Delete**:

```text
"Are you sure you want to delete this item?"
```

appears as a confirm dialog.

### Requirement

The automation must verify that:

1. The confirmation dialog appears.
2. The message is correct.
3. The user confirms deletion.
4. The item is removed.

### Implementation

```typescript
page.once("dialog", async dialog => {

    expect(dialog.type()).toBe("confirm");

    expect(dialog.message())
        .toContain("Are you sure");

    await dialog.accept();
});

await page.getByRole("button", { name: "Delete" }).click();
```

### Result

The dialog is accepted and the deletion operation continues.

---

# 12. Real-Time Use Case

**Scenario:**  
A banking application asks for confirmation before transferring money.

**Requirement:**  
The automation must verify the confirmation dialog before approving the transfer.

**Implementation:**

```typescript
page.once("dialog", async dialog => {

    expect(dialog.type()).toBe("confirm");

    expect(dialog.message())
        .toContain("Confirm transfer");

    await dialog.accept();
});

await page.getByRole("button", { name: "Transfer" }).click();
```

**Expected Result:**  
The confirmation dialog is validated and accepted, and the transfer process continues.

---

# 13. Automation / Testing Use Case

## Scenario: Validate Different Dialog Behaviors

A test suite may need to verify:

| Scenario | Expected Action |
|---|---|
| Information alert | Accept |
| Delete confirmation | Accept |
| Delete cancellation | Dismiss |
| User-name prompt | Enter value and accept |
| Prompt cancellation | Dismiss |

### Example

```typescript
import { test, expect } from "@playwright/test";

test("Handle browser dialog", async ({ page }) => {

    page.once("dialog", async dialog => {

        console.log("Type:", dialog.type());
        console.log("Message:", dialog.message());

        if (dialog.type() === "alert") {
            await dialog.accept();
        }

        if (dialog.type() === "confirm") {
            await dialog.accept();
        }

        if (dialog.type() === "prompt") {
            await dialog.accept("Vineeth");
        }
    });

    await page.goto("https://example.com");
});
```

> **Best practice:** Prefer handling the expected dialog behavior explicitly rather than using one generic handler for unrelated test scenarios.

---

# 14. Common Errors

| Error / Problem | Cause | Solution |
|---|---|---|
| Dialog remains open | No handler is attached | Attach `page.on()` or `page.once()` |
| Test hangs after clicking | Dialog blocked the browser action | Handle the dialog before triggering it |
| Prompt value is missing | No text passed to `accept()` | Use `dialog.accept("value")` |
| Confirm test fails | Wrong action used | Use `accept()` or `dismiss()` according to the scenario |
| Message validation fails | Expected text is incorrect | Inspect `dialog.message()` |
| Handler affects later dialogs | Persistent listener used unintentionally | Use `page.once()` when appropriate |

---

# 15. Common Mistakes

- Registering the dialog handler after clicking the element.
- Using `accept()` when the test requires cancellation.
- Forgetting to provide text for a prompt.
- Not validating the dialog message when message validation is part of the requirement.
- Using a persistent listener when only one dialog needs to be handled.
- Assuming every browser dialog is a DOM element.
- Trying to locate native browser dialogs using CSS or XPath.

> **Important:** Native browser dialogs are not normal HTML elements. Do not use locators such as `page.locator()` to interact with them.

---

# 16. Best Practices

1. **Register the handler before triggering the dialog.**

```typescript
page.once("dialog", async dialog => {
    await dialog.accept();
});

await page.getByRole("button", { name: "Delete" }).click();
```

2. **Use `page.once()` when only one dialog is expected.**

3. **Validate the dialog type when the scenario requires it.**

```typescript
expect(dialog.type()).toBe("confirm");
```

4. **Validate important dialog messages.**

```typescript
expect(dialog.message()).toContain("Are you sure");
```

5. **Use `accept()` and `dismiss()` according to the business scenario.**

6. **For prompts, provide the required value.**

```typescript
await dialog.accept("Vineeth");
```

7. **Do not use CSS/XPath locators for native browser dialogs.**

8. **Keep dialog handling close to the action that triggers it when possible.**

9. **Use meaningful assertions for dialog behavior.**

10. **Avoid unnecessary global dialog handlers that can hide unexpected dialogs.**

---

# 17. Limitations / Considerations

- Native browser dialogs are different from HTML-based modal dialogs.
- HTML modals should normally be handled using Playwright locators.
- Dialog handling is event-based.
- A dialog that is not handled can interfere with the action that triggered it.
- The correct response depends on the application's expected behavior.

---

# 18. Comparison

## Native Browser Dialog vs HTML Modal

| Feature | Native Browser Dialog | HTML Modal |
|---|---|---|
| Created by | Browser | Web application |
| Example | `alert()`, `confirm()`, `prompt()` | `<div>` modal |
| Playwright handling | `dialog` event | Locators |
| CSS locator | Not applicable | Applicable |
| XPath | Not applicable | Applicable |
| Accept | `dialog.accept()` | Click button |
| Dismiss | `dialog.dismiss()` | Click Cancel/Close |
| Text input | `dialog.accept("text")` | Fill input using locator |

### Example

Native dialog:

```typescript
page.once("dialog", async dialog => {
    await dialog.accept();
});
```

HTML modal:

```typescript
await page.getByRole("button", { name: "OK" }).click();
```

---

# 19. Interview Points

### 1. How do you handle alerts in Playwright?

Use the `dialog` event.

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});
```

### 2. How do you accept an alert?

```typescript
await dialog.accept();
```

### 3. How do you dismiss a confirmation dialog?

```typescript
await dialog.dismiss();
```

### 4. How do you enter text into a prompt?

```typescript
await dialog.accept("Vineeth");
```

### 5. How do you get the dialog message?

```typescript
dialog.message();
```

### 6. How do you identify the dialog type?

```typescript
dialog.type();
```

### 7. What is the difference between `page.on()` and `page.once()`?

| Method | Behavior |
|---|---|
| `page.on()` | Listener remains active for future matching events |
| `page.once()` | Listener executes only once |

### 8. Can you use `page.locator()` for a native alert?

No. Native browser dialogs are not DOM elements.

### 9. What happens if a dialog is not handled?

The dialog can block the browser action and cause the test to remain stuck or fail.

### 10. How do you validate a dialog before accepting it?

```typescript
page.once("dialog", async dialog => {

    expect(dialog.type()).toBe("confirm");
    expect(dialog.message()).toContain("Are you sure");

    await dialog.accept();
});
```

---

# 20. Quick Revision

| Topic | Key Point |
|---|---|
| Alert | Informational browser dialog |
| Confirm | Accept or dismiss |
| Prompt | Accept with text or dismiss |
| `dialog` | Playwright dialog object |
| `dialog.type()` | Returns dialog type |
| `dialog.message()` | Returns displayed message |
| `dialog.accept()` | Accepts dialog |
| `dialog.dismiss()` | Dismisses dialog |
| `page.on()` | Persistent event listener |
| `page.once()` | One-time event listener |
| Native dialog | Handle using dialog event |
| HTML modal | Handle using locators |

---

# 21. Key Takeaways

- Playwright handles native browser dialogs through the **`dialog` event**.
- The main dialog types are **alert, confirm, prompt, and beforeunload**.
- Use `dialog.accept()` to accept a dialog.
- Use `dialog.dismiss()` to cancel/dismiss a dialog.
- Use `dialog.accept("text")` to enter text into a prompt.
- Use `dialog.type()` to identify the dialog type.
- Use `dialog.message()` to validate the displayed message.
- Register the dialog handler **before** triggering the dialog.
- Use `page.once()` when only one dialog is expected.
- Native browser dialogs are **not DOM elements**, so CSS/XPath locators should not be used for them.
- For HTML-based modals, use normal Playwright locators.
