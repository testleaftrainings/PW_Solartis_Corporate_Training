import { test, expect } from '@playwright/test';

test('Handle Prompt Alert', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Listen for the prompt dialog
    page.on('dialog', async (dialog) => {

        // Verify that the dialog type is prompt
        expect(dialog.type()).toBe('prompt');

        // Verify the prompt alert message
        console.log('Prompt Alert Message:', dialog.message());

        // Enter the value into the prompt alert
        await dialog.accept('Vineeth');

    });

    // Click the button to trigger the prompt alert
    await page.locator("//h5[text()=' Alert (Prompt Dialog)']/following-sibling::button").click();

});