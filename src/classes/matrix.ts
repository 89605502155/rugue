import { KinematicInterface } from "./user.js";

export enum Material{
    Air,
    StaticStone,
    ElasticStone,
    Medecine,
    Dangerous,
    Enemy,
    Player,
}
export class MaterialElastic{
    elasticA:number;
    elasticV:number;
    constructor(elasticA:number,elasticV:number){
        this.elasticA=elasticA;
        this.elasticV=elasticV;
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
        elasticA:number,elasticV:number
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
        this.elasticMat=new MaterialElastic(elasticA,elasticV);
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
        verticalLow:boolean,horizontalLow:boolean,list: NotBaseObjecs
    ): NotBaseObjecs{
        if (horizontalLow && !verticalLow) {
            for (let i=firstTrack.startX;i<=secondTrack.startX+secondTrack.step;i++){
                for (let j=firstTrack.startY-firstTrack.step;j<=secondTrack.startY;j++){
                    if (i<secondTrack.startX && j<firstTrack.startY){
                        continue;
                    }
                    if (this.mapFiels[i][j]!==Material.Air) {
                        list.append(this.mapFiels[i][j]);
                    }
                }
            }
        } else if (!horizontalLow && verticalLow){
            for (let i=secondTrack.startX;i>=firstTrack.startX-firstTrack.step;i--){
                for (let j=firstTrack.startY;j<=secondTrack.startY+secondTrack.step;j++){
                    if (i>firstTrack.startX && j>secondTrack.startY){
                        continue;
                    }
                    if (this.mapFiels[i][j]!==Material.Air) {
                        list.append(this.mapFiels[i][j]);
                    }
                }
            }
        } else if (horizontalLow && verticalLow){
            for (let i=secondTrack.startX;i<=firstTrack.startX+firstTrack.step;i++){
                for (let j=firstTrack.startY;j<=secondTrack.startY+secondTrack.step;j++){
                    if (i<firstTrack.startX && j<secondTrack.startY){
                        continue;
                    }
                    if (this.mapFiels[i][j]!==Material.Air) {
                        list.append(this.mapFiels[i][j]);
                    }
                }
            }
        } else {
            for (let i=firstTrack.startX;i>=secondTrack.startX-secondTrack.step;i--){
                for (let j=secondTrack.startY;j<=firstTrack.startY-firstTrack.step;j--){
                    if (i>secondTrack.startX && j<firstTrack.startY){
                        continue;
                    }
                    if (this.mapFiels[i][j]!==Material.Air) {
                        list.append(this.mapFiels[i][j]);
                    }
                }
            }
        }
        return list;
    }
    calculateCollision=(atThisMoment:KinematicInterface,x1:number,
        y1:number,width:number,height:number):KinematicInterface=>{
        let startPoint=this.convertFromPixel(atThisMoment.x,atThisMoment.y)
        let potentialPoint=this.convertFromPixel(x1,y1);
        let objectsOnRoad:NotBaseObjecs=new NotBaseObjecs();
        
        if (startPoint[0]!==potentialPoint[0] && startPoint[1]!==potentialPoint[1]){
            
            let verticalLow:boolean=startPoint[1]<=potentialPoint[1];
            let horizontalLow:boolean=startPoint[0]<=potentialPoint[0];
            let equ=Math.abs((startPoint[1]-potentialPoint[1])/(startPoint[0]-potentialPoint[0]));
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
            
            if ((horizontalLow && !verticalLow)||(!horizontalLow && verticalLow)) {
                let to = this.convertFromPixel(atThisMoment.x+width,atThisMoment.y+height);
                let toFin = this.convertFromPixel(x1+width,y1+height);
                let m0:number=toFin[0]-to[0];
                let m1:number=toFin[1]-to[1];
                let num:number=Math.min(Math.abs(m0),Math.abs(m1));
                for (let i=0;i<num+1;i++){
                    objectsOnRoad=this.#setFrontAngular({startX: startPoint[0],startY: startPoint[1],
                         step:biggerStepDeviation},{startX:to[0],startY:to[1],step:lessStepDeviation},
                         verticalLow,horizontalLow,
                    objectsOnRoad);
                    if (objectsOnRoad.staticStone!==0 || objectsOnRoad.enemy!==0){
                        atThisMoment.verticalVelocity=0;
                        atThisMoment.horizontalVelocity=0;
                        return atThisMoment;
                    }
                    
                    if (objectsOnRoad.elasticStone!==0){
                        atThisMoment=this.#elasticStoneCalculation(atThisMoment,objectsOnRoad);
                        if (atThisMoment.verticalVelocity===0 || atThisMoment.horizontalVelocity===0){
                            return atThisMoment;
                        }
                    };
                    if (!horizontalLow && verticalLow){
                        startPoint[1]+=biggerStepDeviation;
                        to[1]+=biggerStepDeviation;
                        startPoint[0]-=lessStepDeviation;
                        to[0]-=lessStepDeviation;
                    } else {
                        startPoint[1]-=biggerStepDeviation;
                        to[1]-=biggerStepDeviation;
                        startPoint[0]+=lessStepDeviation;
                        to[0]+=lessStepDeviation;
                    }
                    let renewCoord: [number, number]=this.convertToPixel(...startPoint);
                    atThisMoment=this.#innerBorder(renewCoord,atThisMoment,width,height);

                }
                return atThisMoment;
                
            } else {
                let to = this.convertFromPixel(atThisMoment.x,atThisMoment.y+height);
                let toFin = this.convertFromPixel(x1,y1+height);
                let fi = this.convertFromPixel(atThisMoment.x+width,atThisMoment.y);
                // let toFi = this.convertFromPixel(x1+width,y1);
                let m0:number=toFin[0]-to[0];
                let m1:number=toFin[1]-to[1];
                let num:number=Math.min(Math.abs(m0),Math.abs(m1));
                for (let i=0;i<num+1;i++){
                    objectsOnRoad=this.#setFrontAngular({startX: fi[0],startY: fi[1],
                         step:biggerStepDeviation},{startX:to[0],startY:to[1],step:lessStepDeviation},
                         verticalLow,horizontalLow,
                    objectsOnRoad);
                    if (objectsOnRoad.staticStone!==0 || objectsOnRoad.enemy!==0){
                        atThisMoment.verticalVelocity=0;
                        atThisMoment.horizontalVelocity=0;
                        return atThisMoment;
                    }
                    
                    if (objectsOnRoad.elasticStone!==0){
                        atThisMoment=this.#elasticStoneCalculation(atThisMoment,objectsOnRoad);
                        if (atThisMoment.verticalVelocity===0 || atThisMoment.horizontalVelocity===0){
                            return atThisMoment;
                        }
                    };
                    if (horizontalLow && verticalLow){
                        fi[1]+=biggerStepDeviation;
                        to[1]+=biggerStepDeviation;
                        startPoint[1]+=biggerStepDeviation;
                        startPoint[0]+=lessStepDeviation;
                        fi[0]+=lessStepDeviation;
                        to[0]+=lessStepDeviation;
                    } else {
                        fi[1]-=biggerStepDeviation;
                        to[1]-=biggerStepDeviation;
                        startPoint[1]-=biggerStepDeviation;
                        startPoint[0]-=lessStepDeviation;
                        fi[0]-=lessStepDeviation;
                        to[0]-=lessStepDeviation;
                    }
                    let renewCoord: [number, number]=this.convertToPixel(...startPoint);
                    atThisMoment=this.#innerBorder(renewCoord,atThisMoment,width,height);

                }
                return atThisMoment;
            }
        }else {
            atThisMoment=this.#innerBorder([x1,y1],atThisMoment,width,height);
            return atThisMoment;
        }
    };
    #elasticStoneCalculation(atThisMoment: KinematicInterface,objectsOnRoad: NotBaseObjecs):KinematicInterface{
        
        [atThisMoment.verticalVelocity,atThisMoment.verticalForce]=this.#elasticStoneVectorCalculation(
            atThisMoment.verticalVelocity,
            objectsOnRoad.elasticStone,
            atThisMoment.verticalForce);
        
        [atThisMoment.horizontalVelocity,atThisMoment.horizontalForce]=this.#elasticStoneVectorCalculation(
            atThisMoment.horizontalVelocity,
            objectsOnRoad.elasticStone,
            atThisMoment.horizontalForce);
        return atThisMoment;
    };
    #elasticStoneVectorCalculation(velocity:number,elasticStone: number,force: number):[number,number]{
        if (velocity>0){
            velocity-=(elasticStone*this.elasticMat.elasticV);
            if (velocity<=0){
                force=(-1)*(elasticStone*this.elasticMat.elasticA); 
                velocity=0;
            }
        } else if (velocity<0){
            velocity+=(elasticStone*this.elasticMat.elasticV);
            if (velocity>=0){
                force=(elasticStone*this.elasticMat.elasticA); 
                velocity=0;
            }
        }
        return [velocity,force];
    }
    #innerBorder(renewCoord: [number, number],atThisMoment: KinematicInterface,width_:number,
        height_:number
    ): KinematicInterface{
        let wid:boolean=(renewCoord[0]+width_<=0.95*this.width && renewCoord[0]>=0)
        let hei:boolean=(renewCoord[1]+height_<=0.95*this.height && renewCoord[1]>=0)
        if (wid && hei){
            atThisMoment.x=renewCoord[0];
            atThisMoment.y=renewCoord[1];
        } else if (wid  &&!hei){
            atThisMoment.x=renewCoord[0];
        } else if (!wid  && hei){
            atThisMoment.y=renewCoord[1];
        }
        return atThisMoment;
    };
}
export interface Track {
    startX:number;
    startY:number;
    step:number;
}
export class NotBaseObjecs{
    staticStone:number;
    enemy:number;
    dangerous:number;
    elasticStone:number;
    constructor(){
        this.staticStone=0;
        this.enemy=0;
        this.dangerous=0;
        this.elasticStone=0;
    }
    append(ob:Material){
        if (ob===Material.StaticStone){
            this.staticStone++;
        }else if (ob===Material.Enemy){
            this.enemy++;
        }else if (ob===Material.Dangerous){
            this.dangerous++;
        }else if (ob===Material.ElasticStone){
            this.elasticStone++;
        }

    }
}