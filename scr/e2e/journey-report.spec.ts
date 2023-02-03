import { Locator, Page, test } from "@playwright/test";
import JourneysPage from "../pages/reports/journeys.page";
import ButtonsOnMapPage from "../pages/buttons-on-map.page";
import JourneyTabPage from "../pages/history-on-map/journey-tab.page";
import MainNavigationBarPage from "../pages/main-navigation-bar.page";
import ReportPage from "../pages/reports/report.page";

test.describe('Journeys Report', () => {
    let journeysPage: JourneysPage;
    let buttonsOnMapPage: ButtonsOnMapPage;
    let mainNavigationBarPage: MainNavigationBarPage;
    let reportPage: ReportPage;
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: 1366, height: 650 }); // set size view port to show button "Show", because default view port does not show the button "Show"

        journeysPage = new JourneysPage(page);
        buttonsOnMapPage = new ButtonsOnMapPage(page);
        mainNavigationBarPage = new MainNavigationBarPage(page);
        reportPage = new ReportPage(page);
        await page.goto('/lfr3/#/tracking');
        await page.waitForLoadState("load");
        await page.locator('.lf-loader-overlay .lf-spinner').waitFor({ state: "detached" });
        await mainNavigationBarPage.reportStep1.click();
        await reportPage.journeys.click();
    });

    test('Journeys report in a custom range', async ({ page }) => {
        let startDate = '01/12/2022 00:00'
        let endDate = '27/12/2022 23:59'
        let journeyTabPage = new JourneyTabPage(page);
        console.log("------------------------------------")
        console.log("TEST CASE: JOURNEYS REPORT IN A CUSTOM RANGE: " + startDate + " to " + endDate)
        await journeyTabPage.setInputData(page,startDate, endDate, "journeys-report")
        await journeysPage.btn_show.click()
        await journeyTabPage.verifyDataInStatisticAndJourneyPage(page, "journeys-report")
    })

    test('Journeys report last week', async ({ page }) => {
        console.log("------------------------------------");
        console.log("TEST CASE: JOURNEYS REPORT IN LAST WEEK");
        await journeysPage.lastweek.click()
        await journeysPage.btn_show.click()
        let journeyTabPage = new JourneyTabPage(page);
        await journeyTabPage.verifyDataInStatisticAndJourneyPage(page, "journeys-report")
    })

    test('Get excel journeys report last week', async ({ page }, testInfo) => {
        console.log("------------------------------------");
        console.log("TEST CASE: GET EXCEL");
        await journeysPage.lastweek.click()
        await journeysPage.btn_show.click()

        // Start waiting for download before clicking. Note no await.
        const downloadPromise = page.waitForEvent('download');
        await journeysPage.btn_exportXls.click()
        const download = await downloadPromise;  // Wait for the download process to complete
        await download.saveAs('import-export/Journeys-report.xlsx');
        testInfo.attach('Journeys-report.xlsx', { path: 'import-export/Journeys-report.xlsx' }) // attach file downloaded to report

        // read file Journeys-report.xlsx to check format column startingDateTime
        const reader = require('xlsx')
        const file = reader.readFile('import-export/Journeys-report.xlsx', { cellText: false, cellDates: true, cellFormula: false })
        const sheets = file.SheetNames // get all sheet
        let data = []
        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]], { raw: false, dateNF: 'dd/MM/yyyy HH:mm' })
            temp.forEach((res) => {
                data.push(res)
            })
        }
        console.log("Starting date time of the first line in file Journeys-report.xlsx: " + data[0].startingDateTime)
    })
})