function CustomMarker(latlng, map, args) {
  this.latlng = latlng; 
  this.args = args; 
  this.setMap(map); 
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
  
  var self = this;
  
  var div = this.div;
  
  if (!div) {
  
    div = this.div = document.createElement('div');
    
    div.className = 'bu-marker';
    
    div.style.position = 'absolute';
    div.style.cursor = 'pointer';
    div.style.width = '34px';
    div.style.height = '34px';
    div.style.background = 'red';
    div.style.borderRadius = '17px';
    div.style.textAlign = 'center';

    const icon = document.createElement('i');
    icon.style.lineHeight = '34px';
    icon.className = 'fa fa-2x fa-map';

    div.appendChild(icon);
    
    if (typeof(self.args.marker_id) !== 'undefined') {
      div.dataset.marker_id = self.args.marker_id;
    }
    
    google.maps.event.addDomListener(div, "click", function(event) {      
      google.maps.event.trigger(self, "click");
    });
    
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
  }
  
  var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
  
  if (point) {
    div.style.left = point.x - 17 + 'px';
    div.style.top = point.y - 17 + 'px';
  }
};

CustomMarker.prototype.remove = function() {
  if (this.div) {
    this.div.parentNode.removeChild(this.div);
    this.div = null;
  } 
};

CustomMarker.prototype.getPosition = function() {
  return this.latlng; 
};

export default CustomMarker;