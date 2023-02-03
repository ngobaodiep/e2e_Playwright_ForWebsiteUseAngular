import {Locator, Page} from "@playwright/test";
import Wrapper from "../../base/Wrapper";
import el from "../../../resource/element/option-show-report.json";

export default  class HistoryOnMapPage extends Wrapper{
    get tabs_map(): Locator {
        return this._tabs_map;
    }

    set tabs_map(value: Locator) {
        this._tabs_map = value;
    }
    get custom(): Locator {
        return this._custom;
    }

    set custom(value: Locator) {
        this._custom = value;
    }
    get tabs_activity(): Locator {
        return this._tabs_activity;
    }

    set tabs_activity(value: Locator) {
        this._tabs_activity = value;
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

    private _last7days : Locator;
    private _lastweek : Locator;
    private _custom : Locator;
    private _select_driver : Locator;
    private _select_object : Locator;
    private _btn_show : Locator;
    private _btn_reset : Locator;
    private _tabs_journeys : Locator;
    private _tabs_map: Locator;
    private _tabs_statistic : Locator;
    private _history_stats_panel_no_activity : Locator;
    private _history_tracking_objects : Locator;
    private _tabs_activity : Locator;
    private _startDate : Locator;
    private _endDate:Locator;

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

    get history_tracking_objects(): Locator {
        return this._history_tracking_objects;
    }

    set history_tracking_objects(value: Locator) {
        this._history_tracking_objects = value;
    }

    get tabs_journeys(): Locator {
        return this._tabs_journeys;
    }

    set tabs_journeys(value: Locator) {
        this._tabs_journeys = value;
    }

    get tabs_statistic(): Locator {
        return this._tabs_statistic;
    }

    set tabs_statistic(value: Locator) {
        this._tabs_statistic = value;
    }

    get history_stats_panel_no_activity(): Locator {
        return this._history_stats_panel_no_activity;
    }

    set history_stats_panel_no_activity(value: Locator) {
        this._history_stats_panel_no_activity = value;
    }

    get select_driver(): Locator {
        return this._select_driver;
    }

    set select_driver(value: Locator) {
        this._select_driver = value;
    }

    get select_object(): Locator {
        return this._select_object;
    }

    set select_object(value: Locator) {
        this._select_object = value;
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
    constructor(page : Page) {
        super(page);
        this.getElements();

    }

    public async getElements(){
        this.last7days = await this.page.locator(el.history.last7days)
        this.lastweek = await this.page.locator(el.history.lastweek)
        this.custom = await this.page.locator(el.history.custom)
        this.startDate = await this.page.locator(el.startDate)
        this.endDate =  await this.page.locator(el.endDate)
        this.select_object = await this.page.locator(el.history.select_object).locator(el.history.k_select)//choose object
        this.select_driver = await this.page.locator(el.history.select_driver).locator(el.history.k_select)//choose driver
        this.btn_reset = await this.page.locator(el.history.btn_reset)
        this.btn_show = await this.page.locator(el.history.btn_show)
        this.tabs_journeys = await this.page.locator(el.history.tabs_journeys)
        this.tabs_statistic = await this.page.locator(el.history.tabs_statistic)
        this.tabs_activity = await this.findLocator(el.history.tabs_activity)
        this.tabs_map = await this.page.locator(el.history.tabs_map)
        this.history_stats_panel_no_activity = await this.page.locator(el.history.history_stats_panel_no_activity)
        this.history_tracking_objects = await this.page.locator(el.history.history_tracking_objects)
    }
}