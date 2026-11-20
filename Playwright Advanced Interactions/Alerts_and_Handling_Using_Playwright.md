# Alerts and Their Handling Using Playwright

## 1. Introduction

In web applications, an **alert** is a browser dialog that appears to display information, request confirmation, or collect a simple input from the user.

In Playwright, browser dialogs are handled using the `page.on("dialog")` event.

Playwright supports handling common browser dialogs such as:

- Alert
- Confirm
- Prompt
- BeforeUnload

> **Important:** Playwright automatically dismisses dialogs if there is no dialog listener. When you need to verify or interact with a dialog, register a dialog handler before triggering it.

---

## 2. Prerequisites

Before learning alert handling in Playwright, you should know:

- Basic JavaScript/TypeScript
- Basic Playwright syntax
- `async` / `await`
- Playwright Test
- Basic locators
- Basic assertions

Recommended setup:

- Node.js
- VS Code
- Playwright
- TypeScript

---

## 3. What is a Browser Dialog?

A browser dialog is a native browser popup that appears independently of the HTML DOM.

For example:

```text
+---------------------------+
|        Example.com        |
|                           |
|  Are you sure you want    |
|  to continue?             |
|                           |
|       OK       Cancel     |
+---------------------------+
```

These dialogs are different from normal HTML popups.

### HTML Popup vs Browser Dialog

| Feature | HTML Popup | Browser Dialog |
|---|---|---|
| Part of DOM | Yes | No |
| Can use normal locators | Yes | No |
| Example | `<div>` modal | `alert()` |
| Playwright handling | Locator APIs | `page.on("dialog")` |
| Can inspect DOM | Yes | No |

---

## 4. Types of Browser Dialogs

| Dialog Type | Purpose | Common JavaScript Method |
|---|---|---|
| Alert | Displays information | `alert()` |
| Confirm | Gets OK/Cancel confirmation | `confirm()` |
| Prompt | Gets text input | `prompt()` |
| BeforeUnload | Warns before leaving a page | Browser navigation/unload event |

---

## 5. Alert

An **alert** displays a message and normally provides an **OK** button.

### JavaScript Example

```javascript
alert("Login successful");
```

The user must click **OK** to close the alert.

### Playwright Handling

```typescript
page.on("dialog", async dialog => {
    console.log(dialog.message());
    await dialog.accept();
});
```

### Important Methods

| Method | Purpose |
|---|---|
| `dialog.type()` | Returns the dialog type |
| `dialog.message()` | Returns the dialog message |
| `dialog.accept()` | Accepts the dialog |
| `dialog.dismiss()` | Dismisses the dialog |
| `dialog.defaultValue()` | Returns the default prompt value |

---

## 6. Confirm Dialog

A confirm dialog asks the user to confirm an action.

Example:

```javascript
confirm("Do you want to delete this record?");
```

It normally contains:

```text
OK
Cancel
```

### Accept Confirm

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});
```

### Dismiss Confirm

```typescript
page.on("dialog", async dialog => {
    await dialog.dismiss();
});
```

---

## 7. Prompt Dialog

A prompt dialog asks the user to enter text.

Example:

```javascript
prompt("Enter your name");
```

### Enter a Value

```typescript
page.on("dialog", async dialog => {
    await dialog.accept("John");
});
```

The string passed to `accept()` becomes the prompt input.

### Dismiss Prompt

```typescript
page.on("dialog", async dialog => {
    await dialog.dismiss();
});
```

---

## 8. BeforeUnload Dialog

A `beforeunload` dialog can appear when a page attempts to leave while the application has registered a `beforeunload` handler.

It can be handled using the same dialog event:

```typescript
page.on("dialog", async dialog => {
    if (dialog.type() === "beforeunload") {
        await dialog.accept();
    }
});
```

---

## 9. Key Playwright Dialog Methods

### `dialog.type()`

Returns the type of dialog.

```typescript
console.log(dialog.type());
```

Possible values include:

```text
alert
confirm
prompt
beforeunload
```

---

### `dialog.message()`

Returns the message displayed by the dialog.

```typescript
console.log(dialog.message());
```

Example:

```typescript
page.on("dialog", async dialog => {
    console.log(`Message: ${dialog.message()}`);
    await dialog.accept();
});
```

---

### `dialog.accept()`

Accepts the dialog.

```typescript
await dialog.accept();
```

For a prompt:

```typescript
await dialog.accept("Test User");
```

---

### `dialog.dismiss()`

Dismisses the dialog.

```typescript
await dialog.dismiss();
```

---

### `dialog.defaultValue()`

Returns the default value of a prompt dialog.

```typescript
console.log(dialog.defaultValue());
```

This is mainly useful for prompt dialogs.

---

## 10. Syntax / Structure

The general syntax is:

```typescript
page.on("dialog", async dialog => {
    // inspect dialog
    // accept or dismiss dialog
});
```

A more complete pattern is:

```typescript
page.on("dialog", async dialog => {
    console.log(dialog.type());
    console.log(dialog.message());

    await dialog.accept();
});
```

### Important Point

The dialog handler should be registered **before** the action that triggers the dialog.

---

# 11. Simple Example

Suppose clicking a button displays:

```text
Hello Playwright
```

as an alert.

```typescript
import { test, expect } from "@playwright/test";

test("Handle alert", async ({ page }) => {

    page.on("dialog", async dialog => {
        console.log(dialog.message());

        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toBe("Hello Playwright");

        await dialog.accept();
    });

    await page.goto("https://example.com");

    // Action that triggers the alert
    // await page.getByRole("button", { name: "Show Alert" }).click();

});
```

### Explanation

1. Register the `dialog` event listener.
2. Perform the action that triggers the alert.
3. Playwright receives the dialog.
4. `dialog.message()` reads the message.
5. `dialog.type()` identifies the dialog type.
6. `dialog.accept()` clicks OK.

---

# 12. Step-by-Step Implementation

## Step 1 — Prerequisites

Create a Playwright TypeScript project.

You need:

- Node.js
- Playwright
- TypeScript
- Playwright Test

---

## Step 2 — Installation

Create a Playwright project:

```bash
npm init playwright@latest
```

Follow the setup prompts and select TypeScript when required.

---

## Step 3 — Project Structure

A basic structure can look like:

```text
project/
├── tests/
│   └── alerts.spec.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Step 4 — Create the Test

Create:

```text
tests/alerts.spec.ts
```

Example:

```typescript
import { test, expect } from "@playwright/test";

test("Handle browser alert", async ({ page }) => {

    page.on("dialog", async dialog => {

        console.log(`Dialog Type: ${dialog.type()}`);
        console.log(`Dialog Message: ${dialog.message()}`);

        expect(dialog.type()).toBe("alert");

        await dialog.accept();
    });

    await page.goto("https://example.com");

    // Trigger the alert here
    // await page.getByRole("button", { name: "Show Alert" }).click();
});
```

---

## Step 5 — Trigger the Dialog

The listener should be registered before the action:

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});

await page.getByRole("button", { name: "Show Alert" }).click();
```

This order is important.

### Correct

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});

await page.getByRole("button", { name: "Show Alert" }).click();
```

### Avoid

```typescript
await page.getByRole("button", { name: "Show Alert" }).click();

page.on("dialog", async dialog => {
    await dialog.accept();
});
```

The dialog may already be waiting for a handler.

---

## Step 6 — Execute the Test

Run:

```bash
npx playwright test
```

For headed execution:

```bash
npx playwright test --headed
```

For a specific test file:

```bash
npx playwright test tests/alerts.spec.ts
```

---

## Step 7 — Verification

Verify:

- The dialog is detected.
- The correct dialog type is identified.
- The expected message is received.
- The dialog is accepted or dismissed.
- The test continues successfully.

---

# 13. How Alert Handling Works

The basic flow is:

```text
Test starts
     ↓
Register dialog listener
     ↓
Perform action
     ↓
Application triggers browser dialog
     ↓
Playwright emits "dialog" event
     ↓
Read dialog information
     ↓
Accept / Dismiss / Enter value
     ↓
Application continues
     ↓
Test continues
```

---

# 14. Handling Alert

```typescript
page.on("dialog", async dialog => {

    expect(dialog.type()).toBe("alert");

    console.log(dialog.message());

    await dialog.accept();
});
```

Use this when the application displays an informational message.

---

# 15. Handling Confirm — Accept

```typescript
page.on("dialog", async dialog => {

    expect(dialog.type()).toBe("confirm");

    await dialog.accept();
});
```

This simulates clicking **OK**.

---

# 16. Handling Confirm — Dismiss

```typescript
page.on("dialog", async dialog => {

    expect(dialog.type()).toBe("confirm");

    await dialog.dismiss();
});
```

This simulates clicking **Cancel**.

---

# 17. Handling Prompt

```typescript
page.on("dialog", async dialog => {

    expect(dialog.type()).toBe("prompt");

    await dialog.accept("Playwright");
});
```

This enters:

```text
Playwright
```

into the prompt and accepts it.

---

# 18. Validating Dialog Message

Dialog messages can be validated using Playwright assertions.

```typescript
page.on("dialog", async dialog => {

    expect(dialog.message()).toBe("Are you sure?");

    await dialog.accept();
});
```

This is useful for functional validation.

---

# 19. Validating Dialog Type and Message

```typescript
page.on("dialog", async dialog => {

    expect(dialog.type()).toBe("confirm");

    expect(dialog.message())
        .toBe("Do you want to delete this record?");

    await dialog.accept();
});
```

This validates both:

- Dialog type
- Dialog message

---

# 20. Accept vs Dismiss

| Method | Action |
|---|---|
| `accept()` | Clicks OK / accepts |
| `dismiss()` | Clicks Cancel / dismisses |

Example:

```typescript
await dialog.accept();
```

versus:

```typescript
await dialog.dismiss();
```

---

# 21. Alert vs Confirm vs Prompt

| Feature | Alert | Confirm | Prompt |
|---|---|---|---|
| Displays message | Yes | Yes | Yes |
| OK button | Yes | Yes | Yes |
| Cancel button | No | Yes | Yes |
| Accept text | No | No | Yes |
| `accept()` | Yes | Yes | Yes |
| `dismiss()` | Yes* | Yes | Yes |
| Typical purpose | Information | Confirmation | User input |

\*The exact browser behavior of dismissing an alert is not generally the normal user interaction; use `accept()` for a standard alert.

---

# 22. Real-World Example

Consider an employee management application.

When the user clicks **Delete Employee**, the application displays:

```text
Are you sure you want to delete this employee?
```

The automation should verify the message and click **OK**.

```typescript
page.on("dialog", async dialog => {

    expect(dialog.type()).toBe("confirm");

    expect(dialog.message())
        .toBe("Are you sure you want to delete this employee?");

    await dialog.accept();
});

await page.getByRole("button", { name: "Delete Employee" }).click();
```

---

# 23. Negative Scenario — Cancel Delete

A negative test can verify that the employee is not deleted when Cancel is selected.

```typescript
page.on("dialog", async dialog => {

    expect(dialog.type()).toBe("confirm");

    await dialog.dismiss();
});

await page.getByRole("button", { name: "Delete Employee" }).click();
```

Then verify that the employee remains available.

---

# 24. One-Time Dialog Handling

For some scenarios, you may want to handle a specific dialog only once.

A listener can be registered for the page and removed when appropriate.

For simple test cases, however, keeping the handler inside the test is often easier to understand and maintain.

---

# 25. Dialog Handling with a Conditional Check

You can decide what to do based on the dialog type.

```typescript
page.on("dialog", async dialog => {

    if (dialog.type() === "alert") {
        await dialog.accept();
    }

    if (dialog.type() === "confirm") {
        await dialog.dismiss();
    }

});
```

---

# 26. Dialog Handling Based on Message

You can also inspect the message.

```typescript
page.on("dialog", async dialog => {

    if (dialog.message() === "Delete this record?") {
        await dialog.accept();
    } else {
        await dialog.dismiss();
    }

});
```

Use this approach carefully. Dialog messages can change between environments or application versions.

---

# 27. Using `waitForEvent("dialog")`

Another useful approach is to wait for the dialog event while performing the action that triggers it.

```typescript
const dialogPromise = page.waitForEvent("dialog");

await page.getByRole("button", { name: "Show Alert" }).click();

const dialog = await dialogPromise;

console.log(dialog.message());

await dialog.accept();
```

This approach is useful when you want to explicitly coordinate the action and the dialog event.

---

# 28. `page.on("dialog")` vs `page.waitForEvent("dialog")`

| Feature | `page.on("dialog")` | `page.waitForEvent("dialog")` |
|---|---|---|
| Type | Event listener | Event wait |
| Best for | Repeated/general handling | Specific dialog event |
| Listener remains | Yes | No |
| Useful for multiple dialogs | Yes | Yes, with repeated waits |
| Explicit event synchronization | Less explicit | More explicit |

### Recommended Approach

For most straightforward test cases:

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});
```

For a specific action where you want explicit synchronization:

```typescript
const dialogPromise = page.waitForEvent("dialog");

await page.getByRole("button", { name: "Show Alert" }).click();

const dialog = await dialogPromise;

await dialog.accept();
```

---

# 29. Common Errors

| Problem | Cause | Solution |
|---|---|---|
| Dialog blocks the test | Dialog not handled | Register a dialog handler |
| Dialog handler does not execute | Handler registered too late | Register it before triggering the dialog |
| Wrong button action | `accept()` used instead of `dismiss()` | Select the required dialog action |
| Prompt value not entered | No value passed to `accept()` | Use `accept("value")` |
| Message validation fails | Expected message differs | Verify actual dialog message |
| Dialog is not found with locator | Browser dialog is not DOM content | Use `page.on("dialog")` or `waitForEvent("dialog")` |
| Test hangs around dialog | Dialog is waiting for interaction | Accept or dismiss it |

---

# 30. Common Mistakes to Avoid

### Mistake 1 — Treating an alert like an HTML element

Incorrect approach:

```typescript
await page.locator("text=OK").click();
```

A browser alert is not a normal DOM element.

Use:

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});
```

---

### Mistake 2 — Registering the listener after the action

Avoid:

```typescript
await page.getByRole("button", { name: "Alert" }).click();

page.on("dialog", async dialog => {
    await dialog.accept();
});
```

Prefer:

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});

await page.getByRole("button", { name: "Alert" }).click();
```

---

### Mistake 3 — Forgetting to accept or dismiss

This can leave the dialog blocking the page.

```typescript
page.on("dialog", async dialog => {
    console.log(dialog.message());

    // Always handle the dialog when your test requires it.
    await dialog.accept();
});
```

---

### Mistake 4 — Using the wrong method for a prompt

For a prompt requiring input:

```typescript
await dialog.accept("John");
```

not simply:

```typescript
await dialog.accept();
```

when the test requires a specific input value.

---

# 31. Best Practices

- Register the dialog handler before triggering the dialog.
- Validate the dialog type when it is important to the test.
- Validate the dialog message for functional testing.
- Use `accept()` for positive confirmation scenarios.
- Use `dismiss()` for negative/cancel scenarios.
- Use `accept("value")` for prompt input.
- Do not use DOM locators for native browser dialogs.
- Keep dialog handling close to the action that triggers it when possible.
- Avoid unnecessary global dialog handlers.
- Prefer stable test data and predictable messages.
- Use `waitForEvent("dialog")` when explicit event synchronization makes the test clearer.

---

# 32. Interview Points

### 1. How do you handle an alert in Playwright?

Use the `dialog` event:

```typescript
page.on("dialog", async dialog => {
    await dialog.accept();
});
```

---

### 2. How do you get the alert message?

```typescript
dialog.message();
```

---

### 3. How do you identify the dialog type?

```typescript
dialog.type();
```

---

### 4. How do you dismiss a confirmation dialog?

```typescript
await dialog.dismiss();
```

---

### 5. How do you enter text into a prompt?

```typescript
await dialog.accept("Playwright");
```

---

### 6. Can you locate a browser alert using `page.locator()`?

No. Native browser dialogs are not normal DOM elements.

Use:

```typescript
page.on("dialog")
```

or:

```typescript
page.waitForEvent("dialog")
```

---

### 7. What happens if a dialog is not handled?

Playwright's documented behavior is that dialogs are automatically dismissed when there is no listener.

When you need to inspect or control a dialog, explicitly handle it.

---

### 8. What is the difference between `accept()` and `dismiss()`?

```typescript
accept()
```

accepts the dialog.

```typescript
dismiss()
```

dismisses the dialog.

---

### 9. What is the difference between `page.on("dialog")` and `page.waitForEvent("dialog")`?

`page.on("dialog")` registers an event listener, while `page.waitForEvent("dialog")` waits for a specific dialog event and returns the dialog object.

---

# 33. Quick Revision

| Topic | Key Point |
|---|---|
| Alert | Displays information |
| Confirm | Gets confirmation |
| Prompt | Gets user input |
| `dialog.type()` | Gets dialog type |
| `dialog.message()` | Gets dialog message |
| `dialog.accept()` | Accepts dialog |
| `dialog.dismiss()` | Dismisses dialog |
| `dialog.defaultValue()` | Gets prompt default value |
| `page.on("dialog")` | Registers dialog event handler |
| `page.waitForEvent("dialog")` | Waits for a dialog event |
| Native dialog | Not a DOM element |
| Handler timing | Register before triggering action |

---

# 34. Key Takeaways

- Browser dialogs are different from HTML popups.
- Playwright handles browser dialogs through the `dialog` event.
- Use `dialog.type()` to identify the dialog.
- Use `dialog.message()` to read the message.
- Use `dialog.accept()` to accept a dialog.
- Use `dialog.dismiss()` to dismiss a dialog.
- For prompts, use `dialog.accept("value")` to enter text.
- Register the dialog handler before performing the action that triggers the dialog.
- Use `page.waitForEvent("dialog")` when explicit event synchronization is useful.
- Native browser dialogs should not be handled using normal DOM locators.
