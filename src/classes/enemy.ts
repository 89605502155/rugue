import {  Human } from './human.js';

export interface HumanDrawInput{
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
}
export interface HumanInput{
    roadToPicture:string;
    x: number;
    y: number;
    verticalForce: number;
    horizontalForce: number;
    horizontalBoost: number;
    verticalBoost: number;
    horizontalVelocity: number;
    verticalVelocity: number;
    bodyWeight: number;
}
export class Enemy extends Human {
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
    constHorizontalVelocity: number;
    constVerticalVelocity: number;
    constructor(param: HumanInput){
        const person = new Image();
        person.src = param.roadToPicture;
        super({...param,person});
        this.person=person;
        this.roadToPicture=param.roadToPicture;
        this.x=param.x;
        this.y=param.y;
        this.verticalForce=param.verticalForce;
        this.horizontalForce=param.horizontalForce;
        this.horizontalBoost=param.horizontalBoost;
        this.verticalBoost=param.verticalBoost;
        this.horizontalVelocity=param.horizontalVelocity;
        this.verticalVelocity=param.verticalVelocity;
        this.bodyWeight=param.bodyWeight;
        this.constHorizontalVelocity=this.horizontalVelocity;
        this.constVerticalVelocity=this.verticalVelocity;
    }
    calcVelocity(){
        this.horizontalVelocity=this.constHorizontalVelocity;
        this.verticalVelocity=this.constVerticalVelocity;
    }

}