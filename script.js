/* =====================================================
   SISTEMA GERAL
===================================================== */

const totalPoints = document.getElementById("statPoints");

let globalScore = 0;


/* =====================================================
   ATUALIZAR PONTUAÇÃO
===================================================== */

function addPoints(points) {

    globalScore += points;

    if (totalPoints) {
        totalPoints.textContent =
            String(globalScore).padStart(3, "0");
    }
}


/* =====================================================
   BOTÃO PREMIUM
===================================================== */

const themeButton =
    document.getElementById("themeButton");

if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "premium-mode"
            );

        }
    );

}


/* =====================================================
   JOGOS
===================================================== */

const gameButtons =
    document.querySelectorAll(".game-button");

const quizPanel =
    document.getElementById("quizPanel");

const clickPanel =
    document.getElementById("clickPanel");


gameButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const game =
                button.dataset.game;


            if (quizPanel) {
                quizPanel.classList.remove(
                    "active"
                );
            }

            if (clickPanel) {
                clickPanel.classList.remove(
                    "active"
                );
            }


            if (game === "quiz") {

                quizPanel.classList.add(
                    "active"
                );

                startQuiz();

            }


            if (game === "clicks") {

                clickPanel.classList.add(
                    "active"
                );

                startClickGame();

            }


            const panel =
                game === "quiz"
                    ? quizPanel
                    : clickPanel;


            if (panel) {

                setTimeout(() => {

                    panel.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 100);

            }

        }
    );

});


/* =====================================================
   QUIZ
===================================================== */

const questions = [

    {
        question:
            "Qual linguagem é utilizada para estruturar uma página web?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Python"
        ],

        correct: 0
    },


    {
        question:
            "Qual propriedade CSS é usada para criar uma transformação?",

        answers: [
            "display",
            "transform",
            "position",
            "margin"
        ],

        correct: 1
    },


    {
        question:
            "Qual seletor é utilizado para aplicar um efeito ao passar o mouse?",

        answers: [
            ":click",
            ":mouse",
            ":hover",
            ":active"
        ],

        correct: 2
    }

];


let currentQuestion = 0;

let quizPoints = 0;


const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const quizScore =
    document.getElementById("quizScore");


function startQuiz() {

    currentQuestion = 0;

    quizPoints = 0;

    quizScore.textContent = "0";

    showQuestion();

}


function showQuestion() {

    const question =
        questions[currentQuestion];


    questionElement.textContent =
        question.question;


    answersElement.innerHTML = "";


    question.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.textContent =
                answer;


            button.addEventListener(
                "click",
                () => {

                    checkAnswer(
                        index,
                        button
                    );

                }
            );


            answersElement.appendChild(
                button
            );

        }
    );

}


function checkAnswer(
    selected,
    button
) {

    const question =
        questions[currentQuestion];


    const buttons =
        answersElement.querySelectorAll(
            "button"
        );


    buttons.forEach(
        btn => {
            btn.disabled = true;
        }
    );


    if (
        selected ===
        question.correct
    ) {

        button.classList.add(
            "correct"
        );

        quizPoints += 100;

        addPoints(100);

    } else {

        button.classList.add(
            "wrong"
        );

        buttons[
            question.correct
        ].classList.add(
            "correct"
        );

    }


    quizScore.textContent =
        quizPoints;


    setTimeout(() => {

        currentQuestion++;


        if (
            currentQuestion <
            questions.length
        ) {

            showQuestion();

        } else {

            questionElement.textContent =
                `🏆 Quiz concluído! Você fez ${quizPoints} pontos.`;

            answersElement.innerHTML = "";

            const restart =
                document.createElement(
                    "button"
                );

            restart.textContent =
                "Jogar novamente";

            restart.addEventListener(
                "click",
                startQuiz
            );

            answersElement.appendChild(
                restart
            );

        }

    }, 1000);

}


/* =====================================================
   DESAFIO DE CLIQUES
===================================================== */

const clickTarget =
    document.getElementById(
        "clickTarget"
    );

const clickScore =
    document.getElementById(
        "clickScore"
    );

const timerElement =
    document.getElementById(
        "timer"
    );


let clicks = 0;

let timeLeft = 10;

let clickGameRunning = false;

let clickInterval;


function startClickGame() {

    clearInterval(
        clickInterval
    );


    clicks = 0;

    timeLeft = 10;

    clickGameRunning = false;


    clickScore.textContent =
        "0";

    timerElement.textContent =
        "10";


    clickTarget.textContent =
        "COMEÇAR";


    clickTarget.onclick =
        beginClickGame;

}


function beginClickGame() {

    if (clickGameRunning) {
        return;
    }


    clickGameRunning = true;

    clicks = 0;

    timeLeft = 10;


    clickScore.textContent =
        "0";

    timerElement.textContent =
        "10";


    clickTarget.textContent =
        "CLIQUE!";


    clickTarget.onclick =
        countClick;


    clickInterval =
        setInterval(
            () => {

                timeLeft--;

                timerElement.textContent =
                    timeLeft;


                if (timeLeft <= 0) {

                    finishClickGame();

                }

            },
            1000
        );

}


function countClick() {

    if (!clickGameRunning) {
        return;
    }


    clicks++;


    clickScore.textContent =
        clicks;


    /* pontuação */

    addPoints(5);


    /* pequena animação */

    clickTarget.style.transform =
        "scale(0.93)";


    setTimeout(() => {

        clickTarget.style.transform =
            "";

    }, 80);

}


function finishClickGame() {

    clearInterval(
        clickInterval
    );


    clickGameRunning = false;


    clickTarget.onclick =
        beginClickGame;


    clickTarget.textContent =
        "JOGAR NOVAMENTE";


    timerElement.textContent =
        "0";


    clickScore.textContent =
        clicks;

}


/* =====================================================
   ANIMAÇÃO DOS CARDS AO ENTRAR NA TELA
===================================================== */

const cards =
    document.querySelectorAll(
        "article, .game-card, .about-card"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


cards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(20px)";

    card.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(card);

});


/* =====================================================
   CLASSE VISÍVEL
===================================================== */

const animationStyle =
    document.createElement("style");


animationStyle.textContent = `

    article.visible,
    .game-card.visible,
    .about-card.visible {

        opacity: 1 !important;

        transform: translateY(0) !important;

    }

    article.visible:hover {

        transform: scale(1.02) !important;

    }

`;


document.head.appendChild(
    animationStyle
);


/* =====================================================
   ANO AUTOMÁTICO
===================================================== */

console.log(
    "Central Premium carregada com sucesso."
);
