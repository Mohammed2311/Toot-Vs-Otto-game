let board = document.querySelector(".board");
let player = document.querySelector(".player");
let playAgain = document.querySelector(".playAgain");

let restart = document.querySelector(".restart");

let container1 = document.querySelector(".row");
let box = 0;
let ends = [6, 13, 20, 27, 34, 41];
let tForUser1 = tForUser2 = oForUser1 = oForUser2 = 6;
let tForImg = document.querySelector("#t-img");
let oForImg = document.querySelector("#o-img");

let inputPattern = prompt("choose toot or otto");
let winnigArr = [
    [0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5],
    [6, 7, 8, 9], [7, 8, 9, 10], [8, 9, 10, 11],
    [12, 13, 14, 15], [13, 14, 15, 16], [14, 15, 16, 17],
    [18, 19, 20, 21], [19, 20, 21, 22], [20, 21, 22, 23]
];
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


/////////// Board  //////
function createBoard() {
    for (let i = 0; i < 31; i++) {
        let div = document.createElement("div")
        div.setAttribute("data-id", i)
        div.className = "square";

        if (i >= 24) {
            div.className = "taken";
        }

        board.appendChild(div)
    }
}
var in1 = "";
tForImg.addEventListener("click", function () {

    in1 = "t";
})
oForImg.addEventListener("click", function () {

    in1 = "o";
})
//clickBoard function
function clickBox() {
    let input = in1;
    let squares = document.querySelectorAll(".board div");

    let click = parseInt(this.dataset.id);
    // console.log(this.dataset.id);



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
        }
        else if (currentPlayer === 2) {

            currentPlayer = 1;
            player.innerHTML = currentPlayer;
            this.className = "player-two taken";
            if (input == 't') {
                tForUser2--;
                document.querySelector(".player2 .t-s").innerHTML = tForUser2;
                if (tForUser2 < 0) {
                    tForUser2 = 0;
                    document.querySelector(".player2 .t-s").innerHTML = 0;
                    alert("you cant play with t");
                    this.classList.add('o');
                    input = "o";
                    oForUser2--;
                    document.querySelector(".player2 .o-s").innerHTML = oForUser2;

                } else {
                    this.classList.add('t');
                }
            }
            else {
                oForUser2--;
                document.querySelector(".player2 .o-s").innerHTML = oForUser2;
                if (oForUser2 < 0) {
                    oForUser2 = 0;
                    document.querySelector(".player2 .o-s").innerHTML = 0;
                    alert("you cant play with o");
                    input = "t";
                    tForUser2--;
                    document.querySelector(".player2 .t-s").innerHTML = tForUser2;
                    this.classList.add('t');
                } else {
                    this.classList.add('o');
                }

            }

            console.log(this.className);
            box++;
            checkWon(2);
            


        }
        if (box === 24) {
            document.querySelector(".mmm1 h2").innerHTML = `It's Draw`;
            document.querySelector("#winnerName").value = localStorage.getItem("player1Name");
            document.querySelector("#loserName").value = localStorage.getItem("player2Name");
            setTimeout(() => restart.style.display = "flex", 500);

        }
    } else {
        alert("You cannot build on an empty space or on a space that has been built on");
    }
}
//Check the win
function checkWon(currentPlayer) {
    let squares = document.querySelectorAll(".board div");
    for (let y = 0; y < oForToot.length; y++) {

        let squareOforToot = oForToot[y];
        let squareOforOtto = oForOtto[y];
        let squareTforToot = tForToot[y];
        let squareTforOtto = tForOtto[y];
        if (squareOforToot.every(q => squares[q].classList.contains("o")) && squareTforToot.every(q => squares[q].classList.contains("t"))) {
            if (inputPattern == "toot") {
                makeRequest(localStorage.getItem("player1Name"), 'TOOT', localStorage.getItem("player2Name"))
                
                document.querySelector("#winnerName").value = localStorage.getItem("player1Name");
                document.querySelector("#loserName").value = localStorage.getItem("player2Name");
                /*document.querySelector("#winngMove").value = 'TOOT';*/
                document.querySelector(".mmm1 h2").innerHTML = `palyer 1 ${localStorage.getItem("player1Name")}   is
            the Winner and the winnig move is TOOT`;
                
            } else {
                makeRequest(localStorage.getItem("player2Name"), 'TOOT', localStorage.getItem("player1Name"))
                document.querySelector(" #winnerName").value = localStorage.getItem("player2Name");
                document.querySelector("#loserName").value = localStorage.getItem("player1Name");
                /*document.querySelector("#winngMove").value = 'TOOT';*/
                document.querySelector(".mmm1 h2").innerHTML = `palyer 2  ${localStorage.getItem("player2Name")}   is
            the Winner and the winnig move is TOOT`;
            }
            
            setTimeout(() => restart.style.display = "flex", 500);

        } else if (squareOforOtto.every(q => squares[q].classList.contains("o"))
            && squareTforOtto.every(q => squares[q].classList.contains("t"))) {
            if (inputPattern == "otto") {
                
                makeRequest(localStorage.getItem("player1Name"), 'OTTO', localStorage.getItem("player2Name"))
                document.querySelector("#winnerName").value = localStorage.getItem("player1Name");
                document.querySelector("#loserName").value = localStorage.getItem("player2Name");
                document.querySelector(".mmm1 h2").innerHTML = `palyer 1 ${localStorage.getItem("player1Name")}   is
            the Winner and the winnig move is OTTO`;
            } else {
                // document.querySelector("#winnerName").value = localStorage.getItem("player2Name");
                makeRequest(localStorage.getItem("player2Name"), 'OTTO', localStorage.getItem("player1Name"))
                document.querySelector("#winnerName").value = localStorage.getItem("player2Name");
                document.querySelector("#loserName").value = localStorage.getItem("player1Name");
                /*document.querySelector("#winngMove").value = 'OTTO';*/
                
                document.querySelector(".mmm1 h2").innerHTML = `palyer 2  ${localStorage.getItem("player2Name")}   is
            the Winner and the winnig move is OTTO`;
            }
            
            setTimeout(() => restart.style.display = "flex", 500);
        }

    }
}
// Reset the game
function reset() {
    board.innerHTML = ""
    /*inputPattern = prompt("choose toot or otto");*/
    loadDOM()
    restart.style.display = "none"
    box = 0;
    tForUser1 = tForUser2 = oForUser1 = oForUser2 = 6;
    document.querySelector(".player2 .o-s").innerHTML = oForUser2;
    document.querySelector(".player2 .t-s").innerHTML = tForUser2;
    document.querySelector(".player1 .o-s").innerHTML = oForUser1;
    document.querySelector(".player1 .t-s").innerHTML = tForUser1;

}

function makeRequest(winnerName, winnerMove, loserName) {
    axios.post('/Home/makeReq2?winnerName=' + winnerName + '&move=' + winnerMove + '&loser=' + loserName)
        .then(function (response) {
            // handle success
            console.log(response);
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
}
