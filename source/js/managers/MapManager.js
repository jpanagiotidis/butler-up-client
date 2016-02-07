'user strict';
import scriptjs from 'scriptjs';

let mapPromise;

export function setMap(){
  if(!mapPromise){
    mapPromise = new Promise((resolve, reject) => {
      scriptjs('https://maps.googleapis.com/maps/api/js?keu=AIzaSyARWtx4Q6VoyjGAq1u5ful7J0101f-Zy70', function() {
        resolve();
      });
    });
  }
  return mapPromise;
}