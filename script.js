/* ==========================================
   CINEMATIC APOLOGY EXPERIENCE
========================================== */


/* Scenes */

const scenes = document.querySelectorAll(".scene");

let currentScene = 0;


/* Change Scene */

function showScene(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= scenes.length) {
        index = scenes.length - 1;
    }

    scenes.forEach((scene, i) => {

        scene.classList.toggle(
            "active",
            i === index
        );

    });

    currentScene = index;

    updateProgress();

    runSceneAnimation(index);
}


/* Progress */

function updateProgress() {

    const progress =
        ((currentScene + 1) / scenes.length) * 100;

    document.getElementById("progressBar")
        .style.width = progress + "%";
}


/* Next */

document.getElementById("next")
    .addEventListener("click", () => {

        showScene(currentScene + 1);

    });


/* Previous */

document.getElementById("prev")
    .addEventListener("click", () => {

        showScene(currentScene - 1);

    });


/* Keyboard */

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {

        showScene(currentScene + 1);

    }

    if (event.key === "ArrowLeft") {

        showScene(currentScene - 1);

    }

});


/* ==========================================
   TOUCH / SWIPE
========================================== */

let touchStartX = 0;

document.addEventListener("touchstart", event => {

    touchStartX =
        event.changedTouches[0].screenX;

});


document.addEventListener("touchend", event => {

    const touchEndX =
        event.changedTouches[0].screenX;

    const difference =
        touchStartX - touchEndX;

    if (difference > 50) {

        showScene(currentScene + 1);

    }

    if (difference < -50) {

        showScene(currentScene - 1);

    }

});


/* ==========================================
   TYPING EFFECT
========================================== */

const typingElement =
    document.getElementById("typingText");

const typingText =
    "I know I made a mistake.";


let typingStarted = false;


function typeText() {

    if (typingStarted) return;

    typingStarted = true;

    typingElement.textContent = "";

    let index = 0;

    const timer =
        setInterval(() => {

            typingElement.textContent +=
                typingText[index];

            index++;

            if (index >= typingText.length) {

                clearInterval(timer);

            }

        }, 70);
}


/* ==========================================
   SCENE ANIMATIONS
========================================== */

function runSceneAnimation(index) {

    if (index === 1) {

        typingStarted = false;

        setTimeout(() => {

            typeText();

        }, 800);

    }

}


/* ==========================================
   FALLING HEARTS
========================================== */

const heartContainer =
    document.getElementById("hearts");


function createHeart() {

    const heart =
        document.createElement("div");

    heart.className =
        "floating-heart";

    heart.innerHTML =
        Math.random() > .5 ? "♥" : "♡";


    const size =
        Math.random() * 20 + 10;

    const left =
        Math.random() * 100;

    const duration =
        Math.random() * 5 + 5;


    heart.style.left =
        left + "%";

    heart.style.fontSize =
        size + "px";

    heart.style.animationDuration =
        duration + "s";

    heart.style.opacity =
        Math.random() * .5 + .4;


    heartContainer.appendChild(heart);


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


/* Create hearts continuously */

setInterval(createHeart, 450);


/* ==========================================
   SPECIAL HEART BURST
========================================== */

function heartBurst() {

    for (let i = 0; i < 30; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");

            heart.className =
                "floating-heart";

            heart.innerHTML = "♥";

            heart.style.left =
                50 + (Math.random() * 20 - 10) + "%";

            heart.style.bottom =
                45 + (Math.random() * 10) + "%";

            heart.style.fontSize =
                Math.random() * 20 + 15 + "px";

            heart.style.animationDuration =
                Math.random() * 3 + 3 + "s";

            heartContainer.appendChild(heart);

            setTimeout(() => {

                heart.remove();

            }, 6000);

        }, i * 50);

    }

}


/* ==========================================
   FINAL SCENE
========================================== */

let finalTriggered = false;


function checkFinalScene() {

    if (
        currentScene === scenes.length - 1 &&
        !finalTriggered
    ) {

        finalTriggered = true;

        setTimeout(() => {

            heartBurst();

        }, 1000);

    }

}


/* Modify showScene */

const originalShowScene = showScene;

showScene = function(index) {

    originalShowScene(index);

    checkFinalScene();

};


/* ==========================================
   RESTART
========================================== */

document
    .getElementById("restart")
    .addEventListener("click", () => {

        finalTriggered = false;

        showScene(0);

    });


/* ==========================================
   AUTO CINEMATIC MODE
========================================== */

let autoPlay = false;

const sceneDuration = 7000;


function startAutoPlay() {

    if (!autoPlay) return;

    setTimeout(() => {

        if (
            currentScene <
            scenes.length - 1
        ) {

            showScene(currentScene + 1);

            startAutoPlay();

        }

    }, sceneDuration);

}


/* Start */

showScene(0);


/* Uncomment this line if you want
   the video to automatically play */

/*
autoPlay = true;
startAutoPlay();
*/