    // DEKLARASI
    var gameJalan = ["", "", "", "", "", "", "", "", ""];
    var o_win = 0;
    var x_win = 0;
    // GENERATE BOX
    var text = "";
    for (x = 0; x <= 8; x++) {
        text += '<li class="btn span1 kotak" data="' + x + '">+</li>';
    }
    $('#game').html(text);
    // FROMAT KONDISI WIN
    const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
    $('.kotak').each(function() {
        var $this = $(this);
        $this.on("click", function() {
            startx = $('#reset').val();
            if (startx == 'restart') {
                if ($this.html() == '+') {
                    var player = $('#currentPlayer').html();
                    var data = $this.attr('data');
                    gameJalan[data] = player;
                    $this.html(player);
                    $this.addClass('mark');
                    var rm = false;
                    for (var i = 0; i <= 7; i++) {
                        const winCondition = winningConditions[i];
                        var a = gameJalan[winCondition[0]];
                        var b = gameJalan[winCondition[1]];
                        var c = gameJalan[winCondition[2]];
                        if (a === '' || b === '' || c === '') {
                            continue;
                        }
                        if (a === b && b === c) {
                            rm = true;
                            break
                        }
                    }
                    if (player == 'X') {
                        $this.addClass('btn-info');
                        $('#currentPlayer').html('O')
                        var choose = $(".kotak:not(.mark)");
                        rand = choose[Math.floor(Math.random() * choose.length)];
                        $(rand).trigger('click');
                    } else {
                        $this.addClass('btn-primary');
                        $('#currentPlayer').html('X')
                    }
                    if (rm) {
                        if (player == 'X') {
                            x_win++;
                            $('#x_win').html(x_win);
                        } else {
                            o_win++;
                            $('#o_win').html(o_win);
                        }
                        $('#papanInfo').html('<center><b>' + player + ' Win</b> </center>');
                        $('#reset').val('play again');
                        return;
                    }
                    var roundDraw = !gameJalan.includes("");
                    if (roundDraw) {
                        $('#papanInfo').html('Game ended in a draw!');
                        $('#reset').val('play again');
                        return;
                    }
                } else {
                    alert('Already selected');
                }
            }
        });
    });
    $('#reset').click(function(event) {
        var reset = $(this).val();
        if (reset == 'start') {
            $(this).val('restart');
            $('#currentPlayer').html('X')
        } else if (reset == 'play again') {
            $(this).val('restart');
            $('.kotak').text('+');
            $('.kotak').removeClass('btn-primary btn-info mark');
            gameJalan = ["", "", "", "", "", "", "", "", ""];
            $('#papanInfo').html('Turn Play : <span id="currentPlayer" style="font-weight: bolder; text-transform: uppercase;" >X</span>');
            alert('Ready');
        } else {
            $(this).val('start');
        }
    });