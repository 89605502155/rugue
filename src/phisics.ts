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
class ColligionObjects{
    
}
class GameObject extends Coordinates {
    state: StateObject;
    constructor(x:number, y:number, state: StateObject){
        super(x, y);
        this.state = state;
    }
}