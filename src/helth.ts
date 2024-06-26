class Helth {
    helth:number;
    isDead:boolean;
    minHelth:number;
    maxHelth:number;
    constructor(helth:number,minHelth:number=0,maxHelth:number=100){
        this.helth=helth;
        this.minHelth=minHelth;
        this.maxHelth=maxHelth;
        this.isDead=false;
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