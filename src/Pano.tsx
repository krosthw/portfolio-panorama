import * as PANOLENS from "panolens";
import imageSrc from './assets/pano3.jpg';
console.log(PANOLENS);
console.log(imageSrc);
const panorama = new PANOLENS.ImagePanorama(imageSrc);
console.log("panorama");
console.log(panorama);
const viewer = new PANOLENS.Viewer({
    container: document.querySelector("#coucou")
});
viewer.add(panorama);
const Pano = () => {

    return (
        <>
            <p>Coucou</p>
            <div id="coucou" >                
            {}
            </div>
        </>
    );
};

export default Pano;
