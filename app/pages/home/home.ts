import {Component} from '@angular/core'
import {NavController} from 'ionic-angular'
import {Geolocation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  map: any
  constructor(private navCtrl: NavController) {
    this.map = null
    this.loadMap()
  }

  loadMap() {
    let options = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(
      (position) => {
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          let mapOptions = {
              center: latLng,
              zoom: 15,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          this.map = new google.maps.Map(document.getElementById("map"), mapOptions)
      },
      (error) => {
          console.log(error)
      }, options
    )
  }

  addMarker() {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    })
    let content = "<h4>Information!</h4>"      
    this.addInfoWindow(marker, content)
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(this.map, marker)
    })
  }
}
