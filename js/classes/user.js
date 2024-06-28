export class MoveTabs {
    constructor(Up, Down, Right, Left) {
        this.Up = Up;
        this.Down = Down;
        this.Right = Right;
        this.Left = Left;
    }
}
export class User {
    constructor(roadToPicture, x, y, caps, verticalForce, horizontalForce, horizontalBoost, verticalBoost, horizontalVelocity, verticalVelocity, bodyWeight) {
        this.muveUp = (event) => {
            switch (event.key) {
                case this.caps.Up:
                    this.verticalForce = -50;
                    break;
                case this.caps.Down:
                    this.verticalForce = +50;
                    break;
                case this.caps.Left:
                    this.horizontalForce = -50;
                    break;
                case this.caps.Right:
                    this.horizontalForce = 50;
                    break;
            }
        };
        this.person = new Image();
        this.person.src = roadToPicture;
        this.roadToPicture = roadToPicture;
        this.x = x;
        this.y = y;
        this.caps = caps;
        this.verticalForce = verticalForce;
        this.horizontalForce = horizontalForce;
        this.horizontalBoost = horizontalBoost;
        this.verticalBoost = verticalBoost;
        this.horizontalVelocity = horizontalVelocity;
        this.verticalVelocity = verticalVelocity;
        this.bodyWeight = bodyWeight;
    }
    updateKinematic(coord) {
        this.x = coord.x;
        this.y = coord.y;
        this.verticalForce = coord.verticalForce;
        this.horizontalForce = coord.horizontalForce;
        this.horizontalBoost = coord.horizontalBoost;
        this.verticalBoost = coord.verticalBoost;
        this.horizontalVelocity = coord.horizontalVelocity;
        this.verticalVelocity = coord.verticalVelocity;
        this.bodyWeight = coord.bodyWeight;
    }
    getKinematicsParams() {
        return {
            x: this.x,
            y: this.y,
            verticalForce: this.verticalForce,
            horizontalForce: this.horizontalForce,
            horizontalBoost: this.horizontalBoost,
            verticalBoost: this.verticalBoost,
            horizontalVelocity: this.horizontalVelocity,
            verticalVelocity: this.verticalVelocity,
            bodyWeight: this.bodyWeight
        };
    }
}
