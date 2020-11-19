let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")
let div1 = document.querySelector(".div1")
let ul = document.querySelector("ul")

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
ctx.lineCap = 'round';

document.body.addEventListener('touchmove', function(e){
    e.preventDefault();
}, { passive: false });

function demo(className, colors) {
    className = document.querySelector(`.${className}`);
    className.onclick = () => {
        return ctx.strokeStyle = colors
    }
}
demo('btn1', 'red');
demo('btn2', 'coral');
demo('btn3', 'yellow');
demo('btn4', 'green');
demo('btn5', 'blue');
demo('btn6', 'purple');
demo('btn7', 'black');
demo('btn8', 'grey');
demo("eraser", '#ffffff')

let refresh = document.querySelector(".refresh");
refresh.onclick = () => {
    window.location.reload()
}

function demo1(className, size) {
    className = document.querySelector(`.${className}`);
    className.onclick = () => {
        ctx.lineWidth = size;
    }
}
demo1('li1', 2)
demo1('li2', 4)
demo1('li3', 6)
demo1('li4', 8)
demo1('li5', 10)

let painting = false;
let last;


function dragline(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

let isTouchDevice = 'ontouchstart' in document.documentElement;

if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        last = [x, y]
    }
    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        dragline(last[0], last[1], x, y)
        last = [x, y]
    }
} else {
    canvas.onmousedown = (e) => {
        painting = true
        last = [e.clientX, e.clientY]
    }
    canvas.onmousemove = (e) => {
        if (painting === true) {
            ctx.beginPath();
            dragline(last[0], last[1], e.clientX, e.clientY)
            last = [e.clientX, e.clientY]
        }
    }
    canvas.onmouseup = (e) => {
        painting = false
    }
}

