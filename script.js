class Brick {
    constructor(left, right, top, bottom, id) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.id = id
    }
}

function addBrick(x, y, i) {
    var brick = `<div class='brick brick${i} ' style='left:${x}%;top:${y}%'></brick>`;
    $('#canvas').append(brick);
    let l = $(`.brick${i}`).position().left;
    let t = $(`.brick${i}`).position().top;
    let obj = new Brick(l, l + 96, t, t + 24, i);
    bricks.push(obj);
}

var game_start=false;
var stick_pos;
var direction_pos_x;
var direction_pos_y;
var left_direction_change = 0;
var right_direction_change = 0;
var angle = 45;
var delta = 1;


function moveStick(event) {
    if(game_start){
        if (event.keyCode == 37) {
            stick_pos = $('.stick').position().left;
            $(`.stick`).remove();
            stick_pos -= 30;
            $('#canvas').append(`<div class='stick' style="left:${stick_pos}px !important"></div>`);
        }
        if (event.keyCode == 39) {
            stick_pos = $('.stick').position().left;
            $(`.stick`).remove();
            stick_pos += 30;
            $('#canvas').append(`<div class='stick' style="left:${stick_pos}px"></div>`);
        }
    }
    else{
        if (event.keyCode == 37) {
            if(!(left_direction_change == 90)){
                var direction_height = $(".direction").height();
                var ball_height = $(".ball").height();
                left_direction_change += 45;
                delta *= 2;
                console.log(left_direction_change)
                direction_pos_x = $('.direction').position().left;
                direction_pos_y = $('.direction').position().top;
                $(`.direction`).remove();
                direction_pos_x -= (Math.sin(45) * direction_height) / (2 * delta);
                direction_pos_y += (Math.cos(45) * direction_height) / ( delta );
                $('#canvas').append(`<div class='direction' style="left:${direction_pos_x}px !important; top: ${direction_pos_y}px; transform: rotate(${360-left_direction_change}deg)"></div>`);
                right_direction_change -= 45;
            }
        }

        if (event.keyCode == 39) {
            if(!(right_direction_change == 90)){
                var direction_height = $(".direction").height();
                angle = 90;
                // angle = (angle + Math.PI / 360) % (Math.PI * 2);
                // delta *= 2;
                console.log(right_direction_change)
                direction_pos_x = $('.direction').position().left;
                direction_pos_y = $('.direction').position().top + direction_height;
                $(`.direction`).remove(); 
                // direction_pos_x += (Math.sin(45) * direction_height) ;
                // direction_pos_y -= (Math.cos(45) * direction_height) ;
                direction_pos_x = direction_pos_x + direction_height * Math.cos(angle);
                direction_pos_y -= direction_height * Math.sin(angle);
                $('#canvas').append(`<div class='direction' style="left:${direction_pos_x}px !important; top: ${direction_pos_y}px; transform: rotate(-${angle}deg)"></div>`);
                left_direction_change -= 45;
            }
        }
    }
}

var bricks = [];
function addBricks(levels) {
    var n = 1;
    var y = 4;
    var i = 0;
    var x;
    var m;
    while (n <= levels) {
        m = 0;
        if (n % 2 == 0)
            x = 7
        else
            x = 11
        while (m < 100) {

            addBrick(x, y, i);
            x += 8;
            m = x + 10;
            i++;
        }
        y += 6;
        n++;
    }
}

$(document).ready(function(){
    addBricks(5);

    window.addEventListener('keydown', moveStick, false);
})