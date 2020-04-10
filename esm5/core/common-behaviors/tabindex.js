/**
 * @fileoverview added by tsickle
 * Generated from: common-behaviors/tabindex.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
/**
 * @record
 */
export function HasTabIndex() { }
if (false) {
    /** @type {?} */
    HasTabIndex.prototype.tabIndex;
}
// Mixin to augment a directive with a `tabIndex` property.
/**
 * @template T
 * @param {?} base
 * @param {?=} defaultTabIndex
 * @return {?}
 */
export function mixinTabIndex(base, defaultTabIndex) {
    if (defaultTabIndex === void 0) { defaultTabIndex = 0; }
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            _this._tabIndex = defaultTabIndex;
            return _this;
        }
        Object.defineProperty(class_1.prototype, "tabIndex", {
            get: /**
             * @return {?}
             */
            function () {
                return this.disabled ? -1 : this._tabIndex;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._tabIndex = value != null ? value : defaultTabIndex;
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(base));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbImNvbW1vbi1iZWhhdmlvcnMvdGFiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsaUNBRUM7OztJQURHLCtCQUFpQjs7Ozs7Ozs7O0FBTXJCLE1BQU0sVUFBVSxhQUFhLENBQW9DLElBQU8sRUFBRSxlQUFtQjtJQUFuQixnQ0FBQSxFQUFBLG1CQUFtQjtJQUN6RjtRQUFxQiwyQkFBSTtRQVdyQjtZQUFZLGNBQWM7aUJBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztnQkFBZCx5QkFBYzs7WUFBMUIsd0NBQ2EsSUFBSSxXQUNoQjtZQUpPLGVBQVMsR0FBVyxlQUFlLENBQUM7O1FBSTVDLENBQUM7UUFaRCxzQkFBSSw2QkFBUTs7OztZQUFaO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDL0MsQ0FBQzs7Ozs7WUFFRCxVQUFhLEtBQWE7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDN0QsQ0FBQzs7O1dBSkE7UUFXTCxjQUFDO0lBQUQsQ0FBQyxBQWRNLENBQWMsSUFBSSxHQWN2QjtBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3RvciB9IGZyb20gJy4vY29uc3RydWN0b3InO1xuaW1wb3J0IHsgQ2FuRGlzYWJsZSB9IGZyb20gJy4vZGlzYWJsZWQnO1xuXG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuYW1pbmctY29udmVudGlvblxuZXhwb3J0IGludGVyZmFjZSBIYXNUYWJJbmRleCB7XG4gICAgdGFiSW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSGFzVGFiSW5kZXhDdG9yID0gQ29uc3RydWN0b3I8SGFzVGFiSW5kZXg+O1xuXG4vLyBNaXhpbiB0byBhdWdtZW50IGEgZGlyZWN0aXZlIHdpdGggYSBgdGFiSW5kZXhgIHByb3BlcnR5LlxuZXhwb3J0IGZ1bmN0aW9uIG1peGluVGFiSW5kZXg8VCBleHRlbmRzIENvbnN0cnVjdG9yPENhbkRpc2FibGU+PihiYXNlOiBULCBkZWZhdWx0VGFiSW5kZXggPSAwKTogSGFzVGFiSW5kZXhDdG9yICYgVCB7XG4gICAgcmV0dXJuIGNsYXNzIGV4dGVuZHMgYmFzZSB7XG4gICAgICAgIGdldCB0YWJJbmRleCgpOiBudW1iZXIge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuX3RhYkluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0IHRhYkluZGV4KHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhYkluZGV4ID0gdmFsdWUgIT0gbnVsbCA/IHZhbHVlIDogZGVmYXVsdFRhYkluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdGFiSW5kZXg6IG51bWJlciA9IGRlZmF1bHRUYWJJbmRleDtcblxuICAgICAgICBjb25zdHJ1Y3RvciguLi5hcmdzOiBhbnlbXSkge1xuICAgICAgICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuIl19