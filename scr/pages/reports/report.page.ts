import Wrapper from "../../base/Wrapper";
import {Locator, Page} from "@playwright/test";

export default class ReportPage extends Wrapper{
    
    get journeys(): Locator {
        return this._journeys;
    }

    set journeys(value: Locator) {
        this._journeys = value;
    }

    private _journeys : Locator;
    constructor(page : Page) {
        super(page);
        this.getElements();
    }

    private async getElements(){
        this.journeys = await this.findLocator('#reportJourneyStep1');
    }
}