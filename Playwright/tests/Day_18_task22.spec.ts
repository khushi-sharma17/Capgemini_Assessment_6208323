import { test, expect } from "@playwright/test";
import path from "path";

test("Verify that user can upload a file successfully", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/upload");

    const filePath = path.join(__dirname, "../test-data/sample.txt");

    await page.locator("#file-upload").setInputFiles(filePath);

    await page.locator("#file-submit").click();

    await expect(page.locator("#uploaded-files")).toHaveText("sample.txt");

});