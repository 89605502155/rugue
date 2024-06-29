import { Enemy } from "./classes/enemy.js";
import { Kinematics } from "./classes/phisics.js";
import { MoveTabs, User } from "./classes/user.js";


document.addEventListener('DOMContentLoaded', (event: Event) => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let userTabs: MoveTabs = new MoveTabs('w','s','d','a');

    const user: User = new User({roadToPicture:"images/tile-P.png",x:10,
        y:150,verticalForce:50, horizontalForce:50, horizontalBoost:0,
        verticalBoost:0,horizontalVelocity:0,verticalVelocity:0,
        bodyWeight:2},userTabs);
    const userKinematic = new Kinematics(user,0.3,0.3)

    const enemyOne:Enemy=new Enemy({roadToPicture:"images/tile-E.png",x:0,
        y:200,verticalForce:0, horizontalForce:0, horizontalBoost:0,
        verticalBoost:0,horizontalVelocity:10,verticalVelocity:0,
        bodyWeight:2});
    const enemyKinematic = new Kinematics(enemyOne,0.3,0.3)

    const bg = new Image();
    const fg = new Image();
    const pipeBottom = new Image();

    bg.src = "images/tile-.png";
    fg.src = "images/tile-W.png";
    pipeBottom.src = "images/tile-SW.png";

    document.addEventListener("keydown",user.muveUp)

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(fg, 700,  0);

        enemyKinematic.update(enemyOne);
        enemyKinematic.calcNewCoord((x0,x1,y0,y1)=>{
            if (y1+enemyOne.person.height<=canvas.height && y1>=0){
                if  (x1+enemyOne.person.width<=canvas.width && x1>=0){
                    return [x1,y1]
                } else {
                    enemyOne.constHorizontalVelocity*=-1;
                    return [x0,y1]
                }
            } else {
                if  (x1+enemyOne.person.width<=canvas.width && x1>=0){
                    return [x1,y0]
                } else {
                    enemyOne.constHorizontalVelocity*=-1;
                    return [x0,y0]
                }
            }
        });
        enemyOne.updateKinematic(enemyKinematic);
        enemyOne.calcVelocity();
        enemyOne.draw(ctx);

        ctx.drawImage(pipeBottom, 200, 400);
        // ctx.drawImage(user.person, user.x, user.y);
        
        userKinematic.update(user)
        userKinematic.calcNewCoord((x0,x1,y0,y1)=>{
            if (y1+user.person.height<=canvas.height && y1>=0){
                if  (x1+user.person.width<=canvas.width && x1>=0){
                    return [x1,y1]
                } else {
                    return [x0,y1]
                }
            } else {
                if  (x1+user.person.width<=canvas.width && x1>=0){
                    return [x1,y0]
                } else {
                    return [x0,y0]
                }
            }
        })
        user.updateKinematic(userKinematic)
        user.draw(ctx)
        requestAnimationFrame(draw)
    }
    pipeBottom.onload = draw;
});
