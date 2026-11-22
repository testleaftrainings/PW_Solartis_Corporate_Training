import { test, expect } from '@playwright/test';


     test('Handle simple alert after clicking the Click button', async ({ page }) => {

        // Navigate to the LeafGround Alert page
        await page.goto('https://leafground.com/alert.xhtml');

        // Listen for the dialog event and accept the simple alert
        page.on('dialog', async (dialog) => {

            // Verify that the dialog is an alert
            expect(dialog.type()).toBe('alert');

            // Accept the alert
            await dialog.accept();
        });

        // Click the button that triggers the simple alert
        await page.locator("//h5[text()=' Alert (Simple Dialog)']/following-sibling::button").click();

    });

