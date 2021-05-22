$("#namegroup").on("submit", function() {

    var name = document.getElementById("email").value;
    console.log(name);

    var pin = Math.floor(Math.random() * 10000);
    var pinStr = pin.toString();
    console.log(pinStr.length);
    if (pinStr.length < 4) {
        for (i = 0; i <= 4 - pinStr.length; i++) {
            pinStr += "0";
        }
    }
    firebase.database().ref('data-group/' + pinStr).set({
        "enfj": {
            "number": 0,
            "type": "enfj"
        },
        "enfp": {
            "number": 0,
            "type": "enfp"
        },
        "entj": {
            "number": 0,
            "type": "entj"
        },
        "entp": {
            "number": 0,
            "type": "entp"
        },
        "esfj": {
            "number": 0,
            "type": "esfj"
        },
        "esfp": {
            "number": 0,
            "type": "esfp"
        },
        "estj": {
            "number": 0,
            "type": "estj"
        },
        "estp": {
            "number": 0,
            "type": "estp"
        },
        "groupname": {
            "name": name,
            "pin": pinStr
        },
        "infj": {
            "number": 0,
            "type": "infj"
        },
        "infp": {
            "number": 0,
            "type": "infp"
        },
        "intj": {
            "number": 0,
            "type": "intj"
        },
        "intp": {
            "number": 0,
            "type": "intp"
        },
        "isfj": {
            "number": 0,
            "type": "isfj"
        },
        "isfp": {
            "number": 0,
            "type": "isfp"
        },
        "istj": {
            "number": 0,
            "type": "istj"
        },
        "istp": {
            "number": 0,
            "type": "istp"
        }
    }).then(window.location = "statistics.html");

    return false;

});

var database = firebase.database().ref().child('data-group');
database.once('value', function(snapshot) {
    if (snapshot.exists()) {
        var content = '';

        snapshot.forEach(function(data) {
            var val = data.val();
            // content += '<tr>';
            content += `
            <div class="col-md-3 text-center">
                <div class="staff-entry">
                    <div class="desc">
                        <a href="#" type="button" onclick="Clickgroup(` + val.groupname.pin + `)" id="getval" value=""><h3>` + val.groupname.name + `</h3>
                <span>` + val.groupname.pin + `</span >
                        </a >
                    </div >
                </div ></div > `;
            // content += '</tr>';
        });

        document.getElementById("group-graph").innerHTML = content;
    }
});

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

function Clickgroup(pin) {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // create chart
    var chartGroup = am4core.create("chartdiv-group", am4charts.TreeMap);
    chartGroup.hiddenState.properties.opacity = 0; // this makes initial fade in effect

    $gTotal = 0;
    $gINTJ = 0;
    $gINTP = 0;
    $gENTJ = 0;
    $gENTP = 0;

    $gINFJ = 0;
    $gINFP = 0;
    $gENFJ = 0;
    $gENFP = 0;

    $gISTJ = 0;
    $gISFJ = 0;
    $gESTJ = 0;
    $gESFJ = 0;

    $gISTP = 0;
    $gISFP = 0;
    $gESTP = 0;
    $gESFP = 0;

    namegroup = "";

    var datagroup = firebase.database().ref("data-group/" + pin);
    datagroup.on('child_added', function(childSnapshot) {
        dataJson = childSnapshot.val();
        if (dataJson.type != null) {
            if (dataJson.type == "intj") $gINTJ = dataJson.number;
            else if (dataJson.type == "intp") $gINTP = dataJson.number;
            else if (dataJson.type == "entj") $gENTJ = dataJson.number;
            else if (dataJson.type == "entp") $gENTP = dataJson.number;

            else if (dataJson.type == "infj") $gINFJ = dataJson.number;
            else if (dataJson.type == "infp") $gINFP = dataJson.number;
            else if (dataJson.type == "enfj") $gENFJ = dataJson.number;
            else if (dataJson.type == "enfp") $gENFP = dataJson.number;

            else if (dataJson.type == "istj") $gISTJ = dataJson.number;
            else if (dataJson.type == "isfj") $gISFJ = dataJson.number;
            else if (dataJson.type == "estj") $gESTJ = dataJson.number;
            else if (dataJson.type == "esfj") $gESFJ = dataJson.number;

            else if (dataJson.type == "istp") $gISTP = dataJson.number;
            else if (dataJson.type == "isfp") $gISFP = dataJson.number;
            else if (dataJson.type == "estp") $gESTP = dataJson.number;
            else if (dataJson.type == "esfp") $gESFP = dataJson.number;

            $gTotal += dataJson.number;
        } else if (dataJson.name != null) {
            namegroup = dataJson.name;
            document.getElementById("someText1").innerHTML = dataJson.name;
            console.log(namegroup);
        }

        chartGroup.data = [{
            name: "Architect",
            children: [{
                name: "INTJ",
                value: (100 * $gINTJ / $gTotal)
            }]
        }, {
            name: "Logician",
            children: [{
                name: "INTP",
                value: (100 * $gINTP / $gTotal)
            }]
        }, {
            name: "Commander",
            children: [{
                name: "ENTJ",
                value: (100 * $gENTJ / $gTotal)
            }]
        }, {
            name: "Debater",
            children: [{
                name: "ENTP",
                value: (100 * $gENTP / $gTotal)
            }]
        }, {
            name: "Advocate",
            children: [{
                name: "INFJ",
                value: (100 * $gINFJ / $gTotal)
            }]
        }, {
            name: "Mediator",
            children: [{
                name: "INFP",
                value: (100 * $gINFP / $gTotal)
            }]
        }, {
            name: "Protagonist",
            children: [{
                name: "ENFJ",
                value: (100 * $gENFJ / $gTotal)
            }]
        }, {
            name: "Campaigner",
            children: [{
                name: "ENFP",
                value: (100 * $gENFP / $gTotal)
            }]
        }, {
            name: "Logistician",
            children: [{
                name: "ISTJ",
                value: (100 * $gISTJ / $gTotal)
            }]
        }, {
            name: "Defender",
            children: [{
                name: "ISFJ",
                value: (100 * $gISFJ / $gTotal)
            }]
        }, {
            name: "Executive",
            children: [{
                name: "ESTJ",
                value: (100 * $gESTJ / $gTotal)
            }]
        }, {
            name: "Consul",
            children: [{
                name: "ESFJ",
                value: (100 * $gESFJ / $gTotal)
            }]
        }, {
            name: "Virtuoso",
            children: [{
                name: "ISTP",
                value: (100 * $gISTP / $gTotal)
            }]
        }, {
            name: "Adventurer",
            children: [{
                name: "ISFP",
                value: (100 * $gISFP / $gTotal)
            }]
        }, {
            name: "Entrepreneur",
            children: [{
                name: "ESTP",
                value: (100 * $gESTP / $gTotal)
            }]
        }, {
            name: "Entertainer",
            children: [{
                name: "ESFP",
                value: (100 * $gESFP / $gTotal)
            }]
        }];
        console.log(chartGroup.data);
    });

    chartGroup.colors.step = 2;

    // define data fields
    chartGroup.dataFields.value = "value";
    chartGroup.dataFields.name = "name";
    chartGroup.dataFields.children = "children";

    chartGroup.zoomable = false;
    var bgColor = new am4core.InterfaceColorSet().getFor("background");

    // level 0 series template
    var level0SeriesTemplate = chartGroup.seriesTemplates.create("0");
    var level0ColumnTemplate = level0SeriesTemplate.columns.template;

    level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
    level0ColumnTemplate.fillOpacity = 0;
    level0ColumnTemplate.strokeWidth = 4;
    level0ColumnTemplate.strokeOpacity = 0;

    // level 1 series template
    var level1SeriesTemplate = chartGroup.seriesTemplates.create("1");
    var level1ColumnTemplate = level1SeriesTemplate.columns.template;

    level1SeriesTemplate.tooltip.animationDuration = 0;
    level1SeriesTemplate.strokeOpacity = 1;

    level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10)
    level1ColumnTemplate.fillOpacity = 1;
    level1ColumnTemplate.strokeWidth = 4;
    level1ColumnTemplate.stroke = bgColor;

    var bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
    bullet1.locationY = 0.5;
    bullet1.locationX = 0.5;
    bullet1.label.text = "{name}";
    bullet1.label.fill = am4core.color("#ffffff");

    chart.maxLevels = 20;

    document.getElementById('id01').style.display = 'block';
    document.getElementById("someText2").innerHTML = pin;
    console.log(pin);
}