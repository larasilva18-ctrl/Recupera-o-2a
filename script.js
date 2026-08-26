/* =====================================================
   ELEMENTOS
===================================================== */

const buttons =
    document.querySelectorAll(".read-more");

const toast =
    document.getElementById("toast");

const exploreButton =
    document.getElementById("exploreButton");


/* =====================================================
   BOTÕES DOS ARTIGOS
===================================================== */

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const card =
            button.closest("article");

        const title =
            card
                .querySelector("h3")
                .textContent
                .trim();

        showToast(
            `Selecionado: ${title}`
        );

    });

});


/* =====================================================
   BOTÃO EXPLORAR
===================================================== */

exploreButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("postagens")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

    toast.innerHTML = `
        <span>✓</span>
        ${message}
    `;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =====================================================
   ANIMAÇÃO DOS CARDS
===================================================== */

const cards =
    document.querySelectorAll(".card");

const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition = `
        opacity 0.7s ease ${index * 0.12}s,
        transform 0.7s ease ${index * 0.12}s
    `;

    observer.observe(card);

});


/* =====================================================
   ESTILO DE ENTRADA
===================================================== */

const animationStyle =
    document.createElement("style");

animationStyle.textContent = `

    .card.visible {

        opacity: 1 !important;

        transform:
            translateY(0) !important;

    }

`;

document.head.appendChild(
    animationStyle
);


/* =====================================================
   QUIZ
===================================================== */

const startQuiz =
    document.getElementById("startQuiz");

const quizPanel =
    document.getElementById("quizPanel");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const quizScore =
    document.getElementById("quizScore");

const quizProgress =
    document.getElementById("quizProgress");


const quizQuestions = [

    {
        question:
            "Qual linguagem é utilizada para estruturar páginas web?",

        answers:
            ["HTML", "CSS", "Python", "SQL"],

        correct:
            "HTML"
    },

    {
        question:
            "Qual linguagem é responsável pela estilização das páginas?",

        answers:
            ["HTML", "CSS", "Java", "PHP"],

        correct:
            "CSS"
    },

    {
        question:
            "Qual tecnologia adiciona interatividade às páginas?",

        answers:
            ["HTML", "CSS", "JavaScript", "SQL"],

        correct:
            "JavaScript"
    }

];


let currentQuestion = 0;

let score = 0;


/* INICIAR QUIZ */

startQuiz.addEventListener(
    "click",
    () => {

        quizPanel.classList.add(
            "active"
        );

        currentQuestion = 0;

        score = 0;

        quizScore.textContent =
            score;

        loadQuestion();

        quizPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* CARREGAR PERGUNTA */

function loadQuestion() {

    const current =
        quizQuestions[currentQuestion];

    question.textContent =
        current.question;

    quizProgress.textContent =
        `${currentQuestion + 1} / ${quizQuestions.length}`;

    answers.innerHTML = "";


    current.answers.forEach(
        (answer) => {

            const button =
                document.createElement(
                    "button"
                );

            button.textContent =
                answer;

            button.dataset.answer =
                answer;

            button.addEventListener(
                "click",
                () => checkAnswer(
                    button,
                    answer
                )
            );

            answers.appendChild(
                button
            );

        }
    );

}


/* VERIFICAR RESPOSTA */

function checkAnswer(
    button,
    answer
) {

    const current =
        quizQuestions[currentQuestion];


    const allButtons =
        answers.querySelectorAll(
            "button"
        );

    allButtons.forEach(
        (item) => {

            item.disabled = true;

        }
    );


    if (
        answer ===
        current.correct
    ) {

        button.classList.add(
            "correct"
        );

        score += 10;

        quizScore.textContent =
            score;

        showToast(
            "Resposta correta! +10 pontos"
        );

    } else {

        button.classList.add(
            "wrong"
        );

        allButtons.forEach(
            (item) => {

                if (
                    item.dataset.answer ===
                    current.correct
                ) {

                    item.classList.add(
                        "correct"
                    );

                }

            }
        );

        showToast(
            "Resposta incorreta!"
        );

    }


    setTimeout(
        () => {

            currentQuestion++;

            if (
                currentQuestion <
                quizQuestions.length
            ) {

                loadQuestion();

            } else {

                question.textContent =
                    `Quiz finalizado! Você fez ${score} pontos.`;

                answers.innerHTML = `
                    <button
                        id="restartQuiz"
                    >
                        Jogar novamente
                    </button>
                `;

                quizProgress.textContent =
                    "FINAL";

                document
                    .getElementById(
                        "restartQuiz"
                    )
                    .addEventListener(
                        "click",
                        () => {

                            currentQuestion =
                                0;

                            score =
                                0;

                            quizScore.textContent =
                                "0";

                            loadQuestion();

                        }
                    );

            }

        },
        900
    );

}


/* =====================================================
   JOGO DE CLIQUES
===================================================== */

const startClickGame =
    document.getElementById(
        "startClickGame"
    );

const clickPanel =
    document.getElementById(
        "clickPanel"
    );

const clickTarget =
    document.getElementById(
        "clickTarget"
    );

const clickScore =
    document.getElementById(
        "clickScore"
    );

const timer =
    document.getElementById(
        "timer"
    );

const resetClick =
    document.getElementById(
        "resetClick"
    );


let clicks = 0;

let timeLeft = 10;

let gameRunning = false;

let gameTimer;


/* INICIAR */

startClickGame.addEventListener(
    "click",
    () => {

        clickPanel.classList.add(
            "active"
        );

        startClickGame.disabled =
            true;

        startClickGame.style.opacity =
            "0.5";

        startClickRound();

        clickPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }
);


/* INICIAR RODADA */

function startClickRound() {

    clicks = 0;

    timeLeft = 10;

    gameRunning = true;

    clickScore.textContent =
        clicks;

    timer.textContent =
        timeLeft;


    clearInterval(
        gameTimer
    );


    gameTimer =
        setInterval(
            () => {

                timeLeft--;

                timer.textContent =
                    timeLeft;


                if (
                    timeLeft <= 0
                ) {

                    endClickGame();

                }

            },
            1000
        );

}


/* CLIQUE */

clickTarget.addEventListener(
    "click",
    () => {

        if (!gameRunning) {
            return;
        }

        clicks++;

        clickScore.textContent =
            clicks;

        clickTarget.style.transform =
            "scale(0.93)";

        setTimeout(
            () => {

                clickTarget.style.transform =
                    "";

            },
            80
        );

    }
);


/* FINALIZAR */

function endClickGame() {

    gameRunning = false;

    clearInterval(
        gameTimer
    );

    showToast(
        `Fim! Você fez ${clicks} cliques.`
    );

    clickTarget.textContent =
        "FIM!";

    startClickGame.disabled =
        false;

    startClickGame.style.opacity =
        "1";

}


/* REINICIAR */

resetClick.addEventListener(
    "click",
    () => {

        clickTarget.textContent =
            "CLIQUE!";

        startClickRound();

    }
);
