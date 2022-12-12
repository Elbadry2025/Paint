export abstract class IShape {
    private _x: number;

    private _y: number;

    private _stroke: string;
    
    private _fill: string;
    
    private _rotate: number;

    private _draggable: boolean;
    
    private _id: string;
    
    private _type: string = "";

    constructor(x: number, y: number, stroke: string, fill: string, rotate: number, draggable: boolean, id: string){
        this._x = x;
        this._y = y;
        this._stroke = stroke;
        this._fill = fill;
        this._rotate = rotate;
        this._draggable = draggable;
        this._id = id;
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
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
    
}
