# Window Handling Using Playwright

## 1. Definition

**Window handling** in Playwright refers to working with multiple browser pages or tabs that are opened during a test.

In Playwright, a newly opened browser tab or window is represented by a **`Page` object**. Playwright does not require a separate `switchTo().window()` API like Selenium.

> **In simple terms:** When clicking a link opens a new tab, Playwright captures the newly created `Page` and allows you to interact with it directly.

---

## 2. What Does It Mean?

A browser can have multiple pages open:

```text
Browser Context
│
├── Page 1 → Main Application
│
├── Page 2 → New Tab
│
└── Page 3 → Another Window
```

In Playwright:

```text
Browser Context
       ↓
Multiple Page objects
       ↓
Interact with the required Page
```

For example:

```typescript
const newPage = await context.waitForEvent("page");
```

The `newPage` variable represents the newly opened tab/window.

---

## 3. Why Is It Used?

Window handling is required when an application:

- Opens a link in a new tab
- Opens a popup window
- Opens a new page after clicking a button
- Launches an authentication page
- Opens a report/document in another tab
- Opens an external application
- Uses multiple tabs during a workflow

---

## 4. Key Terminology

| Term | Meaning |
|---|---|
| `Page` | Represents a browser tab/page |
| `Browser` | Browser instance such as Chromium, Firefox, or WebKit |
| `BrowserContext` | Isolated browser session containing pages |
| `context.pages()` | Returns currently open pages |
| `context.waitForEvent("page")` | Waits for a new page to open |
| `page.waitForEvent("popup")` | Waits for a popup opened by the current page |
| `popup` | Newly opened page associated with the current page |
| `page.url()` | Returns the current page URL |
| `page.title()` | Returns the page title |
| `page.close()` | Closes a page |

---

# 5. Core Concepts

## 5.1 Page Represents a Browser Tab

In Playwright, each browser tab is represented by a `Page`.

```typescript
const pages = context.pages();
```

If two tabs are open:

```text
pages[0] → First tab
pages[1] → Second tab
```

---

## 5.2 Handling a New Tab

If clicking a link opens a new tab:

```typescript
const newPagePromise = context.waitForEvent("page");

await page.getByText("Open New Tab").click();

const newPage = await newPagePromise;
```

Now `newPage` represents the newly opened tab.

---

## 5.3 Handling a Popup

If the current page opens a popup:

```typescript
const popupPromise = page.waitForEvent("popup");

await page.getByText("Open Popup").click();

const popup = await popupPromise;
```

The `popup` variable represents the newly opened page.

---

## 5.4 Multiple Pages

You can access all currently open pages:

```typescript
const pages = context.pages();
```

Example:

```typescript
console.log(pages.length);
```

If three tabs are open:

```text
pages.length = 3
```

---

# 6. Syntax / Structure

## Wait for a New Page

```typescript
const newPagePromise = context.waitForEvent("page");

await page.click("text=Open");

const newPage = await newPagePromise;
```

---

## Wait for a Popup

```typescript
const popupPromise = page.waitForEvent("popup");

await page.click("text=Open Popup");

const popup = await popupPromise;
```

---

## Get All Open Pages

```typescript
const pages = context.pages();
```

---

## Access a Specific Page

```typescript
const firstPage = pages[0];
const secondPage = pages[1];
```

---

## Get Page URL

```typescript
console.log(newPage.url());
```

---

## Get Page Title

```typescript
console.log(await newPage.title());
```

---

## Close a Page

```typescript
await newPage.close();
```

---

# 7. Example

## Example — Open a New Tab

Suppose clicking a button opens:

```text
Main Page
    ↓
Click "Open New Tab"
    ↓
New Tab Opens
    ↓
https://example.com
```

The test should:

1. Prepare to capture the new page.
2. Click the button.
3. Capture the new `Page` object.
4. Wait for the new page to load if required.
5. Verify the URL/title/content.
6. Continue interacting with the new page.

---

# 8. Example Code

## Example 1 — Handle New Tab

```typescript
import { test, expect } from "@playwright/test";

test("Handle new tab", async ({ page, context }) => {

    await page.goto("https://example.com");

    const newPagePromise = context.waitForEvent("page");

    await page.getByText("Open New Tab").click();

    const newPage = await newPagePromise;

    await newPage.waitForLoadState();

    console.log("New page URL:", newPage.url());

    await expect(newPage).toHaveTitle(/Example/);
});
```

### Code Explanation

```typescript
const newPagePromise = context.waitForEvent("page");
```

Starts waiting for a new page.

```typescript
await page.getByText("Open New Tab").click();
```

Performs the action that opens the new tab.

```typescript
const newPage = await newPagePromise;
```

Receives the newly opened `Page` object.

```typescript
await newPage.waitForLoadState();
```

Waits for the new page to reach the required load state.

```typescript
newPage.url()
```

Returns the URL of the new page.

---

# 9. How It Works

```text
Main Page
    ↓
Prepare listener
    ↓
Click link/button
    ↓
New tab/window opens
    ↓
Playwright creates a new Page
    ↓
Capture Page object
    ↓
Interact with new Page
    ↓
Verify result
    ↓
Close if required
```

### Important Sequence

The listener should be created **before** the action that opens the new page.

Correct:

```typescript
const newPagePromise = context.waitForEvent("page");

await page.click("text=Open");

const newPage = await newPagePromise;
```

Avoid waiting for the page only after the click:

```typescript
await page.click("text=Open");

// Too late in scenarios where the page event has already occurred
const newPage = await context.waitForEvent("page");
```

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

Create a Playwright project:

```bash
npm init playwright@latest
```

Or install Playwright Test:

```bash
npm install -D @playwright/test
```

---

## Step 3 — Setup

Recommended structure:

```text
playwright-project/
├── tests/
│   └── window.spec.ts
├── pages/
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

---

## Step 4 — Configuration

Example:

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

### Method 1 — Using `context.waitForEvent("page")`

```typescript
const newPagePromise = context.waitForEvent("page");

await page.getByRole("link", {
    name: "Open New Tab"
}).click();

const newPage = await newPagePromise;
```

This is useful when you want to capture a new page opened within the browser context.

---

### Method 2 — Using `page.waitForEvent("popup")`

```typescript
const popupPromise = page.waitForEvent("popup");

await page.getByRole("button", {
    name: "Open Popup"
}).click();

const popup = await popupPromise;
```

This is useful when the new page is opened as a popup by the current page.

---

### Method 3 — Using `context.pages()`

```typescript
const pages = context.pages();

console.log("Number of pages:", pages.length);
```

You can inspect the pages:

```typescript
for (const currentPage of pages) {
    console.log(currentPage.url());
}
```

---

## Step 6 — Execution

Run all tests:

```bash
npx playwright test
```

Run the window test:

```bash
npx playwright test tests/window.spec.ts
```

Run in headed mode:

```bash
npx playwright test tests/window.spec.ts --headed
```

---

## Step 7 — Verification

Verify:

- The new page was opened.
- The new `Page` object was captured.
- The URL is correct.
- The title is correct.
- The expected content is displayed.
- Interaction occurs on the correct page.

Example:

```typescript
await expect(newPage).toHaveURL(/example/);
```

Or:

```typescript
await expect(newPage).toHaveTitle(/Example/);
```

---

## Step 8 — Troubleshooting

| Problem | Cause | Solution |
|---|---|---|
| New tab is not captured | Listener registered too late | Register the event listener before clicking |
| Wrong page is used | Multiple pages are open | Store the new `Page` object explicitly |
| Page URL is empty/incorrect | Page has not navigated yet | Wait for the required load/navigation state |
| Test hangs | Expected page never opens | Verify the click/action actually opens a new page |
| Popup is not captured | Wrong event used | Use `page.waitForEvent("popup")` for a popup |
| Multiple tabs exist | Test assumes only one page | Use `context.pages()` or capture the specific page |
| Element not found | Locator used on the original page | Use the new `Page` object |

---

# 11. Real-World Example

## Scenario

An e-commerce application has a **View Invoice** button.

When clicked:

```text
Order Page
    ↓
Click "View Invoice"
    ↓
Invoice opens in new tab
    ↓
Verify Invoice Number
```

### Requirement

Automation must:

1. Open the order page.
2. Click View Invoice.
3. Capture the new tab.
4. Verify the invoice URL.
5. Verify invoice details.

### Implementation

```typescript
const invoicePagePromise = context.waitForEvent("page");

await page.getByRole("button", {
    name: "View Invoice"
}).click();

const invoicePage = await invoicePagePromise;

await invoicePage.waitForLoadState();

await expect(invoicePage).toHaveURL(/invoice/);

await expect(
    invoicePage.getByText("Invoice Number")
).toBeVisible();
```

### Result

The invoice is validated in the newly opened tab without manually switching windows.

---

# 12. Real-Time Use Case

**Scenario:**  
A banking application redirects the user to a separate authentication page in a new tab.

**Requirement:**  
The automation must capture the authentication page and verify that the user reaches the expected authentication screen.

**Implementation:**

```typescript
const authPagePromise = context.waitForEvent("page");

await page.getByRole("button", {
    name: "Authenticate"
}).click();

const authPage = await authPagePromise;

await authPage.waitForLoadState();

await expect(authPage).toHaveURL(/authenticate/);

await expect(
    authPage.getByText("Authentication")
).toBeVisible();
```

**Expected Result:**  
The newly opened authentication page is captured and validated.

---

# 13. Automation / Testing Use Case

## Scenario — Open New Tab and Perform Actions

```typescript
import { test, expect } from "@playwright/test";

test("Handle new tab", async ({ page, context }) => {

    await page.goto("https://example.com");

    const newPagePromise = context.waitForEvent("page");

    await page.getByRole("link", {
        name: "Open New Tab"
    }).click();

    const newPage = await newPagePromise;

    await newPage.waitForLoadState();

    await expect(newPage).toHaveURL(/example/);

    await expect(
        newPage.getByRole("heading")
    ).toBeVisible();

    await newPage.close();
});
```

### What the test does

1. Opens the main page.
2. Starts listening for a new page.
3. Clicks the link.
4. Captures the newly opened page.
5. Waits for the page to load.
6. Validates the URL.
7. Validates page content.
8. Closes the new page.

---

# 14. Handling Multiple Windows / Tabs

Suppose three pages are open:

```text
Page 0 → Application
Page 1 → Reports
Page 2 → Invoice
```

Use:

```typescript
const pages = context.pages();

console.log(pages.length);
```

Access them:

```typescript
const applicationPage = pages[0];
const reportsPage = pages[1];
const invoicePage = pages[2];
```

### Better Approach

Avoid depending only on page index when possible.

Instead, capture the page at the moment it is opened:

```typescript
const invoicePagePromise = context.waitForEvent("page");

await page.getByText("Invoice").click();

const invoicePage = await invoicePagePromise;
```

This makes the test more reliable and readable.

---

# 15. Handling Popup Windows

A popup is a new page opened by the current page.

### Example

```typescript
const popupPromise = page.waitForEvent("popup");

await page.getByRole("button", {
    name: "Open Popup"
}).click();

const popup = await popupPromise;

await popup.waitForLoadState();

console.log(await popup.title());
```

### Flow

```text
Current Page
     ↓
Click Button
     ↓
Popup Opens
     ↓
popup event
     ↓
Capture Page
     ↓
Interact with Popup
```

---

# 16. `context.waitForEvent("page")` vs `page.waitForEvent("popup")`

| Feature | `context.waitForEvent("page")` | `page.waitForEvent("popup")` |
|---|---|---|
| Event source | Browser context | Current page |
| Captures | New page | Popup opened by current page |
| Returns | `Page` | `Page` |
| Useful for | New tabs/pages | Popup windows |
| Listener timing | Before triggering action | Before triggering action |

### Practical rule

Use:

```typescript
context.waitForEvent("page")
```

when you need to capture a newly created page in the browser context.

Use:

```typescript
page.waitForEvent("popup")
```

when the current page specifically opens a popup.

---

# 17. Multiple Page Handling

You can inspect all pages:

```typescript
const pages = context.pages();

for (const currentPage of pages) {
    console.log(
        "Title:",
        await currentPage.title()
    );

    console.log(
        "URL:",
        currentPage.url()
    );
}
```

Example output:

```text
Title: Application
URL: https://app.example.com

Title: Report
URL: https://app.example.com/report

Title: Invoice
URL: https://app.example.com/invoice
```

---

# 18. Common Errors

| Error / Problem | Cause | Solution |
|---|---|---|
| New tab not captured | Event listener created after click | Create listener before click |
| `page` variable points to wrong tab | Test continued using original page | Use the captured new `Page` |
| Popup event not detected | Incorrect event type | Use `page.waitForEvent("popup")` |
| Page not ready | Navigation still in progress | Wait for required load/navigation state |
| Wrong tab selected | Page index changed | Capture the page event directly |
| Test becomes flaky | Arbitrary timeout used | Use Playwright events and assertions |
| Page closes unexpectedly | Application closes popup | Verify application behavior before interacting |

---

# 19. Common Mistakes

- Treating a new tab as if it were a new browser instance.
- Searching for new-tab elements using the original `page` object.
- Registering the page listener after clicking the link.
- Depending unnecessarily on `context.pages()[1]`.
- Using fixed `waitForTimeout()` values to wait for a new tab.
- Forgetting to wait for the required navigation state.
- Confusing a popup with an HTML modal.
- Opening multiple pages without tracking which `Page` object belongs to which workflow.

### Incorrect

```typescript
await page.getByText("Open").click();

const pages = context.pages();

await pages[1].getByText("Invoice").click();
```

This can be fragile because page ordering should not be the primary way to identify the new page.

### Better

```typescript
const newPagePromise = context.waitForEvent("page");

await page.getByText("Open").click();

const newPage = await newPagePromise;

await newPage.getByText("Invoice").click();
```

---

# 20. Best Practices

1. **Register the page event before triggering the new tab/window.**

```typescript
const newPagePromise = context.waitForEvent("page");

await page.click("text=Open");

const newPage = await newPagePromise;
```

2. **Store the newly opened page in a meaningful variable.**

```typescript
const invoicePage = await invoicePagePromise;
```

3. **Prefer event-based synchronization over fixed waits.**

4. **Use `page.waitForEvent("popup")` when the current page opens a popup.**

5. **Use `context.pages()` when you genuinely need to inspect multiple existing pages.**

6. **Avoid relying only on page indexes.**

7. **Use the correct `Page` object for all interactions in the new tab.**

8. **Verify the URL or title before performing critical actions.**

9. **Close additional pages when they are no longer needed.**

10. **Keep new-page handling close to the action that opens it.**

---

# 21. Limitations / Considerations

- A new browser tab/window is represented as a `Page` within the browser context.
- Page ordering should not be treated as a stable identifier.
- The application must actually create a new page for page-event handling to work.
- A popup and an HTML modal are different concepts.
- A new tab may require navigation time before its content is available.
- Multiple pages require clear tracking to avoid interacting with the wrong page.

---

# 22. Comparison

## Window Handling in Selenium vs Playwright

| Feature | Selenium | Playwright |
|---|---|---|
| Window/tab representation | Window handle | `Page` |
| Switch window | `switchTo().window()` | Use the required `Page` |
| New window handling | Window handles | Page events |
| New tab capture | Window handle | `context.waitForEvent("page")` |
| Popup handling | Window handle | `page.waitForEvent("popup")` |
| Multiple tabs | Window handles collection | `context.pages()` |
| Synchronization | Often explicit | Event-based APIs |

### Playwright Example

```typescript
const newPagePromise = context.waitForEvent("page");

await page.getByText("Open").click();

const newPage = await newPagePromise;
```

No explicit:

```text
switchTo().window(...)
```

is required.

---

# 23. Interview Points

### 1. How do you handle a new tab in Playwright?

Use the `page` event from the browser context:

```typescript
const newPagePromise = context.waitForEvent("page");

await page.click("text=Open");

const newPage = await newPagePromise;
```

### 2. How do you handle a popup in Playwright?

Use:

```typescript
const popupPromise = page.waitForEvent("popup");

await page.click("text=Open Popup");

const popup = await popupPromise;
```

### 3. Does Playwright have `switchTo().window()`?

No. Playwright represents browser tabs/windows as `Page` objects, so you interact directly with the required `Page`.

### 4. How do you get all open tabs?

```typescript
const pages = context.pages();
```

### 5. How do you identify the new tab?

Capture it when it is created:

```typescript
const newPagePromise = context.waitForEvent("page");

await page.click("text=Open");

const newPage = await newPagePromise;
```

### 6. What is the difference between `page` and `context`?

| `page` | `context` |
|---|---|
| Represents one tab/page | Represents an isolated browser session |
| Handles page actions | Can contain multiple pages |
| Can listen for popup events | Can listen for new page events |

### 7. What does `context.pages()` return?

It returns an array containing the currently open `Page` objects in that browser context.

### 8. How do you close a new tab?

```typescript
await newPage.close();
```

### 9. Why should the event listener be registered before clicking?

Because the new page can be created immediately after the click. Registering the listener first ensures the event is captured reliably.

### 10. How do you verify the new page?

Use assertions such as:

```typescript
await expect(newPage).toHaveURL(/invoice/);
```

or:

```typescript
await expect(newPage).toHaveTitle(/Invoice/);
```

---

# 24. Quick Revision

| Topic | Key Point |
|---|---|
| Browser tab | Represented by a `Page` |
| New page | Capture using `context.waitForEvent("page")` |
| Popup | Capture using `page.waitForEvent("popup")` |
| Multiple pages | Use `context.pages()` |
| URL | `page.url()` |
| Title | `page.title()` |
| Close page | `page.close()` |
| Window switching | No `switchTo().window()` required |
| New page synchronization | Use page events |
| Best practice | Capture the new page before triggering the action |
| Multiple tabs | Track each `Page` object explicitly |

---

# 25. Key Takeaways

- Playwright represents each browser tab/window as a **`Page` object**.
- You do not need Selenium-style `switchTo().window()` in Playwright.
- Use `context.waitForEvent("page")` to capture a newly opened page.
- Use `page.waitForEvent("popup")` when the current page opens a popup.
- Use `context.pages()` to inspect all currently open pages.
- Always register the event listener **before** performing the action that opens the new page.
- Store the new page in a meaningful variable such as `invoicePage` or `newPage`.
- Use the captured `Page` object for all interactions with the new tab/window.
- Prefer event-based synchronization instead of fixed `waitForTimeout()` calls.
- Avoid relying unnecessarily on page indexes.
- A browser popup/window is different from an HTML modal.
- Correct page tracking is essential when multiple tabs are involved.
