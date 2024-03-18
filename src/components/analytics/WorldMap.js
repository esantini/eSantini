import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import styled from '@emotion/styled';
import countriesJson from './countries.json';
import usStatesJson from './states.json';
import { countriesHide2, countriesHide4, countriesHide6, countriesHide10 } from './countriesHide';

const setCountryLabelClass = d => {
  let hideType = '';
  if (countriesHide2.includes(d.properties.name)) hideType = ' hide2';
  else if (countriesHide4.includes(d.properties.name)) hideType = ' hide4';
  else if (countriesHide6.includes(d.properties.name)) hideType = ' hide6';
  else if (countriesHide10.includes(d.properties.name)) hideType = ' hide10';

  return `${d.id == 840 ? 'usa ' : ''}country-label${hideType}`;
}
const WorldMap = ({ points = [] }) => {
  const ref = useRef();
  const svgRef = useRef();

  useEffect(() => {
    if (!svgRef.current) {
      svgRef.current = d3.select(ref.current);
      svgRef.current.append('g').attr('class', 'states');
      svgRef.current.append('g').attr('class', 'countries');
      svgRef.current.append('g').attr('class', 'labels');
      svgRef.current.append('g').attr('class', 'state-labels');
      svgRef.current.append('g').attr('class', 'points');
    }

    const countries = feature(countriesJson, countriesJson.objects.countries).features;
    const usStates = feature(usStatesJson, usStatesJson.objects.states).features;
    drawMap(countries, usStates);

    // Initialize zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([1, 256])
      .on('zoom', ({ transform }) => {
        svgRef.current.selectAll('g').attr('transform', transform);
        svgRef.current.selectAll('.point').attr('r', 5 / transform.k); // Adjust circle size based on zoom
        svgRef.current.selectAll('.country-label').style('font-size', `${Math.ceil(10 / transform.k)}px`);
        svgRef.current.selectAll('.state-label').style('font-size', `${Math.ceil(5 / transform.k)}px`);

        svgRef.current.selectAll('.usa.country').style('opacity', transform.k > 3 ? '0' : '1');
        svgRef.current.selectAll('.usa.country-label').style('opacity', transform.k > 5 ? '0' : '1');
        svgRef.current.selectAll('.state-labels').style('opacity', transform.k > 5 ? '1' : '0');

        svgRef.current.selectAll('.hide2').style('opacity', transform.k > 2 ? '1' : '0');
        svgRef.current.selectAll('.hide4').style('opacity', transform.k > 4 ? '1' : '0');
        svgRef.current.selectAll('.hide6').style('opacity', transform.k > 6 ? '1' : '0');
        svgRef.current.selectAll('.hide10').style('opacity', transform.k > 10 ? '1' : '0');
      });

    svgRef.current.call(zoom);
  }, [points]);

  const drawMap = (countries, usStates) => {
    // Cleanup previous drawings
    svgRef.current.select('.countries').selectAll('*').remove();
    svgRef.current.select('.states').selectAll('*').remove();
    svgRef.current.select('.points').selectAll('*').remove();

    const projection = d3.geoMercator().scale(150).translate([1000 / 2, 600 / 2]);
    const pathGenerator = d3.geoPath().projection(projection);

    // Draw countries
    svgRef.current.select('.countries')
      .selectAll('.country')
      .data(countries)
      .enter().append('path')
      .attr('class', d => `${d.id == 840 ? 'usa ' : ''}country`)
      .attr('d', pathGenerator)
      .attr('fill', '#e8eee2')
      .attr('stroke', '#ad7e6e')
      .attr('stroke-width', '.1');

    svgRef.current.select('.states')
      .selectAll('.state')
      .data(usStates)
      .enter().append('path')
      .attr('class', 'state')
      .attr('d', pathGenerator)
      .attr('fill', '#e8eee2')
      .attr('stroke', '#ad7e6e')
      .attr('stroke-width', '.1');

    // Add state labels
    svgRef.current.select('.state-labels')
      .style('opacity', '0')
      .selectAll('.state-label')
      .data(usStates)
      .enter().append('text')
      .attr('class', 'state-label')
      .attr('x', d => projection(d3.geoCentroid(d))[0])
      .attr('y', d => projection(d3.geoCentroid(d))[1])
      .attr('fill', '#2a3f29')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .style('font-size', '8px')
      .text(d => d.properties.name);

    // Add country labels
    svgRef.current.select('.labels')
      .selectAll('.country-label')
      .data(countries)
      .enter().append('text')
      .attr('class', setCountryLabelClass)
      .attr('x', d => projection(d3.geoCentroid(d))[0])
      .attr('y', d => projection(d3.geoCentroid(d))[1])
      .attr('fill', '#2a3f29')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .style('font-size', '10px')
      .text(d => d.properties.name);

    // Draw points
    if (points.length) {
      svgRef.current.select('.points')
        .selectAll('.point')
        .data(points)
        .enter().append('circle')
        .attr('class', 'point')
        .attr('cx', d => projection([d[1], d[0]])[0])
        .attr('cy', d => projection([d[1], d[0]])[1])
        .attr('r', 5)
        .attr('fill', 'brown');
    }
  };

  return <SvgContainer><svg ref={ref} width={1000} height={600} /></SvgContainer>;
};

WorldMap.propTypes = {
  points: PropTypes.array
};

export default WorldMap;

const SvgContainer = styled.div`
  border: 1px solid black;
  background: aliceblue;
  background: lightblue;
  background: powderblue;
  svg {
    display: block;
    cursor: grab;
    color: #588157;
    
    &:active {
      cursor: grabbing;
    }
    
    * {
      transition: opacity 1s ease;
    }
    .hide2, .hide4, .hide6, .hide10 {
      opacity: 0;
    }
  }
`;