var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var highScore = 0;
var started = false;  // Check if the game has started

// Show a simple start message
$("h1").text("Tap or Press Any Key to Start");

// Start the game when the screen is tapped or clicked (for mobile and desktop)
$(document).on("keydown touchstart", function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;  // Prevent the game from restarting unnecessarily
    }
});

function nextSequence() {
    userClickedPattern = [];  // Reset the pattern for the next level
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Flash the button and play sound
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

// User clicks a button
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  // Add user click to pattern
    playsound(userChosenColour);  // Play sound
    animatePress(userChosenColour);  // Animate press

    // Check if the user has clicked the right sequence so far
    checkAnswer(userClickedPattern.length - 1);  
});

function playsound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        // Check if the user has finished their sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();  // Proceed to the next sequence after delay
            }, 1000);
        }
    } else {
        // If wrong answer is clicked
        console.log("wrong");
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();

        // Add the "game-over" class to the body
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 300);

       $("h1").text("Game Over, SCORE: " + level);
        if (level > highScore) {
            highScore = level;  // Update the high score
            $("h2").text("High Score: " + highScore);  // Display the high score
        } else {
            $("h2").text("High Score: " + highScore);  // Display the current high score
        }
        
        setTimeout(function() {
            $("h1").text("Tap the Screen or Press any key to Restart");
        }, 2000);
        // Call a function to restart the game
        startOver();
    }
}

function startOver() {
    level = 0;  // Reset the level
    gamePattern = [];  // Clear the game pattern
    started = false;  // Allow the game to be restarted
}
