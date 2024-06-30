import { KinematicInterface } from "./user.js";

export enum Material{
    Air,
    StaticStone,
    ElasticStone,
    DinamicicStone,
    Medecine,
    Dangerous,
    Enemy,
    Player,
}
export class MaterialElastic{
    elasticStone:number;
    dinamikStone:number;
    constructor(elasticStone:number,dinamikStone:number){
        this.elasticStone=elasticStone;
        this.dinamikStone=dinamikStone;
    }
}
export class Block{
    material:Material;
    xCoord:number;
    yCoord:number;
    xSize:number;
    ySize:number;
    constructor(material:Material,xCoord:number,yCoord:number,xSize:number,ySize:number){
        this.material=material;
        this.xCoord=xCoord;
        this.yCoord=yCoord;
        this.xSize=xSize;
        this.ySize=ySize;
    }
}
export class MapField {
    mapFiels:Material[][];
    width:number;
    height:number;
    widthStep:number;
    heightStep:number;
    newWith:number;
    newHeight:number;
    secondSlice:Material[];
    stopSlice:Material[];
    elasticMat:MaterialElastic;
    constructor(width:number,height:number,widthStep:number,heightStep:number,
        elasticStone:number,dinamikStone:number
    ){
        this.width=width;
        this.height=height;
        this.widthStep=widthStep;
        this.heightStep=heightStep;
        this.newWith=width/widthStep;
        this.newHeight=height/heightStep;
        this.mapFiels=new Array(this.newWith);
        for(let i=0;i<this.newWith;i++){
            this.mapFiels[i]=new Array(this.newHeight);
            for(let j=0;j<this.newHeight;j++){
                this.mapFiels[i][j]=Material.Air;
            }
        }
        this.secondSlice=[Material.Medecine,Material.Dangerous,Material.Enemy,Material.Player,
            Material.Air
        ];
        this.stopSlice=[Material.StaticStone,Material.Dangerous,Material.Enemy];
        this.elasticMat=new MaterialElastic(elasticStone,dinamikStone);
    }
    #studyAreaForHumanOnBuild(RightUp:[number,number],LeftUp:[number,number],RightDown:[number,number],
        LeftDown:[number,number]):boolean{
        for (let i=LeftDown[1];i<RightUp[1];i++){
            for (let j=LeftUp[0];j<RightDown[0];j++){
                if (this.mapFiels[i][j]!==Material.Air){
                    return false;
                }
            }
        }
        return true;
    };
    convertFromPixel(x:number,y:number):[number,number,number,number,number,number]{
        let xCoord=Math.floor(x/this.widthStep);
        let yCoord=Math.floor(y/this.heightStep);
        let xDev = x%this.widthStep;
        let yDev = y%this.heightStep;
        return [xCoord,yCoord,xDev,yDev,this.widthStep,this.heightStep];
    };
    shortConvertFromPixel(x:number,y:number):[number,number]{
        let xCoord=Math.floor(x/this.widthStep);
        let yCoord=Math.floor(y/this.heightStep);
        return [xCoord,yCoord];
    };
    convertToPixel(xCoord:number,yCoord:number,xDev:number,yDev:number,
        widthStep:number,heightStep:number):[number,number]{
        let x=xCoord*widthStep+xDev;
        let y=yCoord*heightStep+yDev;
        return [x,y];
    };
    appendObjectBuild(object_:Block):boolean{
        let resoult:boolean=true;
        let RightUp=this.shortConvertFromPixel(object_.xCoord+object_.xSize,object_.yCoord);
        let LeftUp=this.shortConvertFromPixel(object_.xCoord,object_.yCoord);
        let RightDown=this.shortConvertFromPixel(object_.xCoord+object_.xSize,
            object_.yCoord+object_.ySize);
        let LeftDown=this.shortConvertFromPixel(object_.xCoord,
            object_.yCoord+object_.ySize);
        if (this.secondSlice.indexOf(object_.material) !== -1){
            resoult= this.#studyAreaForHumanOnBuild(RightUp,LeftUp,RightDown,LeftDown);
        };
        if  (resoult){
            for  (let i=RightUp[1];i<=LeftDown[1];i++){
                this.mapFiels[i].fill(object_.material,LeftUp[0],RightDown[0]+1)
            }
        };
        return resoult;
    }
    #setFrontAngular(firstTrack:Track,secondTrack:Track,
        verticalLow:boolean,horizontalLow:boolean
    ){
        if (horizontalLow && verticalLow) {
            // return this.mapFiels[]
            return 'Both a and b are true';
        } else if (horizontalLow && !verticalLow) {
            return 'a is true and b is false';
        } else if (!horizontalLow && verticalLow) {
            return 'a is false and b is true';
        } else {
            return 'Both a and b are false';
        }
    }
    calculateCollision(atThisMoment:KinematicInterface,x1:number,
        y1:number,width:number,height:number){
        let startPoint=this.convertFromPixel(atThisMoment.x,atThisMoment.y)
        let potentialPoint=this.convertFromPixel(x1,y1);
        if (startPoint[0]!==potentialPoint[0] && startPoint[1]!==potentialPoint[1]){
            let verticalLow:boolean=startPoint[1]<=potentialPoint[1];
            let horizontalLow:boolean=startPoint[0]<=potentialPoint[0];
            let equ=(startPoint[1]-potentialPoint[1])/(startPoint[0]-potentialPoint[0])
            let lessStepDeviation:number;
            let biggerStepDeviation:number;
            if (equ>=1){
                lessStepDeviation=1;
                biggerStepDeviation=Math.ceil(equ);
            }else {
                equ=1/equ;
                lessStepDeviation=Math.ceil(equ);
                biggerStepDeviation=1;
            }
            if (horizontalLow && verticalLow) {
                let to = this.convertFromPixel(atThisMoment.x+width,atThisMoment.y+height)
                let toFin = this.convertFromPixel(x1+width,y1+height)
                this.#setFrontAngular({startX: startPoint[0],startY: startPoint[1], step:biggerStepDeviation},
                    {startX:to[0],startY:to[1],step:lessStepDeviation},verticalLow,horizontalLow);
            } else if (horizontalLow && !verticalLow) {
                let st=this.convertFromPixel(atThisMoment.x+width,atThisMoment.y)
                let fin =this.convertFromPixel(atThisMoment.x+width,atThisMoment.y)
                // this.#setFrontAngular(startPoint[0],startPoint[1],potentialPoint[0],potentialPoint[1],
                //     lessStepDeviation,biggerStepDeviation,verticalLow,horizontalLow);
            } else if (!horizontalLow && verticalLow) {
                return 'a is false and b is true';
            } else {
                return 'Both a and b are false';
            }
        }
    }
}
export interface Track {
    startX:number;
    startY:number;
    step:number;
}