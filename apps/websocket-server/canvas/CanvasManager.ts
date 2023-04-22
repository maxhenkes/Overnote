class CanvasManager {
    private static _instance: CanvasManager;
    private canvasList = new Map<string, Canvas>;


    private constructor() {
        //
    }
    public static get Instance() {
        return this._instance || (this._instance = new this())
    }

    /*     public addCanvas(canvas: Canvas, id: string): void {
            this.canvasList.set(id, canvas);
        }
     */
    private createCanvas(id: string): void {
        const newCanvas = new Canvas(id);
        this.canvasList.set(id, newCanvas);
    }

    public getCanvas(id: string): Canvas {
        if (!this.canvasList.has(id)) {
            this.createCanvas(id);
        }
        const canvas = this.canvasList.get(id);
        if (!canvas) { throw new Error('Canvas not found after creation!') }
        return canvas;
    }
}

