import { Human } from './human.js';
export class Enemy extends Human {
    constructor(param) {
        const person = new Image();
        person.src = param.roadToPicture;
        super(Object.assign(Object.assign({}, param), { person }));
        this.person = person;
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
