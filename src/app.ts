import { Enemy } from "./classes/enemy.js";
import { Block, MapField, Material } from "./classes/matrix.js";
import { Kinematics } from "./classes/phisics.js";
import { KinematicInterface, MoveTabs, User } from "./classes/user.js";


document.addEventListener('DOMContentLoaded', (_event: Event) => {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    let mapField:MapField= new MapField(canvas.width,canvas.height,50,30,100,100);
    let stone:Block= new Block(Material.StaticStone,500,150,100,150);
    let isPaintStone:boolean= mapField.appendObjectBuild(stone)

    // console.log(mapField.mapFiels);
    let player = generatePlayer();
    const user=player[0];
    const userKinematic=player[1];


    let enemy=generateEnemy();
    const enemyOne=enemy[0];
    const enemyKinematic=enemy[1];
    // 30 * 12

    const bg = new Image();
    const fg = new Image();
    // const pipeBottom = new Image();

    bg.src = "images/tile-.png";
    fg.src = "images/tile-W.png";
    // pipeBottom.src = "images/tile-SW.png";

    document.addEventListener("keydown",user.muveUp)
    
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBg(bg,ctx,canvas);
        // ctx.drawImage(bg, 0,0,canvas.width, canvas.height);
        drawStaticStone(fg,ctx,canvas,100,150,500,150)

        enemyKinematic.update(enemyOne);
        enemyKinematic.calcNewCoord(enemyOne.person.width,enemyOne.person.height,
            (k:KinematicInterface,x1,y1,w,h):KinematicInterface=>{
            if (y1+enemyOne.person.height<=canvas.height && y1>=0){
                if  (x1+enemyOne.person.width<=canvas.width && x1>=0){
                    k.x=x1;
                    k.y=y1;
                    return k
                } else {
                    enemyOne.constHorizontalVelocity*=-1;
                    k.y=y1;
                    return k
                }
            } else {
                if  (x1+enemyOne.person.width<=canvas.width && x1>=0){
                    k.x=x1;
                    return k
                } else {
                    enemyOne.constHorizontalVelocity*=-1;
                    return k
                }
            }
        });
        enemyOne.updateKinematic(enemyKinematic);
        enemyOne.calcVelocity();
        enemyOne.draw(ctx);

        
        userKinematic.update(user)
        userKinematic.calcNewCoord(user.person.width,user.person.height,
            mapField.calculateCollision)
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

function drawBg(bg: HTMLImageElement,ctx: CanvasRenderingContext2D,canvas: HTMLCanvasElement){
    const pattern = ctx.createPattern(bg, 'repeat') as CanvasPattern;
    ctx.fillStyle = pattern;
    const areaWidth = canvas.width;
    const areaHeight = canvas.height;
    ctx.fillRect(0, 0, areaWidth, areaHeight);
}
function drawStaticStone(obj: HTMLImageElement,ctx: CanvasRenderingContext2D,_canvas: HTMLCanvasElement,
    width:number,height:number,x0:number,y0:number
){
    const pattern = ctx.createPattern(obj, 'repeat') as CanvasPattern;
    ctx.fillStyle = pattern;
    const areaWidth = width;
    const areaHeight = height;
    ctx.fillRect(x0, y0, areaWidth, areaHeight);
}
