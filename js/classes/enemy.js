import { Helth } from './helth.js';
export class Enemy extends Helth {
    constructor(param, helthParam) {
        const person = new Image();
        person.src = param.roadToPicture[param.currentIndexPicture];
        super(Object.assign(Object.assign({}, param), { person }), Object.assign({}, helthParam));
        this.person = person;
        this.currentIndexPicture = param.currentIndexPicture;
        this.roadToPicture = param.roadToPicture;
        this.x = param.x;
        this.y = param.y;
        this.verticalForce = param.verticalForce;
        this.horizontalForce = param.horizontalForce;
        this.horizontalBoost = param.horizontalBoost;
        this.verticalBoost = param.verticalBoost;
        this.horizontalVelocity = param.horizontalVelocity;
        this.verticalVelocity = param.verticalVelocity;
        this.bodyWeight = param.bodyWeight;
        this.constHorizontalVelocity = this.horizontalVelocity;
        this.constVerticalVelocity = this.verticalVelocity;
    }
    calcVelocity() {
        this.horizontalVelocity = this.constHorizontalVelocity;
        this.verticalVelocity = this.constVerticalVelocity;
    }
}
