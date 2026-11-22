import { test, expect } from '@playwright/test';

test('Handle Confirmation Alert', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Listen for the confirmation dialog
    page.on('dialog', async (dialog) => {

        // Verify that the dialog type is confirmation
        expect(dialog.type()).toBe('confirm');

        // Verify the confirmation alert message
        console.log('Confirmation Alert Message:', dialog.message());

        // Accept the confirmation alert
        await dialog.accept();

        // Dismiss the confirmation alert
        //await dialog.dismiss();
    });

    // Click the button to trigger the confirmation alert
    await page.locator("//h5[text()=' Alert (Confirm Dialog)']/following-sibling::button").click();

});