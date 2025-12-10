let questions = [
    {
        q: "What kind of fragrances do you prefer?",
        a: ["Floral", "Sweet", "Warm/Musky", "Citrus"]
    },
    {
        q: "When do you wear perfume most?",
        a: ["Daily", "Special events", "Evenings", "Work"]
    },
    {
        q: "What mood do you want your scent to reflect?",
        a: ["Romantic", "Bold", "Calm", "Sexy"]
    }
];

let currentQuestion = 0;
let answersChosen = [];



function startQuiz() {
    document.getElementById("quizBox").classList.remove("d-none");
    loadQuestion(); // <- This loads the questions
}

function loadQuestion() {
    let q = questions[currentQuestion];
    document.getElementById("question").textContent = q.q;

    let answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.a.forEach(ans => {
        let btn = document.createElement("button");
        btn.className = "btn btn-outline-dark m-2";
        btn.textContent = ans;
        btn.onclick = () => chooseAnswer(ans);
        answersDiv.appendChild(btn);
    });
}

function chooseAnswer(ans) {
    answersChosen.push(ans);
    document.getElementById("nextBtn").classList.remove("d-none");
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
        document.getElementById("nextBtn").classList.add("d-none");
    } else {
        showResult();
    }
}

function showResult() {
    let result = document.getElementById("result");
    result.classList.add("animate_animated", "animate_fadeIn");

    if (answersChosen.includes("Floral")) result.textContent = "Your match is: Beeyou Blossom 🌸";
    else if (answersChosen.includes("Warm/Musky")) result.textContent = "Your match is: Sunset Musk 🌙";
    else if (answersChosen.includes("Sweet")) result.textContent = "Your match is: Golden Aura ✨";
    else result.textContent = "Your match is: Beeyou Classic 💕";
}

// --- 1.*Smooth Scrolling for Internal Links ---*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behaviour: 'smooth'
        });

        // Close the navbar on mobile after clicking a link
        const navbarCollapse = document.getElementById('navbarCollapse');
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false});
        if (navbarCollapse.classList.contains('show')) {
            bsCollapse.hide();
        }
    });
});


/**
 * Function to initialize the scroll-based animations using the Intersection Observer API.
 * It targets elements with the class 'animate-on-scroll'.
 */
function initializeScrollAnimations() {
    // Select all elements that are intended to be animated on scroll
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Configuration options for the Intersection Observer
    const observerOptions = {
        // null means the viewport is the root container
        root: null,
        // Start checking 10% from the bottom of the viewport
        rootMargin: '0px 0px -10% 0px',
        // Trigger the callback when 0.1% of the element is visible
        threshold: 0.01 
    };

    // The callback function executed when an observed element enters/exits the viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Check if the element is currently visible (intersecting)
            if (entry.isIntersecting) {
                // Add the 'animated' class to trigger the CSS transition/animation
                entry.target.classList.add('animated');
                
                // Stop observing the element once it has been animated
                observer.unobserve(entry.target);
            }
        });
    };

    // Create a new Intersection Observer instance
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing each element found
    elementsToAnimate.forEach(element => {
        // Add the base animation class to all elements to set their initial state
        element.classList.add('fade-in-up'); 
        observer.observe(element);
    });
}

// 1. Run the initialization function once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// 2. You might also want to add this simple dummy function to prevent errors
// if you haven't implemented your scent quiz logic yet.
/*function startQuiz() {
    console.log("Starting Quiz...");
    document.getElementById('quizBox').classList.remove('d-none');
    // Add logic here to load the first quiz question
}*/
