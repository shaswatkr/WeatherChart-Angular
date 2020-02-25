import { Component } from "@angular/core";
import { Chart } from "chart.js";

import { WeatherService } from "./weather.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    city = {};
    chart = [];

    constructor(private _weather: WeatherService) {}

    ngOnInit() {
        this._weather.dailyForecast().subscribe(res => {
            this.city = res["city"];

            let tempMin = res["list"].map(res => res.temp.min);
            let tempMax = res["list"].map(res => res.temp.max);
            let allDates = res["list"].map(res => res.dt);

            let weatherDates = [];
            allDates.forEach(res => {
                let jsDates = new Date(res * 10000);
                weatherDates.push(
                    jsDates.toLocaleDateString("en", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    })
                );
            });

            this.chart = new Chart("canvas", {
                type: "line",
                data: {
                    labels: weatherDates,
                    datasets: [
                        {
                            label: "Max Temp",
                            data: tempMax,
                            borderColor: "#ff5a47",
                            fill: false
                        },
                        {
                            label: "Min Temp",
                            data: tempMin,
                            borderColor: "#04a9ff",
                            fill: false
                        }
                    ]
                },
                options: {
                    legend: { display: true },
                    scales: {
                        xAxes: [{ display: true }],
                        yAxes: [{ display: true }]
                    }
                }
            });
        });
    }
}
