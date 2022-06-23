$(function () {
    var sound = new Audio('sound.mp3');
    sound.volume = 0.1;
    window.addEventListener('message', function (event) {
        if (event.data.action == 'open') {
            var number = Math.floor((Math.random() * 1000) + 1);
            $('.notify').append(`
            <div class="wrapper-${number}">
                <div class="notification_main-${number}">
                    <div class="title-${number}"></div>
                    <div class="text-${number}">
                        ${event.data.message}
                    </div>
                </div>
            </div>`)
            $(`.wrapper-${number}`).css({
                "margin-bottom": "10px",
                "width": "275px",
                "margin": "0 0 8px -180px",
                "border-radius": "8px"
            })
            $('.notification_main-'+number).addClass('main')
            $('.text-'+number).css({
                "font-size": "12px"
            })

            if (event.data.type == 'rhlm') {
                $(`.title-${number}`).html(event.data.title).css({
                    "font-size": "16px",
                    "font-weight": "600"
                })
                $(`.notification_main-${number}`).addClass('rhlm-icon')
                $(`.wrapper-${number}`).addClass('rhlm')
                sound.play();
            }
            anime({
                targets: `.wrapper-${number}`,
                translateX: -20,
                duration: 750,
                easing: 'spring(2, 50, 5, 10)',
            })
            setTimeout(function () {
                anime({
                    targets: `.wrapper-${number}`,
                    translateY: -500,
                    duration: 750,
                    easing: 'spring(5, 80, 5, 0)'
                })
                setTimeout(function () {
                    $(`.wrapper-${number}`).remove()
                }, 750)
            }, event.data.time)
        }
    })
})