'use strict';

/*Globals */
const imgObjectArray = [];
let guesses = 25;
const numberOfImages = 3; //How many images to be rendered on screen
let previousRound = []; // tracks the 3 images generated so they are never shown back to back
const imgNames = []; // Grabs the names of each image for the chart
const imgViews = []; // Grabs total views of each image for the chart
const imgVotes = []; //Grabs total votes for each image for the chart

/*DOM Selectors */
let section = document.querySelector('section');
let buttonElement = document.createElement('button');
let h3 = document.createElement('h3');
let yearMessage = document.querySelector('#year');
let canvas = document.querySelector('#myChart').getContext('2d');

/*Utility Functions */

/*Generate 3 random numbers to grab 3 random indexes of the images array */
function randomNum() {
  const randomNumbers = [];

  while (randomNumbers.length < numberOfImages) {
    let numberToAdd = Math.floor(Math.random() * imgObjectArray.length);
    if (
      !randomNumbers.includes(numberToAdd) &&
      !previousRound.includes(numberToAdd)
    ) {
      randomNumbers.push(numberToAdd);
    }
  }
  previousRound = randomNumbers;
  return randomNumbers;
}

/* Get the current year for the footer copyright */
const getYear = function () {
  return new Date().getFullYear();
};

/*Constructors */
function Image(name, fileExtension = 'jpg', views = 0, click = 0) {
  //Added views and click to parameters for localdata to use
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.alt = `An image of a ${name}`;
  this.views = views;
  this.click = click;

  imgObjectArray.push(this);
}

/*Prototype methods */
/*Function updates the click count each time a user clicks an image */
Image.prototype.addClick = function () {
  this.click++;
};

/*Function creates an img element in HTML, and appends it to section element in HTML
after adding neccessary attributes for each image */
Image.prototype.render = function () {
  let imgElement = document.createElement('img');
  imgElement.setAttribute('src', this.image);
  imgElement.setAttribute('class', 'image');
  imgElement.setAttribute('alt', this.alt);
  section.appendChild(imgElement);
  this.views++;
};

/*Object Creation */
/* Check to see if there is localStorage first, then
create new Image objects based on provided data */
if (!localStorage.length) {
  console.log('Creating new objects');
  new Image('bag');
  new Image('banana');
  new Image('bathroom');
  new Image('boots');
  new Image('breakfast');
  new Image('bubblegum');
  new Image('chair');
  new Image('cthulhu');
  new Image('dog-duck');
  new Image('dragon');
  new Image('pen');
  new Image('pet-sweep');
  new Image('scissors');
  new Image('shark');
  new Image('sweep', 'png');
  new Image('tauntaun');
  new Image('unicorn');
  new Image('water-can');
  new Image('wine-glass');
} else {
  console.log('creating objects from local');
  /* Generate new objects using local storage data for parameters */
  objectsFromLocal(getLocalData());
}
/* Build HTML */
/* Create 3 images based on 3 random numbers generated ealier */
function getNewImages() {
  let randomImageIndex = randomNum(); //Store an array of 3 random unique numbers
  for (let i = 0; i < numberOfImages; i++) {
    imgObjectArray[imgObjectArray[randomImageIndex[i]].render()];
  }
}
getNewImages(); // Get initial 3 images

/*Event Handlers */
let imgElement = document.querySelectorAll('.image');
function updateImgs() {
  const newIndexArray = randomNum();
  for (let i = 0; i < newIndexArray.length; i++) {
    imgElement[i].setAttribute('src', imgObjectArray[newIndexArray[i]].image);
    imgElement[i].setAttribute('alt', imgObjectArray[newIndexArray[i]].alt);
    for (let img of imgObjectArray) {
      if (img.alt === imgElement[i].alt) {
        img.views++;
        console.log(img.name);
      }
    }
  }
}

/* Function will remove the images on display if the remaining guesses reach 0 */
function outOfGuesses() {
  for (let imgs of imgElement) {
    imgs.remove();
  }
  for (let img of imgObjectArray) {
    imgNames.push(img.name);
    imgViews.push(img.views);
    imgVotes.push(img.click);
  }
  h3.innerText = 'Click the button to view the results';
  section.appendChild(h3);
  buttonElement.innerText = 'Results';
  section.appendChild(buttonElement);
}
/* Function will responde to a click event with adding a click to the img clicked
and subtract a guess from gusses. when out of guesses it will invoke the
ouOfGuesses function */
function voteClicking(e) {
  for (let image of imgObjectArray) {
    if (e.target.alt === image.alt) {
      image.click++;
      guesses--;
    }
  }

  if (guesses > 0) {
    updateImgs();
  } else if (guesses === 0) {
    outOfGuesses();
  }
}

/*Function will respond to a click event and remove the button and remove the .hide class
from the HTML element on the chart allowing the chart to be displayed*/
function createResults() {
  createLocalStorage();
  const myChart = new Chart(canvas, charObject);
  h3.remove();
  document.querySelector('.chart').classList.remove('hide');
  buttonElement.remove();
}

/* Local Storage Logic */
function createLocalStorage() {
  localStorage.setItem('imgs', JSON.stringify(imgObjectArray));
}

function getLocalData() {
  return JSON.parse(localStorage.getItem('imgs'));
}

function objectsFromLocal(data) {
  for (let img of data) {
    let extension = img.image.slice(-3); // assign the extension to the correct extension based on whats stored
    new Image(img.name, extension, img.views, img.clicks);
  }
}

/*Event Listoners */
for (let images of imgElement) {
  images.addEventListener('click', voteClicking);
}

buttonElement.addEventListener('click', createResults);

/* Update Footer */
yearMessage.innerText = getYear();

/* Chart.js */



const charObject = {
  type: 'bar',
  data: {
    labels: imgNames,
    datasets: [
      {
        label: '# of Votes',
        data: imgVotes,
        backgroundColor: [
          '#f1e0c5;',
          '#c9b79c;',
          '#71816D',
          '#342A21',
          '#DA667B',
          '#DA667B',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
      {
        label: '# of Views',
        data: imgViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(1, 99, 132, 111)',
          'rgba(154, 262, 235, 1)',
          'rgba(155, 106, 86, 111)',
          'rgba(75, 192, 12, 11)',
          'rgba(253, 102, 255, 100)',
          'rgba(155, 159, 64, 100)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
