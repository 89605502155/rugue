document.addEventListener('DOMContentLoaded', (event) => {
    // Получаем элемент с классом 'canvas'
    const canvasElements = document.getElementsByClassName('canvas');

    // Проверяем, что элемент найден
    if (canvasElements.length > 0) {
        const ctx = canvasElements[0].getContext('2d');

        // Объявляем изображения
        const bird = new Image();
        const bg = new Image();
        const fg = new Image();
        const pipeUp = new Image();
        const pipeBottom = new Image();

        // Задаем пути к изображениям
        bird.src = "images/tile-P.png";
        bg.src = "images/tile-.png";
        fg.src = "images/tile-W.png";
        pipeUp.src = "images/tile-E.png";
        pipeBottom.src = "images/tile-SW.png";

        // Функция для рисования на canvas
        function draw() {
            ctx.drawImage(bg, 0, 0);
            ctx.drawImage(fg, 100, 0);
            ctx.drawImage(bird, 10, 150);
            ctx.drawImage(pipeUp, 100, 0);
            ctx.drawImage(pipeBottom, 100, 200);
        }

        // Вызываем функцию draw после загрузки последнего изображения
        pipeBottom.onload = draw;
    } else {
        console.error('Элемент с классом canvas не найден.');
    }
});