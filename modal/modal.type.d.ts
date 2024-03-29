import { OverlayRef } from '@angular/cdk/overlay';
import { EventEmitter, TemplateRef, Type } from '@angular/core';
export declare type OnClickCallback<T> = ((instance: T) => (false | void | {}) | Promise<false | void | {}>);
export declare type ModalType = 'default' | 'confirm' | 'custom';
export declare type ConfirmType = 'confirm' | 'success' | 'warn';
export declare enum ModalSize {
    Small = "small",
    Normal = "normal",
    Large = "large"
}
export interface IModalOptions<T = any, R = any> {
    mcModalType?: ModalType;
    mcVisible?: boolean;
    mcZIndex?: number;
    mcWidth?: number | string;
    mcSize?: ModalSize;
    mcWrapClassName?: string;
    mcClassName?: string;
    mcStyle?: object;
    mcTitle?: string | TemplateRef<{}>;
    mcContent?: string | TemplateRef<{}> | Type<T>;
    mcComponent?: Type<T>;
    mcComponentParams?: Partial<T>;
    mcClosable?: boolean;
    mcMask?: boolean;
    mcMaskClosable?: boolean;
    mcMaskStyle?: object;
    mcBodyStyle?: object;
    mcFooter?: string | TemplateRef<{}> | IModalButtonOptions<T>[];
    mcGetContainer?: HTMLElement | OverlayRef | (() => HTMLElement | OverlayRef) | null;
    mcAfterOpen?: EventEmitter<void>;
    mcAfterClose?: EventEmitter<R>;
    mcCloseByESC?: boolean;
    mcOkText?: string;
    mcOkType?: string;
    mcOkLoading?: boolean;
    mcOnOk?: EventEmitter<T> | OnClickCallback<T>;
    mcCancelText?: string;
    mcCancelLoading?: boolean;
    mcOnCancel?: EventEmitter<T> | OnClickCallback<T>;
}
export interface IModalOptionsForService<T = any> extends IModalOptions<T> {
    mcOnOk?: OnClickCallback<T>;
    mcOnCancel?: OnClickCallback<T>;
}
export interface IModalButtonOptions<T = any> {
    label: string;
    type?: string;
    shape?: string;
    ghost?: boolean;
    size?: string;
    autoLoading?: boolean;
    show?: boolean | ((this: IModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
    loading?: boolean | ((this: IModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
    disabled?: boolean | ((this: IModalButtonOptions<T>, contentComponentInstance?: T) => boolean);
    autoFocus?: boolean;
    mcModalMainAction?: boolean;
    onClick?(this: IModalButtonOptions<T>, contentComponentInstance?: T): (void | {}) | Promise<(void | {})>;
}
