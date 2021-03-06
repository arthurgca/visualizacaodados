'use strict';

var graphContainer = d3.select('.d3--line');
var svg = d3.select('svg');
var margin = { top: 50, right: 50, bottom: 50, left: 50 };
var duration = 500;
var width = undefined,
    height = undefined,
    innerWidth = undefined,
    innerHeight = undefined;
var xScale = undefined,
    yScale = undefined;
var achaQueFoiAleatorio;
var achaQueEhAleatorio;

d3.csv("../data/datalab3.csv", function(data) {
       achaQueFoiAleatorio = data.map(function(d) { return  +d["achaQueFoiAleatorio"]; });
       achaQueEhAleatorio = data.map(function(d) { return  +d["achaQueEhAleatorio"]; });
       graph(data);
     });


function graph(data) {
var DATA1 = countAchamQueForamAleatorio();
var DATA2 = countAchamQueSaoAleatorio();
var LABELS = ['0','1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

(function init() {
  getDimentions();
  getScaleDomains();
  getScaleRanges();
  renderGraph(DATA1, DATA2);
})();

d3.select(window).on('resize', resize);

function resize() {
  destroyGraph();
  getDimentions();
  getScaleRanges();
  renderGraph(DATA1, DATA2);
}

function renderGraph(DATA1, DATA2) {
  if (!DATA1.length || !LABELS.length) {
    return false;
  }

  var line = d3.line().x(function (d, i) {
    return xScale(LABELS[i]);
  }).y(function (d) {
    return yScale(d);
  }).curve(d3.curveCatmullRom.alpha(0.5));

  var area = d3.area().x(function (d, i) {
    return xScale(LABELS[i]);
  }).y0(innerHeight).y1(function (d) {
    return yScale(d);
  }).curve(d3.curveCatmullRom.alpha(0.5));

  var xAxis = d3.axisBottom(xScale).tickFormat(function (d, i) {
    return LABELS[i];
  });

  var yAxis = d3.axisLeft(yScale).ticks(4);

  svg.attr('width', width).attr('height', height);

  var inner = svg.selectAll('g.inner').data([null]);
  inner.exit().remove();
  inner.enter().append('g').attr('class', 'inner').attr('transform', 'translate(' + margin.top + ', ' + margin.right + ')');

  var horizontalLineGroup = svg.selectAll('g.inner').selectAll('.line-group').data([null]);
  horizontalLineGroup.exit().remove();
  horizontalLineGroup.enter().append('g').attr('class', 'line-group');

  var horizontalLine = svg.selectAll('g.line-group').selectAll('.grid-line').data(yScale.ticks(4));
  horizontalLine.exit().remove();
  horizontalLine.enter().append('line').attr('class', 'grid-line').attr('x1', 0).attr('x2', innerWidth).attr('y1', function (d) {
    return yScale(d);
  }).attr('y2', function (d) {
    return yScale(d);
  });

  var xa = svg.selectAll('g.inner').selectAll('g.x.axis').data([null]);
  xa.exit().remove();
  xa.enter().append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + innerHeight + ')').call(xAxis);

  var ya = svg.selectAll('g.inner').selectAll('g.y.axis').data([null]);
  ya.exit().remove();
  ya.enter().append('g').attr('class', 'y axis').call(yAxis);

  var pathLine2 = svg.selectAll('g.inner').selectAll('.path-line2').data([null]);
  pathLine2.exit().remove();
  pathLine2.enter().append('path').attr('class', 'path-line path-line2').attr('d', function () {
    return line(createZeroDataArray(DATA2));
  }).transition().duration(duration).ease(d3.easePoly.exponent(2)).attr('d', function () {
    return line(DATA2);
  });

  var pathArea2 = svg.selectAll('g.inner').selectAll('.path-area2').data([null]);
  pathArea2.exit().remove();
  pathArea2.enter().append('path').attr('class', 'path-area path-area2').attr('d', function () {
    return area(createZeroDataArray(DATA2));
  }).transition().duration(duration).ease(d3.easePoly.exponent(2)).attr('d', area(DATA2));

  var pathLine1 = svg.selectAll('g.inner').selectAll('.path-line1').data([null]);
  pathLine1.exit().remove();
  pathLine1.enter().append('path').attr('class', 'path-line path-line1').attr('d', function () {
    return line(createZeroDataArray(DATA1));
  }).transition().duration(duration).ease(d3.easePoly.exponent(2)).attr('d', line(DATA1));

  var pathArea1 = svg.selectAll('g.inner').selectAll('.path-area1').data([null]);
  pathArea1.exit().remove();
  pathArea1.enter().append('path').attr('class', 'path-area path-area1').attr('d', function () {
    return area(createZeroDataArray(DATA1));
  }).transition().duration(duration).ease(d3.easePoly.exponent(2)).attr('d', area(DATA1));
}

function destroyGraph() {
  svg.selectAll('*').remove();
}

function getDimentions() {
  width = graphContainer.node().clientWidth;
  height = 500;
  innerWidth = width - margin.left - margin.right;
  innerHeight = height - margin.top - margin.bottom;
}

function getScaleRanges() {
  xScale.range([0, innerWidth]).paddingInner(1);
  yScale.range([innerHeight, 0]).nice();
}

function getScaleDomains() {
  xScale = d3.scaleBand().domain(LABELS);
  yScale = d3.scaleLinear().domain([0, d3.max([d3.max(DATA1), d3.max(DATA2)])]);
}

function createZeroDataArray(arr) {
  var newArr = [];
  arr.forEach(function (item, index) {
    return newArr[index] = 0;
  });
  return newArr;
}

function countAchamQueForamAleatorio() {
  var values = [0,0,0,0,0,0,0,0,0,0,0];
  for (var i = 0; i <= achaQueFoiAleatorio.length; i++)
      values[achaQueFoiAleatorio[i]]++;

  return values;
}

function countAchamQueSaoAleatorio() {
  var values = [0,0,0,0,0,0,0,0,0,0,0];
  for (var i = 0; i <= achaQueEhAleatorio.length; i++)
        values[achaQueEhAleatorio[i]]++;
  return values;
}
};
