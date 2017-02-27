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

// Data reloading
let reload = () => {
  let data = []
  d3.tsv("afcw-results.tsv", function(rows) {
    rows.forEach(function(goal){
      data.push(goal.GoalsScored)
    })
    console.log(data);
    redraw(data)
  });
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

  let temp = data.map((item)=>{
    return parseInt(item)
  })

  let highest = Math.max(...temp)

  const yScale = d3.scaleLinear()
    .domain([0,highest])
    .range([0,height])

  const xScale = d3.scaleLinear()
    .domain([0,data.length])
    .range([0,width])

  // let m = height / 4
  svg.style('background', '#cacaca')
     .selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
     .attr('class', 'bar')
     .attr('x', (d, i) => {
       return xScale(i)
     })
     .attr('y', (d) => {
       return height - yScale(d)
     })
     .attr('width', (i) => {
      //  return xScale(i) - 2
      return width/data.length - 2
     })
     .attr('height', (d)  => {
       return yScale(d)
     })
}

reload()
