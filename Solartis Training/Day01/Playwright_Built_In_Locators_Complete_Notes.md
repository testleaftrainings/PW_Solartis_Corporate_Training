# Playwright Built-in Locators — Complete Training Notes

## 1. Introduction

Playwright provides built-in locators that help identify elements on a web page in a readable and reliable way.

A locator is a way to identify an element so that Playwright can perform an action or assertion on it.

Common actions include:

- `click()`
- `fill()`
- `check()`
- `selectOption()`
- `hover()`
- `press()`

Example:

```typescript
// Locate the Username textbox using its accessible role and name.
await page.getByRole("textbox", { name: "Username" }).fill("Demosalesmanager");
```

---

## 2. What Are Playwright Built-in Locators?

Playwright provides several user-facing locator methods.

The commonly used built-in locators are:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByAltText()`
6. `getByTitle()`
7. `getByTestId()`

Playwright also provides:

```typescript
locator()
```

for CSS selectors, XPath, and other locator strategies.

---

# 3. `getByRole()`

`getByRole()` locates an element based on its **accessible role**.

Syntax:

```typescript
page.getByRole("role", { name: "accessible name" })
```

### Example

```typescript
// Locate the Username textbox using its role and accessible name.
await page.getByRole("textbox", { name: "Username" }).fill("Demosalesmanager");

// Locate the Login button using its role and accessible name.
await page.getByRole("button", { name: "Login" }).click();
```

### Common Roles

| Role | Example |
|---|---|
| `button` | Button |
| `textbox` | Text input |
| `checkbox` | Checkbox |
| `radio` | Radio button |
| `link` | Link |
| `combobox` | Select/dropdown |
| `heading` | Heading |
| `img` | Image |
| `tab` | Tab |
| `listitem` | List item |

### `name` Option

The `name` option identifies the accessible name of the element.

```typescript
// Locate the Login button by role and accessible name.
await page.getByRole("button", { name: "Login" }).click();
```

### Exact Matching

You can use `exact: true` when an exact accessible name is required.

```typescript
// Locate a button whose accessible name exactly matches "Login".
await page.getByRole("button", { name: "Login", exact: true }).click();
```

### When to Prefer `getByRole()`

Use `getByRole()` when the element has a meaningful accessible role and name.

It is especially useful for buttons, links, checkboxes, radio buttons, textboxes, headings, and other interactive elements.

---

# 4. `getByLabel()`

`getByLabel()` locates a form control using its associated label.

Syntax:

```typescript
page.getByLabel("label text")
```

### Example

If the HTML is:

```html
<label for="username">Username</label>
<input id="username">
```

Playwright can locate it using:

```typescript
// Locate the input using its associated label.
await page.getByLabel("Username").fill("Demosalesmanager");
```

### Exact Matching

```typescript
// Locate the form control whose label exactly matches "Username".
await page.getByLabel("Username", { exact: true }).fill("Demosalesmanager");
```

### Best Use

`getByLabel()` is useful for:

- Text fields
- Checkboxes
- Radio buttons
- Form controls with accessible labels

---

# 5. `getByPlaceholder()`

`getByPlaceholder()` locates an input using its placeholder text.

Syntax:

```typescript
page.getByPlaceholder("placeholder text")
```

### Example

HTML:

```html
<input placeholder="Enter username">
```

Playwright:

```typescript
// Locate the input using its placeholder text.
await page.getByPlaceholder("Enter username").fill("Demosalesmanager");
```

### Exact Matching

```typescript
// Locate the input whose placeholder exactly matches the specified text.
await page.getByPlaceholder("Enter username", { exact: true }).fill("Demosalesmanager");
```

### Important Point

The placeholder is not the same as the label.

For example:

```html
<label>Username</label>
<input placeholder="Enter username">
```

Here:

```typescript
// Locate using the label.
page.getByLabel("Username");

// Locate using the placeholder.
page.getByPlaceholder("Enter username");
```

---

# 6. `getByText()`

`getByText()` locates an element based on visible text.

Syntax:

```typescript
page.getByText("text")
```

### Example

```typescript
// Locate the visible text "CRM/SFA".
await page.getByText("CRM/SFA").click();
```

### Exact Matching

By default, Playwright can match text without requiring an exact full-string match.

Use `exact: true` when exact text matching is required.

```typescript
// Locate an element whose text exactly matches "Leads".
await page.getByText("Leads", { exact: true }).click();
```

### Example

```typescript
// Locate the Create Lead text using exact text matching.
await page.getByText("Create Lead", { exact: true }).click();
```

### When to Use

Use `getByText()` when the visible text itself is the best way to identify an element.

---

# 7. `getByAltText()`

`getByAltText()` locates an image using its `alt` attribute.

Syntax:

```typescript
page.getByAltText("alternative text")
```

### Example

HTML:

```html
<img src="logo.png" alt="Company Logo">
```

Playwright:

```typescript
// Locate the image using its alternative text.
await page.getByAltText("Company Logo").click();
```

### Exact Matching

```typescript
// Locate the image whose alt text exactly matches the specified value.
await page.getByAltText("Company Logo", { exact: true });
```

### When to Use

Use `getByAltText()` mainly for images and image-based elements that have meaningful `alt` text.

---

# 8. `getByTitle()`

`getByTitle()` locates an element using its `title` attribute.

Syntax:

```typescript
page.getByTitle("title text")
```

### Example

HTML:

```html
<button title="Delete record">Delete</button>
```

Playwright:

```typescript
// Locate the element using its title attribute.
await page.getByTitle("Delete record").click();
```

### Exact Matching

```typescript
// Locate the element whose title exactly matches the specified text.
await page.getByTitle("Delete record", { exact: true }).click();
```

### When to Use

Use `getByTitle()` when the element has a useful and stable `title` attribute.

---

# 9. `getByTestId()`

`getByTestId()` locates an element using a test ID.

By default, Playwright uses the `data-testid` attribute.

### HTML

```html
<button data-testid="login-button">Login</button>
```

### Playwright

```typescript
// Locate the Login button using its test ID.
await page.getByTestId("login-button").click();
```

### Why Use Test IDs?

Test IDs can provide stable selectors when:

- Visible text changes.
- The element does not have a useful accessible role/name.
- The application provides dedicated test attributes.

### Custom Test ID Attribute

Playwright can also be configured to use a custom test ID attribute.

For example, an application may use:

```html
<button data-test="login-button">Login</button>
```

The Playwright configuration can be set to use `data-test` as the test ID attribute.

---

# 10. `locator()`

`locator()` is a general-purpose locator method.

It can be used with CSS selectors, XPath, and other supported selector strategies.

Syntax:

```typescript
page.locator("selector")
```

### CSS Example

```typescript
// Locate the username field using its ID.
await page.locator("#username").fill("Demosalesmanager");
```

### XPath Example

```typescript
// Locate the Username label using XPath.
await page.locator("//label[text()='Username']");
```

### CSS Class Example

```typescript
// Locate an element using its CSS class.
await page.locator(".login-button").click();
```

### Important Point

`locator()` is not one of the user-facing `getBy...` locator methods, but it is an important Playwright locator API.

Use it when a suitable built-in user-facing locator is not available or when CSS/XPath is specifically required.

---

# 11. Locator Chaining

Locators can be chained to narrow down the search.

Example:

```typescript
// Locate the form section first and then locate the Login button inside it.
await page.locator("#loginForm").getByRole("button", { name: "Login" }).click();
```

This helps when multiple elements on the page have similar names.

---

# 12. Filtering Locators

Playwright locators can be filtered to identify a specific element.

Example:

```typescript
// Locate the row containing the text "Vineeth".
const row = page.getByRole("row").filter({ hasText: "Vineeth" });

// Locate the Delete button inside the matching row.
await row.getByRole("button", { name: "Delete" }).click();
```

The `filter()` method is useful when working with:

- Tables
- Lists
- Cards
- Repeated components

---

# 13. `exact: true`

The `exact` option can be used with several text-based locator methods.

Example:

```typescript
// Locate the element whose text exactly matches "Leads".
await page.getByText("Leads", { exact: true }).click();
```

Without exact matching, a locator may match text that contains the specified value as part of a larger string.

### Example

Suppose the page contains:

```text
Leads
Create Leads
Leads Management
```

Using:

```typescript
page.getByText("Leads")
```

may match more broadly than:

```typescript
page.getByText("Leads", { exact: true })
```

The exact option makes the matching requirement more specific.

---

# 14. Locator Examples — Leaftaps

### Username

```typescript
// Locate the Username textbox using its role and accessible name.
await page.getByRole("textbox", { name: "Username" }).fill("Demosalesmanager");
```

### Password

```typescript
// Locate the Password textbox using its role and accessible name.
await page.getByRole("textbox", { name: "Password" }).fill("crmsfa");
```

### Login

```typescript
// Locate the Login button using its role and accessible name.
await page.getByRole("button", { name: "Login" }).click();
```

### CRM/SFA

```typescript
// Locate the CRM/SFA text and click it.
await page.getByText("CRM/SFA").click();
```

### Leads

```typescript
// Locate the Leads text using exact text matching.
await page.getByText("Leads", { exact: true }).click();
```

### Create Lead

```typescript
// Locate the Create Lead text using exact text matching.
await page.getByText("Create Lead", { exact: true }).click();
```

---

# 15. Complete Playwright Example

```typescript
// Import the test function from Playwright Test.
import test from "@playwright/test";

// Create a test to verify the login page.
test("Test to learn Playwright built-in locators", async ({ page }) => {

    // Navigate to the Leaftaps application.
    await page.goto("https://leaftaps.com/opentaps/control/main");

    // Locate the Username textbox using its role and accessible name.
    await page.getByRole("textbox", { name: "Username" }).fill("Demosalesmanager");

    // Locate the Password textbox using its role and accessible name.
    await page.getByRole("textbox", { name: "Password" }).fill("crmsfa");

    // Locate the Login button using its role and accessible name.
    await page.getByRole("button", { name: "Login" }).click();

    // Locate the CRM/SFA text and click it.
    await page.getByText("CRM/SFA").click();

    // Locate the Leads text using exact text matching.
    await page.getByText("Leads", { exact: true }).click();

    // Locate the Create Lead text using exact text matching.
    await page.getByText("Create Lead", { exact: true }).click();
});
```

---

# 16. Locator Selection Guidelines

There is no single locator that must always be used first. Choose a locator based on the element's accessible information and the stability of the application.

A practical approach is:

1. `getByRole()`
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByAltText()`
6. `getByTitle()`
7. `getByTestId()`
8. `locator()` with CSS/XPath when appropriate

The important principle is to choose a locator that is **readable, stable, and uniquely identifies the intended element**.

---

# 17. Common Locator Mistakes

## Mistake 1: Using Text When Role Is Better

Instead of:

```typescript
page.getByText("Login").click();
```

if the element is clearly a button, prefer:

```typescript
// Locate the Login button using its role and accessible name.
await page.getByRole("button", { name: "Login" }).click();
```

---

## Mistake 2: Using XPath Everywhere

Avoid automatically writing long XPath expressions when a built-in locator provides a clearer solution.

Instead of:

```typescript
page.locator("//button[text()='Login']").click();
```

prefer:

```typescript
// Locate the Login button using its role and accessible name.
await page.getByRole("button", { name: "Login" }).click();
```

when the accessible role/name is available and stable.

---

## Mistake 3: Using Unstable CSS

Avoid selectors that depend heavily on generated or changing CSS classes.

For example:

```typescript
page.locator(".css-123456");
```

may become unreliable if the class is dynamically generated.

---

## Mistake 4: Using `waitForTimeout()` to Make Locators Work

A fixed wait should not normally be used as a solution for locator synchronization.

Instead, use Playwright actions and web-first assertions that automatically wait for the required condition.

Example:

```typescript
// Locate the Login button.
const loginButton = page.getByRole("button", { name: "Login" });

// Click the button.
await loginButton.click();
```

---

# 18. Built-in Locator Quick Reference

| Locator | Primary Purpose | Example |
|---|---|---|
| `getByRole()` | Accessible role/name | `getByRole("button", { name: "Login" })` |
| `getByLabel()` | Associated label | `getByLabel("Username")` |
| `getByPlaceholder()` | Placeholder | `getByPlaceholder("Enter username")` |
| `getByText()` | Visible text | `getByText("Login")` |
| `getByAltText()` | Image alt text | `getByAltText("Company Logo")` |
| `getByTitle()` | `title` attribute | `getByTitle("Delete")` |
| `getByTestId()` | Test ID | `getByTestId("login-button")` |
| `locator()` | CSS/XPath/general locator | `locator("#username")` |

---

# 19. Key Interview Points

1. What is a locator in Playwright?
2. What is `getByRole()`?
3. What is the purpose of the `name` option in `getByRole()`?
4. What is the difference between `getByLabel()` and `getByPlaceholder()`?
5. When would you use `getByText()`?
6. What is `getByAltText()` used for?
7. What is `getByTitle()` used for?
8. What is `getByTestId()`?
9. What is the default test ID attribute used by Playwright?
10. What is the purpose of `locator()`?
11. What is the difference between a built-in locator and a CSS/XPath locator?
12. What does `exact: true` do?
13. What is locator chaining?
14. What is locator filtering?
15. Why should long XPath expressions generally be avoided when a reliable built-in locator is available?
16. Why should unstable CSS classes be avoided?
17. How would you locate a Login button?
18. How would you locate a Username field?
19. How would you locate an image using its `alt` attribute?
20. How would you locate an element using a test ID?

---

# 20. Final Revision

### User-facing built-in locators

```text
getByRole()
getByLabel()
getByPlaceholder()
getByText()
getByAltText()
getByTitle()
getByTestId()
```

### General locator API

```text
locator()
```

### Most important concepts

```text
Role      → What type of element is it?
Name      → What is its accessible name?
Label     → What label is associated with it?
Text      → What visible text does it contain?
Placeholder → What placeholder does the input have?
Alt text  → What alternative text does the image have?
Title     → What title attribute does it have?
Test ID   → What test identifier does it have?
CSS/XPath → What selector identifies the element?
```

### Golden Rule

Choose a locator that is:

- Readable
- Stable
- Specific
- Maintainable
- Able to uniquely identify the intended element
