import { test, expect } from '@playwright/test';

test('Handle Sweet Alert', async ({ page }) => {

    // Navigate to the LeafGround Alert page
    await page.goto('https://leafground.com/alert.xhtml');

    // Click the Show button for Sweet Alert (Simple Dialog)
    await page.locator(
        "//h5[text()='Sweet Alert (Simple Dialog)']/following-sibling::button"
    ).click();

    // Verify that the Sweet Alert dialog is displayed
    await expect(
        page.getByText('You have clicked and open a dialog that can be inspectable.')
    ).toBeVisible();

    // Verify the Dialog title
    await expect(
        page.getByText('Dialog', { exact: true })
    ).toBeVisible();

    // Click the Dismiss button to close the Sweet Alert
    await page.getByRole('button', { name: 'Dismiss' }).click();

    // Verify that the Sweet Alert is closed
    await expect(
        page.getByText('You have clicked and open a dialog that can be inspectable.')
    ).not.toBeVisible();

});