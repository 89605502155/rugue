var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MapField_instances, _MapField_studyArea;
export var Material;
(function (Material) {
    Material[Material["Air"] = 0] = "Air";
    Material[Material["StaticStone"] = 1] = "StaticStone";
    Material[Material["ElasticStone"] = 2] = "ElasticStone";
    Material[Material["DinamicNotElasticStone"] = 3] = "DinamicNotElasticStone";
    Material[Material["DinamicElasticStone"] = 4] = "DinamicElasticStone";
    Material[Material["Medecine"] = 5] = "Medecine";
    Material[Material["Dangerous"] = 6] = "Dangerous";
    Material[Material["Enemy"] = 7] = "Enemy";
    Material[Material["Player"] = 8] = "Player";
})(Material || (Material = {}));
export class Block {
    constructor(material, xCoord, yCoord, xSize, ySize) {
        this.material = material;
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.xSize = xSize;
        this.ySize = ySize;
    }
}
export class MapField {
    constructor(width, height) {
        _MapField_instances.add(this);
        this.width = width;
        this.height = height;
        this.mapFiels = new Array(this.width);
        for (let i = 0; i < this.width; i++) {
            this.mapFiels[i] = new Array(this.height);
            for (let j = 0; j < this.height; j++) {
                this.mapFiels[i][j] = Material.Air;
            }
        }
        this.secondSlice = [Material.Medecine, Material.Dangerous, Material.Enemy, Material.Player];
    }
    appendObject(object) {
        if (this.secondSlice.indexOf(object.material) !== -1) {
            __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_studyArea).call(this, object);
        }
        for (let i = object.yCoord; i < object.yCoord + object.xSize && i < this.width; i++) {
            for (let j = object.xCoord; j < object.xCoord + object.ySize && j < this.height; j++) {
                this.mapFiels[i][j] = object.material;
            }
        }
    }
}
_MapField_instances = new WeakSet(), _MapField_studyArea = function _MapField_studyArea(object) {
    for (let i = object.yCoord; i < object.yCoord + object.xSize && i < this.width; i++) {
        for (let j = object.xCoord; j < object.xCoord + object.ySize && j < this.height; j++) {
            if (this.mapFiels[i][j] !== Material.Air) {
            }
        }
    }
};
