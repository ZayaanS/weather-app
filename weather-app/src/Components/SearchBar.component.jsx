import React from 'react';

class SearchBar extends React.Component{
    constructor(){
        super();
        this.state = {
            location: "",
            weather: {
                city: {
                    name: ""
                },
                list:  {
                    0:
                    {
                        main: {
                            temp: 0
                        },
                        weather: {
                            0: {
                                description: "",
                                icon: ""
                            }
                        }
                    }
                }
            }
        }
        this.GetData = this.GetData.bind(this);
    }   
    key = "1a2c3081281d03a31af3cf6e13c04b46";
    GetData = () => {
        console.log( "https://api.openweathermap.org/data/2.5/forecast?q=" + this.state.location + "&units=metric&appid=" + this.key)
        // get country names from API and append to drop down
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + this.state.location + "&units=metric&appid=" + this.key , {
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
                    <input id='SearchBarInput' type='search' placeholder="City Name" onChange={event =>  this.setState({location: event.target.value})}/>
                    <button onClick={this.GetData}>search</button>
                    <button>use current location</button>
                </div>
                <div id='WeatherInfoLeft'>
                    <h1>{this.state.weather.city.name ? this.state.weather.city.name : this.state.location}</h1> 
                    <h2>{this.state.weather.list[0].main.temp}&deg; C</h2>
                    <h2>{this.state.weather.list[0].weather[0].description}</h2>
                    <img src={'http://openweathermap.org/img/wn/'+ this.state.weather.list[0].weather[0].icon +'@2x.png'} alt=""/>
                </div>
            </div>   
        );
    }
};

export default SearchBar;