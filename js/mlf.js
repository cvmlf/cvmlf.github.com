/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('.page-scroll a').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function () {
    $('.navbar-toggle:visible').click();
});



// load the live results from the website
$(document).ready(function () {
  checkLive();
});

let timerId = setInterval(() => checkLive(), 1000*120);

function checkLive() {
    $.ajax({
        //url: "http://localhost:3000/live",
        url: "https://live.cvmlf.com/live",
        cache: false
    })
    .done(function (html) {
        $("#live-header").html(html);
    })
    .fail(function() {
      clearInterval(timerId);
    });
}

