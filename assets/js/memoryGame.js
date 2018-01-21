// Memory Array to store cards
var memoryArray = ['<i class="fa fa-coffee"></i>', '<i class="fa fa-coffee"></i>',
'<i class="fa fa-eye"></i>', '<i class="fa fa-eye"></i>',
'<i class="fa fa-university"></i>', '<i class="fa fa-university"></i>',
'<i class="fa fa-music"></i>', '<i class="fa fa-music"></i>',
'<i class="fa fa-plane"></i>', '<i class="fa fa-plane"></i>',
'<i class="fa fa-star"></i>', '<i class="fa fa-star"></i>'];

var counterTries = document.getElementById("counterTries");

function init(){
  assignCard();
  flip()
  }

init()

// shuffle the numList - code from stackexchange
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

// assign the values from shuffle function to the cards
function assignCard() {
  var shuffleList = shuffle(memoryArray);

  $(".cardFlip").each(function(index) {
    $(this).attr("data-card-value", shuffleList[index])
    $(this).children().last().html("<p>" + shuffleList[index] + "</p>")
    })
  clickHandlers()
  }

// add "selected" tag to clicked card
function clickHandlers() {
  $(".cardFlip").on("click", function(){
    $(this).addClass("selected");
    checkMatch();
    })
  }

// flip function
function flip(el) {
  $(el).toggleClass('flipped');
  }

var counter = 0

// check if the clicked cards match
function checkMatch() {
  if ($(".selected").length === 2) {
    if ($('.selected').first().data('card-value') == $('.selected').last().data('card-value')) {
      $('.selected').each(function() {
        $(this).removeClass('unmatched').addClass('matched')
      });
      setTimeout(function() {
        $('.selected').each(function() {
      $(this).addClass("hidden")
      $(this).parent().addClass("hidden")
    }, 1300);
    });
      $('.selected').each(function() {
        $(this).removeClass('selected');
      });
      $(".matched").removeClass("selected")
      checkWin()

    // flip the card if they don't match
    } else {
        setTimeout(function() {
          $('.selected').each(function() {
            $(this).toggleClass('flipped');
            $(this).removeClass('selected');
          });
        }, 1300);
      }
      counter++
      counterTries.innerHTML = counter;
      if (counter == 10) {
        $('.star').last().addClass("hidden").removeClass("star")
      }
      else if (counter == 13) {
        $('.star').last().addClass("hidden").removeClass("star")
      }
      else if (counter == 17) {
        $('.star').last().addClass("hidden").removeClass("star")
      }
    }
  }

  // check if all the cards are matched and the game is won
  function checkWin() {
      if ($('.unmatched').length === 0) {
        setTimeout(function() {
        modal.style.display = "block";
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        var secondsWin = document.getElementById("finalCounter");
        secondsWin.innerHTML = totalSeconds;
        var finalStars = document.getElementById("finalStars");
        var starScore = '<i class="fa fa-star"></i>';
        var starsFinal = document.getElementsByClassName("star");

        $("#finalStars").html(starsFinal)

        $(document).ready(function(){
         for(var i = 0; i< starsFinal; i++)
         $("#finalStars").append('<i class="fa fa-star"></i>');
        });

        $("#reset2").on("click", function() {
          location.reload()})

        }, 1300);
      }
    }

// event to reset the game when reset-button is clicked
$("#reset").on("click", function() {
  location.reload()
})

// variables needed for the timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

// call the setInterval function to count seconts
setInterval(setTime, 1000);

// add one to the totalseconds timer and adjust display on memory board
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Get the modal (when games is finished)
var modal = document.getElementById('myModal');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
