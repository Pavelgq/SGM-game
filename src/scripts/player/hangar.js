import Plane from "./plane.js"

export default class Hangar {
    constructor() {
        this.planes = [];
        this.createPlane();
    }

    createPlane() {
        const plane = new Plane(1);
        this.planes.push(plane);
    }
}