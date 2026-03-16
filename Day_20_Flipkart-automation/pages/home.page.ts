import { Page, Locator } from "@playwright/test"

class HomePage {

    page: Page
    homeBtn: Locator
    gudiPadwaStore: Locator

    constructor(page: Page) {
        
        this.page = page

        this.homeBtn = page.locator("text=Home")

        this.gudiPadwaStore = page.locator("text=Gudi Padwa Store")
    }

    async goto(url: string) {
        await this.page.goto(url)
    }

    async openGudiPadwaStore() {

        await this.homeBtn.click()
        await this.gudiPadwaStore.click()

    }
}

export default HomePage