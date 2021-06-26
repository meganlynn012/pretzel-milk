// Quake View handler
export default class QuakesView {
    renderQuakeList(quakeList, listElement) {
        // console.log(quakeList);
        //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
        if (quakeList.metadata.count < 1) {
            listElement.innerHTML = "No quakes found...";
        } else {
            document.getElementById("buttonLink").innerHTML = `<a href="#top" id="topLink">Back to Top</a>`
            listElement.innerHTML = quakeList.features
                .map(quake => {
                    return `${quake.properties.title}, ${new Date(
                        quake.properties.time)}`;
                }).join('<br><br>');
        }
    }
    renderQuake(quake, element) {
        const quakeProperties = Object.entries(quake.properties);
        // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
    }
}