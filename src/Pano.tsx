import * as PANOLENS from "panolens";
import imageSrc from './assets/pano3.jpg';
console.log(PANOLENS);
const panorama = new PANOLENS.ImagePanorama(imageSrc);
console.log("panorama");
console.log(panorama);
// const viewer = new PANOLENS.Viewer({
//     container: document.querySelector("#coucou")
// });
// console.log(viewer);
// viewer.add(panorama);
const Pano = () => {
    const viewer = new PANOLENS.Viewer({
        container: document.querySelector("#coucou")
    });
    viewer.add(panorama);
    return (
        <>
            <p>Coucou</p>
            <div id="coucou" >                
            </div>
        </>
    );
};

export default Pano;
