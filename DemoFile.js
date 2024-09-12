import { expect } from "chai";
import LearnerNavigation from "../../helper/learner.navigation.js";
import EmailCampaign from "../../pageobjects/notifications/custom-campaign.page.js";
import EngagementPage from "../../pageobjects/notifications/engagement.page.js";
import { USERS } from "../../testdata/users.js";
import { emailCampaign } from "../../testdata/notifications/testData.js";
import moment from "moment";
import config from "config";

const currentDate = moment();
const scheduleDate = currentDate.add(1, "days").utc().format("MM/DD/YYYY");
const CampaignTitle = emailCampaign.title;
const campainSubject = emailCampaign.subject;
const campaignTheme = emailCampaign.theme;
const campaignPreviewText = emailCampaign.previewText;
const tempaleTitle = emailCampaign.saveTemplateTitle;
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
  //console.log("Successfully logged in  using Acount portal",percipioTokens )
  await EngagementPage.switchToAdminView();

  //await LearnerNavigation.launchLoginPageAndLogin(USERS.admin)
  //
});
describe("Go to Learning Page", () => {
  before("Should be able to access the LearningtPage", async () => {
    await EmailCampaign.clickEmailCampaignPageLink();
  });
  it("Should be verify the landing page of EmailCampaign", async () => {
    expect(
      await EmailCampaign.emailCampaignLandingpage(
        "Email Campaigns",
        "Create Email Campaign"
      )
    ).to.equal(true);
  });
  it("create a Campaign with missing mandatory field", async () => {
    await EmailCampaign.clickOnCreateCampaign();
    await EmailCampaign.enterTitle("title");
    expect(await EmailCampaign.designYourEmailenabled()).to.equal(false);
    await EmailCampaign.clearTitle();
  });
  it("create a Campaign with providing all mandatory field", async () => {
    await EmailCampaign.enterTitle(CampaignTitle);
    await EmailCampaign.enterSubject(campainSubject);
    await EmailCampaign.enterTheme(campaignTheme);
    await EmailCampaign.enterPreviewText(campaignPreviewText);
   // expect(await EmailCampaign.getFromName()).equal(fromName);
   // expect(await EmailCampaign.getFromEmail()).equal(fromEmail);
    expect(await EmailCampaign.designYourEmailenabled()).to.equal(true);
  });
  it("Verify Cancle and Save as draft", async () => {
    await EmailCampaign.ClickOnCancle();
    await EmailCampaign.ClickOnkeepWorking();
    await EmailCampaign.clickOnSaveAsDraft();
  });
  it("Verify edit campaign", async () => {
    await EmailCampaign.searchCamapignWithTitle(CampaignTitle);
    expect(
      await EmailCampaign.verifytheTitleAndSubject(
        CampaignTitle,
        campainSubject
      )
    ).to.equal(true);
  });
  it("Verify design your email ", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await EmailCampaign.clickOnNextStep();
    expect(await EmailCampaign.Step2landingPage()).to.equal(true);
    await EmailCampaign.selectTemplate("automation");
  });
  it("Verify send test emails", async () => {
    await EmailCampaign.clickSendTestEmail();
    expect(
      await EmailCampaign.emptyStringvalidation(emailCampaign.EmptystateString)
    ).to.equal(true);
    expect(
      await EmailCampaign.invalidEmailValidation(
        emailCampaign.invalidEmailAddress
      )
    ).to.equal(true);
    await EmailCampaign.ValidEmailValidation(emailCampaign.userid);
  });

  it("Verify Add recipients and schedule", async () => {
    await EmailCampaign.clickOnNextStep();
    await EmailCampaign.clickonAddRecipients(emailCampaign.userid);
    await EmailCampaign.addCampainsenddateTime(scheduleDate);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await EmailCampaign.clickOnReviewAndLaunch();
    expect(await EmailCampaign.step4landingPage()).to.equal(true);
  });
  it("Verify Review And Launch campain", async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    expect(
      await EmailCampaign.verifyCampaignsDetails(
        CampaignTitle,
        campainSubject,
        campaignTheme,
        campaignPreviewText
      )
    );
    expect(await EmailCampaign.verifyFromNameAndEmail(fromName, fromEmail));
    await EmailCampaign.clickOnNextStep();
    await EmailCampaign.clickOnLanchCampaign();
    await new Promise((resolve) => setTimeout(resolve, 20000));
    expect(await EmailCampaign.allEmailCampaignslinkDisplay()).equal(true);
    await EmailCampaign.clickOnAllEmailCampaigns();
    await new Promise((resolve) => setTimeout(resolve, 20000));
    expect(
      await EmailCampaign.emailCampaignLandingpage(
        "Email Campaigns",
        "Create Email Campaign"
      )
    ).to.equal(true);
  });
});
