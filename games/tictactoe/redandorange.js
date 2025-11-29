var board = []; //representing our tictactoe board
for(var i = 0; i < 9; i++){
  board.push('');
}
var turn = 1; // 1 if X, -1 if O


var so_c = document.getElementById('so-c');

function buttonPressed(button,num){
  if( (board[num] != 'X') && (board[num] != 'O') ){
    //whose turn is it
    //if turn is one
    if(turn == 1){
      //then place x
      board[num] = 'X';
      document.getElementById(button).innerHTML = "✘";
      document.getElementById('header2').innerHTML = "O's turn"
      check('X');
    } else {
      board[num] = 'O';
      document.getElementById(button).innerHTML = "O";
      document.getElementById('header2').innerHTML = "X's turn"
      check('O');
    }
    //change turn
    turn *= -1;
  }
}

function check(letter){
  //board[0], board[1], board[2]
  if(board[0]==letter && board[1] == letter && board[2] == letter){
    document.getElementById("header2").innerHTML = letter + " wins!";
    wins(letter);
  }
  // 3, 4, 5
  if(board[3]==letter && board[4] == letter && board[5] == letter){
    document.getElementById("header2").innerHTML = letter + " wins!";
    wins(letter);
  }
  // 6, 7, 8
  if(board[6]==letter && board[7] == letter && board[8] == letter){
    document.getElementById("header2").innerHTML = letter + " wins!";
    wins(letter);
  }
  // 0, 3, 6
  if(board[0]==letter && board[3] == letter && board[6] == letter){
    document.getElementById("header2").innerHTML = letter + " wins!";
    wins(letter);
  }
  // 1, 4, 7
  if(board[1]==letter && board[4] == letter && board[7] == letter){
    document.getElementById("header2").innerHTML = letter + " wins!";
    wins(letter);
  }
  // 2, 5, 8
  if(board[2]==letter && board[5] == letter && board[8] == letter){
    document.getElementById("header2").innerHTML = letter + " wins!";
    wins(letter);
  }
  // 0, 4, 8
  if(board[0]==letter && board[4] == letter && board[8] == letter){
    document.getElementById("header2").innerHTML = letter + " wins!";
    wins(letter);
  }
  // 2, 4, 6
  if(board[2]==letter && board[4] == letter && board[6] == letter){
    document.getElementById("header2").innerHTML = letter + " wins!";
    wins(letter);
  }
}

function wins(letter){
  for(var i = 0; i < board.length; i++){
    board[i] = letter;
  }
}