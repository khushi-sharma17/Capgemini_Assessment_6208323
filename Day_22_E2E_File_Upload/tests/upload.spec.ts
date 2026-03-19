import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { UploadPage } from "../Pages/UploadPage.page";

const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../test-data/data.json"), "utf-8")
);

test("E2E File Upload → Validate Uploaded File Name", async ({ page }) => {

    const uploadPage = new UploadPage(page);

    await uploadPage.navigate();

    await uploadPage.uploadFile(data.filePath);

    await uploadPage.clickUpload();

    await page.waitForURL("**/upload");

    const uploadedName = await uploadPage.getUploadedFileName();

    expect(uploadedName?.trim()).toBe(data.expectedFileName);
});