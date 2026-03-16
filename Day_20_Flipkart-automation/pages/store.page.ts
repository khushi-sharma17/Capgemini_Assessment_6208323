import { Page, Locator } from "@playwright/test"

class StorePage {

    page: Page
    products: Locator
    addToCartBtn: Locator

    constructor(page: Page) {

        this.page = page

        this.products = page.locator("//a[contains(@class,'IRpwTa')]")

        this.addToCartBtn = page.locator("text=Add to cart")

    }

    async selectProduct(index: number) {

        await this.products.nth(index).click()

    }

    async addToCart() {

        await this.addToCartBtn.click()

    }

}

export default StorePage