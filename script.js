/* global d3 */

// Our canvas
const width = 750,
height = 300,
margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
.append('svg')
.attr('width', width)
.attr('height', height)
.style('background','lightgrey')
.style('padding', '30px')
.style('fill', 'teal')

// Data reloading
let reload = () => {
  let data = []
  d3.tsv("afcw-results.tsv", function(rows) {
    rows.forEach(function(goal){
      data.push(goal.GoalsScored)
    })
    redraw(data)
  });
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

  const yScale = d3.scaleLinear()
  .domain([d3.max(data),0])
  .range([0,height])

  const xScale = d3.scaleLinear()
  .domain([0,data.length])
  .range([0,width])

  const yAxis = d3.axisLeft(yScale)

  const xAxis = d3.axisBottom(xScale).ticks(data.length)

  // let m = height / 4
  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (d, i) => {
    return xScale(i)
  })
  .attr('y', (d) => {
    return height
  })
  .attr('width', (i) => {
    return width/data.length - 2
  })
  .attr('height', 0)
  .transition()
  .duration(500)
  .delay(function (d, i) {
    return i * 50;
  })
  .attr('y', (d) => {
    return yScale(d)
  })
  .attr('height', (d)  => {
    return height - yScale(d)
  })




  svg.append('g')
  .attr('transform','rotate(0)')
  .call(yAxis)

  svg.append('g')
  .attr('transform',`translate(0,${height})`)
  .call(xAxis)
}

reload()
