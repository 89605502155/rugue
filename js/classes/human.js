export class DrawHuman {
    constructor(param) {
        this.horizontalVelocity = param.horizontalVelocity;
        this.x = param.x;
        this.y = param.y;
        this.person = param.person;
    }
    draw(ctx) {
        ctx.save();
        if (this.horizontalVelocity < 0) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.person, -this.x - this.person.width, this.y);
        }
        else {
            ctx.drawImage(this.person, this.x, this.y);
        }
        ctx.restore();
    }
}
export class Human extends DrawHuman {
    constructor(param) {
        super(param);
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
        this.person = param.person;
    }
    ;
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
    ;
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
    ;
}
;
