import React from 'react';

class DisplayTemp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            weather: "current weather",
        }
    }
    key = "1a2c3081281d03a31af3cf6e13c04b46";
    GetData = (place) => {
        console.log( "https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&units=metric&appid=" + this.key)
        // get country names from API and append to drop down
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&units=metric&appid=" + this.key , {
            "method": "GET",
        })
        .then((response) => {
            // code for handling the data from the API
            return response.json() // data into json
        })
        .then( (data) =>  {
            console.log(data.city.name); //log data
            this.setState({weather: data});
        })
        .catch( (error) => {
            // if the server returns any errors
            console.log(error)
        });
    }
    render(){
        return(
            <div id='Main'>
                <h1>{this.props.place}</h1>
                <button onClick={this.GetData(this.props.place)}>
                    search
                </button>
            </div>  
        );
    }
};

export default DisplayTemp;