'use strict';

/*Globals */
const imgObjectArray = [];
let guesses = 25;

/*DOM Selectors */
const section = document.querySelector('section');
let buttonElement = document.createElement('button');
let footerMessage = document.querySelector('#copyright');
let yearMessage = document.querySelector('#year');

/*Utility Functions */
const randomNum = function () {
  return Math.floor(Math.random() * imgObjectArray.length);
};

const getYear = function () {
  return new Date().getFullYear();
};

/*Constructors */
function Image(name, image) {
  this.name = name;
  this.image = image;
  this.alt = `An image of a ${name}`;
  this.views = 0;
  this.click = 0;

  imgObjectArray.push(this);
}

/*Prototype methods */
Image.prototype.addClick = function () {
  this.click++;
};

Image.prototype.addView = function () {
  this.views++;
};

Image.prototype.render = function(){
  let imgElement = document.createElement('img');
  imgElement.setAttribute('src', this.image);
  section.appendChild(imgElement);
};

/*Object Creation */
new Image('bag', '/img/bag.jpg');
new Image('banana', '/img/banana.jpg');
new Image('bathroom', '/img/bathroom.jpg');
new Image('boots', '/img/boots.jpg');
new Image('breakfast', '/img/breakfast.jpg');
new Image('bubblegum', '/img/bubblegum.jpg');
new Image('chair', '/img/chair.jpg');
new Image('cthulhu', '/img/cthulhu.jpg');
new Image('dog-duck', '/img/dog-duck.jpg');
new Image('dragon', '/img/dragon.jpg');
new Image('pen', '/img/pen.jpg');
new Image('pen-sweep', '/img/pen-sweep.jpg');
new Image('scissors', '/img/scissors.jpg');
new Image('shark', '/img/shark.jpg');
new Image('sweep', '/img/sweep.png');
new Image('tauntaun', '/img/tauntaun.jpg');
new Image('unicorn', '/img/unicorn.jpg');
new Image('water-can', '/img/water-can.jpg');
new Image('wine-glass', '/img/wine-glass.jpg');


/*Event Handlers */

/*Event Listoners */

/*Logic */
