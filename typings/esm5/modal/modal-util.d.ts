export interface IClickPosition {
    x: number;
    y: number;
}
export declare class ModalUtil {
    private document;
    private lastPosition;
    constructor(document: Document);
    getLastClickPosition(): IClickPosition;
    listenDocumentClick(): void;
}
export declare const modalUtilObject: ModalUtil;
