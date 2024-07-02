var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MapField_instances, _MapField_studyAreaForHumanOnBuild, _MapField_setFrontRectangle, _MapField_setFrontAngular, _MapField_elasticStoneCalculation, _MapField_elasticStoneVectorCalculation, _MapField_innerBorder;
export var Material;
(function (Material) {
    Material[Material["Air"] = 0] = "Air";
    Material[Material["StaticStone"] = 1] = "StaticStone";
    Material[Material["ElasticStone"] = 2] = "ElasticStone";
    Material[Material["Medecine"] = 3] = "Medecine";
    Material[Material["Dangerous"] = 4] = "Dangerous";
    Material[Material["Enemy"] = 5] = "Enemy";
    Material[Material["Player"] = 6] = "Player";
})(Material || (Material = {}));
export class MaterialElastic {
    constructor(elasticA, elasticV) {
        this.elasticA = elasticA;
        this.elasticV = elasticV;
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
    constructor(width, height, widthStep, heightStep, elasticA, elasticV) {
        _MapField_instances.add(this);
        this.calculateCollision = (atThisMoment, x1, y1, width, height) => {
            let startPoint = this.convertFromPixel(atThisMoment.x, atThisMoment.y);
            let potentialPoint = this.convertFromPixel(x1, y1);
            let objectsOnRoad = new NotBaseObjecs();
            let lessStepDeviation;
            let biggerStepDeviation;
            if (startPoint[0] !== potentialPoint[0] && startPoint[1] !== potentialPoint[1]) {
                let verticalLow = startPoint[1] <= potentialPoint[1];
                let horizontalLow = startPoint[0] <= potentialPoint[0];
                let equ = Math.abs((startPoint[1] - potentialPoint[1]) / (startPoint[0] - potentialPoint[0]));
                if (equ >= 1) {
                    lessStepDeviation = 1;
                    biggerStepDeviation = Math.ceil(equ);
                }
                else {
                    equ = 1 / equ;
                    lessStepDeviation = Math.ceil(equ);
                    biggerStepDeviation = 1;
                }
                if ((horizontalLow && !verticalLow) || (!horizontalLow && verticalLow)) {
                    let to = this.convertFromPixel(atThisMoment.x + width, atThisMoment.y + height);
                    let toFin = this.convertFromPixel(x1 + width, y1 + height);
                    let m0 = toFin[0] - to[0];
                    let m1 = toFin[1] - to[1];
                    let num = Math.min(Math.abs(m0), Math.abs(m1));
                    for (let i = 0; i < num + 1; i++) {
                        objectsOnRoad = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_setFrontAngular).call(this, { startX: startPoint[0], startY: startPoint[1],
                            step: biggerStepDeviation }, { startX: to[0], startY: to[1], step: lessStepDeviation }, verticalLow, horizontalLow, objectsOnRoad);
                        if (objectsOnRoad.staticStone !== 0 || objectsOnRoad.enemy !== 0) {
                            atThisMoment.verticalVelocity = 0;
                            atThisMoment.horizontalVelocity = 0;
                            return atThisMoment;
                        }
                        if (objectsOnRoad.elasticStone !== 0) {
                            atThisMoment = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_elasticStoneCalculation).call(this, atThisMoment, objectsOnRoad);
                            if (atThisMoment.verticalVelocity === 0 || atThisMoment.horizontalVelocity === 0) {
                                return atThisMoment;
                            }
                        }
                        ;
                        if (!horizontalLow && verticalLow) {
                            startPoint[1] += biggerStepDeviation;
                            to[1] += biggerStepDeviation;
                            startPoint[0] -= lessStepDeviation;
                            to[0] -= lessStepDeviation;
                        }
                        else {
                            startPoint[1] -= biggerStepDeviation;
                            to[1] -= biggerStepDeviation;
                            startPoint[0] += lessStepDeviation;
                            to[0] += lessStepDeviation;
                        }
                        let renewCoord = this.convertToPixel(...startPoint);
                        atThisMoment = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_innerBorder).call(this, renewCoord, atThisMoment, width, height);
                    }
                    return atThisMoment;
                }
                else {
                    let to = this.convertFromPixel(atThisMoment.x, atThisMoment.y + height);
                    let toFin = this.convertFromPixel(x1, y1 + height);
                    let fi = this.convertFromPixel(atThisMoment.x + width, atThisMoment.y);
                    // let toFi = this.convertFromPixel(x1+width,y1);
                    let m0 = toFin[0] - to[0];
                    let m1 = toFin[1] - to[1];
                    let num = Math.min(Math.abs(m0), Math.abs(m1));
                    for (let i = 0; i < num + 1; i++) {
                        objectsOnRoad = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_setFrontAngular).call(this, { startX: fi[0], startY: fi[1],
                            step: biggerStepDeviation }, { startX: to[0], startY: to[1], step: lessStepDeviation }, verticalLow, horizontalLow, objectsOnRoad);
                        if (objectsOnRoad.staticStone !== 0 || objectsOnRoad.enemy !== 0) {
                            atThisMoment.verticalVelocity = 0;
                            atThisMoment.horizontalVelocity = 0;
                            return atThisMoment;
                        }
                        if (objectsOnRoad.elasticStone !== 0) {
                            atThisMoment = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_elasticStoneCalculation).call(this, atThisMoment, objectsOnRoad);
                            if (atThisMoment.verticalVelocity === 0 || atThisMoment.horizontalVelocity === 0) {
                                return atThisMoment;
                            }
                        }
                        ;
                        if (horizontalLow && verticalLow) {
                            fi[1] += biggerStepDeviation;
                            to[1] += biggerStepDeviation;
                            startPoint[1] += biggerStepDeviation;
                            startPoint[0] += lessStepDeviation;
                            fi[0] += lessStepDeviation;
                            to[0] += lessStepDeviation;
                        }
                        else {
                            fi[1] -= biggerStepDeviation;
                            to[1] -= biggerStepDeviation;
                            startPoint[1] -= biggerStepDeviation;
                            startPoint[0] -= lessStepDeviation;
                            fi[0] -= lessStepDeviation;
                            to[0] -= lessStepDeviation;
                        }
                        let renewCoord = this.convertToPixel(...startPoint);
                        atThisMoment = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_innerBorder).call(this, renewCoord, atThisMoment, width, height);
                    }
                    return atThisMoment;
                }
            }
            else {
                let noVerticalLow = startPoint[1] === potentialPoint[1];
                let noHorizontalLow = startPoint[0] === potentialPoint[0];
                let to;
                let toFin;
                let fi;
                console.log("hhhhhh");
                if (noVerticalLow && !noHorizontalLow) {
                    console.log("jjjkkj");
                    biggerStepDeviation = 0;
                    if (atThisMoment.horizontalVelocity > 0) {
                        to = this.convertFromPixel(atThisMoment.x + width, atThisMoment.y + height);
                        toFin = this.convertFromPixel(x1 + width, y1 + height);
                        fi = this.convertFromPixel(atThisMoment.x + width, atThisMoment.y);
                        lessStepDeviation = 1;
                    }
                    else {
                        to = this.convertFromPixel(atThisMoment.x, atThisMoment.y + height);
                        toFin = this.convertFromPixel(x1, y1 + height);
                        fi = startPoint;
                        lessStepDeviation = -1;
                    }
                    let m0 = toFin[0] - to[0];
                    let m1 = toFin[1] - to[1];
                    let num = Math.min(Math.abs(m0), Math.abs(m1));
                    for (let i = 0; i < num + 1; i++) {
                        objectsOnRoad = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_setFrontRectangle).call(this, { startX: fi[0], startY: fi[1],
                            step: biggerStepDeviation }, { startX: to[0], startY: to[1], step: lessStepDeviation }, noVerticalLow, noHorizontalLow, objectsOnRoad);
                        console.log(objectsOnRoad);
                        if (objectsOnRoad.staticStone !== 0 || objectsOnRoad.enemy !== 0) {
                            atThisMoment.verticalVelocity = 0;
                            atThisMoment.horizontalVelocity = 0;
                            return atThisMoment;
                        }
                        if (objectsOnRoad.elasticStone !== 0) {
                            atThisMoment = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_elasticStoneCalculation).call(this, atThisMoment, objectsOnRoad);
                            if (atThisMoment.verticalVelocity === 0 || atThisMoment.horizontalVelocity === 0) {
                                return atThisMoment;
                            }
                        }
                        ;
                        // startPoint[1]+=biggerStepDeviation;
                        // to[1]+=biggerStepDeviation;
                        startPoint[0] += lessStepDeviation;
                        to[0] += lessStepDeviation;
                        fi[0] += lessStepDeviation;
                    }
                    ;
                    atThisMoment = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_innerBorder).call(this, [x1, y1], atThisMoment, width, height);
                    return atThisMoment;
                }
                atThisMoment = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_innerBorder).call(this, [x1, y1], atThisMoment, width, height);
                return atThisMoment;
            }
        };
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
        this.elasticMat = new MaterialElastic(elasticA, elasticV);
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
    ;
    ;
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
}, _MapField_setFrontRectangle = function _MapField_setFrontRectangle(firstTrack, secondTrack, noVerticalLow, noHorizontalLow, list) {
    console.log(this.mapFiels);
    if (noVerticalLow && !noHorizontalLow) {
        console.log("lll ", firstTrack.startX, firstTrack.startX + secondTrack.step, firstTrack.startY, secondTrack.startY);
        let i = firstTrack.startX + secondTrack.step;
        console.log(this.mapFiels[i]);
        for (let j = firstTrack.startY; j <= secondTrack.startY; j++) {
            if (this.mapFiels[i][j] !== Material.Air) {
                list.append(this.mapFiels[i][j]);
            }
        }
    }
    else {
        let j = firstTrack.startY + firstTrack.step;
        for (let i = firstTrack.startX; i < secondTrack.startX; i++) {
            if (this.mapFiels[i][j] !== Material.Air) {
                list.append(this.mapFiels[i][j]);
            }
        }
    }
    return list;
}, _MapField_setFrontAngular = function _MapField_setFrontAngular(firstTrack, secondTrack, verticalLow, horizontalLow, list) {
    if (horizontalLow && !verticalLow) {
        for (let i = firstTrack.startX; i <= secondTrack.startX + secondTrack.step; i++) {
            for (let j = firstTrack.startY - firstTrack.step; j <= secondTrack.startY; j++) {
                if (i < secondTrack.startX && j < firstTrack.startY) {
                    continue;
                }
                if (this.mapFiels[i][j] !== Material.Air) {
                    list.append(this.mapFiels[i][j]);
                }
            }
        }
    }
    else if (!horizontalLow && verticalLow) {
        for (let i = secondTrack.startX; i >= firstTrack.startX - firstTrack.step; i--) {
            for (let j = firstTrack.startY; j <= secondTrack.startY + secondTrack.step; j++) {
                if (i > firstTrack.startX && j > secondTrack.startY) {
                    continue;
                }
                if (this.mapFiels[i][j] !== Material.Air) {
                    list.append(this.mapFiels[i][j]);
                }
            }
        }
    }
    else if (horizontalLow && verticalLow) {
        for (let i = secondTrack.startX; i <= firstTrack.startX + firstTrack.step; i++) {
            for (let j = firstTrack.startY; j <= secondTrack.startY + secondTrack.step; j++) {
                if (i < firstTrack.startX && j < secondTrack.startY) {
                    continue;
                }
                if (this.mapFiels[i][j] !== Material.Air) {
                    list.append(this.mapFiels[i][j]);
                }
            }
        }
    }
    else {
        for (let i = firstTrack.startX; i >= secondTrack.startX - secondTrack.step; i--) {
            for (let j = secondTrack.startY; j <= firstTrack.startY - firstTrack.step; j--) {
                if (i > secondTrack.startX && j < firstTrack.startY) {
                    continue;
                }
                if (this.mapFiels[i][j] !== Material.Air) {
                    list.append(this.mapFiels[i][j]);
                }
            }
        }
    }
    return list;
}, _MapField_elasticStoneCalculation = function _MapField_elasticStoneCalculation(atThisMoment, objectsOnRoad) {
    [atThisMoment.verticalVelocity, atThisMoment.verticalForce] = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_elasticStoneVectorCalculation).call(this, atThisMoment.verticalVelocity, objectsOnRoad.elasticStone, atThisMoment.verticalForce);
    [atThisMoment.horizontalVelocity, atThisMoment.horizontalForce] = __classPrivateFieldGet(this, _MapField_instances, "m", _MapField_elasticStoneVectorCalculation).call(this, atThisMoment.horizontalVelocity, objectsOnRoad.elasticStone, atThisMoment.horizontalForce);
    return atThisMoment;
}, _MapField_elasticStoneVectorCalculation = function _MapField_elasticStoneVectorCalculation(velocity, elasticStone, force) {
    if (velocity > 0) {
        velocity -= (elasticStone * this.elasticMat.elasticV);
        if (velocity <= 0) {
            force = (-1) * (elasticStone * this.elasticMat.elasticA);
            velocity = 0;
        }
    }
    else if (velocity < 0) {
        velocity += (elasticStone * this.elasticMat.elasticV);
        if (velocity >= 0) {
            force = (elasticStone * this.elasticMat.elasticA);
            velocity = 0;
        }
    }
    return [velocity, force];
}, _MapField_innerBorder = function _MapField_innerBorder(renewCoord, atThisMoment, width_, height_) {
    let wid = (renewCoord[0] + width_ <= 0.95 * this.width && renewCoord[0] >= 0.02 * this.width);
    let hei = (renewCoord[1] + height_ <= 0.95 * this.height && renewCoord[1] >= 0.02 * this.height);
    if (wid && hei) {
        atThisMoment.x = renewCoord[0];
        atThisMoment.y = renewCoord[1];
    }
    else if (wid && !hei) {
        atThisMoment.x = renewCoord[0];
    }
    else if (!wid && hei) {
        atThisMoment.y = renewCoord[1];
    }
    return atThisMoment;
};
export class NotBaseObjecs {
    constructor() {
        this.staticStone = 0;
        this.enemy = 0;
        this.dangerous = 0;
        this.elasticStone = 0;
    }
    append(ob) {
        if (ob === Material.StaticStone) {
            this.staticStone++;
        }
        else if (ob === Material.Enemy) {
            this.enemy++;
        }
        else if (ob === Material.Dangerous) {
            this.dangerous++;
        }
        else if (ob === Material.ElasticStone) {
            this.elasticStone++;
        }
    }
}
