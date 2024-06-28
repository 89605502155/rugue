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


export class User {
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
    constructor(roadToPicture:string, x: number, y: number, 
        caps:MoveTabs,verticalForce:number, horizontalForce:number,horizontalBoost:number,
    verticalBoost:number,horizontalVelocity:number,verticalVelocity:number, bodyWeight:number){
        this.person = new Image();
        this.person.src=roadToPicture;
        this.roadToPicture=roadToPicture;
        this.x=x;
        this.y=y;
        this.caps=caps;
        this.verticalForce=verticalForce;
        this.horizontalForce=horizontalForce;
        this.horizontalBoost=horizontalBoost;
        this.verticalBoost=verticalBoost;
        this.horizontalVelocity=horizontalVelocity;
        this.verticalVelocity=verticalVelocity;
        this.bodyWeight=bodyWeight;
    }
    muveUp = (event: KeyboardEvent) =>{
        switch(event.key){
            case this.caps.Up:
                this.verticalForce=-50;
                break;
            case this.caps.Down:
                this.verticalForce=+50;
                break;
            case this.caps.Left:
                this.horizontalForce=-50;
                break;
            case this.caps.Right:
                this.horizontalForce=50;
                break;
        }
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
    }
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
    }
    
    
}
