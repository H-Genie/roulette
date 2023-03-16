var rolLength = 6; // 해당 룰렛 콘텐츠 갯수
var setNum; // 랜덤숫자 담을 변수
var hiddenInput = document.createElement("input");
hiddenInput.className = "hidden-input";

//랜덤숫자부여
const rRandom = () => {
  var min = Math.ceil(0);
  var max = Math.floor(rolLength - 1);
  return Math.floor(Math.random() * (max - min)) + min;
};

const rRotate = () => {
  var panel = document.querySelector(".rouletter-wacu");
  var btn = document.querySelector(".rouletter-btn");
  var deg = [];
  // 룰렛 각도 설정(rolLength = 6)
  for (var i = 1, len = rolLength; i <= len; i++) {
    deg.push((360 / len) * i);
  }

  // 랜덤 생성된 숫자를 히든 인풋에 넣기
  var num = 0;
  document.body.append(hiddenInput);
  setNum = hiddenInput.value = rRandom();

  // console.log(setNum)
  // 0 : 60deg - 스타벅스
  // 1 : 120deg - BBQ
  // 2 : 180deg - 배스킨라빈스
  // 3 : 240deg - 스타벅스
  // 4 : 300deg - BBQ
  // 5 : 360deg - 배스킨라빈스

  // 애니설정
  var ani = setInterval(() => {
    num++;
    panel.style.transform = "rotate(" + 360 * num + "deg)";
    btn.disabled = true; //button,input
    btn.style.pointerEvents = "none"; //a 태그

    // 총 50에 다달했을때, 즉 마지막 바퀴를 돌고나서
    if (num === 50) {
      clearInterval(ani);
      panel.style.transform = `rotate(${deg[setNum]}deg)`;
    }
  }, 50);
};

// 정해진 alert띄우기, custom modal등
const rLayerPopup = (num) => {
  switch (num) {
    case 0:
    case 3:
      return alert("스타벅스")
    case 1:
    case 4:
      return alert("BBQ")
    case 2:
    case 5:
      return alert("배스킨라빈스")
    default:
      return
  }
};

// reset
const rReset = (ele) => {
  setTimeout(() => {
    ele.disabled = false;
    ele.style.pointerEvents = "auto";
    rLayerPopup(setNum);
    hiddenInput.remove();
  }, 5500);
};

// 룰렛 이벤트 클릭 버튼
document.addEventListener("click", function (e) {
  var target = e.target;
  if (target.tagName === "BUTTON") {
    rRotate();
    rReset(target);
  }
});

// roulette default
// document.getElementById("app").innerHTML = `
// <div class="rouletter">
//     <div class="rouletter-bg">
//         <div class="rouletter-wacu"></div>
//     </div>
//     <div class="rouletter-arrow"></div>
//     <button class="rouletter-btn">start</button>
// </div>
// `;