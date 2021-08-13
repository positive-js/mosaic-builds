import { TemplateRef, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Dropdown content that will be rendered lazily once the dropdown is opened.
 */
export declare class McDropdownContent implements OnDestroy {
    private template;
    private componentFactoryResolver;
    private appRef;
    private injector;
    private viewContainerRef;
    private document;
    /** Emits when the dropdown content has been attached. */
    attached: Subject<void>;
    private portal;
    private outlet;
    constructor(template: TemplateRef<any>, componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector, viewContainerRef: ViewContainerRef, document: any);
    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    attach(context?: any): void;
    /**
     * Detaches the content.
     * @docs-private
     */
    detach(): void;
    ngOnDestroy(): void;
}
