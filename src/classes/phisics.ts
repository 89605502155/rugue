import { KinematicInterface } from "./user";

class Coordinates {
    x: number;
    y: number;
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    #changeCoord(coordinate:number,step:number,isAxisX:boolean, controlFunc:(coord:number,
        step:number,isAxisX:boolean)=>[boolean, number]):number{
        let [isCanGo, newPos] = controlFunc(coordinate, step,isAxisX);
        if(isCanGo){
            return step;
        } else{
            return (newPos-coordinate);
        }
    }
    offsetX(step:number, controlFunc:(coord:number,step:number,isAxisX:boolean)=>[boolean, number]){
        this.x += this.#changeCoord(this.x,step,true,controlFunc)
    }
    offsetY(step:number, controlFunc:(coord:number,step:number,isAxisX:boolean)=>[boolean, number]){
        this.y  += this.#changeCoord(this.y,step,false,controlFunc)
    }
}
export enum StateObject{
    Solid,
    Liquid,
}
export class Kinematics{
    x: number;
    y: number;
    verticalForce: number;
    horizontalForce: number;
    horizontalBoost: number;
    verticalBoost: number;
    horizontalVelocity: number;
    verticalVelocity: number;
    bodyWeight: number;
    resistanceX: number;
    resistanceY: number;
    constructor(coord:KinematicInterface,resistanceX:number,resistanceY:number){
        this.x=coord.x;
        this.y=coord.y;
        this.bodyWeight=coord.bodyWeight;
        this.verticalForce=coord.verticalForce;
        this.horizontalForce=coord.horizontalForce;
        this.horizontalBoost=coord.horizontalBoost;
        this.verticalBoost=coord.verticalBoost;
        this.horizontalVelocity=coord.horizontalVelocity;
        this.verticalVelocity=coord.verticalVelocity;
        this.resistanceX=resistanceX;
        this.resistanceY=resistanceY;
    }

    #calcBoostX(){
        return (this.horizontalForce/this.bodyWeight)+this.horizontalBoost;
    }
    #calcDeltaRoadX(){
        this.horizontalVelocity+=this.#calcBoostX();
        this.horizontalVelocity-=(this.horizontalVelocity*this.resistanceX);
        return this.horizontalVelocity;
    }
    #calcBoostY(){
        return (this.verticalForce/this.bodyWeight)+this.verticalBoost;
    }
    #calcDeltaRoadY(){
        this.verticalVelocity+=this.#calcBoostY();
        this.verticalVelocity-=(this.verticalVelocity*this.resistanceY);
        return this.verticalVelocity;
    }
    #forceToZero(){
        if (this.verticalForce!==0){
            this.verticalForce=0;
        }
        if  (this.horizontalForce!==0){
            this.horizontalForce=0;
        }
    }

    calcNewCoord(controlFunc:(x0:number,x1:number,y0:number,y1:number)=>[number, number]){
        let potentialX=this.#calcDeltaRoadX();
        let potentialY=this.#calcDeltaRoadY();
        let newCoord:[number,number]=controlFunc(this.x,this.x+potentialX,this.y,this.y+potentialY);
        this.x=newCoord[0];
        this.y=newCoord[1];
        this.#forceToZero();
    }
    getParams():KinematicInterface{
        return {
            x:this.x,
            y:this.y,
            bodyWeight:this.bodyWeight,
            verticalForce:this.verticalForce,
            horizontalForce:this.horizontalForce,
            horizontalBoost:this.horizontalBoost,
            verticalBoost:this.verticalBoost,
            horizontalVelocity:this.horizontalVelocity,
            verticalVelocity:this.verticalVelocity,
        }
    }
    update(params:KinematicInterface){
        this.x=params.x;
        this.y=params.y;
        this.bodyWeight=params.bodyWeight;
        this.verticalForce=params.verticalForce;
        this.horizontalForce=params.horizontalForce;
        this.horizontalBoost=params.horizontalBoost;
        this.verticalBoost=params.verticalBoost;
        this.horizontalVelocity=params.horizontalVelocity;
        this.verticalVelocity=params.verticalVelocity;
    }
}

