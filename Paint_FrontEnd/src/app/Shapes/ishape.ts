import { __asyncDelegator } from "tslib";

export abstract class IShape {
    private _x: number;

    private _y: number;

    private _stroke: string;

    private _strokeWidth: number;
    
    private _fill: string;
    
    private _rotate: number;

    private _draggable: boolean;
    
    private _id: string;
    
    private _type: string = "";

    private _update: boolean;

    private _deleteflag: boolean;

    constructor(x: number, y: number, stroke: string, strokeWidth: number, fill: string, rotate: number, draggable: boolean, id: string, update: boolean, deleteflag: boolean){
        this._x = x;
        this._y = y;
        this._stroke = stroke;
        this._strokeWidth = strokeWidth;
        this._fill = fill;
        this._rotate = rotate;
        this._draggable = draggable;
        this._id = id;
        this._update = update;
        this._deleteflag = deleteflag;
    }

    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }
    public get stroke(): string {
        return this._stroke;
    }
    public set stroke(value: string) {
        this._stroke = value;
    }
    public get strokeWidth(): number {
        return this._strokeWidth;
    }
    public set strokeWidth(value: number) {
        this._strokeWidth = value;
    }
    public get fill(): string {
        return this._fill;
    }
    public set fill(value: string) {
        this._fill = value;
    }
    public get rotate(): number {
        return this._rotate;
    }
    public set rotate(value: number) {
        this._rotate = value;
    }
    public get draggable(): boolean {
        return this._draggable;
    }
    public set draggable(value: boolean) {
        this._draggable = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get update(): boolean {
        return this._update;
    }
    public set update(value: boolean) {
        this._update = value;
    }
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
    public get deleteflag(): boolean {
        return this._deleteflag;
    }
    public set deleteflag(value: boolean) {
        this._deleteflag = value;
    }
    
}
