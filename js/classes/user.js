import { Helth } from "./helth.js";
export class MoveTabs {
    constructor(Up, Down, Right, Left) {
        this.Up = Up;
        this.Down = Down;
        this.Right = Right;
        this.Left = Left;
    }
}
export class User extends Helth {
    constructor(param, caps, helthParam) {
        const person = new Image();
        person.src = param.roadToPicture[param.currentIndexPicture];
        super(Object.assign(Object.assign({}, param), { person }), Object.assign({}, helthParam));
        this.muveUp = (event) => {
            switch (event.key) {
                case this.caps.Up:
                    this.verticalForce = -75;
                    break;
                case this.caps.Down:
                    this.verticalForce = +75;
                    break;
                case this.caps.Left:
                    this.horizontalForce = -75;
                    break;
                case this.caps.Right:
                    this.horizontalForce = 75;
                    break;
            }
        };
        this.caps = caps;
        this.x = param.x;
        this.y = param.y;
        this.person = person;
        this.verticalForce = param.verticalForce;
        this.horizontalForce = param.horizontalForce;
        this.horizontalBoost = param.horizontalBoost;
        this.verticalBoost = param.verticalBoost;
        this.horizontalVelocity = param.horizontalVelocity;
        this.verticalVelocity = param.verticalVelocity;
        this.bodyWeight = param.bodyWeight;
        this.roadToPicture = param.roadToPicture;
        this.currentIndexPicture = param.currentIndexPicture;
    }
}
;
;
