import React from 'react';
import './SearchBar.styles.css'
import Chart from "react-apexcharts";

class SearchBar extends React.Component{
    constructor(){
        super();
        this.state = {
            location: "",
            userLatitude: 0,
            userLongitude: 0,
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
                  name: "Temperature",
                  data: [],
                }
              ], 
            weather: {
                city: {
                    name: ""
                },
                list:  {
                    0:
                    {
                        main: {
                            temp: 0,
                            humidity: 0,
                        },
                        weather: {
                            0: {
                                description: "",
                                icon: ""
                            }
                        },
                        wind: {
                            speed: 0
                        }
                    }
                }
            }
        }
        this.GetData = this.GetData.bind(this);
    }   
    key = "1a2c3081281d03a31af3cf6e13c04b46";
    GetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({location: `lat=${position.coords.latitude}&lon=${position.coords.longitude}`})
                this.GetData();
              });
        }
        else{
            alert('geolocation is not supported')
            return "";
        }
    }
    GetData = () => {
        console.log( "https://api.openweathermap.org/data/2.5/forecast?" + this.state.location + "&units=metric&appid=" + this.key)
        // get country names from API and append to drop down
        fetch("https://api.openweathermap.org/data/2.5/forecast?" + this.state.location + "&units=metric&appid=" + this.key , {
            "method": "GET",
        })
        .then((response) => {
            // code for handling the data from the API
            return response.json() // data into json
        })
        .then( (data) =>  {
            this.setState({weather: data});
            console.log(data)
            console.log(this.state.weather.city.name)
            let TempValues = [];
            for (let i=0; i<(this.state.weather.list).length; i++){
                TempValues.push(this.state.weather.list[i].main.temp);
            }
            console.log(TempValues)
            this.setState({series:[
                {
                    name: "Temperature",
                    data: TempValues,
                }
              ]})
            let DateTimeValues = [];
            for (let i=0; i<(this.state.weather.list).length; i++){
                DateTimeValues.push(this.state.weather.list[i].dt_txt);
            }
            console.log("date time values: ", DateTimeValues)
            this.setState({
                options: {
                    chart: {
                      id: "AreaChart"
                    },
                    toolbar:{
                        show: false,
                    },
                    xaxis: {
                      categories: DateTimeValues
                    }
                  }
            });
            document.getElementById("WeatherDiv").style.display = "flex";

        })
        .catch( (error) => {
            // if the server returns any errors
            console.log(error)
        });
    }
    render(){
        return(
            <div id='Main'>
                <div id="SearchBar">
                    <input id='SearchBarInput' type='search' placeholder="City Name" onChange={event =>  this.setState({location: `q=${event.target.value}`})}/>
                    <button id='SearchButton' onClick={this.GetData}>search</button>
                    <button id='CurrentLocationButton' onClick={this.GetLocation}>use current location</button>
                </div>
                <div id='WeatherDiv'>
                    <div className='row'>
                        <div className='col-md-12 col-lg-3'>
                                <h1>{this.state.weather.city.name ? this.state.weather.city.name : this.state.location}</h1> 
                                <h2>{this.state.weather.list[0].main.temp}&deg; C</h2>
                                <h2>{this.state.weather.list[0].weather[0].description}</h2>
                                <img src={'http://openweathermap.org/img/wn/'+ this.state.weather.list[0].weather[0].icon +'@2x.png'} alt=""/>
                                <h4>Humidity</h4>
                                <h2>{this.state.weather.list[0].main.humidity}%</h2>
                                <h4>Wind Speed</h4>
                                <h2>{this.state.weather.list[0].wind.speed} sm/s</h2>
                        </div>
                        <div className='col-md-12 col-lg-9'>
                        <div id='WeatherChart'>
                            <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="area"
                            />
                            </div>
                        </div>
                    </div>

                                
                        
                                
                </div>
                
            </div>   
        );
    }
};

export default SearchBar;