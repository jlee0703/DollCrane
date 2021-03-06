window.addEventListener("load", work);

const getScore = document.querySelector(".score > p");
var score = "최고점수: " + 0;

function work() {
  // 로그인 작업 시작
  const startBtn = document.querySelector(".start > input");
  const resetBtn = document.querySelector(".restart > input");
  var player;
  const getName = document.querySelector(".player > h5");
  const playerName = document.querySelector(".playername");
  const bestScore = document.querySelector(".bestscore");
  const getBox = document.querySelector(".resultBox");
  var getBasket = 0;
  const getBtn = document.querySelector(".pickDoll");
  const getLines = document.querySelectorAll(".dollBoxWrap > ul");

  const getdollBox = document.querySelector(".dollBoxWrap");
  const getFive = document.querySelectorAll(".five > li");

  resetBtn.addEventListener("click", resetWork);

  function resetWork() {
    util.outWork();
  }

  startBtn.addEventListener("click", startWork);

  function startWork() {
    player = prompt("플레이어의 이름을 입력하세요");
    startTime = new Date().getTime();

    if (player === "") {
      getName.textContent = "Anonymous" + "님이 도전 중입니다.";
    } else {
      getName.textContent = player + "님이 도전 중입니다.";
    }

    // 선택 작업

    getBtn.addEventListener("click", btnWork);

    util.checkWork();

    var targetNr;
    var pickDoll;
    var vNr = 4;

    function btnWork(e) {
      targetNr = e.target.value;
      pickDoll = pickup(getLines, targetNr);

      // 종료 작업. 바구니가 가득 찼을 시, 종료 메세지를 띄우고, outWork을 실행
      if (getBox.children[0].children[0].alt !== "") {
        util.scoreWork();
        util.outWork();
      }

      // 선택 작업. 바구니의 [vNr]번 째 칸이 비어있다면 담기
      if (getBox.children[vNr].children[0].alt === "") {
        getBox.children[vNr].children[0].outerHTML = pickDoll.outerHTML;
        console.log(vNr, "바구니가 0일 때");
        util.checkWork();
      } else if (getBox.children[vNr].children[0].alt === pickDoll.alt) {
        getBox.children[vNr].children[0].outerHTML = '<img src="" alt="">';
        vNr === 4 ? (vNr = 4) : (vNr = vNr + 1);
        // playerName.textContent = getName.textContent;
        bestScore.textContent = 10 + bestScore.textContent / 1;
        console.log(vNr, "일치할 때");
        setTimeout(util.checkWork, 500);
      } else if (getBox.children[vNr].children[0].alt !== pickDoll.alt) {
        getBox.children[vNr].previousElementSibling.children[0].outerHTML =
          pickDoll.outerHTML;
        vNr = vNr - 1;
        console.log(vNr, "일치하지 않을 때");
        util.checkWork();
      }

      function pickup(getLines, index) {
        for (let i = 0; i < 5; i++) {
          if (getLines[i].children[index - 1].children[0].alt !== "") {
            pickDoll = getLines[i].children[index - 1].children[0];
            getLines[i].children[index - 1].children[0].outerHTML =
              '<img src="" alt="" />';
            return pickDoll;
          }
        }
      }
    }
  } // function startWork

  var util = {
    scoreWork: function () {
      var endTime = bestScore.textContent / 1;
      alert(player + "님의 점수는 " + endTime + "점 입니다.");
    },
    basketWork: function () {
      for (let i = 4; i > -1; i--) {
        if (getBox.children[i].children[0].alt !== "") {
          getBasket = getBasket + 1;
          console.log(getBasket);
        }
      }
    },
    checkWork: function () {
      if (bestScore.textContent === "90") {
        util.endWork();
      }
    },
    endWork: function () {
      util.scoreWork();
      util.outWork();
    },
    outWork: function () {
      location.reload(true);
      location.href = location.href;
      history.go(0);
    },
  }; // function util
} // function work
