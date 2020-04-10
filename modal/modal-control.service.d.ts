import { Subject } from 'rxjs';
import { McModalRef } from './modal-ref.class';
export declare class McModalControlService {
    private parentService;
    get afterAllClose(): Subject<void>;
    get openModals(): McModalRef[];
    private rootOpenModals;
    private rootAfterAllClose;
    private rootRegisteredMetaMap;
    private get registeredMetaMap();
    constructor(parentService: McModalControlService);
    registerModal(modalRef: McModalRef): void;
    hasRegistered(modalRef: McModalRef): boolean;
    closeAll(): void;
    private removeOpenModal;
}
