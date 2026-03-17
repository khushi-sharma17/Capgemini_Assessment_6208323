
class flipkart {
    async load_flipkart(page) {
        await page.goto('https://www.flipkart.com/');
    }
    async gudipadwa(page) {
        await page.locator('//div[.="Home"]').first().click();
        await page.locator('//a[@href="/gudipadwa2026-at-store?param=7561&BU=Home"]').click();
    }
    async gudicloth(page) {
        await page.locator('//a[@href="/all/~cs-bjn56jm6a4/pr?sid=all&collection-tab-name=Gudi+padwa+&pageCriteria=default&Param=356643&BU=Home"]').click();
    }
    async clickproduct(page, num) {
        await page.locator(`(//a[@class="pIpigb"])[${num}]`).click();
    }
    async add_cart(page) {
        await page.locator('//div[.="Add to cart"]').first().click();
    }
    async to_cart(page) {
        await page.locator('//a/span[.="Cart"]').click();
    }
    async quantity(page, item_no, num) {
        for (let i = 1; i < num; i++) {
            await page.locator(`(//button[@class="YRzP7Q" and text()="+"])[${item_no}]`).click();
            await page.waitForTimeout(500);
        }
    }
    async place_order(page) {
        await page.locator('//span[.="Place Order"]').click();
    }
}

export default flipkart