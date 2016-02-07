export function getUrl(){
  return 'http://localhost/apps/catalogue-finder/server/src/dev';
}

export function isCordova(){
  if(document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1){
    return true;
  }else{
    return false;
  }
}

export const MapsKey = 'AIzaSyDRnkapVVieb92av9W7UlbZ7ZK6OKu-4Ps';