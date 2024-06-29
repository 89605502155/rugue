import { Enemy } from "./classes/enemy.js";
import { Block, MapField, Material } from "./classes/matrix.js";
import { Kinematics } from "./classes/phisics.js";
import { MoveTabs, User } from "./classes/user.js";


document.addEventListener('DOMContentLoaded', (event: Event) => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let mapField:MapField= new MapField(canvas.width,canvas.height,50,30);
    let stone:Block= new Block(Material.StaticStone,10,50,100,150);
    let isPaintStone:boolean= mapField.appendObjectBuild(stone)
    console.log(isPaintStone);
    let player = generatePlayer();
    const user=player[0];
    const userKinematic=player[1];


    let enemy=generateEnemy();
    const enemyOne=enemy[0];
    const enemyKinematic=enemy[1];
    // 30 * 12

    // const bg = new Image();
    const fg = new Image( 50,  150);
    // const pipeBottom = new Image();

    // bg.src = "images/tile-.png";
    fg.src = "images/tile-W.png";
    // pipeBottom.src = "images/tile-SW.png";

    document.addEventListener("keydown",user.muveUp)
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.drawImage(bg, 0, 0);
        ctx.drawImage(fg,10,50, 50,  150);
        // ctx.drawImage(pipeBottom, 200, 400);

        enemyKinematic.update(enemyOne);
        enemyKinematic.calcNewCoord(enemyOne.person.width,enemyOne.person.height,
            (x0,x1,y0,y1,w,h)=>{
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

        
        userKinematic.update(user)
        userKinematic.calcNewCoord(user.person.width,user.person.height,
            (x0,x1,y0,y1,w,h)=>{
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
    fg.onload = draw;
});

function generatePlayer():[User,Kinematics] {
    let userTabs: MoveTabs = new MoveTabs('w','s','d','a');
    let userSrc: string[]=[];
    for (let i=0;i<6;i++){
        userSrc.push("images/player/tile-P-"+(i+1)+".png");
    }
    const user: User = new User({roadToPicture:userSrc,x:10,
        y:150,verticalForce:50, horizontalForce:50, horizontalBoost:0,
        verticalBoost:0,horizontalVelocity:0,verticalVelocity:0,
        bodyWeight:2,currentIndexPicture:0,speedPictureChange:2},userTabs,{helth:100,isDead:false,
            maxHelth:100,minHelth:0});
    const userKinematic = new Kinematics(user,0.3,0.3)
    return [user,userKinematic];
}

function generateEnemy():[Enemy,Kinematics]  {
    let enemyScr: string[]=[];
    for (let i=0;i<4;i++){
        enemyScr.push("images/firstEnemy/tile-E-"+(i+1)+".png");
    }
    const enemyOne:Enemy=new Enemy({roadToPicture:enemyScr,x:0,
        y:200,verticalForce:0, horizontalForce:0, horizontalBoost:0,
        verticalBoost:0,horizontalVelocity:10,verticalVelocity:0,
        bodyWeight:2,currentIndexPicture:0,speedPictureChange:5},{helth:100,isDead:false,maxHelth:100,minHelth:0});
    const enemyKinematic = new Kinematics(enemyOne,0.3,0.3)
    return [enemyOne,enemyKinematic];
}
