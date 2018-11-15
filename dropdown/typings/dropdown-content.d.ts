import { TemplateRef, ComponentFactoryResolver, ApplicationRef, Injector, ViewContainerRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Dropdown content that will be rendered lazily once the dropdown is opened.
 */
export declare class McDropdownContent implements OnDestroy {
    private _template;
    private _componentFactoryResolver;
    private _appRef;
    private _injector;
    private _viewContainerRef;
    private _document;
    /** Emits when the dropdown content has been attached. */
    _attached: Subject<void>;
    private _portal;
    private _outlet;
    constructor(_template: TemplateRef<any>, _componentFactoryResolver: ComponentFactoryResolver, _appRef: ApplicationRef, _injector: Injector, _viewContainerRef: ViewContainerRef, _document: any);
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
