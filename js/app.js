import { Kinematics } from "./classes/phisics.js";
import { MoveTabs, User } from "./classes/user.js";
document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext("2d");
    let userTabs = new MoveTabs('w', 's', 'd', 'a');
    const user = new User("images/tile-P.png", 10, 150, userTabs, 50, 50, 0, 0, 0, 0, 40);
    const userKinematic = new Kinematics(user, 0.1, 0.1);
    const bg = new Image();
    const fg = new Image();
    const pipeUp = new Image();
    const pipeBottom = new Image();
    bg.src = "images/tile-.png";
    fg.src = "images/tile-W.png";
    pipeUp.src = "images/tile-E.png";
    pipeBottom.src = "images/tile-SW.png";
    document.addEventListener("keydown", user.muveUp);
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(fg, 700, 0);
        ctx.drawImage(user.person, user.x, user.y);
        ctx.drawImage(pipeUp, 200, 0);
        ctx.drawImage(pipeBottom, 200, 400);
        userKinematic.update(user);
        userKinematic.calcNewCoord((x0, x1, y0, y1) => {
            if (y1 <= 400) {
                return [x1, y1];
            }
            else {
                return [x1, 400];
            }
        });
        user.updateKinematic(userKinematic);
        // if (user.y<= 400){
        //     user.y  += user.gravity;
        // }
        requestAnimationFrame(draw);
    }
    pipeBottom.onload = draw;
});
