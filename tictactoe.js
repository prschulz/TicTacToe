//<----------Setting up Gameboard and Event listeners section---------->
var gameBoard = function () {
  var boxes = document.querySelectorAll("div.row > div.box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", selectItem);
  }
};

//<----------Turn section---------->
var turn = true;  // BOOLEAN TO DEFINE THE TURN
var counter = 0;  // Counter to track amount of turns played

//FUNCTION TO DISPLAY WHO'S TURN IT IS
var turnDesignator = function  () {
  if (counter >= 9) {
    document.querySelector("#player").innerText = "GAME OVER!";
  } else{
    if (turn === true) {
      document.querySelector("#player").innerText = "Player 1 is up!";
    } else{
      document.querySelector("#player").innerText = "Your turn Player 2!";
    }
  }
};

//<----------Turn tester section---------->
var turnTester = function() {
  turn = (turn === true ? false : true);
  counter ++;
  turnDesignator();
};

//<----------Select item section---------->

var selectItem = function  (event) {
  if(this.classList[1] === "selectedTurn1" || this.classList[1] === "selectedTurn2"){

  }
  else{
    if(turn){
      this.classList.add("selectedTurn1");
      player1.clicked.push(this.id);  //ADDING ID TO PLAYER1 ARRAY
      turnTester();//change turn (hack to fix control flow issue on win reset)
      winningCombo(player1,winners); //function to check for winner
    }
    else {
      this.classList.add("selectedTurn2");
      player2.clicked.push(this.id); //ADDING ID TO PLAYER2 ARRAY
      turnTester(); //change turn (hack to fix control flow issue on win reset)
      winningCombo(player2,winners); //function to check for winner
    }
  }
}; // END OF SELECT FUNCTION

//<----------Reset section---------->

var resetButtonHandler = function(){
  var boxes = document.querySelectorAll("div.row > div.box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].className = "box";
  }  //END OF FOR LOOP TO RESET CLASS OF BOXES TO BOX

  player1.clicked = []; //RESETTING THE PLAYER CLICK ARRAYS
  player2.clicked = [];
  counter = 0; // RESETTING THE TURN COUNT AND DESIGNATOR
  turn = true;
  turnDesignator();
}; //END OF RESETBUTTONHANDLER

//<----------Check for winner section---------->
//OBJECTS TO HOLD PLAYER MOVES
var player1 = {
  name:'player1',
  character:"X",
  clicked: [],
};

var player2 = {
  name:'player2',
  character:"O",
  clicked: [],
};

//ARRAY TO HOLD PLAYER OBJECTS
var players = [player1, player2];

//WINNING COMBOS ARRAY
var winners = [["b0","b1","b2"],["b3","b4","b5"],["b6","b7","b8"],["b0","b3","b6"],["b1","b4","b7"],["b2","b5","b8"],["b0","b4","b8"],["b2","b4","b6"]];

var winLength = 0;

var singleCombo = function (playerSquares, combo) {
  var match = true;
  for(var t in combo){
    if (-1 == playerSquares.clicked.indexOf(combo[t])){
     match = false;
    }
  }
  return match;
}
var winningCombo = function  (a,b) {
  for (var i in b){

    match = singleCombo(a,b[i]);

    if (match === true){
      // var winModal = document.getElementById('modaltext');
      // winModal.innerText = "The winner is "+a.character+"'s!";
      // $('#myModal').modal('show');
      alert("In the end, the " + a.character+" 's take it down!" );
      resetButtonHandler();
      return;
    }
  }
};

// -------------initialize-------------
var initialize = function () {
  gameBoard();
  document.querySelector("#reset").onclick = resetButtonHandler;
  turnDesignator();
};

window.onload = initialize;
