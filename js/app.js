'use strict';

/*Globals */
const imgObjectArray = [];
let guesses = 25;
const numberOfImages = 3; //How many images to be rendered on screen
let previousRound = []; // tracks the 3 images generated so they are shown back to back
//

/*DOM Selectors */
let section = document.querySelector('section');
let buttonElement = document.createElement('button');
let h3 = document.createElement('h3');
let yearMessage = document.querySelector('#year');
let ul = document.createElement('ul');
let canvas = document.querySelector('#myChart').getContext('2d');

/*Utility Functions */
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
const getYear = function () {
  return new Date().getFullYear();
};

/*Constructors */
function Image(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.alt = `An image of a ${name}`;
  this.views = 0;
  this.click = 0;

  imgObjectArray.push(this);
}

/*Prototype methods */
Image.prototype.addClick = function () {
  this.click++;
};

Image.prototype.render = function () {
  let imgElement = document.createElement('img');
  imgElement.setAttribute('src', this.image);
  imgElement.setAttribute('class', 'image');
  imgElement.setAttribute('alt', this.alt);
  section.appendChild(imgElement);
  this.views++;
};

/*Object Creation */
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

/* Build HTML */
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
      if (img.alt === imgElement[0].alt) {
        img.views++;
      }
    }
  }
}

function outOfGuesses() {
  for (let imgs of imgElement) {
    imgs.remove();
    
  }
  h3.innerText = 'Click the button to view the results';
  section.appendChild(h3);
  buttonElement.innerText = 'Results';
  section.appendChild(buttonElement);
  section.appendChild(ul);
}

function voteClicking(e) {
  for (let image of imgObjectArray) {
    if (e.target.alt === image.alt) {
      image.click++;
      guesses--;
      console.log(guesses);
    }
  }

  if (guesses > 0) {
    updateImgs();
  } else if (guesses === 0) {
    outOfGuesses();
  }
}

function createResults() {
  for (let data of imgObjectArray) {
    let liElem = document.createElement('li');
    if (data.views > 0) {
      liElem.innerHTML = `<strong>${data.name}</strong> was viewed ${data.views} times and clicked ${data.click} times`;
      ul.appendChild(liElem);
    }
  }
  const myChart = new Chart(canvas, charObject);
  h3.remove();
  buttonElement.remove();
}

/*Event Listoners */
for (let images of imgElement) {
  images.addEventListener('click', voteClicking);
}

buttonElement.addEventListener('click', createResults);

/* Update Footer */
yearMessage.innerText = getYear();

/* Chart.js */
const imgNames = [];
const views = [];
const votes = [];
for (let img of imgObjectArray) {
  imgNames.push(img.name);
  views.push(img.views);
  views.push(img.votes);
}

const charObject = {
  type: 'bar',
  data: {
    labels: imgNames,
    datasets: [
      {
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
        data: views,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
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
