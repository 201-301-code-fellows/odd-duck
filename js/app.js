'use strict';

/*Globals */
const imgObjectArray = [];
let guesses = 25;

/*Utility Functions */
const randomNum = function () {
  return Math.floor(Math.random() * imgObjectArray.length);
};

/*Constructors */
function Image(name, image){
  this.name = name;
  this.image = image;
  this.alt = `An image of ${name}`;
  this.views = 0;
  this.click = 0;

  imgObjectArray.push(this);
}

/*Prototype methods */

/*Event Handlers */

/*Event Listoners */

/*Logic */
