const question = document.querySelector("#question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector("#progressText")
const scoreText = document.querySelector("#score")
const progressBarFull = document.querySelector("#progressBarFull")
const finalPercent = document.querySelector("#finalScore")

const sound100 = new Audio()
sound100.src = "media/ceFericire.mp3" //
const pestiliCont = new Audio()
pestiliCont.src = "media/pestiliConteaza.mp3"  //
const noPain = new Audio()
noPain.src = "media/noPain.mp3"  //
const baietu2008 = new Audio()
baietu2008.src = "media/2008baietu.mp3"  //
const bate = new Audio()
bate.src = "media/bate.mp3"
const lineChoice = new Audio()
lineChoice.src = "media/lineChoice.mp3" //
const mamTampit = new Audio()
mamTampit.src = "media/m_amTampit.mp3" //
const roteisan = new Audio()
roteisan.src = "media/roteisan.mp3" //
const saTerminat = new Audio()
saTerminat.src = "media/s_aTerminatSmecheria.mp3" //
const periculos = new Audio()
periculos.src = "media/periculos.mp3" //

let currentQuestion = {}
let accptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
    question: "Atât de bine mă dau:", //
    choice1: "ok",
    choice2: "efectiv pro rider",
    choice3: "mă dau jos când urc o bordură",
    answer: 2,
  },
  {
    question: "Câte componente mov ai pe bicicletă?",
    choice1: "nici una",
    choice2: "multe",
    choice3: "efectiv butuc mov",
    answer: 3,
  },
  {
    question: "Care e cea mai tare furcă de DH?", //
    choice1: "ÖOÖEOEOEOEeeEHLINS",
    choice2: "Fucking DoMaiN",
    choice3: "Fox 40, pentru că arată șmeker",
    answer: 3,
  },
  {
    question: "Pe ce tip de traseu îți place să te dai?", //
    choice1: "urc prin pădure, cobor pe șosea",
    choice2: "flow, stil A-line",
    choice3: "old-school Tare ca Piatra",
    answer: 1,
  },
  {
    question: "Riderul meu preferat este:",
    choice1: "Fabio Wibmer",
    choice2: "Serhio de la Iași",
    choice3: "Armurel Peron",
    answer: 2,
  },
  {
    question: "Dacă aș putea alege oricare trei biciclete pentru totdeauna,",
    choice1: "ar fi TREI DEHAȘURI",
    choice2: "ar fi un enduro, un dirt, un dh",
    choice3: "un Norco A-line, un Duncon Cock și un Balfa BB7, toate trei cu SuperMonster T, 24”-26”",
    answer: 1,
  },
  {
    question: "Când aterizez un jump,",
    choice1: "dau case",
    choice2: "încerc să prind aterizarea perfect cu ambele cu roți",
    choice3: "$ĖNĐ ÆN PŁÃT",
    answer: 3,
  },
  {
    question: "Cum îți setezi suspensiile?",
    choice1: "setez mai întâi sag-ul, apoi modific compresia și rebound-ul în funcție de traseu",
    choice2: "blochez furca să ruleze mai repede pe rockgarden",
    choice3: "am plătit 200mm, folosesc 200mm",
    answer: 3,
  },
  {
    question: "Ce frâne folosești?", //
    choice1: "Shimano sunt cele mai bune frâne din lume, chiar dacă Delescu o rămas fără frână într-o contrapantă Iași-style în bikepark în Franța, după o săptămână uleiul e negru în ele, au bite-point-ul unde au ele chef și se încing mai repede ca orice Avid.",
    choice2: "Avid Juicy, îs efectiv cele mai tari frâne de dh și totodată best in the west",
    choice3: "Măgura Galben cu disc de 224",
    answer: 2,
  },
  {
    question: "Cum te pregătești pentru o zi de dat?",
    choice1: "nu-mi iau nimic, ca să pot da full send, oricum iau de la ceilalți apă și mâncare",
    choice2: "îmi iau o sticlă de apă pe biclă și sper să nu leșin de foame, am belit pl dacă fac pană",
    choice3: "îmi iau apă, mâncare, multitool și  un ghiozdan cu altele, să fiu pregătit pt orice eventualitate",
    answer: 1,
  },
  {
    question: "Cum îți îngrijești bicicleta?",
    choice1: "spăl bicla la jetoane ca să arate bine, o duc la sevice odată la doi ani când deja se dezmembrează stând în balcon",
    choice2: "cum îmi ce??",
    choice3: "verific des că bicicleta e în ordine, fac service-uri regulat ca să fie fresh, repar orice e stricat, o duc la un bikeshop dacă nu mă pricep",
    answer: 2,
  },
  {
    question: "Ce faci când vrei să dai o tură la race-pace?",
    choice1: "pedală la start, pedală în viraj, pedală in aer, pedală după ce trec finișul",
    choice2: "INSIDE",
    choice3: "mă concentrez să iau perfect toate liniile, să nu frânez prea mult în viraje și să păstrez momentum-ul",
    answer: 1,
  },
  {
    question: "Cât de des te accidentezi?",
    choice1: "mă știu toate fetele de la Urgențe",
    choice2: "mai cad uneori,că dacă nu cazi, nu te dai destul de repede",
    choice3: "încerc să nu mă dau peste limitele mele, ca să nu mor",
    answer: 1,
  },
  {
    question: "Ce scuze folosești când nu ieși la dat?", //
    choice1: "scuze, azi nu mă simt bine",
    choice2: "nu vreau să murdesc bicicleta, nu vezi ce glod e afară?!",
    choice3: "aștept să iasă o colegă de la yoga",
    answer: 3,
  },
  {
    question: "Cum asculți muzică când te dai?", //
    choice1: "prefer să fiu în armonie cu butucul spate, pistonul de rebound și ciripitul păsărilor",
    choice2: "dau la maxim boxa portabilă să mă asigur că toată pădurea o auzit ce muzică de căcat ascult",
    choice3: "ascult în căști ceva care îmi trezește cheful de dat sau care acoperă zgomotele suspecte pe care le scoate bike-ul",
    answer: 2,
  },
  {
    question: "Când e momentul perfect să dai un traseu ?", //
    choice1: "după o ploaie medie ca să dau la lopată, iar la finalul zilei să ma bucur de câteva ture fără praf",
    choice2: "când pleacă toata lumea de pe eilain mai intră o tură pe păcănele",
    choice3: "în weekend, când toată grădinița e pe traseu și pământul îi dry gin rezervat la raft",
    answer: 3,
  },
  {
    question: "Setup-ul perfert ar fi:", //
    choice1: "full, single speed fără întinzător",
    choice2: "Hornet cu Domain",
    choice3: "toate hardtail-urile agresive sunt dirt-uri",
    answer: 1,
  },
  {
    question: "Cum faci un tech line ?",
    choice1: "construiesc dropuri și pun cataroaie",
    choice2: "pun țiglă",
    choice3: "motobumps",
    answer: 2,
  }
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 18

startQuiz = () => {
  document.getElementById("end").style.display = "none"
  document.getElementById("meme").style.display = "none"
  document.getElementById("next-btn").style.display = "none"
  document.getElementById("quiz").style.display = "block"
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score)
    var percent = Math.floor((score*100)/MAX_QUESTIONS)
    finalPercent.innerText = percent + "% PRO RIDER"
    setTimeout(() => {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("end").style.display = "block"
    }, 300)
    setTimeout(() => {
      if(percent == 100) {
        sound100.play()
      }
      if(percent < 100 && percent > 89) {
        saTerminat.play()
      }
      if(percent < 90 && percent > 79) {
        baietu2008.play()
      }
      if(percent < 80 && percent > 59) {
        periculos.play()
      }
      if(percent < 60 && percent > 49) {
        roteisan.play()
      }
      if(percent < 50 && percent > 29) {
        mamTampit.play()
      }
      if(percent < 30 && percent >= 0) {
        bate.play()
      }
    }, 500)
  }

  questionCounter++
  progressText.innerText = `Întrebarea ${questionCounter} din ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  if(availableQuestions.length > 0) {
    if(currentQuestion.question == "Cum faci un tech line ?") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/radaciniFake.jpg";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Dacă aș putea alege oricare trei biciclete pentru totdeauna,") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/altDH.jpg";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Când aterizez un jump,") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/pedalier.jpg";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Riderul meu preferat este:") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/ochelariSergiu.jpg";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Cum îți setezi suspensiile?") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/setari.jpg";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Cum te pregătești pentru o zi de dat?") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/bulan.jpg";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Cum îți îngrijești bicicleta?") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/bikeF.jpg";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Ce faci când vrei să dai o tură la race-pace?") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/sant.jpg";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Câte componente mov ai pe bicicletă?") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/purpleDealer2.png";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    if(currentQuestion.question == "Cât de des te accidentezi?") {
      document.getElementById("quiz").style.display = "none"
      document.getElementById("meme").src = "media/pestiliConteaza.gif";
      document.getElementById("meme").style.display = "block"
      document.getElementById("next-btn").style.display = "block"
    }
    showQuiz = () => {
      document.getElementById("quiz").style.display = "block"
      document.getElementById("meme").style.display = "none"
      document.getElementById("next-btn").style.display = "none"
    }
    question.innerText = currentQuestion.question
    choices.forEach(choice => {
      const number = choice.dataset["number"]
      choice.innerText = number + ": " + currentQuestion["choice" + number]
    })
  }

  if(currentQuestion.question == "Când aterizez un jump,") {
    setTimeout(() => {
      pestiliCont.play()
    }, 500)
  }
  if(currentQuestion.question == "Cât de des te accidentezi?") {
    setTimeout(() => {
      noPain.play()
    }, 500)
  }
  if(currentQuestion.question == "Cum faci un tech line ?") {
    setTimeout(() => {
      lineChoice.play()
    }, 500)
  }

  availableQuestions.splice(questionsIndex, 1)

  accptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!accptingAnswers) return
    accptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset["number"]
    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" :
      "incorrect"
    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS)
    }
    // selectedChoice.parentElement.classList.add(classToApply)
    setTimeout(() => {
      // selectedChoice.parentElement.classList.remove(classToApply)
      // document.getElementById("question").style.fontSize = "8rem"
      getNewQuestion()
    }, 300)
  })
})

incrementScore = num => {
  score += num
  // scoreText.innerText = score
}
startQuiz()
