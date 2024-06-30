import { Enemy } from "./classes/enemy.js";
import { Block, MapField, Material } from "./classes/matrix.js";
import { Kinematics } from "./classes/phisics.js";
import { MoveTabs, User } from "./classes/user.js";
document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext("2d");
    let mapField = new MapField(canvas.width, canvas.height, 50, 30);
    let stone = new Block(Material.StaticStone, 10, 50, 100, 150);
    let isPaintStone = mapField.appendObjectBuild(stone);
    mapField.secondSlice.push(Material.Air);
    console.log(mapField.mapFiels);
    let player = generatePlayer();
    const user = player[0];
    const userKinematic = player[1];
    let enemy = generateEnemy();
    const enemyOne = enemy[0];
    const enemyKinematic = enemy[1];
    // 30 * 12
    const bg = new Image();
    const fg = new Image(50, 150);
    // const pipeBottom = new Image();
    bg.src = "images/tile-.png";
    fg.src = "images/tile-W.png";
    // pipeBottom.src = "images/tile-SW.png";
    document.addEventListener("keydown", user.muveUp);
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBg(bg, ctx, canvas);
        // ctx.drawImage(bg, 0,0,canvas.width, canvas.height);
        drawStaticStone(fg, ctx, canvas, 50, 150, 10, 50);
        drawStaticStone(fg, ctx, canvas, 50, 150, 150, 350);
        drawStaticStone(fg, ctx, canvas, 50, 150, 410, 50);
        drawStaticStone(fg, ctx, canvas, 50, 150, 710, 450);
        drawStaticStone(fg, ctx, canvas, 50, 150, 910, 50);
        // mapField.mapFiels.forEach((row,rowIndex)=>{
        //     row.forEach((material, colIndex) => {
        //         if (mapField.secondSlice.indexOf(material)===-1) {
        //             // drawTile(colIndex, rowIndex);
        //             drawStaticStone(bg,ctx,canvas,50,30,colIndex*50,rowIndex*30)
        //         } else {
        //             drawStaticStone(bg,ctx,canvas,50,30,colIndex*50,rowIndex*30)
        //         }
        //     })
        // })
        // for (let i=0; i<mapField.mapFiels.length;i++){
        //     for (let j=0;j<mapField.mapFiels[i].length;j++){
        //         if (mapField.secondSlice.indexOf(mapField.mapFiels[i][j])!==-1){
        //             drawStaticStone(bg,ctx,canvas,50,30,i*50,j*30)
        //         } else {
        //             drawStaticStone(fg,ctx,canvas,50,30,i*50,j*30)
        //         }
        //     }
        // }
        // ctx.drawImage(fg,10,50, 50,  150);
        // ctx.drawImage(pipeBottom, 200, 400);
        enemyKinematic.update(enemyOne);
        enemyKinematic.calcNewCoord(enemyOne.person.width, enemyOne.person.height, (x0, x1, y0, y1, w, h) => {
            if (y1 + enemyOne.person.height <= canvas.height && y1 >= 0) {
                if (x1 + enemyOne.person.width <= canvas.width && x1 >= 0) {
                    return [x1, y1];
                }
                else {
                    enemyOne.constHorizontalVelocity *= -1;
                    return [x0, y1];
                }
            }
            else {
                if (x1 + enemyOne.person.width <= canvas.width && x1 >= 0) {
                    return [x1, y0];
                }
                else {
                    enemyOne.constHorizontalVelocity *= -1;
                    return [x0, y0];
                }
            }
        });
        enemyOne.updateKinematic(enemyKinematic);
        enemyOne.calcVelocity();
        enemyOne.draw(ctx);
        userKinematic.update(user);
        userKinematic.calcNewCoord(user.person.width, user.person.height, (x0, x1, y0, y1, w, h) => {
            if (y1 + user.person.height <= canvas.height && y1 >= 0) {
                if (x1 + user.person.width <= canvas.width && x1 >= 0) {
                    return [x1, y1];
                }
                else {
                    return [x0, y1];
                }
            }
            else {
                if (x1 + user.person.width <= canvas.width && x1 >= 0) {
                    return [x1, y0];
                }
                else {
                    return [x0, y0];
                }
            }
        });
        user.updateKinematic(userKinematic);
        user.draw(ctx);
        requestAnimationFrame(draw);
    }
    fg.onload = draw;
});
function generatePlayer() {
    let userTabs = new MoveTabs('w', 's', 'd', 'a');
    let userSrc = [];
    for (let i = 0; i < 6; i++) {
        userSrc.push("images/player/tile-P-" + (i + 1) + ".png");
    }
    const user = new User({ roadToPicture: userSrc, x: 10,
        y: 150, verticalForce: 50, horizontalForce: 50, horizontalBoost: 0,
        verticalBoost: 0, horizontalVelocity: 0, verticalVelocity: 0,
        bodyWeight: 2, currentIndexPicture: 0, speedPictureChange: 2 }, userTabs, { helth: 100, isDead: false,
        maxHelth: 100, minHelth: 0 });
    const userKinematic = new Kinematics(user, 0.3, 0.3);
    return [user, userKinematic];
}
function generateEnemy() {
    let enemyScr = [];
    for (let i = 0; i < 4; i++) {
        enemyScr.push("images/firstEnemy/tile-E-" + (i + 1) + ".png");
    }
    const enemyOne = new Enemy({ roadToPicture: enemyScr, x: 0,
        y: 200, verticalForce: 0, horizontalForce: 0, horizontalBoost: 0,
        verticalBoost: 0, horizontalVelocity: 10, verticalVelocity: 0,
        bodyWeight: 2, currentIndexPicture: 0, speedPictureChange: 5 }, { helth: 100, isDead: false, maxHelth: 100, minHelth: 0 });
    const enemyKinematic = new Kinematics(enemyOne, 0.3, 0.3);
    return [enemyOne, enemyKinematic];
}
function drawBg(bg, ctx, canvas) {
    const pattern = ctx.createPattern(bg, 'repeat');
    ctx.fillStyle = pattern;
    const areaWidth = canvas.width;
    const areaHeight = canvas.height;
    ctx.fillRect(0, 0, areaWidth, areaHeight);
}
function drawStaticStone(obj, ctx, canvas, width, height, x0, y0) {
    const pattern = ctx.createPattern(obj, 'repeat');
    ctx.fillStyle = pattern;
    const areaWidth = width;
    const areaHeight = height;
    ctx.fillRect(x0, y0, areaWidth, areaHeight);
}
