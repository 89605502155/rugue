import { MovingObjectDrawInput } from "./enemy.js";
import { MobileObject } from "./human.js";

export interface HelthInput{
    helth:number;
    isDead:boolean;
    minHelth:number;
    maxHelth:number;
}
export class Helth extends MobileObject {
    helth:number;
    isDead:boolean;
    minHelth:number;
    maxHelth:number;
    constructor(param: MovingObjectDrawInput,helthParam:HelthInput){
        super(param);
        this.helth=helthParam.helth;
        this.minHelth=helthParam.minHelth;
        this.maxHelth=helthParam.maxHelth;
        this.isDead=helthParam.isDead;
    }
    setDamage(damage:number){
        if (this.helth-damage<=this.minHelth){
            this.helth=this.minHelth;
            this.isDead=true;
        } else {
            this.helth-=damage;
        }
    }
    setMedicines(medicine:number){
        if (this.helth+medicine>=this.maxHelth){
            this.helth=this.maxHelth;
        }
        else{
            this.helth+=medicine;
        }

    }
}