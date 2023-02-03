import { test, expect, Page } from '@playwright/test';
import materials from '../../../../resource/test-data/woc/materials/materials2.json';
import MaterialPage from '../../../pages/woc/materials/materials.page';

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

for (const material of materials.edit.fail) {
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
for (const material of materials.edit.success) {
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

// MATERIAL SUCCESS

console.log("-----------------------------");
console.log("TEST EDIT MATERIALS SUCCESS");

for (let i = 0; i < arr.length; i++) {
  test("test" + arr[i].ID_test_case, async ({ page }, testinfo) => {
    let materialPage = new MaterialPage(page);
    await materialPage.getElements()
    await materialPage.editMaterial(false, false, true, page, arr[i].name, arr[i].reference, arr[i].group, arr[i].materialSet, arr[i].unit, arr[i].cost, arr[i].unitCost, arr[i].density, arr[i].ID_test_case)
  })
}

//END OF MATERIAL SUCCESS

console.log("-----------------------------");
console.log("TEST EDIT MATERIALS FAIL");
for (let i = 0; i < arrFail.length; i++) {
  // if (arrFail[i].ID_test_case == "MA25") {
    test("test" + arrFail[i].ID_test_case, async ({ page }, testinfo) => {
      let materialPage = new MaterialPage(page);
      await materialPage.getElements()
      if (arrFail[i].ID_test_case == "MA27") {
        await materialPage.editMaterial(false, false, false, page, arrFail[i].name, arrFail[i].reference, arrFail[i].group, arrFail[i].materialSet, arrFail[i].unit, arrFail[i].cost, arrFail[i].unitCost, arrFail[i].density, arrFail[i].ID_test_case)
      }
      else {
        await materialPage.editMaterial(true, true, false, page, arrFail[i].name, arrFail[i].reference, arrFail[i].group, arrFail[i].materialSet, arrFail[i].unit, arrFail[i].cost, arrFail[i].unitCost, arrFail[i].density, arrFail[i].ID_test_case)
        await materialPage.editMaterialFailDisableBtnSave(page, arrFail[i].ID_test_case)
      }
    })
  // }
}

// end of test EDIT FAIL

