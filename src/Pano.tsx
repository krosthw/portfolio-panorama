//https://github.com/pchen66/pchen66.github.io/blob/master/Panolens/examples/panorama_infospot_focus.html


import dat from "dat-gui";
import * as PANOLENS from "panolens";
import * as THREE from "three";
import * as TWEEN from "tween.js";
import imageSrc from './assets/pano3.jpg';
console.log(PANOLENS);
console.log(imageSrc);
var panorama = new PANOLENS.ImagePanorama(imageSrc);
//console.log("panorama");
//console.log(panorama);
// var viewer = new PANOLENS.Viewer({
//     container: document.querySelector("#pano")
// });
// viewer.add(panorama);

var parameters:any, gui:any, /*panorama_video:any,*/ radius, button:any, position, infospot, timerId:any, easingItem:any, list, listItem, index = 0, baseScale = 300;


function getPropertyArray(object: any) {
    var array = [];
    for (var name in object) {
        array.push(name);
    }
    return array;
}

function iterativeFocus(enabled: any) {
    if (!enabled) {
        clearTimeout(timerId);
        return;
    }
    onFocus.call(panorama.children[index++]);
    if (index === panorama.children.length) {
        index = 0;
    }
    timerId = setTimeout(iterativeFocus.bind(this, enabled), parameters.duration + 500);
}

function onFocus() {

    this.focus(parameters.duration, TWEEN.Easing[parameters.curve][parameters.easing]);

}

const Pano = () => {

    var curves = [], easings = [];
    curves = getPropertyArray(TWEEN.Easing);
    list = document.querySelector('.mdl-list');
    listItem = document.querySelector('.mdl-list__item');

    // Focus tweening parameter
    parameters = {
        amount: 50,
        duration: 1000,
        curve: 'Exponential',
        easing: 'Out',
        iterative: false
    };

    gui = new dat.GUI();
    gui.add(parameters, 'duration', 0, 3000).step(50);
    gui.add(parameters, 'iterative').onChange(iterativeFocus);
    gui.add(parameters, 'curve', curves).onChange(function (value :any) {
        gui.remove(easingItem);
        easings = getPropertyArray(TWEEN.Easing[value]);
        parameters.easing = easings.length > 2 ? easings[1] : easings[0];
        easingItem = gui.add(parameters, 'easing', easings);
    });
    easingItem = gui.add(parameters, 'easing', ['In', 'Out', 'InOut']);

    //panorama = new PANOLENS.ImagePanorama('asset/textures/equirectangular/field.jpg');
    //panorama_video = new PANOLENS.VideoPanorama('asset/textures/video/1941-battle-low.mp4');
    //var panorama = new PANOLENS.ImagePanorama(imageSrc);
    panorama = new PANOLENS.ImagePanorama('assets/pano3.jpg');
    //panorama.link(panorama_video, new THREE.Vector3(3883.71, 745.13, -3047.48), 400, 'asset/textures/1941-battle-thumb.png');
    //panorama_video.link(panorama, new THREE.Vector3(4602.58, 1863.13, -547.70), 400);

    const { edgeLength } = panorama;
    radius = edgeLength / 2;

    for (var i = 1; i <= parameters.amount; i++) {

        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.random() * Math.PI;

        position = new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );

        infospot = new PANOLENS.Infospot(baseScale * position.length() / radius, PANOLENS.DataImage.Info);
        infospot.position.copy(position);
        infospot.addHoverText('Infospot' + i);
        infospot.addEventListener('click', onFocus);
        panorama.add(infospot);

        // Add to left panel
        var item = listItem!.cloneNode(true) as any;
        item.classList.remove('template');
        item.querySelector('button').textContent = 'Infospot' + i;
        item.addEventListener('click', onFocus.bind(infospot), false);
        list!.appendChild(item);

    }
    // var viewer = new PANOLENS.Viewer({
    //     container: document.querySelector("#pano")
    // });
    // viewer.add(panorama);
   var viewer = new PANOLENS.Viewer({ output: 'console', container: document.querySelector('#pcontainer') });
    viewer.add(panorama);
    // viewer.add(panorama, panorama_video);
    viewer.renderer.sortObjects = true;

    return (
        // <div>
        //     <p>Costantini Alessandro</p>
        //     <div id="pano" >
        //     {}
        //     </div>
        //     <p>Credits</p>
        // </div>
        <div className="container">
            <span className="left mdl-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <span className="mdl-layout-title">Panolens.js</span>
                </header>
                <ul className="mdl-list">
                    <li className="mdl-list__item template">
                        <span className="mdl-list__item-primary-content">
                            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored">Infospot1</button>
                        </span>
                    </li>
                </ul>
            </span>
            <span id="pcontainer" className="right"></span>
        </div>
    );
};

export default Pano;
