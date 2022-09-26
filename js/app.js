'use strict';

/*Globals */
const imgObjectArray = [];
let guesses = 25;

/*DOM Selectors */

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
