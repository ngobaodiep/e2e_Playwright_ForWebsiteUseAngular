import {Page, test} from "@playwright/test";
import InputFieldsPage from "../pages/validation-report/input-fields.page";
import OutputReportPage from "../pages/validation-report/output-report.page";
import MainNavigationBarPage from "../pages/main-navigation-bar.page";
import * as process from "process";

test.describe.serial('validation report',() => {
    test.use({storageState: './session/pta_linhht.json'});


    let inputFieldsPage : InputFieldsPage;
    let outputReportPage : OutputReportPage;
    let mainNavigationBar : MainNavigationBarPage;

    test.beforeEach(async ({ browser, page }) => {
        //const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
        //page = await context.newPage();
        inputFieldsPage = new InputFieldsPage(page);
        outputReportPage = new OutputReportPage(page);
        mainNavigationBar = new MainNavigationBarPage(page);


        await page.goto('/lfr3/#/tracking');
        await page.waitForLoadState("load");
        await page.locator('.lf-loader-overlay .lf-spinner').waitFor({state: "detached"});
        await mainNavigationBar.wocStep1.click();
        await page.locator('.lf-loader-overlay .lf-spinner').waitFor({state: "detached"});
    });

    async function doTestForAnItem(item : string, timeShow : string, stepNumber : number, typeRecord : string){
        await test.step(typeRecord + ' - ' + item,async () => {
            await outputReportPage.doTestBy(item, timeShow, stepNumber, typeRecord);
        })
    }

    async function  doTest(timeShow : string, page: Page){

        await inputFieldsPage.btnShow.click();
        if (!await outputReportPage.waitSpinnerEnd())
            await page.waitForSelector('.initial-message',{state : 'detached'})
        if (await outputReportPage.wocViewBy.isVisible()){
            if (process.env.npm_package_config_mode == 'full'){
                let typeRecord : string = 'labor'
                await doTestForAnItem('Resource',timeShow, 1, typeRecord);
                await doTestForAnItem('Team',timeShow, 2, typeRecord);
                await doTestForAnItem('Project',timeShow, 3, typeRecord);
                await doTestForAnItem('Activity',timeShow, 4, typeRecord);
            } else {
                let timeDone : number = 1;
                let countStep : number = 0;
                // test labor
                console.log("--------------------------");
                console.log("TEST LABOR\n");
                await doTestForAnItem('Resource', timeShow, countStep, 'labor');    
                await doTestForAnItem('Project',timeShow, countStep, 'labor'); countStep++;
                await doTestForAnItem('Team', timeShow, countStep, 'labor'); countStep++;
                // await doTestForAnItem('Activity',timeShow, countStep, 'labor'); countStep++;

                // test equipment
                console.log("--------------------------");
                console.log("TEST EQUIPMENT\n");
                if (await page.locator('div[class="medium-12 columns no-content ng-scope"]',{hasText:/There is no content for the given dates and filter/}).isVisible()){
                    countStep = 0
                    await doTestForAnItem('Resource',timeShow, countStep, 'equipment'); countStep++;
                    await doTestForAnItem('Team',timeShow, countStep, 'equipment'); countStep++;
                    await doTestForAnItem('Project',timeShow, countStep, 'equipment'); countStep++;
                    // await doTestForAnItem('Activity',timeShow, countStep, 'equipment'); countStep++;
                    timeDone++;
                }

                // test material
                console.log("--------------------------");
                console.log("TEST MATERIAL\n");
                if (await page.locator('div[class="medium-12 columns no-content ng-scope"]',{hasText:/There is no content for the given dates and filter/}).isVisible()){
                    countStep = 0
                    await doTestForAnItem('Resource',timeShow, countStep, 'material'); countStep++;
                    await doTestForAnItem('Project',timeShow, countStep, 'material'); countStep++;
                    await doTestForAnItem('Team',timeShow, countStep, 'material'); countStep++;
                    // await doTestForAnItem('Activity',timeShow, countStep, 'material'); countStep++;
                    timeDone++;
                }
                return timeDone;
            }
        }
        return 3;
    }

    test('test validation report',async ({page}) => {
        let timeDone : number;
        console.log('this week');
        await test.step('this week', async () => {
            await inputFieldsPage.timeframe_thisweek.setChecked(true);
            timeDone =  await doTest('this week', page);
        })
        let continueTesting : boolean;
        continueTesting = outputReportPage.countMassEdit < (process.env.npm_package_config_mode == 'full' ? 4 : 1);
        if (continueTesting || await page.locator('div[class="medium-12 columns no-content ng-scope"]',{hasText:/There is no content for the given dates and filter/}).isVisible()){
            console.log('last week');
            await test.step('last week', async () => {
                await inputFieldsPage.timeframe_lastweek.setChecked(true);
                timeDone = await doTest('last week', page);
            })
        }
        continueTesting = outputReportPage.countMassEdit < (process.env.npm_package_config_mode == 'full' ? 4 : 1);
        if (continueTesting || await page.locator('div[class="medium-12 columns no-content ng-scope"]',{hasText:/There is no content for the given dates and filter/}).isVisible() || timeDone < 3) {
            console.log('this month');
            await test.step('this month', async () => {
                await inputFieldsPage.timeframe_thismonth.setChecked(true);
                timeDone =  await doTest('this month', page);
            })
        }
        continueTesting = outputReportPage.countMassEdit < (process.env.npm_package_config_mode == 'full' ? 4 : 1);
        if (continueTesting || await page.locator('div[class="medium-12 columns no-content ng-scope"]',{hasText:/There is no content for the given dates and filter/}).isVisible()  || timeDone < 3){
            console.log('last month');
            await test.step('last month', async () => {
                await inputFieldsPage.timeframe_lastmonth.setChecked(true);
                timeDone =  await doTest('last month', page);
            })
        }
        console.log('==================================================================')
    })

})

