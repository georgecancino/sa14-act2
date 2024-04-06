const container = document.querySelector('.container');
const square = document.getElementById('block');

let isDragging = false;
let initialX;
let initialY;
let offsetX = 0;
let offsetY = 0;

function handleMouseDown(event) {
    isDragging = true;
    initialX = event.clientX;
    initialY = event.clientY;
    offsetX = square.offsetLeft;
    offsetY = square.offsetTop;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
}

function handleMouseMove(event) {
    if (isDragging) {
        const newX = event.clientX - initialX + offsetX;
        const newY = event.clientY - initialY + offsetY;
        const maxX = container.clientWidth - square.clientWidth;
        const maxY = container.clientHeight - square.clientHeight;
        const clampedX = Math.min(Math.max(0, newX), maxX);
        const clampedY = Math.min(Math.max(0, newY), maxY);
        square.style.left = `${clampedX}px`;
        square.style.top = `${clampedY}px`;
    }
}

function handleMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

square.addEventListener('mousedown', handleMouseDown);
