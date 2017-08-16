var app = angular.module("Importance", ['dndLists'])

app.controller("SimpleDemoController", function ($scope) {

    $scope.models = {
        importance: [
            {
                label: "High",
                value: 1
            },

            {
                label: "Medium - High",
                value: 0.7
            },
            {
                label: "Medium - Low",
                value: 0.4
            },
            {
                label: "Low",
                value: 0.1
            }
        ],
        attributes: [
            { label: "Deadline"},
            { label: "Scope"},
            { label: "Quality"},
            { label: "Cost" }
        ],
        data: [[
            { axis: "Deadline", value: 1 },
            { axis: "Scope", value: 0.7 },
            { axis: "Quality", value: 0.4 },
            { axis: "Cost", value: 0.1 }
        ]]
    };

     var data = [
        [
            { axis: "Team", value: 10 },
            { axis: "Scope", value: 7 },
            { axis: "Quality", value: 4 },
            { axis: "Cost", value: 1 }
        ]
    ];
    
    
    

    $scope.onMoved = function (models, index) {

        models.attributes.splice(index, 1)
        var count = 0;
        models.attributes.forEach(function (element) {
            console.log(element.label + " " + models.importance[count].value + " " + models.data[0][count].axis);
            for( i=0; i< models.data[0].length; i++){
                if(models.data[0][i].axis === element.label){
                     models.data[0][i].value = models.importance[count].value;
                }
            }
            console.log( models.data[0][count].axis + "  "+ models.data[0][count].value );
           
                count++;
        }, this);


        RadarChart(".radarChart", $scope.models.data, radarChartOptions);
        console.log(index);

    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function (model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);

    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        width = 300,//Math.min(300, window.innerWidth - 10) - margin.left - margin.right,
        height = 300; //Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

    var radarChartOptions = {
        w: 270,
        h: 270,
        margin: margin,
        maxValue: 1,
        levels: 4,
        roundStrokes: true,
        color: color
    };
    ////////////////////////////////////////////////////////////// 
    //////////////////// Draw the Chart ////////////////////////// 
    ////////////////////////////////////////////////////////////// 
    var color = d3.scale.ordinal()
        .range(["#EDC951", "#CC333F", "#FF0000"]) // "#00A0B0"]);


    RadarChart(".radarChart", $scope.models.data, radarChartOptions);

});