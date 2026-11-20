# Frames and Their Handling Using Playwright

## 1. Definition

A **frame (iframe)** is an HTML document embedded inside another HTML document. In Playwright, frames are handled using the `Frame` object and methods such as `page.frame()`, `page.frameLocator()`, and `locator.contentFrame()`.

> **In simple terms:** A frame is a separate browsing context inside a web page. To interact with elements inside it, Playwright must switch from the main page context to the frame context.

---

## 2. What Does It Mean?

A web page can contain:

```text
Main Page
│
├── Header
├── Main Content
│
└── iframe
     │
     ├── Input
     ├── Button
     └── Text
```

The elements inside the iframe belong to the frame's document.

Therefore, a normal page locator may not directly target elements inside the frame.

### Example

Suppose the page contains:

```html
<iframe src="login.html">
    <!-- Separate document -->
</iframe>
```

The username field may exist inside `login.html`.

Playwright needs to access the frame before interacting with that field.

---

## 3. Why Is It Used?

Frame handling is required when an application embeds another document or application inside the current page.

Common examples include:

- Payment forms
- Embedded videos
- Rich text editors
- Maps
- Third-party widgets
- Authentication components
- Embedded applications
- Legacy web applications
- Document viewers

---

## 4. Key Terminology

| Term | Meaning |
|---|---|
| Frame | A separate browsing context embedded in a page |
| iframe | HTML element used to embed another document |
| Main frame | The primary page context |
| Child frame | A frame embedded inside another page/frame |
| `Frame` | Playwright object representing a frame |
| `page.frame()` | Finds a frame using its name or URL |
| `page.frameLocator()` | Creates a locator for elements inside a frame |
| `locator.contentFrame()` | Converts an iframe locator into a `FrameLocator` |
| `frame.locator()` | Locates elements inside a specific frame |

---

# 5. Core Concepts

## 5.1 Main Page vs Frame

The main page and an iframe have separate document contexts.

```text
Page
│
├── Main Document
│    └── Button
│
└── iframe
     └── Input
```

A locator for the main document should not be assumed to target an element inside the iframe.

---

## 5.2 Frame by Name

If the iframe has a `name` attribute:

```html
<iframe name="loginFrame"></iframe>
```

Playwright can access it using:

```typescript
const frame = page.frame({ name: "loginFrame" });
```

---

## 5.3 Frame by URL

If the frame URL is known:

```typescript
const frame = page.frame({
    url: /login/
});
```

The URL can also be matched using a string when appropriate.

---

## 5.4 Frame Locator

`frameLocator()` is useful when you want to directly locate elements inside an iframe.

```typescript
const username = page
    .frameLocator("#loginFrame")
    .getByPlaceholder("Username");
```

Then:

```typescript
await username.fill("admin");
```

---

## 5.5 Nested Frames

A frame can contain another frame.

```text
Main Page
    ↓
Frame 1
    ↓
Frame 2
    ↓
Input
```

The automation must navigate through the frame hierarchy.

---

# 6. Syntax / Structure

## Using `page.frame()`

```typescript
const frame = page.frame({ name: "frameName" });
```

Then:

```typescript
await frame?.locator("#username").fill("admin");
```

---

## Using `frameLocator()`

```typescript
await page
    .frameLocator("#frameId")
    .locator("#username")
    .fill("admin");
```

---

## Using `contentFrame()`

```typescript
const frameLocator = page
    .locator("iframe")
    .contentFrame();
```

Then:

```typescript
await frameLocator
    .locator("#username")
    .fill("admin");
```

---

# 7. Example

Suppose the HTML is:

```html
<iframe id="loginFrame">
    <input id="username">
    <button id="login">Login</button>
</iframe>
```

The username field is inside the iframe.

### Using `frameLocator()`

```typescript
await page
    .frameLocator("#loginFrame")
    .locator("#username")
    .fill("admin");
```

Then:

```typescript
await page
    .frameLocator("#loginFrame")
    .locator("#login")
    .click();
```

---

# 8. Example Code

## Example 1 — Using `frameLocator()`

```typescript
import { test, expect } from "@playwright/test";

test("Handle iframe using frameLocator", async ({ page }) => {

    await page.goto("https://example.com");

    const frame = page.frameLocator("#loginFrame");

    await frame
        .locator("#username")
        .fill("admin");

    await frame
        .locator("#password")
        .fill("admin123");

    await frame
        .getByRole("button", { name: "Login" })
        .click();
});
```

### Code Explanation

```typescript
page.frameLocator("#loginFrame")
```

Creates a locator that targets the specified iframe.

```typescript
.locator("#username")
```

Finds the username field inside the iframe.

```typescript
.fill("admin")
```

Enters the required value.

---

# 9. How It Works

```text
Test starts
     ↓
Open web page
     ↓
Identify iframe
     ↓
Create FrameLocator
     ↓
Locate element inside frame
     ↓
Perform action
     ↓
Verify result
```

### Important Concept

You do **not** need to manually switch the browser window.

Playwright provides frame-specific APIs that allow you to interact with elements inside the frame.

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
│   └── frame.spec.ts
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

### Method 1 — `frameLocator()`

```typescript
const frame = page.frameLocator("#loginFrame");

await frame
    .locator("#username")
    .fill("admin");
```

### Method 2 — `page.frame()`

```typescript
const frame = page.frame({
    name: "loginFrame"
});

await frame?.locator("#username").fill("admin");
```

### Method 3 — `contentFrame()`

```typescript
const frame = page
    .locator("#loginFrame")
    .contentFrame();

await frame
    .locator("#username")
    .fill("admin");
```

---

## Step 6 — Execution

Run all tests:

```bash
npx playwright test
```

Run the frame test:

```bash
npx playwright test tests/frame.spec.ts
```

Run in headed mode:

```bash
npx playwright test tests/frame.spec.ts --headed
```

---

## Step 7 — Verification

Verify:

- The correct iframe is identified.
- The element inside the iframe is located.
- The action is performed successfully.
- The expected result is displayed.
- The test does not accidentally target an element outside the frame.

Example:

```typescript
await expect(
    page
        .frameLocator("#loginFrame")
        .getByText("Welcome")
).toBeVisible();
```

---

## Step 8 — Troubleshooting

| Problem | Cause | Solution |
|---|---|---|
| Element not found | Element is inside an iframe | Use `frameLocator()` or `Frame` |
| Wrong frame selected | Incorrect selector/name/URL | Inspect the iframe attributes |
| `frame` is `null` | Frame was not found | Verify frame name or URL |
| Action fails inside frame | Incorrect frame context | Locate the element through the frame |
| Nested frame element not found | Element belongs to another child frame | Navigate through the frame hierarchy |
| Locator works on page but not inside iframe | Different document context | Use a frame-specific locator |

---

# 11. Real-World Example

## Scenario

An e-commerce application uses a third-party payment provider.

The payment page contains:

```text
Checkout Page
     ↓
Payment iframe
     ↓
Card Number
Expiry Date
CVV
```

The card fields are not part of the main page document.

### Requirement

Automation must:

1. Open checkout.
2. Identify the payment iframe.
3. Enter card information.
4. Click Pay.
5. Verify the payment result.

### Example

```typescript
const paymentFrame = page.frameLocator("#payment-frame");

await paymentFrame
    .locator("#cardNumber")
    .fill("4111111111111111");

await paymentFrame
    .locator("#expiry")
    .fill("12/30");

await paymentFrame
    .locator("#cvv")
    .fill("123");
```

> **Note:** Use only test card data provided by the application or payment provider in automated tests.

---

# 12. Real-Time Use Case

**Scenario:**  
A web application embeds a third-party document viewer inside an iframe.

**Requirement:**  
The automation must verify that a document is displayed inside the embedded viewer.

**Implementation:**

```typescript
const viewer = page.frameLocator("#documentViewer");

await expect(
    viewer.getByText("Test Document")
).toBeVisible();
```

**Expected Result:**  
The test successfully identifies the document inside the iframe and verifies its visibility.

---

# 13. Automation / Testing Use Case

## Scenario — Login Form Inside an iframe

```typescript
import { test, expect } from "@playwright/test";

test("Login inside iframe", async ({ page }) => {

    await page.goto("https://example.com");

    const loginFrame = page.frameLocator("#loginFrame");

    await loginFrame
        .getByPlaceholder("Username")
        .fill("admin");

    await loginFrame
        .getByPlaceholder("Password")
        .fill("admin123");

    await loginFrame
        .getByRole("button", { name: "Login" })
        .click();

    await expect(
        loginFrame.getByText("Login successful")
    ).toBeVisible();
});
```

### What the test does

1. Opens the application.
2. Identifies the login iframe.
3. Locates the username field inside the iframe.
4. Enters the username.
5. Enters the password.
6. Clicks Login.
7. Verifies the success message.

---

# 14. Nested Frames

A page may contain nested frames.

```text
Main Page
   │
   └── Frame A
         │
         └── Frame B
               │
               └── Username
```

### Example using `frameLocator()`

```typescript
const frameA = page.frameLocator("#frameA");

await frameA
    .frameLocator("#frameB")
    .locator("#username")
    .fill("admin");
```

The important idea is:

```text
Main Page
   ↓
Frame A
   ↓
Frame B
   ↓
Element
```

---

# 15. Comparing Frame Handling Methods

| Feature | `page.frame()` | `frameLocator()` | `contentFrame()` |
|---|---|---|---|
| Returns | `Frame` | `FrameLocator` | `FrameLocator` |
| Find by name | Yes | Through iframe locator | Through iframe locator |
| Find by URL | Yes | Indirectly | Indirectly |
| Direct element interaction | Through `Frame` | Yes | Yes |
| Good for locator chaining | Moderate | Excellent | Excellent |
| Null handling | Can be required | Locator-based | Locator-based |
| Recommended for common UI interaction | Useful | Often preferred | Useful |

---

# 16. `page.frame()` vs `frameLocator()`

## `page.frame()`

Use when you need the actual `Frame` object.

```typescript
const frame = page.frame({
    name: "loginFrame"
});

await frame?.locator("#username").fill("admin");
```

### Important

`page.frame()` can return `null` if the requested frame cannot be found.

---

## `frameLocator()`

Use when you want to directly locate and interact with elements inside the iframe.

```typescript
await page
    .frameLocator("#loginFrame")
    .locator("#username")
    .fill("admin");
```

For many normal UI automation scenarios, `frameLocator()` provides a concise approach.

---

# 17. Common Errors

| Error / Problem | Cause | Solution |
|---|---|---|
| `locator not found` | Locator targets the wrong document | Use the frame locator |
| `frame is null` | Frame cannot be found | Check frame name/URL |
| Element exists but cannot be clicked | Element is inside iframe | Use `frameLocator()` |
| Nested element cannot be found | Wrong frame level | Navigate through parent and child frames |
| Incorrect iframe selected | Multiple iframes exist | Use a unique selector or frame URL/name |
| Test is flaky | Frame/content loads dynamically | Use Playwright's locator-based waiting behavior |

---

# 18. Common Mistakes

- Treating an iframe element like a normal DOM container without considering its document context.
- Using a main-page locator for an element inside an iframe.
- Selecting the wrong iframe when multiple iframes exist.
- Forgetting that nested frames require navigating through each frame level.
- Using an unstable iframe selector.
- Assuming `page.frame()` always returns a frame.
- Using unnecessary manual waits instead of Playwright's locator-based waiting.

### Incorrect approach

```typescript
await page.locator("#username").fill("admin");
```

If `#username` is inside an iframe, this may not find the element.

### Correct approach

```typescript
await page
    .frameLocator("#loginFrame")
    .locator("#username")
    .fill("admin");
```

---

# 19. Best Practices

1. **Prefer `frameLocator()` for straightforward element interaction inside iframes.**

```typescript
await page
    .frameLocator("#loginFrame")
    .locator("#username")
    .fill("admin");
```

2. **Use stable iframe selectors.**

Prefer:

```typescript
#loginFrame
```

over fragile selectors based on changing DOM structure.

3. **Use `page.frame()` when you specifically need the `Frame` object.**

4. **Handle `null` when using `page.frame()`.**

```typescript
const frame = page.frame({ name: "loginFrame" });

if (!frame) {
    throw new Error("Login frame not found");
}
```

5. **For nested frames, explicitly follow the frame hierarchy.**

6. **Avoid unnecessary `waitForTimeout()` calls.**

7. **Use Playwright locators and assertions so Playwright can perform its normal waiting behavior.**

8. **Use meaningful frame names or selectors in test code.**

9. **Keep frame-specific operations together for readability.**

10. **Verify the expected frame content instead of only verifying that the iframe exists.**

---

# 20. Limitations / Considerations

- An iframe is a separate document context.
- The same locator text or selector may exist in both the main page and the iframe.
- Multiple iframes can make frame identification important.
- Nested frames require additional frame navigation.
- Cross-origin frames can have browser security boundaries, but Playwright's frame APIs are designed to interact with frame content where the page permits automation access.
- Dynamic applications may create or remove frames during execution.

---

# 21. Interview Points

### 1. What is an iframe?

An iframe is an HTML element used to embed another document inside a web page.

### 2. How do you handle iframes in Playwright?

Common approaches include:

```typescript
page.frame()
```

and:

```typescript
page.frameLocator()
```

You can also use:

```typescript
locator.contentFrame()
```

### 3. What is `frameLocator()`?

`frameLocator()` creates a locator that allows you to locate and interact with elements inside an iframe.

### 4. What is the difference between `page.frame()` and `frameLocator()`?

| `page.frame()` | `frameLocator()` |
|---|---|
| Returns a `Frame` object | Returns a `FrameLocator` |
| Can locate by name or URL | Works through an iframe locator |
| Can return `null` | Locator-based interaction |
| Useful when working directly with the Frame API | Convenient for element interaction |

### 5. How do you handle nested frames?

Navigate through each frame level.

```typescript
await page
    .frameLocator("#frameA")
    .frameLocator("#frameB")
    .locator("#username")
    .fill("admin");
```

### 6. Can you use CSS selectors inside an iframe?

Yes, but the selector must be used through the appropriate frame context.

```typescript
await page
    .frameLocator("#loginFrame")
    .locator("#username")
    .fill("admin");
```

### 7. What happens if `page.frame()` cannot find the frame?

It can return `null`.

### 8. Do you need to manually switch to a frame?

Playwright provides frame APIs, so you use the appropriate frame context rather than manually switching the browser like in some other automation approaches.

### 9. How do you interact with an element inside a nested iframe?

Use chained frame locators:

```typescript
page
    .frameLocator("#frameA")
    .frameLocator("#frameB")
    .locator("#element");
```

### 10. What is `contentFrame()`?

`contentFrame()` converts an iframe locator into a `FrameLocator` so that its content can be accessed.

---

# 22. Quick Revision

| Topic | Key Point |
|---|---|
| Frame | Separate document context |
| iframe | HTML element that embeds another document |
| Main frame | Primary page context |
| `page.frame()` | Accesses a `Frame` |
| `frameLocator()` | Locates elements inside an iframe |
| `contentFrame()` | Gets a frame locator from an iframe locator |
| Nested frame | Frame inside another frame |
| `Frame` | Playwright object representing a frame |
| `FrameLocator` | Locator for interacting with frame content |
| `page.frame()` result | Can be `null` |
| Best common UI approach | `frameLocator()` |
| Main rule | Use the correct frame context before interacting with frame elements |

---

# 23. Key Takeaways

- An iframe contains a separate document context.
- Elements inside an iframe should be accessed through the appropriate frame API.
- `page.frameLocator()` is a convenient way to interact with iframe elements.
- `page.frame()` provides access to the actual `Frame` object.
- `locator.contentFrame()` can convert an iframe locator into a `FrameLocator`.
- `page.frame()` can return `null` when the frame is not found.
- Nested frames require navigating through each frame level.
- Use stable iframe selectors.
- Avoid unnecessary hard waits.
- Do not use main-page locators directly for elements that belong to an iframe.
- Native frame handling is different from browser dialog handling.
- For most direct UI interactions inside an iframe, `frameLocator()` is a clean and readable approach.
