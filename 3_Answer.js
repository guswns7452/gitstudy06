// ------------------------------------------StopWatch----------------------------------------------- //
//시계 시작 - 재귀호출로 반복실행
let timerId;
let time = 0;
const stopwatch = document.getElementById("time");
let  hour, min, sec;


function printTime() {
    time++;
    stopwatch.innerText = getTimeFormatString();
}

function startClock() {
  printTime();
  stopClock();
  timerId = setTimeout(startClock, 1000);
}

//시계 중지
function stopClock() {
  if (timerId != null) {
      clearTimeout(timerId);
  }
}

// 시계 초기화
function resetClock() {
  stopClock()
  stopwatch.innerText = "00:00:00";
  time = 0;
}

// 시간(int)을 시, 분, 초 문자열로 변환
function getTimeFormatString() {
  hour = parseInt(String(time / (60 * 60)));
  min = parseInt(String((time - (hour * 60 * 60)) / 60));
  sec = time % 60;

  return String(hour).padStart(2, '0') + ":" + String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
}

// ------------------------------------------------------------------------------------------- //
const input = document.querySelector('#input');

// 3. checker 함수 = change 이벤트 했을때,
function checker() {

  // 3-1 모든 word라는 클래스명을 가진 태그들에 대해서
  const words = document.querySelectorAll('.word');
  // 4. 글자들이 다 사라졌다면,
  if (words.length === 1) {
    stopClock(); // 4-1 시계를 멈추고
    const FinishTime = document.querySelector("#time").textContent; // 4-1 종료시간을 기록하고
    alert('Success!! Your Time '+ FinishTime); // 4-1 종료시간 출력
    if(confirm('retry?')) { // 4-1 다시하기를 누르면
      resetClock(); // 4-1 시계 초기화
      window.location.reload(); // 4-1 화면도 다시 초기화(글자 재생성, )
    }
  }
  
  // 5. 글자가 아직 존재한다면
  else{
    // 5-1 HTML 소스 내에 있는 word 태그들을 불러와
    for (const i in document.querySelectorAll('.word')){
      // 5-1 input의 값과 비교해서 동일하면
      if(input.value == document.querySelectorAll('.word')[i].dataset.word){
        removeWord = document.querySelectorAll('.word')[i]; // 5-1 제거대상임
        break;
      }
      // 5-1 동일하지 않으면 input을 빨간색으로 만들어버리자
      else{
        input.classList.add("error");
        input.focus();
      }
    }
    
    console.log(removeWord);
    // 5-1 break 했으니 삭제대상을 삭제함.
    removeWord.remove();  
  }
  
  // 5-1 input값 다시 초기화 해줌.
  input.value = '';
  input.classList.remove("error");  // 5-1 빨간색도 없애줘야지.
}

// 1. input태그가 change라는 이벤트가 만들어지면 checker라는 함수를 불러옴
input.addEventListener('change',checker);
// 2. 스탑워치 시작!
startClock();
