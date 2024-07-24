const FileHandler = require('./fileHandler');
const State = require('./state');

let myFileHandler = new FileHandler();
let dataString = myFileHandler.readFile(__dirname + '/../TXT/data.txt');
let dataArray = dataString.split('\n');
let statesArray = [];

let index = 0;
while (index < dataArray.length) {
  if (dataArray[index].charAt(0) === '/') {
    dataArray.splice(index, 1);
  } else {
    let currentValues = dataArray[index].split(', ');
    statesArray.push(
      new State(currentValues[0], currentValues[1], currentValues[2])
    );
    index++;
  }
}

let outline = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="device-width, initial-scale=1" />
        <title>State Populations And GDPs</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
        <style>
            .side-by-side {
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }
            .side-by-side > * {
            flex: 1;
            }
        </style>
    </head>
    <body>
        <div class="side-by-side">
            <div>
                <h2>Population And GDP Chart</h2>
                <canvas id="firstChart" style="width:100%;max-width:700px"></canvas>
            </div>
            <div>
                <h2>Population And GDP Chart (Excluding Largest States)</h2>
                <canvas id="thirdChart" style="width:100%;max-width:700px"></canvas>
            </div>
        </div>
        <div class="side-by-side">
            <div>
                <h2>Population And GDP Over Population Chart</h2>
                <canvas id="secondChart" style="width:100%;max-width:700px"></canvas>
            </div>
            <div>
                <h2>Population And GDP Over Population Chart (Excluding Largest States)</h2>
                <canvas id="fourthChart" style="width:100%;max-width:700px"></canvas>
            </div>
        </div>
        <script>
            const xyValues = [${statesArray.map(
              (state) =>
                `\n\t\t\t\t{x:${state.getPopulation()}, y:${state.getGDP()}}`
            )}
            ];
            new Chart("firstChart", {
                type: "scatter",
                data: {
                    datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgb(0,0,255)",
                        data: xyValues
                    }]
                },
                options: {
                    legend: {display:false},
                    scales: {
                        xAxes: [{ticks: {min: 580000, max: 39000000}}],
                        yAxes: [{ticks: {min: 1500, max: 173000}}],
                    }
                }
            });
            new Chart("thirdChart", {
                type: "scatter",
                data: {
                    datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgb(0,0,255)",
                        data: xyValues
                    }]
                },
                options: {
                    legend: {display:false},
                    scales: {
                        xAxes: [{ticks: {min: 580000, max: 13000000}}],
                        yAxes: [{ticks: {min: 1500, max: 49000}}],
                    }
                }
            });
            <!--  -->
            const xModifiedyValues = [${statesArray.map(
              (state) =>
                `\n\t\t\t\t{x:${state.getPopulation()}, y:${state.getGdpOverPopulation()}}`
            )}
            ];
            new Chart("secondChart", {
                type: "scatter",
                data: {
                    datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgb(0,0,255)",
                        data: xModifiedyValues
                    }]
                },
                options: {
                    legend: {display:false},
                    scales: {
                        xAxes: [{ticks: {min: 580000, max: 39000000}}],
                        yAxes: [{ticks: {min: 0.00250, max: 0.00550}}],
                    }
                }
            });
            new Chart("fourthChart", {
                type: "scatter",
                data: {
                    datasets: [{
                        pointRadius: 4,
                        pointBackgroundColor: "rgb(0,0,255)",
                        data: xModifiedyValues
                    }]
                },
                options: {
                    legend: {display:false},
                    scales: {
                        xAxes: [{ticks: {min: 580000, max: 13000000}}],
                        yAxes: [{ticks: {min: 0.00250, max: 0.00550}}],
                    }
                }
            });
        </script>
    </body>
</html>
`;

myFileHandler.writeFile(__dirname + '/../HTML/index.html', outline);
