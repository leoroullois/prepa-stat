import React from "react";
const d3 = require("d3");
interface IProps {
	myFunc: (x: number) => number;
	myInterval: number[];
	name: string;
	legend: string;
}
interface IState {}
export class MathFunction extends React.Component<IProps, IState> {
	componentDidMount() {
		const props = this.props;
		this.drawChart(props.myFunc, props.myInterval, props.name, props.legend);
	}
	drawChart(
		myFunc: (x: number) => number,
		interval: number[],
		name: string,
		legend: string
	) {
		let data: number[][] = [];
		for (let i = d3.min(interval); i <= d3.max(interval); i += 0.1) {
			data.push([i, myFunc(i)]);
		}
		const w = 1000;
		const h = 600;
		const p = 60;
		/**Graphique */
		const svg = d3
			.select("#" + name)
			.append("svg")
			.attr("class", "line-chart")
			.attr("width", w)
			.attr("height", h)
			.style("background-color", "white")
			.style("margin-bottom", "30px")
			.style("box-shadow", "rgba(0, 0, 0, 0.24) 0px 3px 8px");
		/**Tooltip */
		const tooltip = d3
			.select("#stats")
			.append("div")
			.attr("class", "tooltip")
			.html("Fonction" + name)
			.style("opacity", 0)
			.style("position", "absolute")
			.style("padding", "20px")
			.style("color", "white")
			.style("border-radius", "6px")
			.style("box-shadow", "rgba(0, 0, 0, 0.24) 0px 3px 8px");
		/**x-legend */
		svg
			.append("text")
			.attr("id", "x-legend")
			.text(legend)
			.attr("x", 45)
			.attr("y", 40);
		/**y-legend */
		svg
			.append("text")
			.attr("id", "y-legend")
			.text("x")
			.attr("x", w - p + 20)
			.attr("y", h - p + 5);
		/**Title */
		svg
			.append("text")
			.attr("id", "title")
			.text("Fonction " + name)
			.attr("x", w / 2 - 80)
			.attr("y", p)
			.attr("font-size", "2rem");
		/**Parsing data */
		const X = data.map((elt) => elt[0]);
		const Y = data.map((elt) => elt[1]);
		const I = d3.range(X.length);
		const xMax = d3.max(X);
		const xMin = d3.min(X);
		const yMax = d3.max(Y);
		const yMin = d3.min(Y);

		const xScale = d3
			.scaleLinear()
			.domain([xMin, xMax])
			.range([p, w - p]);
		const yScale = d3
			.scaleLinear()
			.domain([yMin, yMax])
			.range([h - p, p]);
		const line = d3
			.line()
			.defined((i: number) => data[i])
			.curve(d3.curveLinear)
			.x((i: number) => xScale(X[i]))
			.y((i: number) => yScale(Y[i]));

		/**Creating the graphic */
		svg
			.append("path")
			.attr("class", "line")
			.attr("fill", "none")
			.attr("stroke", "red")
			.attr("stroke-width", 2)
			.attr("stroke-opacity", 1)
			.attr("d", line(I))
			.on("mouseover", (e: any) => {
				tooltip
					.style("left", e.pageX + "px")
					.style("top", e.pageY - 28 + "px")
					.transition()
					.duration(100)
					.style("opacity", 0.8);
			})
			.on("mouseout", () => {
				tooltip.style("opacity", 0);
			});

		/**
		 * Axis
		 */
		const xAxis = d3.axisBottom(xScale);
		const yAxis = d3.axisLeft(yScale);
		svg
			.append("g")
			.attr("id", "x-axis")
			.attr("transform", `translate(0,${h - p})`)
			.call(xAxis);
		svg
			.append("g")
			.attr("id", "y-axis")
			.attr("transform", `translate(${p},0)`)
			.call(yAxis);
	}
	render() {
		return <div id={this.props.name}></div>;
	}
}
