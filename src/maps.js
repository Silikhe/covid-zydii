Highcharts.chart("container", {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "Truth in numbers COVID-19 PANIC",
  },
  subtitle: {
    text: "US percentages from John Hopkins ",
  },
  tooltip: {
    pointFormat: "<b>{point.percentage:.5f} %</b> {series.name} ",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.5f} %",
      },
    },
  },
  series: [
    {
      name: "Population",
      colorByPoint: true,
      data: [
        {
          name: "healthy",
          y: 99.8892,
          // sliced: true,
          selected: true,
        },
        {
          name: "confirmed",
          y: 0.001,
        },
        {
          name: "recovered",
          y: 0.0001,
        },
        {
          name: "dead",
          y: 0.00003,
        },
      ],
    },
  ],
});
