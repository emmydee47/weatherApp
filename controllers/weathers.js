require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const weatherComponent = require('../component/weather')
const weather_search_url = process.env.APP_URI+'?'+process.env.SEARCH_URI;
const weather_location_url = process.env.APP_URI+'?'+process.env.LOCATION_URI;
const router = express.Router();
var request = require('request');
const weatherController = {};
const weatherObject = {};
global.weather = new weatherComponent();

const locations = ['Istanbul', 'Berlin', 'London', 'Helsinki', 'Dublin', 'Vancouver'];

let search = async function(location){

	fetch(weather_search_url+location)
		.then(res => res.json())
		.then(data => {
			global.weather.city_name = location;
			weatherObject.title = data[0].title;
			weatherObject.location_type = data[0].location_type;
			weatherObject.woeid = data[0].woeid;
			weatherObject.latt_long = data[0].latt_long;
			weatherObject.title = data[0].title;
			
			getWeatherDetails(data[0].woeid);
			return data;
		})
		.catch(err => {
			res.redirect('error');
		});


};


let getWeatherDetails = async function(woeid){
	console.log(weather_location_url+woeid);
	fetch(weather_location_url+woeid)
		.then(res => res.json())
		.then(data => {
			let returned =data.consolidated_weather[0];
			weatherObject.min_temp = returned.min_temp;
			weatherObject.max_temp = returned.max_temp;
			weatherObject.the_temp = returned.the_temp;

			global.weather.minimum_temperature = returned.min_temp;
			global.weather.maximum_temperature = returned.max_temp;
			global.weather.temperature = returned.max_temp;
			global.weather.icon = "";

			console.log(global.weather);
			
			// weatherObject.location_type = data.location_type;
			// weatherObject.woeid = data.woeid;
			// weatherObject.latt_long = data.latt_long;
			// weatherObject.title = data.title;

			return data;
		})
		.catch(err => {
			console.log(err);
		});


};

weatherController.location_details = function(req, res)
{
	locations.forEach(async function(value){
		let loc = await search(value)
		.then(dat=>{
			console.log(dat);
		});
		
	  });

	// fetch(weather_location_url+woeid)
	// 	.then(res => res.json())
	// 	.then(data => {
	// 		console.log(data);
	// 		//res.send({ data });
	// 		res.render('index', {weather:data});
	// 	})
	// 	.catch(err => {
	// 		res.redirect('error');
	// 	});
}

weatherController.details = async function(req, res){

	fetch(weather_search_url+'vancouver')
		.then(res => res.json())
		.then(data => {
			console.log(data);
			//res.send({ data });
			res.render('index', {weather:data});
		})
		.catch(err => {
			res.redirect('/error');
		});


};
	

module.exports = weatherController;
