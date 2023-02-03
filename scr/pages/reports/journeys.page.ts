import Wrapper from "../../base/Wrapper";
import {Locator, Page} from "@playwright/test";
import el from "../../../resource/element/option-show-report.json";

export default class JourneysPage extends Wrapper{
    get custom(): Locator {
        return this._custom;
    }

    set custom(value: Locator) {
        this._custom = value;
    }

    get last7days(): Locator {
        return this._last7days;
    }

    set last7days(value: Locator) {
        this._last7days = value;
    }

    get lastweek(): Locator {
        return this._lastweek;
    }

    set lastweek(value: Locator) {
        this._lastweek = value;
    }

    get startDate(): Locator {
        return this._startDate;
    }

    set startDate(value: Locator) {
        this._startDate = value;
    }

    get endDate(): Locator {
        return this._endDate;
    }

    set endDate(value: Locator) {
        this._endDate = value;
    }

    get btn_show(): Locator {
        return this._btn_show;
    }

    set btn_show(value: Locator) {
        this._btn_show = value;
    }

    get btn_reset(): Locator {
        return this._btn_reset;
    }

    set btn_reset(value: Locator) {
        this._btn_reset = value;
    }

    get btn_exportXls(): Locator {
        return this._btn_exportXls;
    }

    set btn_exportXls(value: Locator) {
        this._btn_exportXls = value;
    }
    
    get btn_exportPDF(): Locator {
        return this._btn_exportPDF;
    }

    set btn_exportPDF(value: Locator) {
        this._btn_exportPDF = value;
    }
    
    private _last7days : Locator;
    private _lastweek : Locator;
    private _startDate : Locator;
    private _endDate:Locator;
    private _custom : Locator;
    private _btn_show : Locator;
    private _btn_reset : Locator;
    private _btn_exportXls : Locator;
    private _btn_exportPDF : Locator;

    constructor(page : Page) {
        super(page);
        this.getElements();
    }

    public async getElements(){
        this.last7days = await this.page.locator(el.last7days)
        this.lastweek = await this.page.locator(el.lastweek)
        this.custom = await this.page.locator(el.custom)
        this.startDate = await this.page.locator(el.startDate)
        this.endDate =  await this.page.locator(el.endDate)
        this.btn_reset = await this.page.locator(el.btn_reset)
        this.btn_show = await this.page.locator(el.btn_show)
        this.btn_exportXls = await this.page.locator(el.btn_exportXls)
        this.btn_exportPDF = await this.page.locator(el.btn_exportPDF)
    }
}
