var countDownDate = new Date("June,12 2018 5:00:00").getTime();
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    $("#count-down").html(days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ");
    // Output the result in an element with id="demo"
    $(".days").html(days);

    $(".hours").html(hours);

    $(".minutes").html(minutes);

    $(".seconds").html(seconds);

    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("count-down").innerHTML = "EXPIRED";
    }
}, 1000);
