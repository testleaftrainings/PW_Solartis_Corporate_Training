# Alerts and Alert Handling Using Playwright

## 1. What is an Alert?

An **alert** is a message or dialog displayed by an application to provide information, request confirmation, or collect input from the user.

In Playwright, alerts are broadly handled in two ways:

1. **Browser-level dialogs** — handled using Playwright's `dialog` event.
2. **Web-page dialogs / Sweet Alerts** — handled using normal Playwright locators because they are part of the application's DOM.

---

## 2. Types of Alerts Covered

| Alert Type | Purpose | Playwright Handling |
|---|---|---|
| Simple Alert | Displays a message and requires acknowledgement | `dialog.accept()` |
| Confirmation Alert | Requests confirmation from the user | `dialog.accept()` / `dialog.dismiss()` |
| Prompt Alert | Requests input from the user | `dialog.accept('value')` / `dialog.dismiss()` |
| Sweet Alert | Application-level dialog displayed as a web element | Playwright locators |

---

## 3. Browser-Level Alerts

Browser alerts are handled through the Playwright `dialog` event.

### Generic Handling Mechanism

```typescript
page.on('dialog', async (dialog) => {

    const dialogType = dialog.type();
    const dialogMessage = dialog.message();

    console.log(`Dialog Type: ${dialogType}`);
    console.log(`Dialog Message: ${dialogMessage}`);

    if (dialogType === 'alert') {

        // Handle Simple Alert
        await dialog.accept();

    } else if (dialogType === 'confirm') {

        // Handle Confirmation Alert
        await dialog.accept();

    } else if (dialogType === 'prompt') {

        // Handle Prompt Alert
        await dialog.accept('Vineeth');

    } else {

        // Handle unexpected dialog type
        await dialog.dismiss();
    }
});
```

### Important Methods

| Method | Purpose |
|---|---|
| `dialog.type()` | Returns the dialog type |
| `dialog.message()` | Returns the alert message |
| `dialog.accept()` | Accepts the dialog |
| `dialog.accept('value')` | Enters a value and accepts a prompt |
| `dialog.dismiss()` | Dismisses the dialog |

---

# 4. Simple Alert

A **Simple Alert** displays a message and normally provides an OK/accept action.

### Example

```typescript
import { test, expect } from '@playwright/test';

test('Handle Simple Alert', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Listen for the browser dialog
    page.on('dialog', async (dialog) => {

        // Verify that the dialog type is alert
        expect(dialog.type()).toBe('alert');

        // Print the alert message
        console.log('Alert Message:', dialog.message());

        // Accept the alert
        await dialog.accept();
    });

    // Click the button to trigger the Simple Alert
    await page.locator(
        "//h5[text()=' Alert (Simple Dialog)']/following-sibling::button"
    ).click();

});
```

### Handling Mechanism

```typescript
await dialog.accept();
```

---

# 5. Confirmation Alert

A **Confirmation Alert** asks the user to confirm or cancel an action.

### Example

```typescript
import { test, expect } from '@playwright/test';

test('Handle Confirmation Alert', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Listen for the confirmation dialog
    page.on('dialog', async (dialog) => {

        // Verify that the dialog type is confirm
        expect(dialog.type()).toBe('confirm');

        // Print the confirmation message
        console.log('Confirmation Message:', dialog.message());

        // Accept the confirmation alert
        await dialog.accept();
    });

    // Click the button to trigger the Confirmation Alert
    await page.locator(
        "//h5[text()=' Alert (Confirm Dialog)']/following-sibling::button"
    ).click();

});
```

### Accept

```typescript
await dialog.accept();
```

### Dismiss

```typescript
await dialog.dismiss();
```

Use `accept()` when the required action is **OK/Yes** and `dismiss()` when the required action is **Cancel/No**.

---

# 6. Prompt Alert

A **Prompt Alert** allows the user to enter a value.

### Example

```typescript
import { test, expect } from '@playwright/test';

test('Handle Prompt Alert', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Listen for the prompt dialog
    page.on('dialog', async (dialog) => {

        // Verify that the dialog type is prompt
        expect(dialog.type()).toBe('prompt');

        // Print the prompt message
        console.log('Prompt Message:', dialog.message());

        // Enter the value and accept the prompt
        await dialog.accept('Vineeth');
    });

    // Click the button to trigger the Prompt Alert
    await page.locator(
        "//h5[text()=' Alert (Prompt Dialog)']/following-sibling::button"
    ).click();

});
```

### Enter a Value

```typescript
await dialog.accept('Vineeth');
```

### Cancel the Prompt

```typescript
await dialog.dismiss();
```

---

# 7. Generic Alert Handling Using `if...else`

A single `dialog` event handler can handle multiple browser-level alert types.

```typescript
import { test, expect } from '@playwright/test';

test('Handle Different Types of Alerts', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Listen for browser dialogs
    page.on('dialog', async (dialog) => {

        // Get the dialog type
        const dialogType = dialog.type();

        // Get the dialog message
        const dialogMessage = dialog.message();

        // Print dialog details
        console.log(`Dialog Type: ${dialogType}`);
        console.log(`Dialog Message: ${dialogMessage}`);

        // Handle Simple Alert
        if (dialogType === 'alert') {

            // Accept the Simple Alert
            await dialog.accept();

        // Handle Confirmation Alert
        } else if (dialogType === 'confirm') {

            // Accept the Confirmation Alert
            await dialog.accept();

        // Handle Prompt Alert
        } else if (dialogType === 'prompt') {

            // Enter the value and accept the Prompt Alert
            await dialog.accept('Vineeth');

        // Handle unexpected dialog types
        } else {

            // Dismiss the unexpected dialog
            await dialog.dismiss();
        }
    });

    // Trigger the Simple Alert
    await page.locator(
        "//h5[text()=' Alert (Simple Dialog)']/following-sibling::button"
    ).click();

    // Trigger the Confirmation Alert
    await page.locator(
        "//h5[text()=' Alert (Confirm Dialog)']/following-sibling::button"
    ).click();

    // Trigger the Prompt Alert
    await page.locator(
        "//h5[text()=' Alert (Prompt Dialog)']/following-sibling::button"
    ).click();

});
```

---

# 8. Sweet Alert

A **Sweet Alert** is an application-level dialog displayed as part of the web page.

Unlike browser-level alerts, it is **not handled using `page.on('dialog')`**.

It should be handled using normal Playwright locators and assertions.

## Example

```typescript
import { test, expect } from '@playwright/test';

test('Handle Sweet Alert', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Click the Show button for Sweet Alert
    await page.locator(
        "//h5[text()='Sweet Alert (Simple Dialog)']/following-sibling::button"
    ).click();

    // Verify that the Sweet Alert message is displayed
    await expect(
        page.getByText(
            'You have clicked and open a dialog that can be inspectable.'
        )
    ).toBeVisible();

    // Verify the Dialog title
    await expect(
        page.getByText('Dialog', { exact: true })
    ).toBeVisible();

    // Click the Dismiss button
    await page.getByRole('button', { name: 'Dismiss' }).click();

    // Verify that the Sweet Alert is closed
    await expect(
        page.getByText(
            'You have clicked and open a dialog that can be inspectable.'
        )
    ).not.toBeVisible();

});
```

---

# 9. Sweet Alert Using XPath

The same Sweet Alert can also be handled using XPath.

```typescript
import { test, expect } from '@playwright/test';

test('Handle Sweet Alert using XPath', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Click the Show button for Sweet Alert
    await page.locator(
        "//h5[text()='Sweet Alert (Simple Dialog)']/following-sibling::button"
    ).click();

    // Verify the Sweet Alert message
    await expect(
        page.locator(
            "//*[text()='You have clicked and open a dialog that can be inspectable.']"
        )
    ).toBeVisible();

    // Verify the Dialog title
    await expect(
        page.locator("//*[text()='Dialog']")
    ).toBeVisible();

    // Click the Dismiss button
    await page.locator("//button[normalize-space()='Dismiss']").click();

    // Verify that the Sweet Alert is closed
    await expect(
        page.locator(
            "//*[text()='You have clicked and open a dialog that can be inspectable.']"
        )
    ).not.toBeVisible();

});
```

---

# 10. Browser Alert vs Sweet Alert

| Feature | Browser Alert | Sweet Alert |
|---|---|---|
| Implemented by | Browser | Application |
| Part of DOM | No | Yes |
| Playwright handling | `page.on('dialog')` | Locator |
| Identify type | `dialog.type()` | Locator/text |
| Accept | `dialog.accept()` | Click button |
| Dismiss | `dialog.dismiss()` | Click button |
| Prompt input | `dialog.accept('value')` | Fill/click using locators |

### Remember

```text
Browser Alert
     ↓
page.on('dialog')
     ↓
dialog.type()
     ↓
accept() / dismiss()
```

```text
Sweet Alert
     ↓
Web-page element
     ↓
Playwright locator
     ↓
Click / Assert / Close
```

---

# 11. Best Practices

1. Register the `dialog` event handler **before** clicking the button that triggers the browser alert.
2. Use `dialog.type()` when one handler needs to support multiple browser alert types.
3. Use `dialog.message()` when the alert message needs to be verified or logged.
4. Use `dialog.accept()` for Simple Alerts.
5. Use `dialog.accept()` or `dialog.dismiss()` for Confirmation Alerts based on the expected action.
6. Use `dialog.accept('value')` for Prompt Alerts when input is required.
7. Use normal Playwright locators for Sweet Alerts.
8. Prefer Playwright assertions such as `expect(...).toBeVisible()` for validating Sweet Alerts.
9. Avoid `waitForTimeout()` for alert handling.
10. Use meaningful comments for important actions.
11. Prefer stable locators such as role, text, label, or reliable attributes whenever available.
12. Keep alert handling simple and reusable when the application contains multiple alert scenarios.

---

# 12. Quick Reference

```typescript
// Simple Alert
await dialog.accept();

// Confirmation Alert - Accept
await dialog.accept();

// Confirmation Alert - Cancel
await dialog.dismiss();

// Prompt Alert - Enter value
await dialog.accept('Vineeth');

// Prompt Alert - Cancel
await dialog.dismiss();

// Get Alert Type
dialog.type();

// Get Alert Message
dialog.message();
```

## Key Takeaway

**Browser-level alerts** are handled through Playwright's `dialog` event.

**Sweet Alerts** are web-page elements and should be handled using normal Playwright locators and assertions.

This distinction is the most important concept when working with alerts in Playwright.
