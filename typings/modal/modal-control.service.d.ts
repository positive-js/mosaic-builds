import { Subject } from 'rxjs';
import { McModalRef } from './modal-ref.class';
export declare class McModalControlService {
    private parentService;
    readonly afterAllClose: Subject<void>;
    readonly openModals: McModalRef[];
    private rootOpenModals;
    private rootAfterAllClose;
    private rootRegisteredMetaMap;
    private readonly registeredMetaMap;
    constructor(parentService: McModalControlService);
    registerModal(modalRef: McModalRef): void;
    hasRegistered(modalRef: McModalRef): boolean;
    closeAll(): void;
    private removeOpenModal;
}
