import { Page, Locator } from "@playwright/test";

export default class AmazonJobsPage {

    page: Page

    countryCheckbox: Locator
    stateCheckbox: Locator
    cityCheckbox: Locator

    secondJob: Locator
    applyNowBtn: Locator

    constructor(page: Page) {

        this.page = page

        this.countryCheckbox = page.locator("//label[contains(.,'Germany')]")
        this.stateCheckbox = page.locator("//label[contains(.,'Bavaria')]")
        this.cityCheckbox = page.locator("//label[contains(.,'Munich')]")

        this.secondJob = page.locator("(//a[contains(@href,'job')])[2]")

        this.applyNowBtn = page.locator("//a[contains(text(),'Apply now')]")

    }

    async launchSite(url:string){

        await this.page.goto(url)

    }

    async selectCountry(){

        await this.countryCheckbox.click()

    }

    async selectState(){

        await this.stateCheckbox.click()

    }

    async selectCity(){

        await this.cityCheckbox.click()

    }

    async openSecondJob(){

        await this.secondJob.click()

    }

    async clickApply(){

        await this.applyNowBtn.click()

    }

}