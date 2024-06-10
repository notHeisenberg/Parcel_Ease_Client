import React, { useEffect, useRef } from 'react';
import ApexCharts from 'react-apexcharts';

const LineChart = ({ lineChartData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;
        console.log(chartRef)
        if (chartRef && chartRef.current) {
            const options = {
                series: lineChartData.datasets,
                chart: {
                    height: 350,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    zoom: {
                        enabled: false
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#77B6EA', '#545454'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Average High & Low Temperature',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'],
                        opacity: 0.5
                    },
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: lineChartData.labels,
                    title: {
                        text: 'Date'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Number of Parcels'
                    },
                    min: 0
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            };

            const chart = new ApexCharts(chartRef.current, options);
            chart.render();

            // // Clean up
            // return () => {
            //     chart.destroy();
            // };
        }
    }, [lineChartData]);

    return (
        <div id="chart" ref={chartRef}></div>
    );
};

export default LineChart;
