export class MoveTabs {
    constructor(Up, Down, Right, Left) {
        this.Up = Up;
        this.Down = Down;
        this.Right = Right;
        this.Left = Left;
    }
}
export class User {
    constructor(roadToPicture, x, y, gravity, caps, verticalStep, horizontalStep) {
        this.muveUp = (event) => {
            switch (event.key) {
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
        };
        this.person = new Image();
        this.person.src = roadToPicture;
        this.roadToPicture = roadToPicture;
        this.x = x;
        this.y = y;
        this.gravity = gravity;
        this.caps = caps;
        this.verticalStep = verticalStep;
        this.horizontalStep = horizontalStep;
    }
}
