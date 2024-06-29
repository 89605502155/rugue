import { MobileObject } from "./human.js";
export class Helth extends MobileObject {
    constructor(param, helthParam) {
        super(param);
        this.helth = helthParam.helth;
        this.minHelth = helthParam.minHelth;
        this.maxHelth = helthParam.maxHelth;
        this.isDead = helthParam.isDead;
    }
    setDamage(damage) {
        if (this.helth - damage <= this.minHelth) {
            this.helth = this.minHelth;
            this.isDead = true;
        }
        else {
            this.helth -= damage;
        }
    }
    setMedicines(medicine) {
        if (this.helth + medicine >= this.maxHelth) {
            this.helth = this.maxHelth;
        }
        else {
            this.helth += medicine;
        }
    }
}
