import { IShape } from "./ishape";

export class Ellipse extends IShape{
    private _radiusX: number;

    private _radiusY: number;

    constructor(x: number, y: number, stroke: string, strokeWidth: number, fill: string, rotate: number, draggable: boolean, id: string, update: boolean, deleteflag: boolean, hRadius: number, vRadius: number){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._radiusX = hRadius;
        this._radiusY = vRadius;
        this.type = "ellipse";
    }

    public get hRadius(): number {
        return this._radiusX;
    }
    public set hRadius(value: number) {
        this._radiusX = value;
    }
    public get vRadius(): number {
        return this._radiusY;
    }
    public set vRadius(value: number) {
        this._radiusY = value;
    }

}
