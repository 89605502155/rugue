var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MapField_instances, _MapField_studyAreaForHumanOnBuild, _MapField_setFrontAngular;
export var Material;
(function (Material) {
    Material[Material["Air"] = 0] = "Air";
    Material[Material["StaticStone"] = 1] = "StaticStone";
    Material[Material["ElasticStone"] = 2] = "ElasticStone";
    Material[Material["DinamicicStone"] = 3] = "DinamicicStone";
    Material[Material["Medecine"] = 4] = "Medecine";
    Material[Material["Dangerous"] = 5] = "Dangerous";
    Material[Material["Enemy"] = 6] = "Enemy";
    Material[Material["Player"] = 7] = "Player";
})(Material || (Material = {}));
export class MaterialElastic {
    constructor(elasticStone, dinamikStone) {
        this.elasticStone = elasticStone;
        this.dinamikStone = dinamikStone;
    }
}
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
    constructor(width, height, widthStep, heightStep, elasticStone, dinamikStone) {
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
        this.secondSlice = [Material.Medecine, Material.Dangerous, Material.Enemy, Material.Player,
            Material.Air
        ];
        this.stopSlice = [Material.StaticStone, Material.Dangerous, Material.Enemy];
        this.elasticMat = new MaterialElastic(elasticStone, dinamikStone);
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
        return resoult;
    }
    calculateCollision(atThisMoment, x1, y1, width, height) {
        let startPoint = this.convertFromPixel(atThisMoment.x, atThisMoment.y);
        let potentialPoint = this.convertFromPixel(x1, y1);
        if (startPoint[0] !== potentialPoint[0] && startPoint[1] !== potentialPoint[1]) {
            let verticalLow = startPoint[1] <= potentialPoint[1];
            let horizontalLow = startPoint[0] <= potentialPoint[0];
            let equ = (startPoint[1] - potentialPoint[1]) / (startPoint[0] - potentialPoint[0]);
            let lessStepDeviation;
            let biggerStepDeviation;
            if (equ >= 1) {
                lessStepDeviation = 1;
                biggerStepDeviation = Math.ceil(equ);
            }
            else {
                equ = 1 / equ;
                lessStepDeviation = Math.ceil(equ);
                biggerStepDeviation = 1;
            }
            if (horizontalLow && verticalLow) {
                let to = this.convertFromPixel(atThisMoment.x + width, atThisMoment.y + height);
                let toFin = this.convertFromPixel(x1 + width, y1 + height);
                __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_setFrontAngular).call(this, { startX: startPoint[0], startY: startPoint[1], step: biggerStepDeviation }, { startX: to[0], startY: to[1], step: lessStepDeviation }, verticalLow, horizontalLow);
            }
            else if (horizontalLow && !verticalLow) {
                let st = this.convertFromPixel(atThisMoment.x + width, atThisMoment.y);
                let fin = this.convertFromPixel(atThisMoment.x + width, atThisMoment.y);
                // this.#setFrontAngular(startPoint[0],startPoint[1],potentialPoint[0],potentialPoint[1],
                //     lessStepDeviation,biggerStepDeviation,verticalLow,horizontalLow);
            }
            else if (!horizontalLow && verticalLow) {
                return 'a is false and b is true';
            }
            else {
                return 'Both a and b are false';
            }
        }
    }
}
_MapField_instances = new WeakSet(), _MapField_studyAreaForHumanOnBuild = function _MapField_studyAreaForHumanOnBuild(RightUp, LeftUp, RightDown, LeftDown) {
    for (let i = LeftDown[1]; i < RightUp[1]; i++) {
        for (let j = LeftUp[0]; j < RightDown[0]; j++) {
            if (this.mapFiels[i][j] !== Material.Air) {
                return false;
            }
        }
    }
    return true;
}, _MapField_setFrontAngular = function _MapField_setFrontAngular(firstTrack, secondTrack, verticalLow, horizontalLow) {
    if (horizontalLow && verticalLow) {
        // return this.mapFiels[]
        return 'Both a and b are true';
    }
    else if (horizontalLow && !verticalLow) {
        return 'a is true and b is false';
    }
    else if (!horizontalLow && verticalLow) {
        return 'a is false and b is true';
    }
    else {
        return 'Both a and b are false';
    }
};
