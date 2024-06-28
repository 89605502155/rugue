"use strict";
class Helth {
    constructor(helth, minHelth = 0, maxHelth = 100) {
        this.helth = helth;
        this.minHelth = minHelth;
        this.maxHelth = maxHelth;
        this.isDead = false;
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
