export default class Gmap {
  constructor(latitude, longitude, zoom = 13, wheelZoom = false) {
    this.latlng = new (google.maps.LatLng)(latitude, longitude);

    let mapOptions = {
      zoom: zoom,
      center: this.latlng,
      scrollwheel: wheelZoom,

      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
      }
    };

    this.map = new (google.maps.Map)(document.getElementById("map"), mapOptions);
  }

  setDefaltMaker(latitude = 0, longitude = 0) {
    let lat;

    if ((latitude === 0 && longitude === 0)) {
      lat = this.latlng;
    } else {
      lat = new (google.maps.LatLng)(latitude, longitude);
    }

    return this.marker = new (google.maps.Marker)({
      position: lat,
      map: this.map
    });
  }

  setImageMaker(imgUrl, imgW, imgH, latitude = 0, longitude = 0) {
    let lat;

    if ((latitude === 0 && longitude === 0)) {
      lat = this.latlng;
    } else {
      lat = new (google.maps.LatLng)(latitude, longitude);
    }

    this.marker_image = new (google.maps.MarkerImage)(imgUrl);
    this.marker_image.scaledSize = new (google.maps.Size)(imgW, imgH);

    return this.marker = new (google.maps.Marker)({
      position: lat,
      map: this.map,
      icon: marker_image
    });
  }

  setMakerLink(url) {
    return google.maps.event.addListener(this.marker, "click", function() {
      return window.open(url);
    });
  }

  setColorMap(colstyle = null) {
    let styles;

    if ((colstyle)) {
      styles = colstyle;
    } else {
      styles = [{
        stylers: [{
          hue: "#1a2445"
        }, {
          saturation: -75
        }]
      }];
    }

    let styledMap = new (google.maps.StyledMapType)(styles);
    this.map.mapTypes.set("map_style", styledMap);
    return this.map.setMapTypeId("map_style");
  }
}

Gmap.prototype.map = null;
Gmap.prototype.maker = null;
Gmap.prototype.latlng = null;
