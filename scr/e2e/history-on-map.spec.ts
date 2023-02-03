import {Locator, Page, test} from "@playwright/test";
import HistoryOnMapPage from "../pages/history-on-map/history-on-map.page";
import ButtonsOnMapPage from "../pages/buttons-on-map.page";
import JourneyTabPage from "../pages/history-on-map/journey-tab.page";


test.describe('history on map',() => {

    let historyOnMapPage : HistoryOnMapPage;
    let buttonsOnMapPage : ButtonsOnMapPage;
    test.beforeEach(async ({ page}) => {

        historyOnMapPage = new HistoryOnMapPage(page);
        buttonsOnMapPage = new ButtonsOnMapPage(page);
        await page.goto('/lfr3/#/tracking');
        await page.waitForLoadState("load");
        await page.locator('.lf-loader-overlay .lf-spinner').waitFor({state: "detached"});
        await buttonsOnMapPage.history.click();

    });

    async function  showResult(selectTrackingOrDriver : string){
        await historyOnMapPage.btn_show.click();
        await historyOnMapPage.waitSpinnerEnd();
        if (await historyOnMapPage.history_stats_panel_no_activity.isVisible()) {
            if(selectTrackingOrDriver == "object") await historyOnMapPage.select_object.click();
            else if(selectTrackingOrDriver == "driver") await historyOnMapPage.select_driver.click();
            return 0;
        }
        return  1;
    }

    async function getItemThatHasData(page : Page, type: string, opener: Locator, objectList : Locator ){
        await opener.click();
        await objectList.nth(0).waitFor()
        const n = await objectList.count();
        let list = await objectList;

        for (let i : number = 0; i< n;i++ ){
            const name = await list.nth(i).innerText();
            await list.nth(i).click();
            if (await showResult(type) == 0) continue;
            if (await historyOnMapPage.tabs_journeys.isVisible()) {
                await page.screenshot({ path: './screenshots/history-01-'+type+'.png', fullPage: true });
                return true;
            }
            if (await historyOnMapPage.tabs_map.isVisible()){
                if (type == 'driver')
                    console.log(type+' '+name+' has historical data');
                return true;
            }
            //TODO return if DELETED
        }
        return false;
    }

    async function  findTrackingObject(page : Page){
        await getItemThatHasData(page,'object', historyOnMapPage.select_object, await page.locator('.tracking-object-category-tag:visible'));
    }

    async function  findDriver(page : Page){
        let driverList = await page.locator('.k-animation-container .k-list-container:visible').locator('li[role=\"option\"]:visible');
        return await getItemThatHasData(page,'driver', historyOnMapPage.select_driver, driverList);
    }
    
    test('History for object in a custom range',async ({page}) => {
        let startDate = '01/12/2022 00:00'
        let endDate = '27/12/2022 23:59'
        let journeyTabPage = new JourneyTabPage(page);
        console.log("------------------------------------");
        console.log("TEST CASE: SHOW OBJECT IN A CUSTOM RANGE: " + startDate + " to " + endDate);

        await journeyTabPage.setInputData(page,startDate, endDate, "history")
        await findTrackingObject(page)
        await journeyTabPage.verifyDataInStatisticAndJourneyPage(page, "history")
    })

    test('History for object last week',async ({page}) => {
        console.log("------------------------------------");
        console.log("TEST CASE: SHOW OBJECT IN LAST WEEK");
        await historyOnMapPage.lastweek.click();
        await findTrackingObject(page)
        let journeyTabPage = new JourneyTabPage(page);
        await journeyTabPage.verifyDataInStatisticAndJourneyPage(page, "history")
    })
    
    test('History for driver',async ({page}) => {
        let journeyTabPage = new JourneyTabPage(page);

        console.log("------------------------------------");
        console.log('TEST CASE: SHOW DRIVER');
        await journeyTabPage.setInputData(page,'01/12/2022 00:00', '27/12/2022 23:00', "history")
        if (await findDriver(page)) {
            console.log('Passed: History is working for driver');
        }
    })
})