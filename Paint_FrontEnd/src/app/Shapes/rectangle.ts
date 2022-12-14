import { IShape } from "./ishape";

export class Rectangle extends IShape{
    private _width: number;
    private _height: number;

    constructor(x: number, y: number, stroke: string, strokeWidth: number, fill: string, rotate: number, draggable: boolean, id: string, update: boolean, deleteflag: boolean, width: number, height: number){
        super(x, y, stroke, strokeWidth, fill, rotate, draggable, id, update, deleteflag);
        this._width = width;
        this._height = height;
        this.type = "rectangle";
    }

    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }
}
