var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Coordinates_instances, _Coordinates_changeCoord;
class Coordinates {
    constructor(x, y) {
        _Coordinates_instances.add(this);
        this.x = x;
        this.y = y;
    }
    offsetX(step, controlFunc) {
        this.x += __classPrivateFieldGet(this, _Coordinates_instances, "m", _Coordinates_changeCoord).call(this, this.x, step, true, controlFunc);
    }
    offsetY(step, controlFunc) {
        this.y += __classPrivateFieldGet(this, _Coordinates_instances, "m", _Coordinates_changeCoord).call(this, this.y, step, false, controlFunc);
    }
}
_Coordinates_instances = new WeakSet(), _Coordinates_changeCoord = function _Coordinates_changeCoord(coordinate, step, isAxisX, controlFunc) {
    let [isCanGo, newPos] = controlFunc(coordinate, step, isAxisX);
    if (isCanGo) {
        return step;
    }
    else {
        return (newPos - coordinate);
    }
};
export var StateObject;
(function (StateObject) {
    StateObject[StateObject["Solid"] = 0] = "Solid";
    StateObject[StateObject["Liquid"] = 1] = "Liquid";
})(StateObject || (StateObject = {}));
class ColligionObjects {
}
class GameObject extends Coordinates {
    constructor(x, y, state) {
        super(x, y);
        this.state = state;
    }
}
