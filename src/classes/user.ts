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
export class User {
    roadToPicture:string;
    x: number;
    y: number;
    gravity: number;
    caps: MoveTabs;
    verticalStep: number;
    horizontalStep: number;
    person: HTMLImageElement;
    constructor(roadToPicture:string, x: number, y: number, gravity: number,
        caps:MoveTabs,verticalStep:number,
        horizontalStep:number){
        this.person = new Image();
        this.person.src=roadToPicture;
        this.roadToPicture=roadToPicture;
        this.x=x;
        this.y=y;
        this.gravity=gravity;
        this.caps=caps;
        this.verticalStep=verticalStep;
        this.horizontalStep=horizontalStep;
    }
    muveUp = (event: KeyboardEvent) =>{
        switch(event.key){
            case this.caps.Up:
                this.y-=this.verticalStep;
                break;
            case this.caps.Down:
                this.y+=this.verticalStep;
                break;
            case this.caps.Left:
                this.x-=this.horizontalStep;
                break;
            case this.caps.Right:
                this.x+=this.horizontalStep;
                break;
        }
    };
    
    
}
