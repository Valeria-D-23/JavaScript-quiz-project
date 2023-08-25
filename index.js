const quiz = {
    //(A) PROPERTIES
    //(A1) Q&A
    //Q=QUESTION, O=OPTIONS, A=CORRECT ANSWER
    data: [
        {
            q : "What is the color of an emerald?",
            o : ['Blue', 'Green', 'Purple', 'Red'],
            a : 1,
        },
        {
            q : "Aries, Sagittarius, and Leo are three zodiac signs in which triplicity?",
            o : ['Fire', 'Water', 'Earth', 'Air'],
            a : 0,
        },
        {
            q : 'The art of folding objects out of paper to create two-dimensional and three-dimensional subjects is called what?',
            o : ['Kuramochi', 'Origami', 'Shigaraki', 'Kaga yuzen'],
            a : 1,
        },
        {
            q : 'How many planets are there in the Solar System?',
            o : ['6', '7', '8'],
            a : 2,
        },
        {
            q : 'Where was Shakespeare born?',
            o : ['France', 'Italy', 'England'],
            a : 2,
        },
        {
            q : 'How old are babies before they can shed tears?',
            o : ['1 year', '1 month', '1 day'],
            a : 1,
        },
    ],

    //(A2) HTML ELEMENTS
    hWrap: null, //HTML QUIZ CONTAINER
    hQn: null, //HTML QUESTION WRAPPER
    hAns: null, //HTML ANSWERS WRAPPER

    //(A3) GAME FLAGS
    now: 0, //CURRENT QUESTION
    score: 0, //CURRENT SCORE

    //(B) INIT QUIZ HTML
    init: () => {
        //(B1) WRAPPER
        quiz.hWrap = document.getElementById('quizWrap');
        //(B2) QUESTIONS SECTION
        quiz.hQn = document.createElement('div');
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);
        //(B3) ANSWERS SECTION
        quiz.hAns = document.createElement('div');
        quiz.hAns.id = 'quizAns';
        quiz.hWrap.appendChild(quiz.hAns);
        //(B4) GO!
        quiz.draw();
    },

    //(C) DRAW QUESTION
    draw: () => {
        //(C1) QUESTION
        quiz.hQn.innerHTML = quiz.data[quiz.now].q;

        //(C2)OPTIONS
        quiz.hAns.innerHTML = '';
        for (let i in quiz.data[quiz.now].o) {
            let radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => { quiz.select(label); });
      quiz.hAns.appendChild(label);
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);