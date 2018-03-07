const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const { Marker } = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoibnJsYXVyZWFubyIsImEiOiJjamQxd3I4cnMxanJrMndvNGRjd3VmaTA1In0.wYY43rmW7JCnuTg_t0HBXA'; //Noelle

import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import {NavLink, withRouter } from 'react-router-dom';
// import { Navbar } from './';

const fullstackCoords = [-74.009, 40.705] // NY
const brands = [
  { brand: 'Karma Sauce', location: [-77.9697160000000054, 43.0510378999999972] },
  { brand: 'Bravado Spice Co', location: [ -95.4971292999999974, 29.8493952] },
  { brand: 'Dawson\'s Hot Sauce', location: [ -80.2133297999999968, 43.2604685000000018] },
  { brand: 'Dirty Dick\'s', location: [ -70.8914867999999956, 42.1507251999999966] },
  { brand: 'Queen Majesty', location: [ -73.9487330999999983, 40.7401125000000022] },
  { brand: 'Homeboy\'s Hot Sauce', location: [ -112.055415100000005, 33.4516621000000001] },
  { brand: 'Hot Ones', location: [ -73.9595984000000044, 40.7202055999999999] },
  { brand: 'High River Sauces', location: [ -73.7652202999999957, 40.8383868000000021] },
  { brand: 'Adoboloco Hot Sauce', location: [ -156.486311599999993, 20.7650849000000015] },
  { brand: 'Légal Hot Sauce', location: [ -69.027970000000003, -13.6865109999999959] },
  { brand: 'Mellow Habanero', location: [ 135.252229999999997, 35.0678125000000023 ] },
  { brand: 'Secret Aardvark Trading Co', location: [ -122.703811999999999, 45.4541378999999992] },
  { brand: 'Torchbearer Sauces', location: [ -77.0012598999999938, 40.2586370000000002] }
]

const buildMarker = (brand, coords) => {
  const markerEl = document.createElement('div');
  markerEl.style.backgroundSize = 'contain';
  markerEl.style.width = '32px';
  markerEl.style.height = '37px';
  markerEl.style.backgroundImage = `url(https://emojipedia-us.s3.amazonaws.com/thumbs/120/facebook/65/fire_1f525.png)`;
  return new Marker(markerEl).setLngLat(coords);
};

export default class LandingPage extends Component {

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      center: fullstackCoords,
      zoom: 1.5,
      style: 'mapbox://styles/nrlaureano/cje51qtgy6szb2tq7j7d7andy'
    });
    brands.forEach(el => {
      let marker = buildMarker(el.brand, el.location);
      marker.addTo(this.map);
    })
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      right: 0,
      height: '100%',
      width: '100%'
    };
    console.log('IN LANDING PAGE COMPONENT');
    return (
      <div>
        <div style={style} ref={el => this.mapContainer = el} />
      </div>
    )
  }
}

