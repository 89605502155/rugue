import {  MovingObjectDrawInput } from "./enemy.js";
import { HumanDraw, KinematicInterface } from "./user.js";

export class DrawMovingObject {
    horizontalVelocity: number;
    x: number;
    y: number;
    person: HTMLImageElement;
    constructor(param: HumanDraw){
        this.horizontalVelocity = param.horizontalVelocity;
        this.x = param.x;
        this.y = param.y;
        this.person = param.person;
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        if (this.horizontalVelocity<0) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.person, -this.x - this.person.width, this.y);
            // ctx.drawImage(this.person, this.x- this.person.width, this.y);
        } else {
            ctx.drawImage(this.person, this.x, this.y);
        }
        ctx.restore();
    }
}
export class MobileObject extends DrawMovingObject {
    roadToPicture:string;
    x: number;
    y: number;
    verticalForce: number;
    horizontalForce: number;
    horizontalBoost: number;
    verticalBoost: number;
    horizontalVelocity: number;
    verticalVelocity: number;
    person: HTMLImageElement;
    bodyWeight: number;
    constructor(param: MovingObjectDrawInput){
        super(param);
        this.roadToPicture  = param.roadToPicture;
        this.x = param.x;
        this.y = param.y;
        this.verticalForce= param.verticalForce;
        this.horizontalForce= param.horizontalForce;
        this.horizontalBoost= param.horizontalBoost;
        this.verticalBoost= param.verticalBoost;
        this.horizontalVelocity= param.horizontalVelocity;
        this.verticalVelocity= param.verticalVelocity;
        this.bodyWeight= param.bodyWeight;
        this.person= param.person;
    };
    updateKinematic(coord:KinematicInterface){
        this.x=coord.x;
        this.y=coord.y;
        this.verticalForce=coord.verticalForce;
        this.horizontalForce=coord.horizontalForce;
        this.horizontalBoost=coord.horizontalBoost;
        this.verticalBoost=coord.verticalBoost;
        this.horizontalVelocity=coord.horizontalVelocity;
        this.verticalVelocity=coord.verticalVelocity;
        this.bodyWeight=coord.bodyWeight;
    };
    getKinematicsParams():KinematicInterface{
        return {
            x:this.x,
            y:this.y,
            verticalForce:this.verticalForce,
            horizontalForce:this.horizontalForce,
            horizontalBoost:this.horizontalBoost,
            verticalBoost:this.verticalBoost,
            horizontalVelocity:this.horizontalVelocity,
            verticalVelocity:this.verticalVelocity,
            bodyWeight:this.bodyWeight
        }
    };
    getObjectArea():[number,number,number,number]{
        return [this.x,this.y,this.person.width,this.person.height];
    }
};
export enum ColliderShapes{
    Circle,
    Rectangle,
    Triangle,
    Elipse,
}
export class GetPointsObject{
    typeShape: ColliderShapes;
    constructor(param: ColliderShapes){
        this.typeShape= param;
    }
    getPoints(){

    }
    #

}

