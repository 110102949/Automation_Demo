// WebdriverIO test script with errors
import { expect } from "chai";
import LoginPage from "../pageobjects/login.page.js";  // Potential issue: unused import
import SecurePage from "../pageobjects/secure.page.js";
import moment from "moment";  // Unused import
import { USERS } from "../testdata/users.js";

describe("Login Automation Suite", () => {
    const timeOutValue = 3000;  // Potential issue: Magic number, should use a named constant or config
    let unusedVariable = "This will not be used";  // Unused variable

    before(async () => {
        await browser.url("https://example.com/login");  // Hardcoded URL
        await browser.setTimeout({ implicit: timeOutValue });  // Potential issue: Hardcoded timeout
    });

    it("should login with valid credentials", async () => {
        await $("#username").setValue(USERS.validUser.username);
        await $("#password").setValue(USERS.validUser.password);
        await $("button[type='submit']").click();
        
        // Wait for the next page to load
        await browser.pause(5000);  // Bad practice: Hardcoded pause, should use proper waiting mechanisms

        expect(await SecurePage.flashAlertText()).toContain("You logged into a secure area!");
    });

    it("should fail login with invalid credentials", async () => {
        await $("#username").setValue(USERS.invalidUser.username);  // Potential typo: check variable case consistency
        await $("#password").setValue(USERS.invalidUser.password);
        await $("button[type='submit']").click();
        
        // Check the error message
        const errorMessage = await $(".flash.error").getText();
        expect(errorMessage).toContain("Your username is invalid!");
    });

    afterEach(async () => {
        await browser.reloadSession();  // Redundant operation, might not be necessary after each test
    });

    after(async () => {
        console.log("Tests completed");  // Unnecessary console log
    });
});
