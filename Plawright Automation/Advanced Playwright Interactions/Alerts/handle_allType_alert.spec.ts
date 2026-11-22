import { test, expect } from '@playwright/test';

test('Handle different types of alerts', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Listen for the browser dialog
    page.on('dialog', async (dialog) => {

        // Get the type of the dialog
        const dialogType = dialog.type();

        // Get the message displayed in the dialog
        const dialogMessage = dialog.message();

        // Print the dialog details
        console.log(`Dialog Type: ${dialogType}`);
        console.log(`Dialog Message: ${dialogMessage}`);

        // Handle Simple Alert
        if (dialogType === 'alert') {

            // Verify that the dialog type is an alert
            expect(dialogType).toBe('alert');

            // Accept the simple alert
            await dialog.accept();

        // Handle Confirmation Alert
        } else if (dialogType === 'confirm') {

            // Verify that the dialog type is a confirmation
            expect(dialogType).toBe('confirm');

            // Accept the confirmation alert
            await dialog.accept();

        // Handle Prompt Alert
        } else if (dialogType === 'prompt') {

            // Verify that the dialog type is a prompt
            expect(dialogType).toBe('prompt');

            // Enter the value and accept the prompt
            await dialog.accept('Vineeth');

        // Handle any unexpected dialog type
        } else {

            // Dismiss the dialog if the type is unknown
            await dialog.dismiss();
        }
    });

    // Trigger the Simple Alert
    await page.locator("//h5[text()=' Alert (Simple Dialog)']/following-sibling::button").click();

    // Trigger the Confirmation Alert
    await page.locator("//h5[text()=' Alert (Confirm Dialog)']/following-sibling::button").click();

    // Trigger the Prompt Alert
    await page.locator("//h5[text()=' Alert (Prompt Dialog)']/following-sibling::button").click();

});