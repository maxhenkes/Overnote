type LineType = {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
}

class Canvas {

    private _canvasLines: Array<LineType> = [];
    readonly _id;


    constructor(canvasID: string) {
        this._id = canvasID;
    }

    public addLine(line: LineType): void {
        this._canvasLines.push(line);
    }

    get canvasData(): Array<LineType> {
        return this._canvasLines;
    }

}