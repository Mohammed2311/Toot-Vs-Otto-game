/// <reference path="../axios/axios.js" />


const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds))
// Using callbacks
let board = document.querySelector(".board");
let player = document.querySelector(".player");
let playAgain = document.querySelector(".playAgain");
let restart = document.querySelector(".restart");
let container1 = document.querySelector(".row");
let box = 0;
let tForUser1 = tForUser2 = oForUser1 = oForUser2 = 6;
let tForImg = document.querySelector("#t-img");
let oForImg = document.querySelector("#o-img");
let inputPattern = prompt("choose toot or otto");

// let inputPattern1 = prompt("choose toot or otto");
let winnigArr = [
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5],
    [6, 7, 8, 9], [7, 8, 9, 10], [8, 9, 10, 11],
    [12, 13, 14, 15], [13, 14, 15, 16], [14, 15, 16, 17],
    [18, 19, 20, 21], [19, 20, 21, 22], [20, 21, 22, 23]
];


let gameOver = false;
let oForToot = tForOtto = [
    [1, 2], [2, 3], [3, 4],
    [7, 8], [8, 9], [9, 10],
    [13, 14], [14, 15], [15, 16],
    [19, 20], [20, 21], [21, 22]
];

let oForOtto = tForToot = [
    [0, 3], [1, 4], [2, 5],
    [6, 9], [7, 10], [8, 11],
    [12, 15], [13, 16], [14, 17],
    [18, 21], [19, 22], [20, 23]
];

let currentPlayer = 1
document.addEventListener("DOMContentLoaded", loadDOM)
//load dom function

function loadDOM() {

    createBoard();
    player.innerHTML = currentPlayer
    playAgain.addEventListener("click", reset)
    let squares = document.querySelectorAll(".board div")
    Array.from(squares).forEach(square => {

        square.addEventListener("click", clickBox)

    })
}


/////////// Create Board //////
function createBoard() {
    for (let i = 0; i < 31; i++) {
        let div = document.createElement("div")
        div.setAttribute("data-id", i)
        div.className = "square";

        if (i >= 24) {
            div.className = "taken";
            div.style.display = "none"
        }

        board.appendChild(div)
    }
}

//// How to choose the Input For Player1////
var in1 = "";
tForImg.addEventListener("click", function () {

    in1 = "t";
})
oForImg.addEventListener("click", function () {

    in1 = "o";
})


//// Get All Avilable Moves For Computer
function mmmo(click) {
    let mmm123 = []
    let squares = document.querySelectorAll(".board div");

    for (let i = 0; i < 24; i++) {
        if (click - i >= 0) {
            if (squares[click + 6 - i].classList.contains("taken") && !squares[click - i].classList.contains("taken")) {
                mmm123.push(click - i)
            }
        }
        if (click + i <= 23) {
            if (squares[click + 6 + i].classList.contains("taken") && !squares[click + i].classList.contains("taken")) {
                mmm123.push(click + i)
            }
        }

    }
    console.log(click);
    console.log(mmm123)
    let random = Math.floor(Math.random() * mmm123.length);

    return mmm123[random];

}
/////// CPU Game ////
function cpuGame(place) {

    let squares = document.querySelectorAll(".board div");

    let char = ['t', 'o'];
    let random = Math.floor(Math.random() * char.length);
    input = char[random];
    currentPlayer = 1;
    player.innerHTML = currentPlayer;
    // let mm =  mmmo(click);
    squares[place].className = "player-two taken";
    //this.className="player-two taken" ;
    if (input == 't') {
        tForUser2--;
        document.querySelector(".player2 .t-s").innerHTML = tForUser2;
        if (tForUser2 < 0) {
            tForUser2 = 0;
            document.querySelector(".player2 .t-s").innerHTML = 0;

            squares[place].classList.add('o');
            input = "o";
            oForUser2--;
            document.querySelector(".player2 .o-s").innerHTML = oForUser2;

        } else {
            // this.classList.add('t');
            squares[place].classList.add('t');
        }
    }
    else {
        oForUser2--;
        document.querySelector(".player2 .o-s").innerHTML = oForUser2;
        if (oForUser2 < 0) {
            oForUser2 = 0;
            document.querySelector(".player2 .o-s").innerHTML = 0;

            input = "t";
            tForUser2--;
            document.querySelector(".player2 .t-s").innerHTML = tForUser2;
            // this.classList.add('t');
            squares[place].classList.add('t');
        } else {
            // this.classList.add('o');
            squares[place].classList.add('o');
        }

    }


    box++;

    checkWon(2);
    checkDraw();
}



//clickBoard function
function clickBox() {
    let input = in1;
    let squares = document.querySelectorAll(".board div");

    let click = parseInt(this.dataset.id);
    // console.log(this.dataset.id);

    // smartMove(click);

    if (squares[click + 6].classList.contains("taken") && !squares[click].classList.contains("taken")) {

        if (currentPlayer === 1) {

            currentPlayer = 2;
            player.innerHTML = currentPlayer;
            this.className = "player-one taken";
            if (input == "t") {

                tForUser1--;
                document.querySelector(".player1 .t-s").innerHTML = tForUser1;
                if (tForUser1 < 0) {
                    tForUser1 = 0;
                    document.querySelector(".player1 .t-s").innerHTML = 0;
                    alert("u cant play with t");
                    input = "o"
                    this.classList.add('o');
                    oForUser1--;
                    document.querySelector(".player1 .o-s").innerHTML = oForUser1;
                }
                else {

                    this.classList.add('t')
                }

            }


            else {
                oForUser1--;
                document.querySelector(".player1 .o-s").innerHTML = oForUser1;
                if (oForUser1 < 0) {
                    alert("u cant play with o");
                    oForUser1 = 0;
                    document.querySelector(".player1 .o-s").innerHTML = 0;
                    input = "t";
                    this.classList.add('t');
                    tForUser1--;
                    document.querySelector(".player1 .t-s").innerHTML = tForUser1;
                } else {
                    this.classList.add('o');
                }


            }

            box++;
            checkWon(1);
            checkDraw();


        }
        if (gameOver == true) {

        }
        else {
            let mm = mmmo(click);
            /*smartMov(click);*/
            sleep(500).then(() => cpuGame(mm));
        }


        // Using async await





    } else {
        alert("You cannot build on an empty space or on a space that has been built on");
    }
}

/// Not Work
//function smartMove(click) {

//    let mmm123 = [];

//    let char = ['t', 'o'];
//    let random = Math.floor(Math.random() * char.length);
//    input = char[random];
//    let squares = document.querySelectorAll(".board div");

//    for (let i = 0; i < 24; i++) {
//        if (click - i >= 0) {
//            if (squares[click + 6 - i].classList.contains("taken") && !squares[click - i].classList.contains("taken")) {
//                mmm123.push(click - i)
//            }
//        }
//        if (click + i <= 23) {
//            if (squares[click + 6 + i].classList.contains("taken") && !squares[click + i].classList.contains("taken")) {
//                mmm123.push(click + i)
//            }
//        }

//    }

//    console.log("toot move  " + checkForToot(squares, mmm123));
//    console.log("otto move  " + checkForOtto(squares, mmm123));

//}

//function checkForToot(squares, mmm123) {
//    for (let y = 0; y < oForToot.length; y++) {

//        let squareOforToot = oForToot[y];

//        let squareTforToot = tForToot[y];


//        if (squareTforToot.every(q => squares[q].classList.contains("t"))) {
//            console.log("t every");
//            squareOforToot.forEach(element => {
//                if (mmm123.includes(element)) {
//                    mmm123.pop(element);
//                    let random = Math.floor(Math.random() * mmm123.length);
//                    return mmm123[random];
//                }
//            });

//        } else if (squareOforToot.every(q => squares[q].classList.contains("o"))) {
//            console.log("o every");
//            squareTforToot.forEach(element => {
//                if (mmm123.includes(element)) {
//                    mmm123.pop(element);

//                    let random = Math.floor(Math.random() * mmm123.length);
//                    return mmm123[random];
//                }
//            });

//        }

//        else if (squareTforToot.some(q => squares[q].classList.contains("t")) && squareOforToot.some(q => squares[q].classList.contains("o"))) {
//            console.log("t every");
//            squareTforToot.forEach(element => {
//                if (mmm123.includes(element)) {
//                    mmm123.pop(element);

//                }
//            });
//            squareOforToot.forEach(element => {
//                if (mmm123.includes(element)) {
//                    mmm123.pop(element);
//                    let random = Math.floor(Math.random() * mmm123.length);
//                    return mmm123[random];
//                }
//            });
//            let random = Math.floor(Math.random() * mmm123.length);
//            return mmm123[random];

//        }
//        else if (squareTforToot.some(q => squares[q].classList.contains("t")) && squareOforToot.every(q => squares[q].classList.contains("o"))) {
//            console.log("t every");
//            squareTforToot.forEach(element => {
//                if (mmm123.includes(element)) {
//                    return element
//                }
//            });
//        }

//        else if (squareTforToot.every(q => squares[q].classList.contains("t")) && squareOforToot.some(q => squares[q].classList.contains("o"))) {
//            console.log("t every");
//            squareOforToot.forEach(element => {
//                if (mmm123.includes(element)) {
//                    return element
//                }
//            });
//        }
//        else {
//            console.log("not ");
//            let random = Math.floor(Math.random() * mmm123.length);
//            return mmm123[random];
//        }

//    }
//}
//function checkForOtto(squares, mmm123) {
//    for (let y = 0; y < oForOtto.length; y++) {

//        let squareOforOtto = oForOtto[y];
//        let squareTforOtto = tForOtto[y];

//        if (squareTforOtto.every(q => squares[q].classList.contains("t"))) {
//            squareOforOtto.forEach(element => {
//                if (mmm123.includes(element)) {
//                    mmm123.pop(element);
//                    let random = Math.floor(Math.random() * mmm123.length);
//                    return mmm123[random];
//                }
//            });

//        } else if (squareOforOtto.every(q => squares[q].classList.contains("o"))) {

//            squareTforOtto.forEach(element => {
//                if (mmm123.includes(element)) {
//                    mmm123.pop(element);
//                    let random = Math.floor(Math.random() * mmm123.length);
//                    return mmm123[random];
//                }
//            });

//        }

//        else if (squareTforOtto.some(q => squares[q].classList.contains("t")) && squareOforOtto.some(q => squares[q].classList.contains("o"))) {
//            squareTforOtto.forEach(element => {
//                if (mmm123.includes(element)) {
//                    mmm123.pop(element);

//                }
//            });
//            squareOforOtto.forEach(element => {
//                if (mmm123.includes(element)) {
//                    mmm123.pop(element);
//                    let random = Math.floor(Math.random() * mmm123.length);
//                    return mmm123[random];
//                }
//            });
//            let random = Math.floor(Math.random() * mmm123.length);
//            return mmm123[random];

//        }
//        else if (squareTforOtto.some(q => squares[q].classList.contains("t")) && squareOforOtto.every(q => squares[q].classList.contains("o"))) {
//            squareTforOtto.forEach(element => {
//                if (mmm123.includes(element)) {
//                    return element
//                }
//            });
//        }

//        else if (squareTforOtto.every(q => squares[q].classList.contains("t")) && squareOforOtto.some(q => squares[q].classList.contains("o"))) {
//            squareOforOtto.forEach(element => {
//                if (mmm123.includes(element)) {
//                    return element
//                }
//            });
//        }
//        else {
//            let random = Math.floor(Math.random() * mmm123.length);
//            return mmm123[random];
//        }

//    }
//}

/// Check Won Function

function checkWon(currentPlayer) {

    let squares = document.querySelectorAll(".board div");

    for (let y = 0; y < oForToot.length; y++) {

        let squareOforToot = oForToot[y];
        let squareOforOtto = oForOtto[y];
        let squareTforToot = tForToot[y];
        let squareTforOtto = tForOtto[y];
        if (squareOforToot.every(q => squares[q].classList.contains("o")) && squareTforToot.every(q => squares[q].classList.contains("t"))) {
            if (inputPattern == "toot") {
                makeRequest(localStorage.getItem("player1Name"), 'TOOT', null)
                document.querySelector("#winnerName").value = localStorage.getItem("player1Name");
                /*document.querySelector("#winngMove").value = 'TOOT';*/
                document.querySelector(".mmm1 h2").innerHTML = `palyer 1 ${localStorage.getItem("player1Name")}   is
            the Winner and the winnig move is TOOT`;

            } else {
                makeRequest(null, null, localStorage.getItem("player1Name"))
               document.querySelector('#loserName').value = localStorage.getItem("player1Name");

                document.querySelector(".mmm1 h2").innerHTML = `palyer 2  Computer   is
            the Winner and the winnig move is OTTO`;
            }



            gameOver = true;
            sleep(200).then(restart.style.display = "flex");
            /*sleep(500).then(() => reset1());*/

        } else if (squareOforOtto.every(q => squares[q].classList.contains("o"))
            && squareTforOtto.every(q => squares[q].classList.contains("t"))) {
            if (inputPattern == "otto") {
                makeRequest(localStorage.getItem("player1Name"), 'OTTO', null)

                document.querySelector('#winnerName').value = localStorage.getItem("player1Name");

               
                document.querySelector(".mmm1 h2").innerHTML = `palyer 1 ${localStorage.getItem("player1Name")}   is
            the Winner and the winnig move is OTTO`;

            } else {

                makeRequest(null,null,localStorage.getItem("player1Name"))
                document.querySelector('#loserName').value = localStorage.getItem("player1Name");
                document.querySelector(".mmm1 h2").innerHTML = `palyer 2 Computer   is
            the Winner and the winnig move is TOOT`;
            }

            sleep(200).then(restart.style.display = "flex");

            gameOver = true;
            
        }

    }
}

/// Reset Function
function reset() {
    board.innerHTML = "";
    currentPlayer = 1;
    box = 0;
    gameOver = false;
    loadDOM();
    restart.style.display = "none"



    tForUser1 = tForUser2 = oForUser1 = oForUser2 = 6;

    player.innerHTML = currentPlayer;
    document.querySelector(".player2 .o-s").innerHTML = oForUser2;
    document.querySelector(".player2 .t-s").innerHTML = tForUser2;
    document.querySelector(".player1 .o-s").innerHTML = oForUser1;
    document.querySelector(".player1 .t-s").innerHTML = tForUser1;

}

///// Check Draw Function
function checkDraw() {
    if (box === 24) {
        document.querySelector(".mmm1 h2").innerHTML = `It's Draw`;
        restart.style.display = "flex"
        document.querySelector("#winnerName").value = localStorage.getItem("player1Name");
    }
}
function makeRequest(winnerName , winnerMove , loserName) {
    axios.post('/Home/makeReq?winnerName='+winnerName+'&move='+winnerMove+'&loser='+loserName)
        .then(function (response) {
            // handle success
            console.log(response);
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
}
