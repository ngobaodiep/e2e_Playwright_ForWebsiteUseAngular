import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 768,
    width: 1366
  }
});

test('test/', async ({ page }) => {
  await page.goto('https://pta.logifleet360.ch/lfr3/#/tracking');
  await page.locator('#settingStep1').getByRole('link').click();
  // await page.locator('.fi-person-genderless').click();
  // await page.locator('.results-contain').screenshot({ path:'./screenshots/woc/activity/activity-01-create.png' });
  // await page.screenshot({ path: './screenshots/woc/activity/activity-02-create.png', fullPage: true });
  await page.locator('#settings-woc-icon').click();
  await page.getByRole('link', { name: 'Activities' }).click();
  // await page.screenshot({ path: './screenshots/woc/activity/activity-01-create.png', fullPage: true });
  await page.locator('.results-contain').screenshot({ path:'./screenshots/woc/activity/activity-01-create.png' });
  await page.getByRole('button', { name: ' Create activity' }).click();
  await page.getByPlaceholder('Activity name').click();
  await page.getByPlaceholder('Activity name').fill('test');
  await page.locator('textarea[name="description"]').click();
  await page.locator('textarea[name="description"]').fill('test1');
  await page.screenshot({ path: './screenshots/woc/activity/activity-02-create.png', fullPage: true });
  await page.getByRole('button', { name: 'Save activity' }).click();
  await page.getByText('Activity created successfully').click();
  await page.screenshot({ path: './screenshots/woc/activity/activity-03-create.png', fullPage: true });

})

// test('test/', async ({ page }) => {
//   await page.goto('https://pta.logifleet360.ch/');

//   await page.locator("//input[@id='user-input']").fill('pta-user-admin-rootgroup')
//   await page.locator("#password-input").fill('Admin19101')

//   await page.locator("//button[normalize-space()='Log in']").click();
//   await page.locator("//span[@class='fa-regular fa-gear']").click();
//   await page.locator("//span[@class='fi-timer iconic-md ng-scope']").click();
//   await page.locator("//a[normalize-space()='Materials']").click();
//   await page.locator("//button[@id='material-button-create']").click();
//   await page.locator("//input[@placeholder='Name']").fill('new material')
//   await page.locator("//span[@class='k-input ng-scope'][normalize-space()='VSL International']").click();
//   await page.locator("//span[@class='k-in k-state-hover k-state-focused']").click();
//   await page.locator("//span[@class='k-dropdown-wrap k-state-default k-state-focused k-state-hover']//span[@class='k-icon k-i-arrow-60-down']").click();


//   await page.locator("//span[contains(text()").click();
//   await page.locator("//li[normalize-space()='km']").click();
//   await page.locator("//input[@placeholder='Cost per unit']").fill('56')
//   await page.locator("//span[normalize-space()='Save material']").click();
//   await page.locator("").click();
//   await page.locator("//span[contains(text()").click();
//   await page.locator("//li[@class='k-item ng-scope k-state-hover']").click();
//   await page.locator("//div[@class='medium-12 columns material-fields']").click();
//   await page.locator("//input[@placeholder='Cost per unit']").fill('756')
//   await page.locator("//span[normalize-space()='Save material']").click();
//   await page.locator("").click();
//   await page.locator("//button[@class='hide-for-small-only button desktop-action-button ng-binding'][normalize-space()='Delete']").click();

// })

// test('test', async ({ page }) => {
//   await page.goto('https://pta.logifleet360.ch/');
//   await page.locator("//input[@id='user-input']").fill('pta-user-admin-rootgroup')
//   await page.locator('#password-input').fill('Admin19101')
//   await page.locator("//button[normalize-space()='Log in']").click();

//   await page.locator("//span[@class='fa-regular fa-gear']").click();
//   await page.locator("//a[@id='settings-vehicles-icon']//div[@class='settings-button']").click();
//   await page.locator("//span[@class='fi-plus-thin iconic-sm ng-scope']").click();
//   await page.locator("//input[@name='name']").fill('Newvehicle')
//   await page.locator('//div[@id="setting-vehicles-form-category"]//span[@class="k-input"]').click()
//   await page.locator("//div[contains(text(),'car')]").click();
//   await page.locator("//span[@class='k-dropdown-wrap k-state-default k-state-hover k-state-focused']//span[@class='k-input ng-scope'][normalize-space()='None']").click();
//   await page.locator("//span[@class='k-in k-state-hover k-state-focused']").click();
//   await page.locator("//button[@id='setting-vehicles-button-save']").click();
//   await page.locator("").click();
//   await page.locator("//input[@name='name']").fill('Newcar')
//   await page.locator("//button[@id='setting-vehicles-button-save']").click();
//   await page.locator("").click();
//   await page.locator("//button[normalize-space()='Delete']").click();
// })