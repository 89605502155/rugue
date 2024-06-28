"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.MoveTabs = void 0;
class MoveTabs {
    constructor(Up, Down, Right, Left) {
        this.Up = Up;
        this.Down = Down;
        this.Right = Right;
        this.Left = Left;
    }
}
exports.MoveTabs = MoveTabs;
class User {
    constructor(roadToPicture, x, y, gravity, event, caps, verticalStep, horizontalStep) {
        this.person = new Image();
        this.person.src = roadToPicture;
        this.roadToPicture = roadToPicture;
        this.x = x;
        this.y = y;
        this.gravity = gravity;
        this.event = event;
        this.caps = caps;
        this.verticalStep = verticalStep;
        this.horizontalStep = horizontalStep;
    }
    muveUp() {
        switch (this.event.key) {
            case this.caps.Up:
                this.y -= this.verticalStep;
                break;
            case this.caps.Down:
                this.y += this.verticalStep;
                break;
            case this.caps.Left:
                this.x -= this.horizontalStep;
                break;
            case this.caps.Right:
                this.x += this.horizontalStep;
                break;
        }
    }
}
exports.User = User;
