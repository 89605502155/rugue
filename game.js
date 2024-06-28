import {User} from './dist/user';
import { MoveTabs } from './dist/user';
document.addEventListener('DOMContentLoaded', (event) => {
    // Получаем элемент с классом 'canvas'
    const canvasElements = document.getElementsByClassName('canvas');

    // Проверяем, что элемент найден
    if (canvasElements.length > 0) {
        const ctx = canvasElements[0].getContext('2d');

        userTabs= new MoveTabs('w','s','d','a');
        const user = new User("images/tile-P.png",10,150,2,event,userTabs,50,50)
        // Объявляем изображения
        // const bird = new Image();
        const bg = new Image();
        const fg = new Image();
        const pipeUp = new Image();
        const pipeBottom = new Image();

        // Задаем пути к изображениям
        // bird.src = "images/tile-P.png";
        bg.src = "images/tile-.png";
        fg.src = "images/tile-W.png";
        pipeUp.src = "images/tile-E.png";
        pipeBottom.src = "images/tile-SW.png";


        let x=10;
        let y=150;
        let gravity  = 2;

        function muveUp(event){
            switch(event.key){
                case 'w':
                    y-=50;
                    break;
                case 's':
                    y+=50;
                    break;
                case 'a':
                    x-=50;
                    break;
                case 'd':
                    x+=50
                    break;
            }
        }

        document.addEventListener("keydown",user.muveUp)
        

        // Функция для рисования на canvas
        function draw() {
            ctx.clearRect(0, 0, canvasElements[0].width, canvasElements[0].height);
            ctx.drawImage(bg, 0, 0);
            ctx.drawImage(fg, 700,  0);
            ctx.drawImage(user.person, user.x, user.y);
            ctx.drawImage(pipeUp, 200, 0);
            ctx.drawImage(pipeBottom, 200, 400);
            
            if (user.y<= 400){
                user.y  += gravity;
            }
            requestAnimationFrame(draw)
        }

        // Вызываем функцию draw после загрузки последнего изображения
        pipeBottom.onload = draw;
    } else {
        console.error('Элемент с классом canvas не найден.');
    }
});