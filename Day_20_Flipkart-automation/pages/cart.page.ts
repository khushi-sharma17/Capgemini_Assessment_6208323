import { Page, Locator } from "@playwright/test"

class CartPage {

    page: Page
    increaseQty: Locator
    placeOrderBtn: Locator

    constructor(page: Page) {

        this.page = page

        this.increaseQty = page.locator("//button[contains(@class,'increase')]")

        this.placeOrderBtn = page.locator("text=Place Order")

    }

    async increaseQuantityForAll() {

        const count = await this.increaseQty.count()

        for (let i = 0; i < count; i++) {

            await this.increaseQty.nth(i).click()

        }

    }

    async placeOrder() {

        await this.placeOrderBtn.click()

    }

}

export default CartPage