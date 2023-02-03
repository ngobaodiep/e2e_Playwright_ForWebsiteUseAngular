import Wrapper from "../../base/Wrapper";
import { Page } from "@playwright/test";
import el from "../../../resource/element/history-on-map.json";
import FinalTotalRow from "./final-total-row.page";
import AWeekPage from "./a-week/a-week.page";
import StatisticPage from "./statistic.page";
import ActivityPage from "./activity.page";
import HistoryOnMapPage from "./history-on-map.page";
import JourneysPage from "../reports/journeys.page";
export default class JourneyTabPage extends Wrapper{
    get weeks(): AWeekPage[] {
        return this._weeks;
    }

    set weeks(value: AWeekPage[]) {
        this._weeks = value;
    }

    get finalTotalRow(): FinalTotalRow {
        return this._finalTotalRow;
    }

    set finalTotalRow(value: FinalTotalRow) {
        this._finalTotalRow = value;
    }
    constructor(page : Page) {
        super(page);        
    }

    private _finalTotalRow : FinalTotalRow;
    private _weeks : AWeekPage[] = [];

    public async getElements(){
        await  this.page.locator(el.journey.week).nth(0).waitFor()
        this.finalTotalRow = new FinalTotalRow(this.page);
        let numberTotalWeeks = await this.page.locator(el.journey.week).count();
        for (let i=0; i < numberTotalWeeks; i++){
            let aWeek = new AWeekPage(this.page);
            await aWeek.getElements(await this.page.locator(el.journey.week).nth(i));
            this._weeks.push(aWeek);
        }
    }
    
    public changeTimeStatistics (timeStatistics: string) {
        let hour = timeStatistics.indexOf('h')
        let min = timeStatistics.indexOf('m',(hour + 1))
        let time = (parseInt(timeStatistics.substring(0,hour)) * 60) + parseInt(timeStatistics.substring((hour + 1),min))
        return time
    }
    
    public changeTimeJourneys (timeJourneys: string) {
        let hour = timeJourneys.split(':')
        let time = (parseInt(hour[0]) * 60) + parseInt(hour[1])
        return time
    }
    
    public timeToSecondSign (time: string) {
        let timeSplit = time.split(':')
        let timeSecond: number = parseInt(timeSplit[0]) * 3600 + parseInt(timeSplit[1]) * 60 + parseInt(timeSplit[2])
        return timeSecond
    }

    public async setInputData(page : Page, startDate : string, endDate : string, typeCheck : string){
        let historyOnMapPage = new HistoryOnMapPage(page);
        await historyOnMapPage.getElements()
        
        if(typeCheck == "history") {
            await historyOnMapPage.custom.click();
        }
        else {
            let journeysPage = new JourneysPage(page);
            await journeysPage.getElements()
            await journeysPage.custom.click();
        }
        await historyOnMapPage.startDate.fill(startDate);
        await historyOnMapPage.endDate.fill(endDate);
    }

    public async getDataInTimelineJourney(page : Page){
        let f = await page.locator('div[kendo-chart="charts.timelineChart"]:visible').locator('path[fill="#006bb3"]').nth(0);
        // check for warning. If yes, get the 2nd blue timeline
        if(await page.locator('div[kendo-chart="charts.timelineChart"]:visible').locator('path[stroke="orange"]').isVisible()){
            f = await page.locator('div[kendo-chart="charts.timelineChart"]:visible').locator('path[fill="#006bb3"]').nth(1);
        }
        let bd = await f.boundingBox();

        // 2nd gray timeline
        let gray = await page.locator('div[kendo-chart="charts.timelineChart"]:visible').locator('path[fill="#9e9e9e"]').nth(1);
        let bdGray = await gray.boundingBox();

        await page.mouse.move(bd.x ,bd.y+bd.height/2);
        await page.mouse.down();
        // drag to have blue space for small timeline  (if width is small, there will be no blue space)`
        await page.mouse.move(bdGray.x+100, bd.y+bd.height/2)
        await page.mouse.move(bdGray.x+bdGray.width/2, bd.y+bd.height/2)
        await page.mouse.up();

        bd = await f.boundingBox();
        await page.mouse.move(bd.x+1 ,bd.y+bd.height/2);

        let tooltip = await page.locator('.k-tooltip.k-chart-tooltip.k-chart-crosshair-tooltip');
        let text = await tooltip.innerText();
        return text
    }
    

    public async compareWeekWithWeekday(i : number, sum_day_duration : number, sum_day_distance:number, sum_day_stopped_time:number, sum_day_engagement_time:number, week_duration : string, week_distance : number, week_stopped_time : string, week_engagement_time : string){
        console.log("       ------------");
            console.log("       COMPARE duration, distance, times of all days WITH WEEK ROW");
            if ( this.timeToSecondSign(week_duration) == sum_day_duration) {
                console.log("       Passed: duration in week row is: " + week_duration + " to second: " + this.timeToSecondSign(week_duration) + " and total duration of days is: " + sum_day_duration );
            }
            else {
                console.log("\nFail duration in week:" + i );
                console.log("Week duration: " + week_duration + " to second: " + this.timeToSecondSign(week_duration));
                console.log("Sum duration in week: " + sum_day_duration + "\n");
            }
            if ( Math.round(sum_day_distance * 1000) / 1000 == week_distance) {
                console.log("       Passed: distance in week row is: " + week_distance  + " and total distance of days is: " + Math.round(sum_day_distance * 1000) / 1000 );
            }
            else {
                console.log("\nFail distance in week:" + i );
                console.log("Week distance: " + week_distance + " to second: " + week_distance);
                console.log("Sum distance in week: " + Math.round(sum_day_distance * 1000) / 1000 + "\n");
            }
            if ( this.timeToSecondSign(week_stopped_time) == sum_day_stopped_time) {
                console.log("       Passed:  stopped time in week row is: " + week_stopped_time + " to second: " + this.timeToSecondSign(week_stopped_time)  + " and total stopped time of days is: " + sum_day_stopped_time );
            }
            else {
                console.log("\nFail stopped time in week:" + i );
                console.log("Week stopped time: " + week_stopped_time + " to second: " + this.timeToSecondSign(week_stopped_time));
                console.log("Sum stopped time in week: " + sum_day_stopped_time + "\n");
            }
            if ( this.timeToSecondSign(week_engagement_time) == sum_day_engagement_time) {
                console.log("       Passed:  engagement time in week row is: " + week_engagement_time  + " to second: " + this.timeToSecondSign(week_engagement_time)  + " and total engagement of days is: " + sum_day_engagement_time );
            }
            else {
                console.log("\nFail engagement time in week:" + i );
                console.log("Week engagement time: " + week_engagement_time + " to second: " + this.timeToSecondSign(week_engagement_time));
                console.log("Sum engagement time in week: " + sum_day_engagement_time + "\n");
            }
    }

    public async compareWeekWithFinal( journey_duration : string, journey_distance : number, journey_stopped_time : string, journey_engagement_time : string, sum_week_duration : number, sum_week_distance : number, sum_week_stopped_time : number, sum_week_engagement_time : number ){
        
        console.log("       -------------------");
        console.log("       COMPARE duration, distance, times of all weeks WITH FINAL ROW");

        // compare total period data with total week in report
        if ( this.timeToSecondSign(journey_duration) == sum_week_duration) {
            console.log("       Passed:  total duration of all week rows: " + journey_duration + " to second: " + this.timeToSecondSign(journey_duration) + " and final row: " + sum_week_duration );
        }
        else {
            console.log("\nFail duration total period");
            console.log("Week duration: " + journey_duration + " to second: " + this.timeToSecondSign(journey_duration));
            console.log("Sum duration total period: " + sum_week_duration + "\n");
        }
        if ( Math.round(sum_week_distance * 1000) / 1000 == journey_distance) {
            console.log("       Passed:  total distance of week row is: " + journey_distance  + " and final row: " + sum_week_distance );
        }
        else {
            console.log("\nFail distance total period");
            console.log("Week distance: " + journey_distance + " to second: " + journey_distance);
            console.log("Sum distance total period: " + Math.round(sum_week_distance * 1000) / 1000 + "\n");
        }
        if ( this.timeToSecondSign(journey_stopped_time) == sum_week_stopped_time) {
            console.log("       Passed:  total stopped time of week rows: " + journey_stopped_time + " to second: " + this.timeToSecondSign(journey_stopped_time)  + " and final row: " + sum_week_stopped_time );
        }
        else {
            console.log("\nFail stopped time total period");
            console.log("Week stopped time: " + journey_stopped_time + " to second: " + this.timeToSecondSign(journey_stopped_time));
            console.log("Sum stopped time total period: " + sum_week_stopped_time + "\n");
        }
        if ( this.timeToSecondSign(journey_engagement_time) == sum_week_engagement_time) {
            console.log("       Passed:  total engagement time of week rows: " + journey_engagement_time  + " to second: " + this.timeToSecondSign(journey_engagement_time)  + " and final row: " + sum_week_engagement_time );
        }
        else {
            console.log("\nFail engagement time total period");
            console.log("Week engagement time: " + journey_engagement_time + " to second: " + this.timeToSecondSign(journey_engagement_time));
            console.log("Sum engagement time total period: " + sum_week_engagement_time + "\n");
        }

    }
    
    public async verifyData(startDayTimeline : string, startDayJourney : string, startHourJourney : string, statistic_total_distance : string, statistic_driving_time : string, statistic_stopped_time : string, statistic_engagement_time : string, statistic_number_trips : string, numberJourney : string, journey_duration : string, journey_distance : number, journey_stopped_time : string, journey_engagement_time : string){
        
            /*verify data */
            // Allow 1% error data
            console.log("       ------------");
            console.log('COMPARE duration, distance, times, trips of STATISTIC, ACTIVITY, JOURNEY');
            if(startDayJourney.substring(9,19) == startDayTimeline.split(" ")[0]) {
                console.log("Passed:  start day in timeline: " + startDayJourney.substring(9,19));
            }
            else {
                console.log("\nFail start day" );
                console.log("Start day in timeline: " + startDayTimeline.split(" ")[0]);
                console.log("Start day in journey: " + startDayJourney.substring(9,19));
            }
            
            if(startHourJourney == startDayTimeline.split(" ")[1]) {
                console.log("Passed:  start hour in timeline: " + startHourJourney);
            }
            else {
                console.log("\nFail start hour" );
                console.log("Start hour in timeline:" + startDayTimeline.split(" ")[1]);
                console.log("Start hour in journey: " + startHourJourney);
            }

            if( journey_distance * 1.01 >= parseFloat(statistic_total_distance) &&  journey_distance * 0.99 <= parseFloat(statistic_total_distance) ) {
                console.log("Passed: TOTAL DISTANCE. Statistic total distance and Journey distance are " + statistic_total_distance + " and " + journey_distance);
            }
            else {
                console.log("\nFail total distance ( Allow 1% error data )" );
                console.log("Statistic total distance: " + statistic_total_distance);
                console.log("Journey distance: " + journey_distance, "| *1.01= " + journey_distance * 1.01 +"| *0.99= " + journey_distance * 0.99 + "\n");
                
            }
            if ( this.changeTimeJourneys(journey_duration) * 1.01 >= this.changeTimeStatistics(statistic_driving_time) && this.changeTimeJourneys(journey_duration) * 0.99 <= this.changeTimeStatistics(statistic_driving_time) ) {
                console.log("Passed: DRIVING TIME. Statistic driving time and Journey duration are " + statistic_driving_time + " and " + journey_duration);
            }
            else {
                console.log("\nFail driving time ( Allow 1% error data )" );
                console.log("Statistic driving time: " + statistic_driving_time);
                console.log("Journey duration: " + journey_duration, "| *1.01= " + parseFloat( journey_duration ) * 1.01 +"| *0.99= " + parseFloat( journey_duration ) * 0.99 + "\n");
            }
            if ( this.changeTimeJourneys(journey_stopped_time) * 1.01 >= this.changeTimeStatistics(statistic_stopped_time) && this.changeTimeJourneys(journey_stopped_time) * 0.99 <= this.changeTimeStatistics(statistic_stopped_time)) {
                console.log("Passed: STOPPED TIME. " + "Statistic stopped time and Journey stopped time: " + statistic_stopped_time + " and " + journey_stopped_time );
            }
            else {
                console.log("\nFail stopped time ( Allow 1% error data )" );
                console.log("Statistic stopped time: " + statistic_stopped_time);
                console.log("Journey stopped time: " + journey_stopped_time, "| *1.01= " + parseFloat( journey_stopped_time ) * 1.01 +"| *0.99= " + parseFloat( journey_stopped_time ) * 0.99 + "\n");
            }
            if ( this.changeTimeJourneys(journey_engagement_time) * 1.01 >= this.changeTimeStatistics(statistic_engagement_time) && this.changeTimeJourneys(journey_engagement_time) * 0.99 <= this.changeTimeStatistics(statistic_engagement_time)) {
                console.log("Passed: ENGAGEMENT TIME. " +  "Statistic engagement time and Journey engagement time: " + statistic_engagement_time + " and " + journey_engagement_time);
            }
            else {
                console.log("\nFail engagement time ( Allow 1% error data )" );
                console.log("Statistic engagement time: " + statistic_engagement_time);
                console.log("Journey engagement time: " + journey_engagement_time, "| *1.01= " + parseFloat( journey_engagement_time ) * 1.01 +"| *0.99= " + parseFloat( journey_engagement_time ) * 0.99 + "\n");
            }

            if (statistic_number_trips == numberJourney) {
                console.log("Passed: TOTAL TRIPS. Number of trip in statistic and Activity: " + numberJourney);
            }
            else {
                console.log("\nFail number of trips" );
                console.log("Statistic number trips: " + statistic_number_trips);
                console.log("Journey number of trips: " + numberJourney + "\n");
            }
    }

    public async verifyDataInStatisticAndJourneyPage(page : Page, typeCheck : string){
        
        let startDayTimeline : string = '';
        let startDayJourney : string = '';
        let startHourJourney : string = '';
        let statisticPage = new StatisticPage(page);
        let activityPage = new ActivityPage(page);
        let historyOnMapPage = new HistoryOnMapPage(page);
        await historyOnMapPage.getElements()
        
        let statistic_total_distance = ""
        let statistic_driving_time = ""
        let statistic_stopped_time = ""
        let statistic_engagement_time = ""
        let statistic_number_trips = ""
        let numberJourney = ''
        if(typeCheck == "history") {
            await historyOnMapPage.tabs_statistic.click();
            statistic_total_distance = await statisticPage.total_distance.innerText();
            statistic_driving_time = await statisticPage.driving_time.innerText();
            statistic_stopped_time = await statisticPage.stopped_time.innerText();
            statistic_engagement_time = await statisticPage.engagement_time.innerText();
            statistic_number_trips = await statisticPage.number_trips.innerText();

            await historyOnMapPage.tabs_activity.click();
            let lastJourneyOnActivityTab = await activityPage.last_journey.innerText();
            if(lastJourneyOnActivityTab != ''){
                numberJourney = lastJourneyOnActivityTab.split(" ")[1];
            }
            await historyOnMapPage.tabs_journeys.click();

            startDayTimeline = await this.getDataInTimelineJourney(page)
        }

        let journeyPage = new JourneyTabPage(page);
        await journeyPage.getElements();
        // get data in line total period
        let journey_duration = await journeyPage.finalTotalRow.duration.innerText();
        let journey_distance = parseFloat( await journeyPage.finalTotalRow.distance.innerText() );
        let journey_stopped_time = await journeyPage.finalTotalRow.stopped_time.innerText();
        let journey_engagement_time = await journeyPage.finalTotalRow.engagement_time.innerText();

        let sum_week_duration:number = 0
        let sum_week_distance:number = 0
        let sum_week_stopped_time:number = 0
        let sum_week_engagement_time:number = 0

        console.log("Total weeks in report: "+journeyPage.weeks.length)
        for (let i = 0; i<journeyPage.weeks.length; i++){
            // get data in line week total
            let week_duration : string = await journeyPage.weeks[i].week_total_row.duration.innerText();
            let week_distance : number = parseFloat(await journeyPage.weeks[i].week_total_row.distance.innerText());
            let week_stopped_time : string = await journeyPage.weeks[i].week_total_row.stopped_time.innerText();
            let week_engagement_time : string = await journeyPage.weeks[i].week_total_row.engagement_time.innerText();

            sum_week_duration += this.timeToSecondSign( week_duration )
            sum_week_distance += week_distance
            sum_week_stopped_time += this.timeToSecondSign( week_stopped_time )
            sum_week_engagement_time += this.timeToSecondSign( week_engagement_time )

            let n = journeyPage.weeks[i].week_days.length;

            let sum_day_duration:number = 0
            let sum_day_distance:number = 0
            let sum_day_stopped_time:number = 0
            let sum_day_engagement_time:number = 0
        
            console.log("       ------------");
            console.log("       days of the week is: " + n);
            for (let j = 0; j<n; j++){
                // get data in day
                let weekday = journeyPage.weeks[i].week_days[j];
                let duration = await weekday.duration.innerText();
                let distance = await weekday.distance.innerText();
                let stopped_time = await weekday.stopped_time.innerText();
                let engagement_time = await weekday.engagement_time.innerText();

                sum_day_duration += this.timeToSecondSign(duration)
                sum_day_distance += parseFloat(distance)
                sum_day_stopped_time += this.timeToSecondSign(stopped_time)
                sum_day_engagement_time += this.timeToSecondSign(engagement_time)
                
                // get first day data in report
                if(i == 0 && j == 0) {
                    startDayJourney = await weekday.day.innerText();
                    startHourJourney = await weekday.hour.innerText();
                }
            }

            // compare total week data with total weekday data
            this.compareWeekWithWeekday(i, sum_day_duration, sum_day_distance, sum_day_stopped_time, sum_day_engagement_time, week_duration, week_distance, week_stopped_time, week_engagement_time)
        }
        // compare total week data with final row
        this.compareWeekWithFinal(journey_duration, journey_distance, journey_stopped_time, journey_engagement_time, sum_week_duration, sum_week_distance, sum_week_stopped_time, sum_week_engagement_time)

        // verify data timeline, total_distance, driving_time, stopped_time, engagement_time, number_trips
        if(typeCheck == "history") {
            this.verifyData(startDayTimeline, startDayJourney, startHourJourney, statistic_total_distance, statistic_driving_time, statistic_stopped_time, statistic_engagement_time, statistic_number_trips, numberJourney, journey_duration, journey_distance, journey_stopped_time, journey_engagement_time)
        }
    }
}