/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

//Add Statistics
var config = {
    apiKey: "AIzaSyCDTE8ReNzdsRLnosqtjlj6JhBP4euslFY",
    authDomain: "interactive-personality-test.firebaseapp.com",
    databaseURL: "https://interactive-personality-test.firebaseio.com",
    projectId: "interactive-personality-test",
    storageBucket: "interactive-personality-test.appspot.com"
};
firebase.initializeApp(config);
var dataStatistics = firebase.database().ref("data-statistics");

$Total = 0;
$INTJ = 0;
$INTP = 0;
$ENTJ = 0;
$ENTP = 0;

$INFJ = 0;
$INFP = 0;
$ENFJ = 0;
$ENFP = 0;

$ISTJ = 0;
$ISFJ = 0;
$ESTJ = 0;
$ESFJ = 0;

$ISTP = 0;
$ISFP = 0;
$ESTP = 0;
$ESFP = 0;

dataStatistics.on('child_added', function (childSnapshot) {
    dataJson = childSnapshot.val();
    
    if (dataJson.type == "intj") $INTJ = dataJson.number;
    else if (dataJson.type == "intp") $INTP = dataJson.number;
    else if (dataJson.type == "entj") $ENTJ = dataJson.number;
    else if (dataJson.type == "entp") $ENTP = dataJson.number;

    else if (dataJson.type == "infj") $INFJ = dataJson.number;
    else if (dataJson.type == "infp") $INFP = dataJson.number;
    else if (dataJson.type == "enfj") $ENFJ = dataJson.number;
    else if (dataJson.type == "enfp") $ENFP = dataJson.number;

    else if (dataJson.type == "istj") $ISTJ = dataJson.number;
    else if (dataJson.type == "isfj") $ISFJ = dataJson.number;
    else if (dataJson.type == "estj") $ESTJ = dataJson.number;
    else if (dataJson.type == "esfj") $ESFJ = dataJson.number;

    else if (dataJson.type == "istp") $ISTP = dataJson.number;
    else if (dataJson.type == "isfp") $ISFP = dataJson.number;
    else if (dataJson.type == "estp") $ESTP = dataJson.number;
    else if (dataJson.type == "esfp") $ESFP = dataJson.number;
    
    $Total += dataJson.number;

    chart.data = [{
        "country": "Architect",
        "visits": (100*$INTJ/$Total)
    }, {
        "country": "Logician",
        "visits": (100*$INTP/$Total)
    }, {
        "country": "Commander",
        "visits": (100*$ENTJ/$Total)
    }, {
        "country": "Debater",
        "visits": (100*$ENTP/$Total)
    }, {
        "country": "Advocate",
        "visits": (100*$INFJ/$Total)
    }, {
        "country": "Mediator",
        "visits": (100*$INFP/$Total)
    }, {
        "country": "Protagonist",
        "visits": (100*$ENFJ/$Total)
    }, {
        "country": "Campaigner",
        "visits": (100*$ENFP/$Total)
    }, {
        "country": "Logistician",
        "visits": (100*$ISTJ/$Total)
    }, {
        "country": "Defender",
        "visits": (100*$ISFJ/$Total)
    }, {
        "country": "Executive",
        "visits": (100*$ESTJ/$Total)
    }, {
        "country": "Consul",
        "visits": (100*$ESFJ/$Total)
    }, {
        "country": "Virtuoso",
        "visits": (100*$ISTP/$Total)
    }, {
        "country": "Adventurer",
        "visits": (100*$ISFP/$Total)
    }, {
        "country": "Entrepreneur",
        "visits": (100*$ESTP/$Total)
    }, {
        "country": "Entertainer",
        "visits": (100*$ESFP/$Total)
    }];
});

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.RadarChart);

chart.innerRadius = am4core.percent(40)

var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.minGridDistance = 60;
categoryAxis.renderer.inversed = true;
categoryAxis.renderer.labels.template.location = 0.5;
categoryAxis.renderer.grid.template.strokeOpacity = 0.08;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.min = 0;
valueAxis.max = 100;
// valueAxis.extraMax = 0.1;
valueAxis.renderer.grid.template.strokeOpacity = 0.08;

chart.seriesContainer.zIndex = -10;


var series = chart.series.push(new am4charts.RadarColumnSeries());
series.dataFields.categoryX = "country";
series.dataFields.valueY = "visits";
series.tooltipText = "{valueY.value}"
series.columns.template.strokeOpacity = 0;
series.columns.template.radarColumn.cornerRadius = 5;
series.columns.template.radarColumn.innerCornerRadius = 0;

chart.zoomOutButton.disabled = true;

// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
series.columns.template.adapter.add("fill", (fill, target) => {
    return chart.colors.getIndex(target.dataItem.index);
});

// setInterval(()=>{
//  am4core.array.each(chart.data, (item)=>{
//    item.visits *= Math.random() * 0.5 + 0.5;
//    item.visits += 10;
//  })
//  chart.invalidateRawData();
// }, 2000)

categoryAxis.sortBySeries = series;

chart.cursor = new am4charts.RadarCursor();
chart.cursor.behavior = "none";
chart.cursor.lineX.disabled = true;
chart.cursor.lineY.disabled = true;
