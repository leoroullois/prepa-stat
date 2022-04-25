import { Box, Heading, ListItem, UnorderedList } from "@chakra-ui/react";
import { selectFavorites } from "@store/selectors";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import * as d3 from "d3";
import scss from "@scss/dashboardinfo.module.scss";
enum IConcours {
   XENS = "X-ENS",
   CENTRALE = "Centrale",
   MINES = "Mines",
   CCINP = "CCINP",
   E3A = "E3A",
}
interface IData {
   concours: IConcours;
   nbEcoles: number;
}
const DashboardInfos = () => {
   const favorites = useSelector(selectFavorites);
   const data = useMemo<IData[]>(
      () => [
         {
            concours: IConcours.XENS,
            nbEcoles: 10,
         },
         {
            concours: IConcours.CENTRALE,
            nbEcoles: 5,
         },
         {
            concours: IConcours.MINES,
            nbEcoles: 8,
         },
         {
            concours: IConcours.CCINP,
            nbEcoles: 10,
         },
         {
            concours: IConcours.E3A,
            nbEcoles: 3,
         },
      ],
      []
   );
   const drawChart = useCallback(() => {
      const h = 300;
      const w = 400;
      const padding = 30;
      const barWidth = 30;
      const offset = 11;
      const chart = d3.select("#chart");
      const element = document.getElementById("chart") as HTMLDivElement;
      if (!element.hasChildNodes()) {
         const container = chart.append("div").attr("class", scss.container);

         const title = container
            .append("h1")
            .attr("class", scss["title"])
            .text("Répartition de vos écoles favorites par concours.");

         const svg = container.append("svg").attr("height", h).attr("width", w);

         const tooltip = container
            .append("div")
            .attr("class", scss["tooltip"])
            .text("Tooltip")
            .style("opacity", 0);

         const dataset: IData[] = data;

         const x: string[] = [
            IConcours.XENS,
            IConcours.CENTRALE,
            IConcours.MINES,
            IConcours.CCINP,
            IConcours.E3A,
         ];

         const xScale = d3
            .scaleBand()
            .domain(["X-ENS", "Centrale", "Mines", "CCINP", "E3A"])
            .range([padding, w - padding]);

         const yMax = d3.max(dataset, (d: IData) => d.nbEcoles) as number;
         const yScale = d3
            .scaleLinear()
            .domain([0, yMax])
            .range([h - padding, padding]);

         const xAxis = d3
            .axisBottom(xScale)
            .scale(xScale)
            .ticks(x.length)
            .tickValues(xScale.domain());
         const yAxis = d3.axisLeft(yScale);

         // ? bars du graphe
         svg.selectAll(scss["bar"])
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", scss["bar"])
            .attr("data-nb-ecoles", (d: IData) => d.nbEcoles)
            .attr("data-concours", (d: IData) => d.concours)
            .attr("index", (d: IData, i: number) => i)
            .attr("fill", "#f1f1f1")
            .attr("width", barWidth)
            .attr("x", (d: IData, i: number) => {
               if (xScale(d.concours)) {
                  const output = xScale(d.concours) as number;
                  return output + padding - offset;
               } else {
                  return 0;
               }
            })
            .attr("y", (d: IData) => yScale(d.nbEcoles))
            .attr("height", (d: IData) => h - padding - yScale(d.nbEcoles))
            .on("mouseover", (e, d) => {
               tooltip
                  .html(
                     "<p> Concours : " +
                        d.concours +
                        "<br>Nombre d'écoles : " +
                        d.nbEcoles +
                        "</p>"
                  )
                  .transition()
                  .duration(100)
                  .style("opacity", 0.9)
                  .style("top", e.pageY - 25 + "px")
                  .style("left", e.pageX + 20 + "px");
            })
            .on("mouseout", () => {
               tooltip
                  .transition()
                  .duration(100)
                  .style("opacity", 0)
                  .style("left", 0)
                  .style("top", 0);
            });

         // ? création des axes
         svg.append("g")
            .attr("class", scss["x-axis"])
            .attr("transform", `translate(0, ${h - padding})`)
            .call(xAxis);
         svg.append("g")
            .attr("class", scss["y-axis"])
            .attr("transform", `translate(${padding},0)`)
            .call(yAxis);
      }
   }, [data]);

   useEffect(() => {
      drawChart();
   }, [drawChart]);

   return (
      <Box width='100%'>
         <Heading as='h2' size='lg' marginBottom={3}>
            📌 Informations générales :
         </Heading>
         <section className={scss["infos-container"]}>
            <ul className={scss["infos-ul"]}>
               <li>
                  Nombre d&apos;écoles dans vos favoris : {favorites.length}
               </li>
               <li>
                  X-ENS :{" "}
                  {
                     data.find((elt) => elt.concours === IConcours.XENS)
                        ?.nbEcoles
                  }{" "}
                  écoles
               </li>
               <li>
                  Centrale :{" "}
                  {
                     data.find((elt) => elt.concours === IConcours.CENTRALE)
                        ?.nbEcoles
                  }{" "}
                  écoles
               </li>
               <li>
                  Mines :{" "}
                  {
                     data.find((elt) => elt.concours === IConcours.MINES)
                        ?.nbEcoles
                  }{" "}
                  écoles
               </li>
               <li>
                  CCINP :{" "}
                  {
                     data.find((elt) => elt.concours === IConcours.CCINP)
                        ?.nbEcoles
                  }{" "}
                  écoles
               </li>
               <li>
                  E3A :{" "}
                  {data.find((elt) => elt.concours === IConcours.E3A)?.nbEcoles}{" "}
                  écoles
               </li>
            </ul>
            <div id='chart'></div>
         </section>
      </Box>
   );
};

export default DashboardInfos;

