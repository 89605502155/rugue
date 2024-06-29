var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MapField_instances, _MapField_studyAreaForHumanOnBuild;
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
    constructor(width, height, widthStep, heightStep) {
        _MapField_instances.add(this);
        this.width = width;
        this.height = height;
        this.widthStep = widthStep;
        this.heightStep = heightStep;
        this.newWith = width / widthStep;
        this.newHeight = height / heightStep;
        this.mapFiels = new Array(this.newWith);
        for (let i = 0; i < this.newWith; i++) {
            this.mapFiels[i] = new Array(this.newHeight);
            for (let j = 0; j < this.newHeight; j++) {
                this.mapFiels[i][j] = Material.Air;
            }
        }
        this.secondSlice = [Material.Medecine, Material.Dangerous, Material.Enemy, Material.Player];
    }
    ;
    convertFromPixel(x, y) {
        let xCoord = Math.floor(x / this.widthStep);
        let yCoord = Math.floor(y / this.heightStep);
        let xDev = x % this.widthStep;
        let yDev = y % this.heightStep;
        return [xCoord, yCoord, xDev, yDev, this.widthStep, this.heightStep];
    }
    ;
    shortConvertFromPixel(x, y) {
        let xCoord = Math.floor(x / this.widthStep);
        let yCoord = Math.floor(y / this.heightStep);
        console.log(x, y);
        console.log(this.widthStep, this.heightStep);
        console.log(xCoord, yCoord);
        console.log(x % this.widthStep, y % this.heightStep);
        console.log();
        return [xCoord, yCoord];
    }
    ;
    convertToPixel(xCoord, yCoord, xDev, yDev, widthStep, heightStep) {
        let x = xCoord * widthStep + xDev;
        let y = yCoord * heightStep + yDev;
        return [x, y];
    }
    ;
    appendObjectBuild(object_) {
        let resoult = true;
        let RightUp = this.shortConvertFromPixel(object_.xCoord + object_.xSize, object_.yCoord);
        let LeftUp = this.shortConvertFromPixel(object_.xCoord, object_.yCoord);
        let RightDown = this.shortConvertFromPixel(object_.xCoord + object_.xSize, object_.yCoord + object_.ySize);
        let LeftDown = this.shortConvertFromPixel(object_.xCoord, object_.yCoord + object_.ySize);
        if (this.secondSlice.indexOf(object_.material) !== -1) {
            resoult = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_studyAreaForHumanOnBuild).call(this, RightUp, LeftUp, RightDown, LeftDown);
        }
        ;
        if (resoult) {
            for (let i = RightUp[1]; i <= LeftDown[1]; i++) {
                this.mapFiels[i].fill(object_.material, LeftUp[0], RightDown[0] + 1);
            }
        }
        ;
        console.log();
        console.log();
        console.log(RightUp[1], LeftDown[1], "y", LeftUp[0], RightDown[0], "x");
        console.log(object_.yCoord, object_.yCoord + object_.ySize, "y", object_.xCoord, object_.xCoord + object_.xSize, "x");
        console.log(...this.convertToPixel(...LeftUp, 10, 20, this.widthStep, this.heightStep), "y", ...this.convertToPixel(...RightDown, 10, 20, this.widthStep, this.heightStep), "x");
        return resoult;
    }
}
_MapField_instances = new WeakSet(), _MapField_studyAreaForHumanOnBuild = function _MapField_studyAreaForHumanOnBuild(RightUp, LeftUp, RightDown, LeftDown) {
    for (let i = RightUp[1]; i < LeftDown[1]; i++) {
        for (let j = LeftUp[0]; j < RightDown[0]; j++) {
            if (this.mapFiels[i][j] !== Material.Air) {
                return false;
            }
        }
    }
    return true;
};
