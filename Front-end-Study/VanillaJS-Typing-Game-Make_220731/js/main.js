//사용변수
const GAME_TIME = 9;
let score = 0; //점수는 0으로 초기화
let time = GAME_TIME;
let isPlaying = false; //게임 state를 나타내기위해
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init()

function init(){
  getWords()
}

async function getWords() {
  let response = await axios.get(
    'https://random-word-api.herokuapp.com/word?number=100'
  );
  response.data.forEach((word) => {
    if (word.length < 10) {
      words.push(word);
    }
  });
  if(response !== ''){
    buttonChange('게임시작');
  }
} 

function countDown() {
  //삼항연산자
  time > 0 ? time-- : isPlaying = false;
  if (!isPlaying) {
    clearInterval(timeInterval); //종료시키는거
  }
  timeDisplay.innerText = time;
}

function buttonChange(text){
  button.innerText = text
  button.style.cursor = 'pointer'
  text === '게임시작'
    ? button.classList.remove('loading')
    : button.classList.add('loading');
}

function run(){
  isPlaying = true;
  time = GAME_TIME; //게임시작할때 시간 항상 GAME_TIME으로 초기화
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000); //1초마다 countDown이 실행되도록
  checkInterval = setInterval(checkStatus, 50); //0.05초마다 게임상태를 체크하도록함
  buttonChange('게임중');
}

function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange('게임시작');
    clearInterval(checkInterval);
  }
}