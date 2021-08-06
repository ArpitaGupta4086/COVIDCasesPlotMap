async function updateMap() {
    console.log("Updating map with realtime data")
    try{
    await fetch("/COVIDCasesPlotMap/blob/main/data.json")
        .then(response => response.json())
        .then(rsp => {
            // console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;

                cases = element.infected;
                if (cases>255){
                    color = "rgb(0,0,255)";
                }
                else{
                    color = `rgb(0,0,${cases})`;
                }
                //Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                })
                    .setLngLat([longitude, latitude])
                    .addTo(map);
            });
        })
    }
    catch (err) {
    console.error('err', err);
  }

}
updateMap();
 let interval = 1000;
 setInterval(updateMap,interval);
