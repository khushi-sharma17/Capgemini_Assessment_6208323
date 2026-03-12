import {test, expect} from '@playwright/test';

test("car brand dropdown validation", async({page}) => {

    await page.goto("https://www.automationtesting.co.uk/dropdown.html")

    await page.locator('#cars').click()

    let options = await page.locator('#cars option').all()

    let expected = [
        "Audi",
        "BMW",
        "Ford",
        "Honda",
        "Jeep",
        "Mercedes",
        "Suzuki",
        "Volkswagen"
    ]

    let actual = []

    for (let opt of options) {
        const text = await opt.textContent()
        actual.push(text)
        console.log(text);
    }

    for (let car of expected) {
        if (actual.includes(car)) {
            console.log(car + " is present");
        } else {
            console.log(car + " is missing");
        }
    }
})
