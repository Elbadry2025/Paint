import { IShape } from "./ishape";
//oijge
export class Ellipse extends IShape{
    private _hRadius: number;

    private _vRadius: number;

    constructor(x: number, y: number, stroke: string, fill: string, rotate: number, draggable: boolean, id: number, hRadius: number, vRadius: number){
        super(x, y, stroke, fill, rotate, draggable, id);
        this._hRadius = hRadius;
        this._vRadius = vRadius;
    }

    public get hRadius(): number {
        return this._hRadius;
    }
    public set hRadius(value: number) {
        this._hRadius = value;
    }
    public get vRadius(): number {
        return this._vRadius;
    }
    public set vRadius(value: number) {
        this._vRadius = value;
    }

}
