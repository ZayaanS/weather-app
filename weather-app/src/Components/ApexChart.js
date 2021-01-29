import React, { Component } from "react";
import Chart from "react-apexcharts";

class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "AreaChart"
        },
        toolbar:{
            show: false,
        },
        xaxis: {
          categories: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,38,40]
        }
      },
      series: [
        {
          name: "series-1",
          data: this.props.info ? this.props.info : [0,0,0] ,
        }
      ]
    };
  }

  render() {
      if (this.props.info){
        return (
            <div className="app">
              <div className="row">
                <div className="mixed-chart">
                  <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="area"
                    width="500"
                  />
                </div>
              </div>
            </div>
          );
      }
      else{
          return <div></div>
      }
    
  }
}

export default ApexChart;
