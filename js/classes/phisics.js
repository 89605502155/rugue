var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Kinematics_instances, _Kinematics_calcBoostX, _Kinematics_calcDeltaRoadX, _Kinematics_calcBoostY, _Kinematics_calcDeltaRoadY, _Kinematics_forceToZero;
export class Kinematics {
    constructor(coord, resistanceX, resistanceY) {
        _Kinematics_instances.add(this);
        this.x = coord.x;
        this.y = coord.y;
        this.bodyWeight = coord.bodyWeight;
        this.verticalForce = coord.verticalForce;
        this.horizontalForce = coord.horizontalForce;
        this.horizontalBoost = coord.horizontalBoost;
        this.verticalBoost = coord.verticalBoost;
        this.horizontalVelocity = coord.horizontalVelocity;
        this.verticalVelocity = coord.verticalVelocity;
        this.resistanceX = resistanceX;
        this.resistanceY = resistanceY;
    }
    calcNewCoord(width, height, controlFunc) {
        let potentialX = __classPrivateFieldGet(this, _Kinematics_instances, "m", _Kinematics_calcDeltaRoadX).call(this);
        let potentialY = __classPrivateFieldGet(this, _Kinematics_instances, "m", _Kinematics_calcDeltaRoadY).call(this);
        let newData = controlFunc(this.getParams(), this.x + potentialX, this.y + potentialY, width, height);
        this.update(newData);
        __classPrivateFieldGet(this, _Kinematics_instances, "m", _Kinematics_forceToZero).call(this);
    }
    getParams() {
        return {
            x: this.x,
            y: this.y,
            bodyWeight: this.bodyWeight,
            verticalForce: this.verticalForce,
            horizontalForce: this.horizontalForce,
            horizontalBoost: this.horizontalBoost,
            verticalBoost: this.verticalBoost,
            horizontalVelocity: this.horizontalVelocity,
            verticalVelocity: this.verticalVelocity,
        };
    }
    update(params) {
        this.x = params.x;
        this.y = params.y;
        this.bodyWeight = params.bodyWeight;
        this.verticalForce = params.verticalForce;
        this.horizontalForce = params.horizontalForce;
        this.horizontalBoost = params.horizontalBoost;
        this.verticalBoost = params.verticalBoost;
        this.horizontalVelocity = params.horizontalVelocity;
        this.verticalVelocity = params.verticalVelocity;
    }
}
_Kinematics_instances = new WeakSet(), _Kinematics_calcBoostX = function _Kinematics_calcBoostX() {
    return (this.horizontalForce / this.bodyWeight) + this.horizontalBoost;
}, _Kinematics_calcDeltaRoadX = function _Kinematics_calcDeltaRoadX() {
    this.horizontalVelocity += __classPrivateFieldGet(this, _Kinematics_instances, "m", _Kinematics_calcBoostX).call(this);
    this.horizontalVelocity -= (this.horizontalVelocity * this.resistanceX);
    return this.horizontalVelocity;
}, _Kinematics_calcBoostY = function _Kinematics_calcBoostY() {
    return (this.verticalForce / this.bodyWeight) + this.verticalBoost;
}, _Kinematics_calcDeltaRoadY = function _Kinematics_calcDeltaRoadY() {
    this.verticalVelocity += __classPrivateFieldGet(this, _Kinematics_instances, "m", _Kinematics_calcBoostY).call(this);
    this.verticalVelocity -= (this.verticalVelocity * this.resistanceY);
    return this.verticalVelocity;
}, _Kinematics_forceToZero = function _Kinematics_forceToZero() {
    if (this.verticalForce !== 0) {
        this.verticalForce = 0;
    }
    if (this.horizontalForce !== 0) {
        this.horizontalForce = 0;
    }
};
