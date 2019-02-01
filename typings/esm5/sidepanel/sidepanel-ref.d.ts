import { OverlayRef } from '@ptsecurity/cdk/overlay';
import { Observable } from 'rxjs';
import { McSidepanelConfig } from './sidepanel-config';
import { McSidepanelContainerComponent } from './sidepanel-container.component';
export declare class McSidepanelRef<T = any, R = any> {
    containerInstance: McSidepanelContainerComponent;
    private overlayRef;
    config: McSidepanelConfig;
    readonly id: string;
    /** Instance of the component making up the content of the sidepanel. */
    instance: T;
    /** Subject for notifying the user that the sidepanel has been closed and dismissed. */
    private readonly afterClosed$;
    /** Subject for notifying the user that the sidepanel has opened and appeared. */
    private readonly afterOpened$;
    /** Result to be passed down to the `afterDismissed` stream. */
    private result;
    constructor(containerInstance: McSidepanelContainerComponent, overlayRef: OverlayRef, config: McSidepanelConfig);
    close(result?: R): void;
    /** Gets an observable that is notified when the sidepanel is finished closing. */
    afterClosed(): Observable<R | undefined>;
    /** Gets an observable that is notified when the sidepanel has opened and appeared. */
    afterOpened(): Observable<void>;
}
