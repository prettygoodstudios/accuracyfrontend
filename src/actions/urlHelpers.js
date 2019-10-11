export const rootURL = 'https://accuracybackend.geofoc.us';


export const generateUrl = (route, params) => {
  let url = rootURL+route+"?";
  Object.keys(params).forEach((k, i) => {
    url += `${k}=${encodeURI(params[k])}`
    if(i< Object.keys(params).length-1){
      url+="&";
    }
  });
  return url;
}
