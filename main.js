const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const currentTarget = entry.target.querySelector('div');

        if (entry.isIntersecting) {
            currentTarget.classList.add('righttoleft');
            return; // if we added the class, exit the function
        }

        // We're not intersecting, so remove the class!
        // currentTarget.classList.remove('righttoleft');
    });
});

var observeTargets = document.querySelectorAll('.scrollanimation');

observeTargets.forEach(function (e) {
    observer.observe(e);
});

var inputRange = document.getElementsByClassName('range')[0],
    maxValue = 100, // the higher the smoother when dragging
    speed = 1,
    currValue, rafID;

// set min/max value
inputRange.min = 0;
inputRange.max = maxValue;

// listen for unlock
function unlockStartHandler() {
    // clear raf if trying again
    window.cancelAnimationFrame(rafID);

    // set to desired value
    currValue = +this.value;
}

function unlockEndHandler() {

    // store current value
    currValue = +this.value;

    // determine if we have reached success or not
    if (currValue >= maxValue) {
        successHandler();
    }
    else {
        rafID = window.requestAnimationFrame(animateHandler);
    }
}
updateWavelength(0);
function handleWavelength(value) {
    var blackHoleVisible = document.getElementById("blackholevisible");
    var blackHoleXray = document.getElementById("blackholexray");
    blackHoleVisible.style.opacity = (100 - (Math.abs(value))) / 100;
    console.log(value);
    blackHoleXray.style.opacity = (value) / 100;
    updateWavelength(value);
}

function updateWavelength(v) {
    if (v == 0) {
        document.getElementById("wl-label").innerHTML = "Visible Light"
    } else if (v == 100) {
        document.getElementById("wl-label").innerHTML = "Multi-Wavelength (X-Ray, Gamma-Ray and more...)"
    } else {
        document.getElementById("wl-label").innerHTML = "Multi-Wavelength (Including Visible Light) "
    }
}

// handle range animation
function animateHandler() {

    // calculate gradient transition
    var transX = currValue - maxValue;

    //Change slide thumb color on mouse up
    if (currValue < 20) {
        inputRange.classList.remove('ltpurple');
    }
    if (currValue < 40) {
        inputRange.classList.remove('purple');
    }
    if (currValue < 60) {
        inputRange.classList.remove('pink');
    }

    // determine if we need to continue
    if (currValue > -1) {
        window.requestAnimationFrame(animateHandler);
    }
}

// handle successful unlock
function successHandler() {

};

// bind events
inputRange.addEventListener('mousedown', unlockStartHandler, false);
inputRange.addEventListener('mousestart', unlockStartHandler, false);
inputRange.addEventListener('mouseup', unlockEndHandler, false);
inputRange.addEventListener('touchend', unlockEndHandler, false);

// move gradient
inputRange.addEventListener('input', function () {
    //Change slide thumb color on way up
    if (this.value > 20) {
        inputRange.classList.add('ltpurple');
    }
    if (this.value > 40) {
        inputRange.classList.add('purple');
    }
    if (this.value > 60) {
        inputRange.classList.add('pink');
    }

    //Change slide thumb color on way down
    if (this.value < 20) {
        inputRange.classList.remove('ltpurple');
    }
    if (this.value < 40) {
        inputRange.classList.remove('purple');
    }
    if (this.value < 60) {
        inputRange.classList.remove('pink');
    }
});
