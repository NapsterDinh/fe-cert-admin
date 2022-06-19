import { faTruckMonster } from "@fortawesome/free-solid-svg-icons";
import ReactApexChart from "react-apexcharts";

const Chart = ({ series, labels, width }) => {
  return (
    <div>
      <div className="chart-wrap">
        <div id="chart">
          <ReactApexChart
            options={{
              chart: {
                width: width,
                type: "donut",
              },
              labels: labels,
              dataLabels: {
                enabled: faTruckMonster,
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      show: true,
                    },
                  },
                },
              ],
              legend: {
                position: "right",
                offsetY: 0,
                height: 230,
              },
            }}
            series={series}
            type="donut"
            width={width}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
