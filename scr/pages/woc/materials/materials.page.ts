import Wrapper from "../../../base/Wrapper";
import { Locator, Page } from "@playwright/test";
import el from "../../../../resource/element/woc/materials.json";

import { test, expect } from '@playwright/test';
import materials from '../../../../resource/test-data/woc/materials/materials2.json';
// import MaterialPage from "./../../../pages/woc/materials/materials.page";

export default class MaterialPage extends Wrapper {

  get setting_button(): Locator {
    return this._setting_button;
  }

  set setting_button(value: Locator) {
    this._setting_button = value;
  }

  get worker_connect(): Locator {
    return this._worker_connect;
  }

  set worker_connect(value: Locator) {
    this._worker_connect = value;
  }

  public set material_tab(value: Locator) {
    this._material_tab = value;
  }

  public get material_tab(): Locator {
    return this._material_tab;
  }

  public set material_table(value: Locator) {
    this._material_table = value;
  }

  public get material_table(): Locator {
    return this._material_table;
  }

  public set material_create_button(value: Locator) {
    this._material_create_button = value;
  }

  public get material_create_button(): Locator {
    return this._material_create_button;
  }

  get name(): Locator {
    return this._name;
  }

  set name(value: Locator) {
    this._name = value;
  }

  get reference(): Locator {
    return this._reference;
  }

  set reference(value: Locator) {
    this._reference = value;
  }

  get group_default(): Locator {
    return this._group_default;
  }

  set group_default(value: Locator) {
    this._group_default = value;
  }

  get group_dropdown(): Locator {
    return this._group_dropdown;
  }

  set group_dropdown(value: Locator) {
    this._group_dropdown = value;
  }

  get material_set(): Locator {
    return this._material_set;
  }

  set material_set(value: Locator) {
    this._material_set = value;
  }

  get unit(): Locator {
    return this._unit;
  }

  set unit(value: Locator) {
    this._unit = value;
  }

  get inputRoleListBox(): Locator {
    return this._inputRoleListBox;
  }

  set inputRoleListBox(value: Locator) {
    this._inputRoleListBox = value;
  }

  get cost_per_unit(): Locator {
    return this._cost_per_unit;
  }

  set cost_per_unit(value: Locator) {
    this._cost_per_unit = value;
  }

  get form_create(): Locator {
    return this._form_create;
  }

  set form_create(value: Locator) {
    this._form_create = value;
  }

  get density(): Locator {
    return this._density;
  }

  set density(value: Locator) {
    this._density = value;
  }

  get button_save(): Locator {
    return this._button_save;
  }

  set button_save(value: Locator) {
    this._button_save = value;
  }

  get message_save_success(): Locator {
    return this._message_save_success;
  }

  set message_save_success(value: Locator) {
    this._message_save_success = value;
  }

  get reference_input(): Locator {
    return this._reference_input;
  }

  set reference_input(value: Locator) {
    this._reference_input = value;
  }

  get icon_edit(): Locator {
    return this._icon_edit;
  }

  set icon_edit(value: Locator) {
    this._icon_edit = value;
  }

  get icon_delete(): Locator {
    return this._icon_delete;
  }

  set icon_delete(value: Locator) {
    this._icon_delete = value;
  }

  get button_confirm(): Locator {
    return this._button_confirm;
  }

  set button_confirm(value: Locator) {
    this._button_confirm = value;
  }

  get button_cancel(): Locator {
    return this._button_cancel;
  }

  set button_cancel(value: Locator) {
    this._button_cancel = value;
  }

  get form_error(): Locator {
    return this._form_error;
  }

  set form_error(value: Locator) {
    this._form_error = value;
  }

  get button_ok(): Locator {
    return this._button_ok;
  }

  set button_ok(value: Locator) {
    this._button_ok = value;
  }

  get dropdown_unit(): Locator {
    return this._dropdown_unit;
  }

  set dropdown_unit(value: Locator) {
    this._dropdown_unit = value;
  }

  get dropdown_unit_cost(): Locator {
    return this._dropdown_unit_cost;
  }

  set dropdown_unit_cost(value: Locator) {
    this._dropdown_unit_cost = value;
  }

  get title_form(): Locator {
    return this._title_form;
  }

  set title_form(value: Locator) {
    this._title_form = value;
  }

  constructor(page: Page) {
    super(page);
    this.getElements();
  }

  private _title_form: Locator;
  private _form_create: Locator;
  private _setting_button: Locator;
  private _worker_connect: Locator;
  private _material_tab: Locator;
  private _material_table: Locator;
  private _material_create_button: Locator;
  private _reference_input: Locator;
  private _icon_edit: Locator;
  private _icon_delete: Locator;
  private _name: Locator;
  private _reference: Locator;
  private _group_default: Locator;
  private _group_dropdown: Locator;
  private _material_set: Locator;
  private _unit: Locator;
  private _inputRoleListBox: Locator;
  private _cost_per_unit: Locator;
  private _density: Locator;
  private _button_save: Locator;
  private _message_save_success: Locator;
  private _button_confirm: Locator;
  private _button_cancel: Locator;
  private _form_error: Locator;
  private _button_ok: Locator;
  private _dropdown_unit: Locator;
  private _dropdown_unit_cost: Locator;

  public async getElements() {
    this.form_create = await this.findLocator(el.create.form.form_create);
    this.setting_button = await this.findLocator(el.create.setting_button);
    this.worker_connect = await this.findLocator(el.create.worker_connect);
    this.material_tab = await this.findLocator(el.create.material_tab);
    this.material_table = await this.findLocator(el.create.material_table);
    this.material_create_button = await this.findLocator(el.create.material_create_button);
    this.reference_input = await this.findLocator(el.create.reference_input);
    this.icon_edit = await this.findLocator(el.create.icon_edit);
    this.icon_delete = await this.findLocator(el.create.icon_delete);
    this.name = await this.findLocator(el.create.form.name);
    this.reference = await this.findLocator(el.create.form.reference);
    this.group_default = await this.findLocator(el.create.form.group_default);
    this.group_dropdown = await this.findLocator(el.create.form.group_dropdown);
    this.material_set = await this.findLocator(el.create.form.material_set);
    this.unit = await this.findLocator(el.create.form.unit);
    this.inputRoleListBox = await this.findLocator(el.create.form.inputRoleListBox);
    this.cost_per_unit = await this.findLocator(el.create.form.cost_per_unit);
    this.density = await this.findLocator(el.create.form.density);
    this.button_save = await this.findLocator(el.create.form.button_save);
    this.message_save_success = await this.findLocator(el.create.form.message_save_success);
    this.button_cancel = await this.findLocator(el.create.form.button_cancel);
    this.button_confirm = await this.findLocator(el.create.form.button_confirm);
    this.form_error = await this.findLocator(el.create.notification.form_error);
    this.button_ok = await this.findLocator(el.create.notification.button_ok);

    this.dropdown_unit = await this.findLocator(el.edit.form.dropdown_unit);
    this.dropdown_unit_cost = await this.findLocator(el.edit.form.dropdown_unit_cost);
    this.title_form = await this.findLocator(el.create.form.title_form);
  }

  public async createMaterial(gotoTracking: boolean, checkDensityCharacter: boolean, checkCostCharacter: boolean, checkClickSave: boolean, page: Page, name: string, reference: string, group: string, materialSet: string, unit: string, cost: string, unitCost: string, density: string, ID_test_case: string) {

    let materialPage = new MaterialPage(page);
    await materialPage.getElements()

    if (gotoTracking) {
      // await page.goto('http://localhost/lfr3/#/tracking')
      await page.goto('https://pta.logifleet360.ch/lfr3/#/tracking')

      await materialPage.setting_button.click()
      await materialPage.worker_connect.click()
      await materialPage.material_tab.click()
      await materialPage.material_table.waitFor()
    }
    
    await materialPage.material_create_button.click()
    // fill data
    await materialPage.name.fill(name)
    if (ID_test_case != "MA3") {
      await materialPage.reference.fill(reference)
    }
    else {
      await materialPage.reference.fill(reference + Math.floor(Math.random() * 6))
    }

    if (group != "") {
      await materialPage.group_default.click()
      await page.locator('.k-in:has-text("' + group + '")').click();
      await materialPage.group_dropdown.click() // close dropdown group
    }

    if (materialSet != "") {
      await materialPage.material_set.click()
      try {
        await page.locator('li:has-text("' + materialSet + '")').click() // choose materialSet 
      } catch (e) {
        let count = await page.locator('li:has-text("' + materialSet + '")').count()
        while (count > 0) {
          if (await page.locator('li:has-text("' + materialSet + '")').nth(count).isVisible()) { // only materialSet in dropdown visible, other materialSet don't visible
            if (await page.locator('li:has-text("' + materialSet + '")').nth(count).innerText() == materialSet) {
              await page.locator('li:has-text("' + materialSet + '")').nth(count).click()
              break
            }
          }
          count -= 1
        }
      }
    }

    if (unit != "") {
      await materialPage.unit.click() // open dropdown unit
      try {
        await page.locator('li:has-text("' + unit + '")').click() // choose unit 
      } catch (e) {
        if (await materialPage.inputRoleListBox.nth(0).isVisible()) { // fill input search unit. nth 0  belongs to unit, nth 1 belongs to unitCost
          await materialPage.inputRoleListBox.nth(0).fill(unit)
        }
        let count = await page.locator('li:has-text("' + unit + '")').count()
        while (count > 0) {
          if (await page.locator('li:has-text("' + unit + '")').nth(count).isVisible()) { // only unit in dropdown visible, other unit don't visible
            if (await page.locator('li:has-text("' + unit + '")').nth(count).innerText() == unit) {
              await page.locator('li:has-text("' + unit + '")').nth(count).click()
              break
            }
          }
          count -= 1
        }
      }
    }
    if (unitCost != "") { // open cost per unit to choose unit difference
      await page.locator('.k-input.ng-scope', { hasText: /CHF/ }).click() // open dropdown cost per unit
      try {
        await page.locator('li:has-text("' + unitCost + '")').click(); // choose unitCost
      } catch (e) {
        if (await materialPage.inputRoleListBox.nth(1).isVisible()) { // fill input search unit. nth 0  belongs to unit, nth 1 belongs to unitCost
          await materialPage.inputRoleListBox.nth(1).fill(unitCost)
        }
        let count = await page.locator('li:has-text("' + unitCost + '")').count()
        while (count > 0) {
          if (await page.locator('li:has-text("' + unitCost + '")').nth(count).isVisible()) { // only unitCost in dropdown visible, other unit don't visible
            await page.locator('li:has-text("' + unitCost + '")').nth(count).click()
            break
          }
          count -= 1
        }
      }
    }
    if (checkCostCharacter) {
      try {
        await materialPage.cost_per_unit.fill(cost)
      }
      catch {
        console.log("Pass test fill character in COST");
      }
    }
    else {
      await materialPage.cost_per_unit.fill(cost)
    }

    if (checkDensityCharacter) {
      try {
        await materialPage.density.fill(density)
      }
      catch {
        console.log("Pass test fill character in DENSITY");
      }
    }
    else {
      await materialPage.density.fill(density)
    }
    // End of fill data

    if (ID_test_case != "MA3" && gotoTracking) {
      await expect(materialPage.form_create).toHaveScreenshot('create-materials-' + ID_test_case + '-before-save.png');  //expect screenshot create material before click button save
    }

    if (checkClickSave) {
      await materialPage.button_save.click();
      try {
        await materialPage.message_save_success.click({ timeout: 2000 });
      } catch (e) {
        if (await materialPage.button_save.isVisible()) {
          await materialPage.button_save.click();
        }
      }
    }
  }

  public async createMaterialFailDisableBtnSave(page: Page, ID_test_case: string) {
    let materialPage = new MaterialPage(page);
    await materialPage.getElements()

    if (await materialPage.button_save.isDisabled) {
      console.log("PASS test create fail Material, id test case is: " + ID_test_case);
    }
    else {
      console.log("FAIL test create fail Material, id test case is: " + ID_test_case);
    }
  }

  
public async editMaterial(checkDensityCharacter: boolean, checkCostCharacter: boolean, checkClickSave: boolean, page: Page, name: string, reference: string, group: string, materialSet: string, unit: string, cost: string, unitCost: string, density: string, ID_test_case: string) {
  let materialPage = new MaterialPage(page);
  await materialPage.getElements()

  // await page.goto('http://localhost/lfr3/#/tracking')
  await page.goto('https://pta.logifleet360.ch/lfr3/#/tracking')
  await materialPage.setting_button.click()
  await materialPage.worker_connect.click()
  await materialPage.material_tab.click()
  await materialPage.material_table.waitFor()

  // create new material to test edit
  await materialPage.createMaterial(false, false, false, true, page, "new material to test edit", "referenceMaterialEditTest1", "VSL International", "material sets special test edit in International", unit, "6868", unitCost, "8686", ID_test_case)
  await materialPage.reference_input.fill("referenceMaterialEditTest1") // search the created material by reference unique
  await materialPage.material_table.click()
  await materialPage.icon_edit.click() // open edit material | don't need for line number nth() because reference unique has only 1 row displayed

  // fill data
  await materialPage.name.fill(name)
  if (ID_test_case != "MA19") {
    await materialPage.reference.fill(reference)
  }
  else {
    await materialPage.reference.fill(reference + "1")
  }
  if (group != "") {
    await materialPage.group_dropdown.click() // open dropdown group
    await page.locator('.k-in:has-text("' + group + '")').click();
    await materialPage.group_dropdown.click() // close dropdown group
  }

  if (materialSet != "") {

    await materialPage.material_set.click()
    try {
      await page.locator('li:has-text("' + materialSet + '")').click() // choose materialSet 
    } catch (e) {
      let count = await page.locator('li:has-text("' + materialSet + '")').count()
      while (count > 0) {
        if (await page.locator('li:has-text("' + materialSet + '")').nth(count).isVisible()) { // only materialSet in dropdown visible, other materialSet don't visible
          if (await page.locator('li:has-text("' + materialSet + '")').nth(count).innerText() == materialSet) {
            await page.waitForTimeout(2000)
            await materialPage.material_set.click() // click again because sometime can't click material sets 
            await materialPage.material_set.click()
            await page.locator('li:has-text("' + materialSet + '")').nth(count).click()
            break
          }
        }
        count -= 1
      }
    }
  }

  if (unit != "") {
    await materialPage.dropdown_unit.click() // open dropdown unit
    try {
      await page.locator('li:has-text("' + unit + '")').click() // choose unit 
    } catch (e) {
      if (await materialPage.inputRoleListBox.nth(0).isVisible()) { // fill input search unit. nth 0  belongs to unit, nth 1 belongs to unitCost
        await materialPage.inputRoleListBox.nth(0).fill(unit)
      }
      let count = await page.locator('li:has-text("' + unit + '")').count()
      while (count > 0) {
        if (await page.locator('li:has-text("' + unit + '")').nth(count).isVisible()) { // only unit in dropdown visible, other unit don't visible
          if (await page.locator('li:has-text("' + unit + '")').nth(count).innerText() == unit) {
            await page.locator('li:has-text("' + unit + '")').nth(count).click()
            break
          }
        }
        count -= 1
      }
    }
  }
  if (unitCost != "") { // open cost per unit to choose unit difference
    await materialPage.dropdown_unit_cost.click() // open dropdown cost per unit
    try {
      await page.locator('li:has-text("' + unitCost + '")').click(); // choose unitCost
    } catch (e) {
      if (await materialPage.inputRoleListBox.nth(1).isVisible()) { // fill input search unit. nth 0  belongs to unit, nth 1 belongs to unitCost
        await materialPage.inputRoleListBox.nth(1).fill(unitCost)
      }
      let count = await page.locator('li:has-text("' + unitCost + '")').count()
      while (count > 0) {
        if (await page.locator('li:has-text("' + unitCost + '")').nth(count).isVisible()) { // only unitCost in dropdown visible, other unit don't visible
          await page.locator('li:has-text("' + unitCost + '")').nth(count).click()
          break
        }
        count -= 1
      }
    }
  }
  if (checkCostCharacter) {
    try {
      await materialPage.cost_per_unit.fill(cost)
    }
    catch {
      console.log("Pass test fill character in COST");
    }
  }
  else {
    await materialPage.cost_per_unit.fill(cost)
  }

  if (checkDensityCharacter) {
    try {
      await materialPage.density.fill(density)
    }
    catch {
      console.log("Pass test fill character in DENSITY");
    }
  }
  else {
    await materialPage.density.fill(density)
  }
  // End of fill data

  await materialPage.title_form.click() // click title to don't focus any input (if focus some input, input have show something)
  if (ID_test_case != "MA19") {
    await expect(materialPage.form_create).toHaveScreenshot('edit-materials-' + ID_test_case + '-before-save.png');  //expect screenshot create material before click button save
  }


  if (checkClickSave) {
    await materialPage.button_save.click();
  }
  else {
    if (ID_test_case == "MA27") { // test duplicate reference
      await materialPage.button_save.click();
      await expect(materialPage.form_error).toHaveScreenshot('The_reference_is_already_taken.png', { scale: "css" });
      await materialPage.button_ok.click()
    }
    await materialPage.button_cancel.click() // cancel form edit material
  }
  await materialPage.icon_delete.click() // delete material to rollback data | don't need for line number nth because fill reference search only one row
  await materialPage.button_confirm.click()
  // }
}

public async editMaterialFailDisableBtnSave(page: Page, ID_test_case: string) {
  let materialPage = new MaterialPage(page);
  await materialPage.getElements()

  if (await materialPage.button_save.isDisabled) {
    console.log("PASS test edit fail Material, id test case is: " + ID_test_case);
  }
  else {
    console.log("FAIL test edit fail Material, id test case is: " + ID_test_case);
  }
}
}
