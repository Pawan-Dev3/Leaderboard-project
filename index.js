const displayScoresContainer = document.getElementById(
  "display-scores-container"
);
const addScoreBtn = document.getElementById("add-score-btn");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const country = document.getElementById("country");
const score = document.getElementById("score");

let count = 0;
let scoresCollection = [];

addScoreBtn.addEventListener("click", (e) => addScores(e));

function addScores(e) {
  e.preventDefault();
  if (
    firstname.value === "" ||
    lastname.value === "" ||
    country.value === "" ||
    score.value === ""
  ) {
    alert("Enter all the fields");
    return;
  }

  if (displayScoresContainer.style.display === "none")
    displayScoresContainer.style.display = "block";
  count++;

  const divElement = document.createElement("div");
  const nameAndDateElement = document.createElement("div");
  const nameElement = document.createElement("span");
  const dateElement = document.createElement("span");
  const countryElement = document.createElement("span");
  const scoreElement = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const incrementBtn = document.createElement("button");
  const decrementBtn = document.createElement("button");

  nameElement.innerText = firstname.value + " " + lastname.value;
  dateElement.innerText = new Date().toLocaleDateString();
  countryElement.innerText = country.value;
  scoreElement.innerText = score.value;
  deleteBtn.innerText = "🗑️";
  incrementBtn.innerText = "+5";
  decrementBtn.innerText = "-5";

  deleteBtn.className = "delete-score";
  incrementBtn.className = "inc-dec-btn";
  decrementBtn.className = "inc-dec-btn";
  incrementBtn.id = `increment-${count}`;
  scoreElement.id = `score-${count}`;

  nameAndDateElement.appendChild(nameElement);
  nameAndDateElement.appendChild(dateElement);

  nameAndDateElement.className = "name-and-date";

  divElement.appendChild(nameAndDateElement);
  divElement.appendChild(countryElement);
  divElement.appendChild(scoreElement);
  divElement.appendChild(deleteBtn);
  divElement.appendChild(incrementBtn);
  divElement.appendChild(decrementBtn);

  divElement.id = `score-details-${count}`;
  divElement.className = "score-details-container";

  const scoreObject = {
    id: `score-details-${count}`,
    totalScore: Number(score.value),
    divElement,
  };

  deleteBtn.addEventListener("click", (e) => removeScore(divElement.id));
  incrementBtn.addEventListener("click", (e) =>
    incrementScore(scoreElement.id, divElement.id)
  );
  decrementBtn.addEventListener("click", (e) =>
    decrementScore(scoreElement.id, divElement.id)
  );

  scoresCollection.push(scoreObject);

  sortAndRender();
}

function incrementScore(scoreElementId, scoreContainerId) {
  const currScore = document.getElementById(scoreElementId);
  currScore.innerText = (Number(currScore.innerText) + 5).toString();
  scoresCollection = scoresCollection.filter(
    (item) => item.id !== scoreContainerId
  );
  const scoreObj = {
    id: scoreContainerId,
    totalScore: Number(currScore.innerText),
    divElement: document.getElementById(scoreContainerId),
  };

  scoresCollection.push(scoreObj);
  sortAndRender();

  document.getElementById(scoreContainerId).classList.add("animate");
  setTimeout(() => {
    document.getElementById(scoreContainerId).classList.remove("animate");
  }, 1000);
}

function decrementScore(scoreElementId, scoreContainerId) {
  const currScore = document.getElementById(scoreElementId);
  let scoreValue = Number(currScore.innerText);
  if (scoreValue <= 0 || scoreValue < 5) {
    alert("You can't select negative score");
    return;
  }
  currScore.innerText = (Number(currScore.innerText) - 5).toString();

  scoresCollection = scoresCollection.filter(
    (item) => item.id !== scoreContainerId
  );
  const scoreObj = {
    id: scoreContainerId,
    totalScore: Number(currScore.innerText),
    divElement: document.getElementById(scoreContainerId),
  };

  scoresCollection.push(scoreObj);
  sortAndRender();

  document.getElementById(scoreContainerId).classList.add("animate");
  setTimeout(() => {
    document.getElementById(scoreContainerId).classList.remove("animate");
  }, 1000);
}

function removeScore(childElement) {
  displayScoresContainer.removeChild(document.getElementById(childElement));
  if (!displayScoresContainer.hasChildNodes)
    displayScoresContainer.style.display = "none";
  else {
    scoresCollection = scoresCollection.filter(
      (item) => item.id !== childElement
    );
    sortAndRender();
  }
}

function sortAndRender() {
  scoresCollection = scoresCollection.sort(
    (a, b) => b.totalScore - a.totalScore
  );
  displayScoresContainer.innerHTML = "";
  scoresCollection.forEach((item) => {
    displayScoresContainer.appendChild(item.divElement);
  });

  if (scoresCollection.length > 0) {
    displayScoresContainer.style.display = "block";
  } else displayScoresContainer.style.display = "none";
}
