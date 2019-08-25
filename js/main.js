let playzone = document.querySelector('.playzone');

// draw cells

for (let i = 0; i < 9; i++){
  let block = document.createElement('div');
  block.className = 'block';
  block.dataset.index = i+1;
  
  playzone.appendChild(block);
}

// fill cells

let fillX = true;
let fillO = false;
let filledX = [];
let filledO = [];
let steps = 0;

function fill(target){
  let index = Number(target.dataset.index); 
  if (fillX){
    target.innerHTML = '<p>X</p>';
    filledX.push(index);
    [fillX, fillO] = [fillO, fillX];
  }else{
    target.innerHTML = '<p>O</p>';
    filledO.push(index);
    [fillX, fillO] = [fillO, fillX];
  }
  steps += 1;
  target.classList.add('actived');
}





// add event listeners

let reset = document.querySelector('.reset');
reset.addEventListener('click', clear);


playzone.addEventListener('click', function(event){
  let target = event.target;
  if (!target.classList.contains('block') || target.classList.contains('actived')) return;
  fill(target);
  setTimeout(checkWinner, 1000);
})

// checking winner

function checkWinner(){
  let winnerCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  if (winnerCombination.some(item => item.every(el => filledX.includes(el)))){
    alert('Winner is X');
    clear();
    return;
  }
  if (winnerCombination.some(item => item.every(el => filledO.includes(el)))){
    alert('Winner is O');
    clear();
    return;
  }
  if (steps === 9){
    alert('Draw');
    clear();
    return;
  }
}

// clear blocks

function clear(){
  let blocks = document.querySelectorAll('.block');
  for (let i = 0; i < blocks.length; i++){
    if (blocks[i].hasChildNodes()){
      let p = blocks[i].querySelector('p');
      blocks[i].removeChild(p); 
    }
    blocks[i].classList.remove('actived');
  }
  fillX = true;
  fillO = false;
  filledX = [];
  filledO = [];
  steps = 0;
}
