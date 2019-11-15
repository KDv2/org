import { Component } from '@angular/core';
// import { Platform } from '@ionic/angular';
// import { AddIncidencePopupPage } from '../add-incidence-popup/add-incidence-popup.page';
// import { ShowIncidencePopupPage } from '../show-incidence-popup/show-incidence-popup.page';
import * as moment from 'moment';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Polyline,
  LatLng,
  GoogleMapOptions,
  LatLngBounds
 } from '@ionic-native/google-maps';
 var map
 declare var google
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchInput
  autocompleteItems = []
  // map
  // google
  plotDirections

  mapz : any;
  markers : any;
  markers2
  autocomplete: any;
  autocompletez: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItemz: any;
  //plotDirections
  dangerImage
  selectImage
  userAddedMarker
  backButton
  myLocationimage
  directionsService
  array = []
  Lats
  Long
  start
  end

  showDirection = false
  showMe = false
  constructor() {
    let now = moment().format('LLLL');
    let today = moment().format('YYYY')
    console.log(now);
    console.log(today);
  }
  initMap() {
    let infoWindowMarker;
    let selectedMarker
    let infoWindow
    this.dangerImage = {
      url: 'assets/icon/danger (2).png', // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
    };
    this.selectImage = {
      url: 'assets/icon/pin-black-silhouette-in-diagonal-position-pointing-down-right (2).png', // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
    };
    ///my location image
    this.myLocationimage = {
      url: 'assets/icon/placeholder.png', // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
    };
    console.log('initialising map');

    let center = new google.maps.LatLng(0, 0);
    let myOptions = {
      zoom: 18,
      zoomControl: true,
      zoomControlOptions: { position: google.maps.ControlPosition.RIGHT_CENTER },
      scaleControl: true,
      streetViewControl: false,
      streetViewControlOptions: { position: google.maps.ControlPosition.BOTTOM_CENTER },
      fullscreenControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      center: center
    }
    map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
    this.directionsService = new google.maps.DirectionsService();     // directions services

    infoWindow = new google.maps.InfoWindow;
    infoWindowMarker= new google.maps.InfoWindow;
    // /// map click listener start
    map.addListener('dblclick',(event) => {
      var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        icon: this.selectImage,
        draggable: true
      });
      navigator.geolocation.getCurrentPosition((position) => {
        let currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude); console.log(currentPosition);
        
      })
      //this.markers2.push(marker);
      //selectedMarker = marker
      console.log(selectedMarker,"first selected marker")
      console.log(event.latLng,"location of new marker")
      ////// listener on marker start
      // Report incident
      marker.addListener('click', (event) => {
        //this.reportIncident(event, marker)
      });
      //// listener on marker end
    });
    // Get the location of you
    if(navigator.geolocation) {
      //this.array =[]
      console.log('Why are you not running?');
      navigator.geolocation.getCurrentPosition((position) => { console.log(position);
        let latitude = position.coords.latitude; console.log(latitude, 'latitude of user');
        let longitude = position.coords.longitude; console.log(longitude);
        let userPosition = new google.maps.LatLng(latitude, longitude); console.log(userPosition)
        var pos=[]
        pos.push({
          location: new google.maps.LatLng(latitude, longitude)
        });
        console.log(pos[0].location, 'position');
        


        this.array.push(pos[0])
        console.log(this.array, "zzz");
        this.Lats = this.array[0].location.lat();
        console.log( this.Lats, "weewewe");
        this.Long = this.array[0].location.lng();

        var locations = {lat: this.Lats, lng: this.Long}
    console.log(locations, 'runninnnng');
        this.start = locations

            // ///my location image
    var myLocationimage = {
      url: 'assets/icon/placeholder.png', // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(32, 32), // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0), // The anchor for this image is the base of the flagpole at (0, 32).
      // anchor: new google.maps.Point(0, 40)
    };
        let marker = new google.maps.Marker({
          position: pos[0].location,
          zoom: 17,
          map: map,
          animation: GoogleMapsAnimation.BOUNCE,
          icon: myLocationimage, //icon: selectImage
        });
        //this.markers.push(marker);
        map.setCenter(pos[0].location);
        // infoWindow.setPosition(pos[0].location);
        // infoWindow.setContent('haha');
        // infoWindow.open(map)
        console.log('runner world');
        
        this.geocoder.geocode({'location': new google.maps.LatLng(position.coords.latitude, position.coords.longitude)}, (results, status) => {
          console.log(results);
          if(status === "OK") {
          //let address= results[0].address_components[1].long_name + ',' + results[0].address_components[2].long_name + ',' + results[0].address_components[3].long_name
            let addressArray = {
              street: results[0].address_components[1].long_name,
              section: results[0].address_components[2].long_name,
              surburb: results[0].address_components[3].long_name
            }
            //infoWindow = new google.maps.InfoWindow;
            // addressArray.push()
            console.log(addressArray);
            console.log(addressArray['street'])
            console.log(results);
           //console.log(infoWindow.setContent(addressArray['street']))
           infoWindow.setContent(addressArray['street'])
           infoWindow.setPosition(pos[0].location);
            infoWindow.open(map)
          }
        })
        //console.log(infoWindowMarker.setContent(addressArray['street']))
        console.log(marker,"marker selected")


        
        console.log(position);
        
        infoWindow.open(map);
        map.setCenter(pos[0].location);
        this.array.push(pos[0])
        console.log(this.array, "zzz");
        this.Lats = this.array[0].location.lat();
        console.log( this.Lats, "weewewe");
        this.Long = this.array[0].location.lng();
        // calling function to plot
        this.plotDirections(this.start, this.end);
      }, () => {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  deleteMarkers(){
    this.clearMarkers();
    this.markers2 = [];
  }
  clearMarkers(){
    this.setMapOnAll(null);
  }
  setMapOnAll(map){
    for(var i = 0; i < this.markers2.length; i++){
      this.markers2[i].setMap(map);
    }
  }
  handleLocationError(browserHasGeolocation, infoWindow, pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
  ngOnInit(){
    this.initMap()
  }
}
