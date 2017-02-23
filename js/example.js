
d3.json('data/data.json', function(err, data) {
var chart = radialBarChart()
  .barHeight(250)
  .domain([0,7])
  .tickCircleValues([0,1,2,3,4,5,6])
  .capitalizeLabels(true)

d3.select('#chart')
  .datum(data)
  .call(chart);
});
