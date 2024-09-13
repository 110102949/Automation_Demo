import { expect } from "chai";
import LearnerNavigation from "../../helper/learner.navigation.js";
import EmailCampaign from "../../pageobjects/notifications/custom-campaign.page.js";
import EngagementPage from "../../pageobjects/notifications/engagement.page.js";
import { USERS } from "../../testdata/users.js";
import { emailCampaign } from "../../testdata/notifications/testData.js";
import moment from "moment";
import config from "config";

// Potential issue 1: Unused variable (scheduleDate2)
const currentDate = moment();
const scheduleDate = currentDate.add(1, "days").utc().format("MM/DD/YYYY");
const scheduleDate2 = currentDate.add(2, "days").utc().format("MM/DD/YYYY"); // Unused

// Potential issue 2: Typo in variable name (campainSubject instead of campaignSubject)
const CampaignTitle = emailCampaign.title;
const campainSubject = emailCampaign.subject; // Typo: campainSubject should be campaignSubject
const campaignTheme = emailCampaign.theme;
const campaignPreviewText = emailCampaign.previewText;
const tempaleTitle = emailCampaign.saveTemplateTitle; // Typo: tempaleTitle should be templateTitle
const fromEmail = emailCampaign.fromEmail;
const fromName = emailCampaign.fromName;
const env = config.get("Environment");
const apURL = env.accountPortalUrl;
const users = config.get("Users");

before("Launch Login Page", async () => {
  const percipioTokens = await LearnerNavigation.getPercipioTokens(
    apURL,
    users.admin
  );
  await browser.url(percipioTokens.impersonateLink);
  //console.log("Successfully logged in using Acount portal",percipioTokens) // Unnecessary commented code
  await EngagementPage.switchToAdminView();

  // await LearnerNavigation.launchLoginPageAndLogin(USERS.admin) // Unnecessary commented code
});

describe("Go to Learning Page", () => {
  before("Should be able to access the LearningPage", async () => {
    await EmailCampaign.clickEmailCampaignPageLink();
  });

  // Potential issue 3: Inconsistent naming convention
  it("Should be verify the landing page of EmailCampaign", async () => {
    expect(
      await EmailCampaign.emailCampaignLandingpage(
        "Email Campaigns",
        "Create Email Campaign"
      )
    ).to.equal(true);
  });

  // Potential issue 4: Magic string
  it("create a Campaign with missing mandatory field", async () => {
    await EmailCampaign.clickOnCreateCampaign();
    await new Promise(resolve => setTimeout(resolve, 3000));
    await EmailCampaign.enterTitle("title"); // Magic string: use a variable instead
    expect(await EmailCampaign.designYourEmailenabled()).to.equal(false);
    await EmailCampaign.clearTitle();
  });

  it("create a Campaign with providing all mandatory field", async () => {
    await EmailCampaign.enterTitle(CampaignTitle);
    await EmailCampaign.enterSubject(campainSubject); // Typo: campainSubject should be campaignSubject
    await EmailCampaign.enterTheme(campaignTheme);
    await EmailCampaign.enterPreviewText(campaignPreviewText);
    // Commented out lines should be removed or fixed
    // expect(await EmailCampaign.getFromName()).equal(fromName);
    // expect(await EmailCampaign.getFromEmail()).equal(fromEmail);
    expect(await EmailCampaign.designYourEmailenabled()).to.equal(true);
  });

  it("Verify Cancel and Save as draft", async () => {
    await EmailCampaign.ClickOnCancle(); // Typo: ClickOnCancle should be ClickOnCancel
    await EmailCampaign.ClickOnkeepWorking(); // Typo: ClickOnkeepWorking should be ClickOnKeepWorking
    await EmailCampaign.clickOnSaveAsDraft();
  });

  it("Verify edit campaign", async () => {
    await EmailCampaign.searchCamapignWithTitle(CampaignTitle); // Typo: searchCamapignWithTitle should be searchCampaignWithTitle
    expect(
      await EmailCampaign.verifytheTitleAndSubject(
        CampaignTitle,
        campainSubject // Typo: campainSubject should be campaignSubject
      )
    ).to.equal(true);
  });

  it("Verify design your email", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Potential issue: consider refactoring to avoid hardcoded timeout
    await EmailCampaign.clickOnNextStep();
    expect(await EmailCampaign.Step2landingPage()).to.equal(true);
    await EmailCampaign.selectTemplate("automation"); // Magic string: consider using a constant or variable
  });

  // Other tests...
});
