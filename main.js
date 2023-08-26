//Variables
const lettersBox = document.querySelector("main .hangman-part1 .letters-box"),
  category = document.querySelector("header h3.category span"),
  guessWord = document.querySelector("main .hangman-part2 .word"),
  theDraw = document.querySelector("main .hangman-part1 .man-box .the-draw"),
  differentLetter = document.getElementById("different-letter"),
  sameLetter = document.getElementById("same-letter"),
  win = document.getElementById("win"),
  lose = document.getElementById("lose"),
  gameAlert = document.querySelector("main .game-alert"),
  bgAlert = document.querySelector("main .bg-alert");

//Generate Alphabets
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const alphabetArr = Array.from(alphabets);
const getAlphabet = () => {
  alphabetArr.forEach((alph) => {
    let letterP = document.createElement("p");
    let letterPText = document.createTextNode(alph);
    letterP.appendChild(letterPText);
    letterP.className = "letter";
    lettersBox.appendChild(letterP);
  });
};
getAlphabet();

//Generate Random Words From Categories
const words = {
  movies: [
    "Maze Runner",
    "Harry Potter",
    "Hunger Game",
    "Plane",
    "Mission Impossible",
    "John Wick",
  ],
  anime: [
    "Detective Conan",
    "Naruto",
    "Inyusha",
    "Death Note",
    "Demon Slayer",
    "Demon Slayer",
    "Attack on Titan",
    "Dragon Ball",
  ],
  cartoon: ["Jimmy Neutron", "Titeuf", "Kazku", "Tintin", "Adventure Time"],
};

//Get Category
let categories = Object.keys(words);
let randomPropIndex = Math.floor(Math.random() * categories.length);
let randomPropValue = categories[randomPropIndex];
category.style.textTransform = "capitalize";

//Get Values Of Random Category
console.log("***************** Randam Category *****************");
let randomValueArr = words[randomPropValue];

//Get Random Value Of Random Category
console.log(
  "***************** Randam Value Of Random Category *****************"
);
let randomValueArrIndex = Math.floor(Math.random() * randomValueArr.length);
let randomValue = randomValueArr[randomValueArrIndex];
category.innerHTML = randomPropValue;

//Guess Word
console.log(
  "***************** Array of Letters of Randam Value Of Random Category *****************"
);
let guessWorldArr = Array.from(randomValue);
guessWorldArr.forEach((item) => {
  let letterSpan = document.createElement("span");
  letterSpan.className = "guess-letter";
  if (item === " ") {
    letterSpan.classList.add("empty-span");
  }
  guessWord.appendChild(letterSpan);
});

//Compare Chosen Letter Of Word To Guess Word
//Number Of Fail
let numFail = 0;
// Level
let level =
  numFail < 5
    ? "Strong!"
    : numFail > 5
    ? "Weak!"
    : numFail == 5
    ? "Normal"
    : "Unknown";
//Spans Content Now After a Correct Letter
let spansNow = [];

document.addEventListener("click", (e) => {
  //Letter Status : Not Found
  let letterStatus = false;
  if (e.target.className == "letter") {
    e.target.classList.add("clicked-letter");
    let choseLetter = e.target.innerHTML.toLowerCase();
    guessWorldArr.forEach((guessLetter, indexG) => {
      if (guessLetter.toLowerCase() === choseLetter.toLowerCase()) {
        //Set Letter Status : Found
        letterStatus = true;
        //Play Audio Same Letter
        sameLetter.play();
        let spans = document.querySelectorAll("main .hangman-part2 .word span");
        spans.forEach((sp, indexS) => {
          if (indexG === indexS) {
            sp.innerHTML = guessLetter;

            //Spans Content Now After a Correct Letter
            spansNow.push(sp.innerHTML);
          }
        });
      }
    });

    if (letterStatus === false) {
      //Play Audio Different Letter
      differentLetter.play();
      numFail++;
      console.log(numFail);
      theDraw.classList.add(`fail-${numFail}`);
    }

    //Lose Game
    winGame();

    //Win Game
    loseGame();
  }
});
if (guessWorldArr.includes(" ")) {
  spansNow.push("-");
}
console.log("Word To Guess" + guessWorldArr);
console.log("---------------" + spansNow);

//Win Method
const winGame = () => {
  if (numFail === 7) {
    setTimeout(() => {
      lose.play();
      gameAlert.innerHTML = `<p><i class="fa-solid fa-skull"></i>You Lose</p>
      <p>The Word is : ${randomValue}</p>`;
      gameAlert.style.display = "block";
      bgAlert.style.display = "block";
    }, 500);
    setTimeout(() => {
      gameAlert.style.display = "none";
      bgAlert.style.display = "none";
      location.reload();
    }, 4000);
  }
};

//Lose Method
const loseGame = () => {
  if (guessWorldArr.length === spansNow.length) {
    setTimeout(() => {
      win.play();
      gameAlert.innerHTML = ` <p><i class="fa-solid fa-heart"></i>You Win</p>
      <pre>You have <span>${numFail}</span> Error(s) , Your Level is<span> ${level} </span></pre>`;
      gameAlert.style.display = "block";
      bgAlert.style.display = "block";
    }, 500);
    setTimeout(() => {
      gameAlert.style.display = "none";
      bgAlert.style.display = "none";
      location.reload();
    }, 4000);
  }
};
