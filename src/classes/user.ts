import { MovingObjectInput } from "./enemy.js";
import { Helth, HelthInput } from "./helth.js";

export class MoveTabs{
    Up: string;
    Down: string;
    Right: string;
    Left: string;
    constructor(Up: string, Down: string, Right: string, Left: string){
        this.Up=Up;
        this.Down=Down;
        this.Right=Right;
        this.Left=Left;
    }
}

export interface KinematicInterface{
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


export class User extends Helth {
    roadToPicture:string[];
    x: number;
    y: number;
    caps: MoveTabs;
    verticalForce: number;
    horizontalForce: number;
    horizontalBoost: number;
    verticalBoost: number;
    horizontalVelocity: number;
    verticalVelocity: number;
    person: HTMLImageElement;
    bodyWeight: number;
    currentIndexPicture: number;
    constructor(param: MovingObjectInput,caps:MoveTabs,helthParam: HelthInput){
        const person = new Image();
        person.src = param.roadToPicture[param.currentIndexPicture];
        super({...param,person},{...helthParam});
        this.caps=caps;
        this.x=param.x;
        this.y=param.y;
        this.person=person;
        this.verticalForce=param.verticalForce;
        this.horizontalForce=param.horizontalForce;
        this.horizontalBoost=param.horizontalBoost;
        this.verticalBoost=param.verticalBoost;
        this.horizontalVelocity=param.horizontalVelocity;
        this.verticalVelocity=param.verticalVelocity;
        this.bodyWeight=param.bodyWeight;
        this.roadToPicture=param.roadToPicture; 
        this.currentIndexPicture=param.currentIndexPicture;
    }
    muveUp = (event: KeyboardEvent) =>{
        switch(event.key){
            case this.caps.Up:
                this.verticalForce=-75;
                break;
            case this.caps.Down:
                this.verticalForce=+75;
                break;
            case this.caps.Left:
                this.horizontalForce=-75;
                break;
            case this.caps.Right:
                this.horizontalForce=75;
                break;
        }
    };
    
};

export interface HumanDraw{
    horizontalVelocity: number;
    verticalVelocity: number;
    x: number;
    y: number;
    person: HTMLImageElement;
    roadToPicture:string[];
    currentIndexPicture: number;
    speedPictureChange: number;
};

