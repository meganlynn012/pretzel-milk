import QuakesController from './QuakesController.js';

const QUAKES = new QuakesController('#quakeList');
document.querySelector("#quakeDistance").addEventListener('change', (element) => {
    QUAKES.init(element.target.value);
})

QUAKES.init();