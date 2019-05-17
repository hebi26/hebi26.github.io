$(document).ready(function() {

    //----------CARROUSSEL HEADER--------------

    $('.sidenav').sidenav();

    $('.materialboxed').materialbox();

    // --------------- SLIDER------------------

    $('.slider').slider({
        indicators : false,
        interval : 5000,
        height : 600
    });

$('.slider').mouseenter(function(){
    $('.slider').slider('pause');

    $('.slider').mouseleave(function(){
        $('.slider').slider('start');
    });
});


$('.link').click(function(){
    window.open('lib/dossier_pro.pdf');
    window.open('lib/cv_dev.pdf');
});


//------------PARALLAX BODY--------------------

    // if((screen).width > 992) {

        // $('.parallax-box').parallaxie();
    // }

    //------------scroll-----------------------

    $('.scrollspy').scrollSpy({
        scrollOffset : 63
    });


    // ==============VISUALIZER AUDIO=================

    // Establish all variables that your Analyser will use
    var audioSource, audioIndex = 0, canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height, played;

    // Create a new instance of an audio object and adjust some of its properties
    var audio = new Audio();
    audio.src = 'sound/générique.mp3';
    audio.controls = true;
    audio.loop = false;
    audio.autoplay = false;

    audio.addEventListener('play', function(){
        played = true;
        context.resume();
        $("#playlist li i").remove();
        $('#analyser_render').css({"backgroundImage" : "none"});
        $('.current-song').append('<i class="material-icons left">play_arrow</i>');
    });

    audio.addEventListener('pause', function(){
        played = false;
        $('#analyser_render').css({"backgroundImage" : "url('img/digital5.gif')"});
    });

    // EVENT CHANGE

    $("#playlist li").click(function(e) {
        e.preventDefault();

        audioSource = $('a', this).attr('href');
        audio.src = audioSource;

        $("#playlist li").removeClass("current-song");
        $(this).addClass("current-song");
        $('.current-song').append('<i class="material-icons left">play_arrow</i>');

        audio.play();
    });
    // click CANVAS

    $('#analyser_render').click(function(){
        if(played){
            audio.pause();
        }
        else{
            context.resume();
            audio.play();
        }
    });

    //ON END

    audio.addEventListener("ended", function(){
        audioIndex++;
        if(audioIndex == $("#playlist li").length){
            audioIndex = 0;
        }

        $("#playlist li").removeClass("current-song");
        $("#playlist li:eq("+audioIndex+")").addClass("current-song");
        $('.current-song').append('<i class="material-icons left">play_arrow</i>');
        audio.src = $('.current-song').children('a').attr('href');
        audio.play();
    });


// Initialize the MP3 player after the page loads all of its HTML into the window
    function initMp3Player(){

        document.getElementById('audio-box').appendChild(audio);

        var AudioContext = window.AudioContext;
        canvas = document.getElementById('analyser_render');
        context = new AudioContext();

        analyser = context.createAnalyser(); // AnalyserNode method
        ctx = canvas.getContext('2d');

        // Re-route audio playback into the processing graph of the AudioContext
        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
    }

    // frameLooper() animates any style of graphics you wish to the audio frequency
    // Looping at the default frame rate that the browser provides(approx. 60 FPS)
    function frameLooper(){
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = '#10b4fb'; // Color of the bars
        bars = 100;

        for (var i = 0; i < bars; i++) {
            bar_x = i * 3;
            bar_width = 2;
            bar_height = -(fbc_array[i] / 2);

            //  fillRect( x, y, width, height ) // Explanation of the parameters below
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
        }
    }


    initMp3Player();

    // ------------------------FUNCTION SKILLS-------------------------

        $('.skills').each(function () {

            var contentbar = $(this).children('.skillbars');
            var skillid = $(this).attr('id');

            switch (skillid) {
                case 'skill1':
                    nbbar = 10;
                    break;
                case 'skill2':
                    nbbar = 10;
                    break;
                case 'skill4':
                    nbbar = 10;
                    break;
                case 'skill6':
                    nbbar = 10;
                    break;
                case 'skill9':
                    nbbar = 10;
                    break;
                case 'skill3':
                    nbbar = 8;
                    break;
                case 'skill10':
                    nbbar = 8;
                    break;
                case 'skill11':
                    nbbar = 8;
                    break;
                case 'skill7':
                    nbbar = 7;
                    break;
                case 'skill13':
                    nbbar = 7;
                    break;
                case 'skill5':
                    nbbar = 6;
                    break;
                case 'skill8':
                    nbbar = 6;
                    break;
                case 'skill12':
                    nbbar = 8;
                    break;
                case 'skill14':
                    nbbar = 5;
                    break;
                default:
                    alert('les skills ont planté !!! X_X"');
                    break;
            }


            for (var c = 0; c <= nbbar; c++) {
                percent = c * 10;
                contentbar.prepend('<div class="bar" id="bar' + c + '"></div>');
            }

            contentbar.prepend('<p class="skilltext">' + percent + '</p>');
        });


    $(window).scroll(function () {

        /* Check the location of each desired element */
        $('.fade').each(function () {

            var middle_of_object = $(this).offset().top + $(this).outerHeight() / 2;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fade it it */
            if (bottom_of_window > middle_of_object) {

                $(this).animate({'opacity': '1'}, 500);
            }
        });
    });

//---------------------- MAP ---------------------------

    var map = L.map('map').setView([43.83644, 4.359022], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([43.83644, 4.359022]).addTo(map)
        .bindPopup('Ironcarz<br>Address<br>CodePost City');


});
