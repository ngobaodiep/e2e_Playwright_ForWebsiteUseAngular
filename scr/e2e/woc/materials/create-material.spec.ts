import { test, expect, Page } from '@playwright/test';
import materials from '../../../../resource/test-data/woc/materials/materials2.json';
import MaterialPage from "./../../../pages/woc/materials/materials.page";

test.use({
  viewport: {
    height: 768,
    width: 1366
  }
});

test.beforeEach(async ({ page }) => {
  await page.waitForLoadState("load");
  await page.locator('.lf-loader-overlay .lf-spinner').waitFor({ state: "detached" });
});

let name: string = ""
let reference: string = ""
let group: string = ""
let materialSet: string = ""
let unit: string = ""
let cost: string = ""
let unitCost: string = ""
let density: string = ""
let ID_test_case: string = ""

let arr: { name: string, reference: string, group: string, materialSet: string, unit: string, cost: string, unitCost: string, density: string, ID_test_case: string }[] = []
let arrFail: { name: string, reference: string, group: string, materialSet: string, unit: string, cost: string, unitCost: string, density: string, ID_test_case: string }[] = []

// MATERIAL FAIL
for (const material of materials.create.fail) {
  ID_test_case = material.ID_test_case
  name = material.name
  reference = material.reference
  group = material.group
  materialSet = material.materialSet
  unit = material.unit
  cost = material.cost
  unitCost = material.unitCost
  density = material.density

  arrFail.push({ "name": name, "reference": reference, "group": group, "materialSet": materialSet, "unit": unit, "cost": cost, "unitCost": unitCost, "density": density, "ID_test_case": ID_test_case })
}

// MATERIAL SUCCESS
for (const material of materials.create.success) {
  ID_test_case = material.ID_test_case
  name = material.name
  reference = material.reference
  group = material.group
  materialSet = material.materialSet
  unit = material.unit
  cost = material.cost
  unitCost = material.unitCost
  density = material.density

  arr.push({ "name": name, "reference": reference, "group": group, "materialSet": materialSet, "unit": unit, "cost": cost, "unitCost": unitCost, "density": density, "ID_test_case": ID_test_case })
}


// MATERIAL CREATE SUCCESS

console.log("-----------------------------");
console.log("TEST CREATE MATERIALS SUCCESS");

for (let i = 0; i < arr.length; i++) {
  test("test" + arr[i].ID_test_case, async ({ page }, testinfo) => {
    let materialPage = new MaterialPage(page);
    await materialPage.getElements()

    await materialPage.createMaterial(true, false, false, true, page, arr[i].name, arr[i].reference, arr[i].group, arr[i].materialSet, arr[i].unit, arr[i].cost, arr[i].unitCost, arr[i].density, arr[i].ID_test_case)
    await materialPage.message_save_success.waitFor() // wait show notifications success
    let notificationSuccess = await materialPage.message_save_success.innerText() // get content notifications to get auto-generate references
    let reference1 = notificationSuccess.split("number")[1]
    reference1 = reference1.trim()
    await materialPage.reference_input.fill(reference1) // search the created material by reference unique
    await materialPage.material_table.click()
    await materialPage.icon_edit.click() // open edit material | don't need for line number nth() because reference unique has only 1 row displayed

    if (arr[i].ID_test_case != "MA3") {
      await expect(materialPage.form_create).toHaveScreenshot('show-edit-materials-' + arr[i].ID_test_case + '-after-create.png');  //expect screenshot edit material after created material
    }

    await materialPage.button_cancel.click()
    await materialPage.icon_delete.click() // delete material to rollback data | don't need for line number nth because fill reference search only one row
    await materialPage.button_confirm.click()
  })
}

//END OF CREATE MATERIAL SUCCESS

// CREATE MATERIAL FAIL
console.log("-----------------------------");
console.log("TEST CREATE MATERIALS FAIL");
for (let i = 0; i < arrFail.length; i++) {
  test("test" + arrFail[i].ID_test_case, async ({ page }, testinfo) => {
    let materialPage = new MaterialPage(page);
    await materialPage.getElements()

    if (arrFail[i].ID_test_case == "MA11") {
      await materialPage.createMaterial(true, false, false, false, page, arrFail[i].name, arrFail[i].reference, arrFail[i].group, arrFail[i].materialSet, arrFail[i].unit, arrFail[i].cost, arrFail[i].unitCost, arrFail[i].density, arrFail[i].ID_test_case)
      await materialPage.button_save.click();
      await expect(materialPage.form_error).toHaveScreenshot('The_reference_is_already_taken.png', { scale: "css" });
      await materialPage.button_ok.click()
    }
    else {
      await materialPage.createMaterial(true, true, true, false, page, arrFail[i].name, arrFail[i].reference, arrFail[i].group, arrFail[i].materialSet, arrFail[i].unit, arrFail[i].cost, arrFail[i].unitCost, arrFail[i].density, arrFail[i].ID_test_case)
      await materialPage.createMaterialFailDisableBtnSave(page, arrFail[i].ID_test_case)
    }
  })
}

// end of test CREATE MATERIAL FAIL
