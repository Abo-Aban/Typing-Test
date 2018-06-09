/*
* Program Name: Typing Test
* Developed in: 8/6/2018
* Developed by: Othman Aladlan
* This is a elegant Web Application to measure the speed of your typing and give you the result
* of how many right words, wrong words, and your words per minute rate, the app came with dark apperance.
*/


// global vars
var space = 32, enter = 13, time = 59, t = 0, tr = 0;
var playing = false, right = 0, wrong = 0;
var total = 0; // total number of words
var count = 0; // total right characters

var pars = 
[
    "A build process that spits out an unreproducible binary is worrying. If what comes out of a build depends on the lunar cycle, the world becomes a hard place to reason about.",
    
    "This means that gratuitous use of other potentially changeable information should be kept to an absolute minimum in the source files.",

    "The build must work perfectly all the time it must be reliable. If it falls over every other day or occasionally produces a broken binary,",
    
    "then it is worse than useless—it’s dangerous. How can you be sure that you’re testing a good binary?",
    
    "How can you be sure that your company is releasing an acceptable product? Problems with the build system really hamper development.",

    "This idea is based on the theories of peripheral learning. If students are surrounded by new vocabulary and take it in through all of their senses,",
    
    "they will have a better chance of learning and remembering words or phrases. The pocket reminder uses the sense of touch as a learning tool.",
    
    "Our focus continues to be on teaching you the techniques and approaches you need to be successful in programming interviews. We reinforce these by illustrating the thought process",
    
    "that leads to the solution of each of the problems we present, and show you how to move forward when you’re stuck.",
    
    "Ahmad was assigned as the new road engineer for the city. His first task was to install police stations along the road connecting the center of the city and the governor house.",
    
    "The governor suggested to Ahmad N points along the road were the government can build police stations. Ahmad needs to choose at most K points to build police stations in them.",
    
    "The build should be almost invisible; the only thing you need to worry about is how to turn the handle, and you should be assured that the right things will come out at the end.",

    "These skills overlap with general coding skills, but they’re not the same; we’ve seen great coders crash and burn in programming interviews because they haven’t developed their interview skills.",
    
    "Early in our careers we crashed and burned a couple times ourselves, but you can avoid that by beginning your preparation with this book.",

    "Shahhoud is so experienced that he can find out the difficulty of any problem as soon as he reads it. He found out that the easiest problem in the contest has a difficulty of D.",
    
    "Shahhoud’s problem solving skill is S, and he knows that he can solve the problem if and only if his skill is higher or equal to the problem’s difficulty.",

    "Once you’ve learned the skills taught in this book you’ll continue to learn by applying them to the problems you find in other books and on the web, but this is the book you want to start with.",
    
    "Saeed is planning to watch the UEFA Champions League game tonight. Sadly, not all the pixels in the TV screen are working, and some of them are just black non-working dots! Saeed decided not to give up,",
    
    "and focus his eyes on a rectangular area of the total TV screen. This area might have bad pixels, that’s why Saeed decided that he would choose a rectangle that has no more than K black non-working pixels.",

    "One thing that never changes is that to become good at solving programming interview questions, you have to do more than passively read about them: you need to practice them.",
    
    "You’ll get a lot more out of this book if you work out as much of each solution as you can on your own before you read about it.",

    "Programming is a difficult and technical art. It would be impossible to teach everything you need to know about computers and programming in one book. Therefore, we’ve had to make some assumptions about who you are.",
    
    "We assume that you have a background in computers equivalent to at least the first year or two of a computer science degree.",
    
    "It’s also possible that you have a great deal more computer knowledge and experience than what we’ve described as the minimum requirements. If so, you may be particularly interested in some of the more advanced topics included.",
    
    "However, don’t ignore the basic topics and questions, no matter how much experience you have. Interviewers tend to start with the fundamentals regardless of what’s on your resume.",
    
    "Many of the designations by manufacturers and seller to distinguish their products are claimed as trademarks. Where those designations appear in this book, and the publisher was aware of a trademark claim,",
    
    "the designations have been printed in initial caps or all caps. Credits and acknowledgments borrowed from other sources and reproduced, with permission, in this textbook appears on page.",
    
    "Joud likes playing video games so much. Recently he found a game that can increase his skills in both video games and mathematics. Inside this weird video game Joud needed to fight N monsters.",
    
    "Testing an application can never identify all of the bugs potentially present. Because of this, there will always be errors in deployed apps. As a developer, employing defensive strategies such as unit and regression testing",
    
    "can help to identify bugs early, but there are many factors that developers cannot always plan for.",
    
    "For example, a new device may ship with a unique screen configuration for which the application developer may not have accounted. It is important that when bugs do crop up in applications,",
    
    "developers can reproduce and isolate them in a systematic way, and release an update to users in a timely fashion.",
    
    "The rich amount of input available to the programmer (such as location and social media account access) enables applications on mobile platforms to be highly context aware.",
    
    "For example, an application might suggest restaurants nearby the user, tailored to their preferences retrieved from a social media account."

];




$(document).ready(function(){
    // 'use strict';

    main_text = $('#main-text');
    main_input = $('#main-input');
    timer = $('#timer');

    // pick random par
    t = Math.floor(Math.random()*10);
    main_text.text(pars[t]);

    // assign the paragraph text to variable
    par = main_text.text().trim().split(' ');
    par = par.filter(function (n) { return n != "" });  //ignore empty elem /
    par_tmp = par;   
    
    //indicator to the current word
    indic = 0;

    // capture the key press
    main_input.keyup(function(e) {

        // start the timer to start the typing
        if(!playing){
            playing = true;
            tr = setTimeout("play()", 1000);
        }

        // get the pressed key
        var k = e.which;

        // in case of space pressed
        if(k == space){
            // get the current word length
            var len = par[indic].length;
            // check the current word
            if (main_input.val().trim() == par[indic]) {
                step('g');
                right++;
            }else{
                step('b');
                wrong++;
            }

            // clear the input 
            // problem: if the typist is fast some letter will be missed
            var tempo = main_input.val().split(' ');
            if(tempo.length > 1){
                main_input.val(tempo[1]);
            }else{
                main_input.val('');
            }

            total++;
            // add the word length to count
            count += len;
            
        }
    });

    // restart-btn on click event
    $('#restart-btn').click(function(){
        reset();
    });

});

function play() {

    // if it's playing and the time isn't out
    if (playing && time > 0) {
        tr = setTimeout("play()", 1000);
    } else {
        // if the time out
        finish();
    }
    // display the current time
    timer.text("00:" + (time<10?"0":"") + time--);

}

// finish function
function finish() {
    // stop the interval
    playing = false;

    // disable the input
    main_input.prop('disabled', true);

    // calculate the accuracy
    var accuracy = Math.ceil((!total?0:right/total*100));

    // calculate WPM
    var wpm = Math.round(count/5);

    // show the results inside the main-text
    var res = "";
    res+= "<span class='gg'>Right Words</span>: " + right + " words<br>";
    res += "<span class='b'>Wrong Words</span>: " + wrong + " words<br>";
    res += "<span class='g'>Accuracy</span>: " + accuracy + "%<br>";
    res += "<abbr class='g' title='words per minute'>WPM</abbr>: " + wpm + "<br>";

    main_text.html(res);
    
    // clear the input
    main_input.val('');
}

// step to the next character
function step(stats) {
    // add the proper style to the word
    par_tmp.splice(indic, 1, '<span class="stat ' + stats + '" >' + par_tmp[indic] + "</span>");
    // apply the text style
    main_text.html(par_tmp.join(' '));

    // move the indicator to next word
    ++indic;

    // check if the paragraph is over
    if (indic == par.length) {
        // get the next paragraph
        prepare_par()
    }

};

function prepare_par() {
    // pick random par
    t = (++t)%pars.length;
    main_text.text(pars[t]);

    // assign the paragraph text to variable
    par = main_text.text().trim().split(' ');
    par = par.filter(function (n) { return n != "" });  //ignore empty elem /
    par_tmp = par;

    indic = 0; // reset the indicator
}

function reset() {
    clearTimeout(tr);
    playing= false;//stop 
    indic = 0; // reset the indicator
    // reset the timer
    time = 59;
    timer.text('01:00');
    
    //reset the counters
    right = 0;
    wrong = 0;
    total = 0;
    count = 0;

    // clear and enable the input
    main_input.val('').prop('disabled', false);
    prepare_par();
}