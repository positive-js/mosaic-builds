import { Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { McModalControlService } from './modal-control.service';
import { McModalRef } from './modal-ref.class';
import { McModalComponent } from './modal.component';
import { ConfirmType, IModalOptionsForService } from './modal.type';
export declare class ModalBuilderForService {
    private overlay;
    private modalRef;
    private overlayRef;
    constructor(overlay: Overlay, options?: IModalOptionsForService);
    getInstance(): McModalComponent | null;
    destroyModal(): void;
    private changeProps;
    private createModal;
}
export declare class McModalService {
    private overlay;
    private modalControl;
    readonly openModals: McModalRef[];
    readonly afterAllClose: Observable<void>;
    constructor(overlay: Overlay, modalControl: McModalControlService);
    closeAll(): void;
    create<T>(options?: IModalOptionsForService<T>): McModalRef<T>;
    confirm<T>(options?: IModalOptionsForService<T>, confirmType?: ConfirmType): McModalRef<T>;
    open<T>(options?: IModalOptionsForService<T>): McModalRef<T>;
    success<T>(options?: IModalOptionsForService<T>): McModalRef<T>;
    delete<T>(options?: IModalOptionsForService<T>): McModalRef<T>;
    private simpleConfirm;
}
