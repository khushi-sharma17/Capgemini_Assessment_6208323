import { test } from "@playwright/test"
import fs from "fs"
import path from "path"

import AmazonJobsPage from "../PageObjectModule/amazon_jobs.page"

const data = JSON.parse(
    fs.readFileSync(
        path.join(__dirname,"../test-data/jobsData.json"),
        "utf-8"
    )
)

test("Apply for amazon job", async ({page}) => {

    const amazon = new AmazonJobsPage(page)

    await amazon.launchSite(data.url)

    await amazon.selectCountry()

    await amazon.selectState()

    await amazon.selectCity()

    await amazon.openSecondJob()

    await amazon.clickApply()

})