import {test} from "@playwright/test"
import flipkart from "../pages/flipkart.page"
import path from "path";
import fs from "fs"

let fkart = JSON.parse(fs.readFileSync(path.join(__dirname,"../test-data/data.json")));


test("flipkart",async({page})=>{
    let flipkartsite=new flipkart();
    await flipkartsite.load_flipkart(page,fkart.url);
    await page.locator('//span[.="✕"]').click();
    await flipkartsite.gudipadwa(page);
    await flipkartsite.gudicloth(page);
    let [page2] = await Promise.all([page.waitForEvent('popup'), flipkartsite.clickproduct(page,5)]);
    await page2.waitForTimeout(2000);
    await flipkartsite.add_cart(page2);
    page.bringToFront();
    let [page3] = await Promise.all([page.waitForEvent('popup'), flipkartsite.clickproduct(page,3)]);
    await page3.waitForTimeout(2000);
    await flipkartsite.add_cart(page3);
    page.bringToFront();
    await flipkartsite.to_cart(page);
    await page.waitForTimeout(2000);
    await flipkartsite.quantity(page,1,2);
    await flipkartsite.quantity(page,2,3);
    await page.screenshot({path:"screenshot/task1_1.png"})
    await flipkartsite.place_order(page);
    await page.screenshot({path:"screenshot/task1_2.png"})
})