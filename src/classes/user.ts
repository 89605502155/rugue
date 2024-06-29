import { HumanInput } from "./enemy.js";
import { Human } from "./human.js";

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


export class User extends Human {
    roadToPicture:string;
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
    constructor(param: HumanInput,caps:MoveTabs){
        const person = new Image();
        person.src = param.roadToPicture;
        super({...param,person});
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
    x: number;
    y: number;
    person: HTMLImageElement;
};

