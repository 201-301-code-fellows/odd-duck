'use strict';

/*Globals */
const imgObjectArray = [];
let guesses = 25;

/*DOM Selectors */
const section = document.querySelector('section');
let imgElement = document.createElement('img');
let buttonElement = document.createElement('button');
let footerMessage = document.querySelector('#copyright');
let yearMessage = document.querySelector('#year');


/*Utility Functions */
const randomNum = function () {
  return Math.floor(Math.random() * imgObjectArray.length);
};

/*Constructors */
function Image(name, image) {
  this.name = name;
  this.image = image;
  this.alt = `An image of ${name}`;
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

/*Event Handlers */

/*Event Listoners */

/*Logic */
