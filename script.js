//Home page login function
function initLoginSignupFeature() {
    // Get the modals
    var loginModal = document.getElementById("loginModal");
    var signupModal = document.getElementById("signupModal");

    // Get the buttons that open the modals
    var loginBtn = document.getElementById("loginBtn");
    var signupBtn = document.getElementById("signupBtn");

    // Get the <span> elements that close the modals
    var closeButtons = document.getElementsByClassName("close");

    // When the user clicks the login button, open the login modal
    loginBtn.onclick = function() {
        loginModal.style.display = "block";
    };

    // When the user clicks the signup button, open the signup modal
    signupBtn.onclick = function() {
        signupModal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modals
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            loginModal.style.display = "none";
            signupModal.style.display = "none";
        };
    }

    // When the user clicks outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == loginModal || event.target == signupModal) {
            loginModal.style.display = "none";
            signupModal.style.display = "none";
        }
    };

    // Handle form submissions
    document.getElementById("loginForm").onsubmit = function(event) {
        event.preventDefault(); // Prevent form submission
        alert("Login successful for user: " + document.getElementById("loginUsername").value);
        loginModal.style.display = "none"; // Close modal after login
    };

    document.getElementById("signupForm").onsubmit = function(event) {
        event.preventDefault(); // Prevent form submission
        alert("Signup successful for user: " + document.getElementById("signupUsername").value);
        signupModal.style.display = "none"; // Close modal after signup
    };
}


// Banner page banner function
function initSlideshowFeature() {
    // JavaScript for Slideshow
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slideshow-container img');
    const dots = document.querySelectorAll('.dots span');
    const totalSlides = slides.length;
    let autoSwitchInterval;

    function updateSlideshow(index) {
        // Update active image
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update active dot
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlideshow(currentIndex);
    }

    function showPreviousSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlideshow(currentIndex);
    }

    function resetAutoSwitch() {
        clearInterval(autoSwitchInterval);
        autoSwitchInterval = setInterval(showNextSlide, 3000); // Restart auto-switch
    }

    // Event listeners for arrows
    document.querySelector('.arrow.left').addEventListener('click', () => {
        showPreviousSlide();
        resetAutoSwitch();
    });

    document.querySelector('.arrow.right').addEventListener('click', () => {
        showNextSlide();
        resetAutoSwitch();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlideshow(currentIndex);
            resetAutoSwitch();
        });
    });

    function autoshowNextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide
        slides[currentIndex].classList.add('active');
    }

    // Change the image every 3 seconds
    autoSwitchInterval = setInterval(showNextSlide, 3000);
}




// --------------- Feature: Questionnaire Form for Popup Page ---------------
function initQuestionnaireFeature() {
    const questionForm = document.getElementById("questionForm");
    const resultImageContainer = document.getElementById("resultImage");
    const imageElement = document.getElementById("image");
    const resultScoreElement = document.getElementById("result-score")
    const redoButton = document.getElementById("redoButton");

    if (!questionForm) {
        console.warn("Questionnaire form not found on this page.");
        return; // Exit if the form is not found
    }

    questionForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the page from refreshing

        // Calculate total score from checked checkboxes
        const checkboxes = document.querySelectorAll(".question:checked");
        let totalScore = 0;

        checkboxes.forEach((checkbox) => {
            const score = parseInt(checkbox.getAttribute("data-score"), 10);
            totalScore += score;
        });

        resultScoreElement.textContent = '你的分數是:'+totalScore+'分';

        // Determine the target image based on the score
        let imageSrc = "";
        if (totalScore <= 22) {
            imageSrc = "哥布林砲灰(18-22).png"; // Replace with your low-score image URL
        } 
        else if (totalScore <= 30) {
            imageSrc = "哥布林士兵(23-30).png"; // Replace with your medium-score image URL
        } 
        else if (totalScore <= 40) {
            imageSrc = "哥布林隊長(31-40).png"; // Replace with your medium-score image URL
        } 
        else if (totalScore <= 49) {
            imageSrc = "哥布林長老(41-50).png"; // Replace with your medium-score image URL
        } 
        else {
            imageSrc = "尤達大師(大於50).png"; // Replace with your high-score image URL
        }

        // Display the result image
        imageElement.src = imageSrc;
        imageElement.alt = `Score-based image for score: ${totalScore}`;
        resultImageContainer.style.display = "block";


        form.addEventListener("reset", () => {
            // Reset result score and hide the target image
            resultScoreElement.textContent = 0;
            imageElement.style.display = "none";
        });
    });
}



// --------------- Initialize Features Based on Page ---------------
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    if (currentPath.includes('index.html') || currentPath === '/') {
        initLoginSignupFeature();
    }

    if (currentPath.includes('banner.html')) {
        initSlideshowFeature();
    }

    if (currentPath.includes('popup.html')) {
        initQuestionnaireFeature();
    }
});
