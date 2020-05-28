/**
 * @fileoverview added by tsickle
 * Generated from: overlay/overlay-position-map.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var POSITION_MAP = {
    top: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
    },
    topCenter: {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
    },
    topLeft: {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom'
    },
    topRight: {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom'
    },
    right: {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center'
    },
    rightTop: {
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top'
    },
    rightBottom: {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'bottom'
    },
    bottom: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
    },
    bottomCenter: {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top'
    },
    bottomLeft: {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
    },
    bottomRight: {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
    },
    left: {
        originX: 'start',
        originY: 'center',
        overlayX: 'end',
        overlayY: 'center'
    },
    leftTop: {
        originX: 'start',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'top'
    },
    leftBottom: {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'bottom'
    }
};
/** @type {?} */
export var DEFAULT_4_POSITIONS = objectValues([
    POSITION_MAP.top, POSITION_MAP.right, POSITION_MAP.bottom, POSITION_MAP.left
]);
/** @type {?} */
export var EXTENDED_OVERLAY_POSITIONS = objectValues([
    POSITION_MAP.top, POSITION_MAP.topLeft, POSITION_MAP.topRight, POSITION_MAP.right, POSITION_MAP.rightTop,
    POSITION_MAP.rightBottom, POSITION_MAP.bottom, POSITION_MAP.bottomLeft, POSITION_MAP.bottomRight,
    POSITION_MAP.left, POSITION_MAP.leftTop, POSITION_MAP.leftBottom
]);
/** @type {?} */
export var TOP_POSITION_PRIORITY = objectValues([
    POSITION_MAP.top,
    POSITION_MAP.bottom,
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftBottom,
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottomRight
]);
/** @type {?} */
export var BOTTOM_POSITION_PRIORITY = objectValues([
    POSITION_MAP.bottom,
    POSITION_MAP.top,
    POSITION_MAP.topLeft,
    POSITION_MAP.topRight,
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftBottom
]);
/** @type {?} */
export var RIGHT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.right,
    POSITION_MAP.left,
    POSITION_MAP.leftTop,
    POSITION_MAP.leftBottom,
    POSITION_MAP.top,
    POSITION_MAP.bottom
]);
/** @type {?} */
export var LEFT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.left,
    POSITION_MAP.right,
    POSITION_MAP.rightTop,
    POSITION_MAP.rightBottom,
    POSITION_MAP.top,
    POSITION_MAP.bottom
]);
/** @type {?} */
export var RIGHT_TOP_POSITION_PRIORITY = objectValues([
    POSITION_MAP.rightTop,
    POSITION_MAP.leftTop,
    POSITION_MAP.left,
    POSITION_MAP.leftBottom,
    POSITION_MAP.topLeft,
    POSITION_MAP.bottomLeft
]);
/** @type {?} */
export var RIGHT_BOTTOM_POSITION_PRIORITY = objectValues([
    POSITION_MAP.rightBottom,
    POSITION_MAP.leftBottom,
    POSITION_MAP.left,
    POSITION_MAP.leftTop,
    POSITION_MAP.topLeft,
    POSITION_MAP.bottomLeft
]);
/** @type {?} */
export var LEFT_TOP_POSITION_PRIORITY = objectValues([
    POSITION_MAP.leftTop,
    POSITION_MAP.rightTop,
    POSITION_MAP.right,
    POSITION_MAP.rightBottom,
    POSITION_MAP.topRight,
    POSITION_MAP.bottomRight
]);
/** @type {?} */
export var LEFT_BOTTOM_POSITION_PRIORITY = objectValues([
    POSITION_MAP.leftBottom,
    POSITION_MAP.rightBottom,
    POSITION_MAP.right,
    POSITION_MAP.rightTop,
    POSITION_MAP.topRight,
    POSITION_MAP.bottomRight
]);
/** @type {?} */
export var TOP_LEFT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.topLeft,
    POSITION_MAP.topRight,
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottom,
    POSITION_MAP.bottomRight,
    POSITION_MAP.leftBottom,
    POSITION_MAP.rightBottom
]);
/** @type {?} */
export var TOP_RIGHT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.topRight,
    POSITION_MAP.topLeft,
    POSITION_MAP.bottomRight,
    POSITION_MAP.bottom,
    POSITION_MAP.bottomLeft,
    POSITION_MAP.leftBottom,
    POSITION_MAP.rightBottom
]);
/** @type {?} */
export var BOTTOM_RIGHT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.bottomRight,
    POSITION_MAP.bottomLeft,
    POSITION_MAP.topRight,
    POSITION_MAP.top,
    POSITION_MAP.topLeft,
    POSITION_MAP.leftTop,
    POSITION_MAP.rightTop
]);
/** @type {?} */
export var BOTTOM_LEFT_POSITION_PRIORITY = objectValues([
    POSITION_MAP.bottomLeft,
    POSITION_MAP.bottomRight,
    POSITION_MAP.topLeft,
    POSITION_MAP.top,
    POSITION_MAP.topRight,
    POSITION_MAP.rightTop,
    POSITION_MAP.leftTop
]);
/** @type {?} */
export var POSITION_PRIORITY_STRATEGY = {
    top: TOP_POSITION_PRIORITY,
    topLeft: TOP_LEFT_POSITION_PRIORITY,
    topRight: TOP_RIGHT_POSITION_PRIORITY,
    bottom: BOTTOM_POSITION_PRIORITY,
    bottomLeft: BOTTOM_LEFT_POSITION_PRIORITY,
    bottomRight: BOTTOM_RIGHT_POSITION_PRIORITY,
    left: LEFT_POSITION_PRIORITY,
    leftTop: LEFT_TOP_POSITION_PRIORITY,
    leftBottom: LEFT_BOTTOM_POSITION_PRIORITY,
    right: RIGHT_POSITION_PRIORITY,
    rightTop: RIGHT_TOP_POSITION_PRIORITY,
    rightBottom: RIGHT_BOTTOM_POSITION_PRIORITY
};
/** @type {?} */
export var POSITION_TO_CSS_MAP = {
    top: 'top',
    topLeft: 'top-left',
    topRight: 'top-right',
    right: 'right',
    rightTop: 'right-top',
    rightBottom: 'right-bottom',
    left: 'left',
    leftTop: 'left-top',
    leftBottom: 'left-bottom',
    bottom: 'bottom',
    bottomLeft: 'bottom-left',
    bottomRight: 'bottom-right'
};
/** @type {?} */
export var DEFAULT_4_POSITIONS_TO_CSS_MAP = {
    top: 'top',
    bottom: 'bottom',
    right: 'right',
    left: 'left'
};
/**
 * @template T, S
 * @param {?} array
 * @param {?} iteratee
 * @return {?}
 */
function arrayMap(array, iteratee) {
    /** @type {?} */
    var index = -1;
    /** @type {?} */
    var length = array == null ? 0 : array.length;
    /** @type {?} */
    var result = Array(length);
    while (++index < length) {
        result[index] = iteratee(array[index], index, array);
    }
    return result;
}
/**
 * @template T
 * @param {?} object
 * @param {?} props
 * @return {?}
 */
function baseValues(object, props) {
    return arrayMap(props, (/**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return object[key];
    }));
}
/**
 * @template T
 * @param {?} object
 * @return {?}
 */
function objectValues(object) {
    return object == null ? [] : baseValues(object, Object.keys(object));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wb3NpdGlvbi1tYXAuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcHRzZWN1cml0eS9tb3NhaWMvY29yZS8iLCJzb3VyY2VzIjpbIm92ZXJsYXkvb3ZlcmxheS1wb3NpdGlvbi1tYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBR0EsTUFBTSxLQUFPLFlBQVksR0FBOEM7SUFDbkUsR0FBRyxFQUFXO1FBQ1YsT0FBTyxFQUFHLFFBQVE7UUFDbEIsT0FBTyxFQUFHLEtBQUs7UUFDZixRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsUUFBUTtLQUNyQjtJQUNELFNBQVMsRUFBSztRQUNWLE9BQU8sRUFBRyxRQUFRO1FBQ2xCLE9BQU8sRUFBRyxLQUFLO1FBQ2YsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFLFFBQVE7S0FDckI7SUFDRCxPQUFPLEVBQU87UUFDVixPQUFPLEVBQUcsT0FBTztRQUNqQixPQUFPLEVBQUcsS0FBSztRQUNmLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRSxRQUFRO0tBQ3JCO0lBQ0QsUUFBUSxFQUFNO1FBQ1YsT0FBTyxFQUFHLEtBQUs7UUFDZixPQUFPLEVBQUcsS0FBSztRQUNmLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLFFBQVE7S0FDckI7SUFDRCxLQUFLLEVBQVM7UUFDVixPQUFPLEVBQUcsS0FBSztRQUNmLE9BQU8sRUFBRyxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRSxRQUFRO0tBQ3JCO0lBQ0QsUUFBUSxFQUFNO1FBQ1YsT0FBTyxFQUFHLEtBQUs7UUFDZixPQUFPLEVBQUcsS0FBSztRQUNmLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBQ0QsV0FBVyxFQUFHO1FBQ1YsT0FBTyxFQUFHLEtBQUs7UUFDZixPQUFPLEVBQUcsUUFBUTtRQUNsQixRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUUsUUFBUTtLQUNyQjtJQUNELE1BQU0sRUFBUTtRQUNWLE9BQU8sRUFBRyxRQUFRO1FBQ2xCLE9BQU8sRUFBRyxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxLQUFLO0tBQ2xCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsT0FBTyxFQUFHLFFBQVE7UUFDbEIsT0FBTyxFQUFHLFFBQVE7UUFDbEIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsUUFBUSxFQUFFLEtBQUs7S0FDbEI7SUFDRCxVQUFVLEVBQUk7UUFDVixPQUFPLEVBQUcsT0FBTztRQUNqQixPQUFPLEVBQUcsUUFBUTtRQUNsQixRQUFRLEVBQUUsT0FBTztRQUNqQixRQUFRLEVBQUUsS0FBSztLQUNsQjtJQUNELFdBQVcsRUFBRztRQUNWLE9BQU8sRUFBRyxLQUFLO1FBQ2YsT0FBTyxFQUFHLFFBQVE7UUFDbEIsUUFBUSxFQUFFLEtBQUs7UUFDZixRQUFRLEVBQUUsS0FBSztLQUNsQjtJQUNELElBQUksRUFBVTtRQUNWLE9BQU8sRUFBRyxPQUFPO1FBQ2pCLE9BQU8sRUFBRyxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLFFBQVE7S0FDckI7SUFDRCxPQUFPLEVBQU87UUFDVixPQUFPLEVBQUcsT0FBTztRQUNqQixPQUFPLEVBQUcsS0FBSztRQUNmLFFBQVEsRUFBRSxLQUFLO1FBQ2YsUUFBUSxFQUFFLEtBQUs7S0FDbEI7SUFDRCxVQUFVLEVBQUk7UUFDVixPQUFPLEVBQUcsT0FBTztRQUNqQixPQUFPLEVBQUcsUUFBUTtRQUNsQixRQUFRLEVBQUUsS0FBSztRQUNmLFFBQVEsRUFBRSxRQUFRO0tBQ3JCO0NBQ0o7O0FBRUQsTUFBTSxLQUFPLG1CQUFtQixHQUFHLFlBQVksQ0FBQztJQUM1QyxZQUFZLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsSUFBSTtDQUMvRSxDQUFDOztBQUVGLE1BQU0sS0FBTywwQkFBMEIsR0FBRyxZQUFZLENBQUM7SUFDbkQsWUFBWSxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsUUFBUTtJQUN4RyxZQUFZLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsV0FBVztJQUNoRyxZQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLFVBQVU7Q0FDbkUsQ0FBQzs7QUFFRixNQUFNLEtBQU8scUJBQXFCLEdBQUcsWUFBWSxDQUFDO0lBQzlDLFlBQVksQ0FBQyxHQUFHO0lBQ2hCLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxXQUFXO0lBQ3hCLFlBQVksQ0FBQyxVQUFVO0lBQ3ZCLFlBQVksQ0FBQyxVQUFVO0lBQ3ZCLFlBQVksQ0FBQyxXQUFXO0NBQzNCLENBQUM7O0FBRUYsTUFBTSxLQUFPLHdCQUF3QixHQUFHLFlBQVksQ0FBQztJQUNqRCxZQUFZLENBQUMsTUFBTTtJQUNuQixZQUFZLENBQUMsR0FBRztJQUNoQixZQUFZLENBQUMsT0FBTztJQUNwQixZQUFZLENBQUMsUUFBUTtJQUNyQixZQUFZLENBQUMsV0FBVztJQUN4QixZQUFZLENBQUMsVUFBVTtDQUMxQixDQUFDOztBQUVGLE1BQU0sS0FBTyx1QkFBdUIsR0FBRyxZQUFZLENBQUM7SUFDaEQsWUFBWSxDQUFDLEtBQUs7SUFDbEIsWUFBWSxDQUFDLElBQUk7SUFDakIsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLFVBQVU7SUFDdkIsWUFBWSxDQUFDLEdBQUc7SUFDaEIsWUFBWSxDQUFDLE1BQU07Q0FDdEIsQ0FBQzs7QUFFRixNQUFNLEtBQU8sc0JBQXNCLEdBQUcsWUFBWSxDQUFDO0lBQy9DLFlBQVksQ0FBQyxJQUFJO0lBQ2pCLFlBQVksQ0FBQyxLQUFLO0lBQ2xCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxXQUFXO0lBQ3hCLFlBQVksQ0FBQyxHQUFHO0lBQ2hCLFlBQVksQ0FBQyxNQUFNO0NBQ3RCLENBQUM7O0FBRUYsTUFBTSxLQUFPLDJCQUEyQixHQUFHLFlBQVksQ0FBQztJQUNwRCxZQUFZLENBQUMsUUFBUTtJQUNyQixZQUFZLENBQUMsT0FBTztJQUNwQixZQUFZLENBQUMsSUFBSTtJQUNqQixZQUFZLENBQUMsVUFBVTtJQUN2QixZQUFZLENBQUMsT0FBTztJQUNwQixZQUFZLENBQUMsVUFBVTtDQUMxQixDQUFDOztBQUVGLE1BQU0sS0FBTyw4QkFBOEIsR0FBRyxZQUFZLENBQUM7SUFDdkQsWUFBWSxDQUFDLFdBQVc7SUFDeEIsWUFBWSxDQUFDLFVBQVU7SUFDdkIsWUFBWSxDQUFDLElBQUk7SUFDakIsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLFVBQVU7Q0FDMUIsQ0FBQzs7QUFFRixNQUFNLEtBQU8sMEJBQTBCLEdBQUcsWUFBWSxDQUFDO0lBQ25ELFlBQVksQ0FBQyxPQUFPO0lBQ3BCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxLQUFLO0lBQ2xCLFlBQVksQ0FBQyxXQUFXO0lBQ3hCLFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxXQUFXO0NBQzNCLENBQUM7O0FBRUYsTUFBTSxLQUFPLDZCQUE2QixHQUFHLFlBQVksQ0FBQztJQUN0RCxZQUFZLENBQUMsVUFBVTtJQUN2QixZQUFZLENBQUMsV0FBVztJQUN4QixZQUFZLENBQUMsS0FBSztJQUNsQixZQUFZLENBQUMsUUFBUTtJQUNyQixZQUFZLENBQUMsUUFBUTtJQUNyQixZQUFZLENBQUMsV0FBVztDQUMzQixDQUFDOztBQUVGLE1BQU0sS0FBTywwQkFBMEIsR0FBRyxZQUFZLENBQUM7SUFDbkQsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLFVBQVU7SUFDdkIsWUFBWSxDQUFDLE1BQU07SUFDbkIsWUFBWSxDQUFDLFdBQVc7SUFDeEIsWUFBWSxDQUFDLFVBQVU7SUFDdkIsWUFBWSxDQUFDLFdBQVc7Q0FDM0IsQ0FBQzs7QUFFRixNQUFNLEtBQU8sMkJBQTJCLEdBQUcsWUFBWSxDQUFDO0lBQ3BELFlBQVksQ0FBQyxRQUFRO0lBQ3JCLFlBQVksQ0FBQyxPQUFPO0lBQ3BCLFlBQVksQ0FBQyxXQUFXO0lBQ3hCLFlBQVksQ0FBQyxNQUFNO0lBQ25CLFlBQVksQ0FBQyxVQUFVO0lBQ3ZCLFlBQVksQ0FBQyxVQUFVO0lBQ3ZCLFlBQVksQ0FBQyxXQUFXO0NBQzNCLENBQUM7O0FBRUYsTUFBTSxLQUFPLDhCQUE4QixHQUFHLFlBQVksQ0FBQztJQUN2RCxZQUFZLENBQUMsV0FBVztJQUN4QixZQUFZLENBQUMsVUFBVTtJQUN2QixZQUFZLENBQUMsUUFBUTtJQUNyQixZQUFZLENBQUMsR0FBRztJQUNoQixZQUFZLENBQUMsT0FBTztJQUNwQixZQUFZLENBQUMsT0FBTztJQUNwQixZQUFZLENBQUMsUUFBUTtDQUN4QixDQUFDOztBQUVGLE1BQU0sS0FBTyw2QkFBNkIsR0FBRyxZQUFZLENBQUM7SUFDdEQsWUFBWSxDQUFDLFVBQVU7SUFDdkIsWUFBWSxDQUFDLFdBQVc7SUFDeEIsWUFBWSxDQUFDLE9BQU87SUFDcEIsWUFBWSxDQUFDLEdBQUc7SUFDaEIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLFFBQVE7SUFDckIsWUFBWSxDQUFDLE9BQU87Q0FDdkIsQ0FBQzs7QUFFRixNQUFNLEtBQU8sMEJBQTBCLEdBQUc7SUFDdEMsR0FBRyxFQUFFLHFCQUFxQjtJQUMxQixPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLFFBQVEsRUFBRSwyQkFBMkI7SUFDckMsTUFBTSxFQUFFLHdCQUF3QjtJQUNoQyxVQUFVLEVBQUUsNkJBQTZCO0lBQ3pDLFdBQVcsRUFBRSw4QkFBOEI7SUFDM0MsSUFBSSxFQUFFLHNCQUFzQjtJQUM1QixPQUFPLEVBQUUsMEJBQTBCO0lBQ25DLFVBQVUsRUFBRSw2QkFBNkI7SUFDekMsS0FBSyxFQUFFLHVCQUF1QjtJQUM5QixRQUFRLEVBQUUsMkJBQTJCO0lBQ3JDLFdBQVcsRUFBRSw4QkFBOEI7Q0FDOUM7O0FBRUQsTUFBTSxLQUFPLG1CQUFtQixHQUE0QjtJQUN4RCxHQUFHLEVBQUUsS0FBSztJQUNWLE9BQU8sRUFBRSxVQUFVO0lBQ25CLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLEtBQUssRUFBRSxPQUFPO0lBQ2QsUUFBUSxFQUFFLFdBQVc7SUFDckIsV0FBVyxFQUFFLGNBQWM7SUFDM0IsSUFBSSxFQUFFLE1BQU07SUFDWixPQUFPLEVBQUUsVUFBVTtJQUNuQixVQUFVLEVBQUUsYUFBYTtJQUN6QixNQUFNLEVBQUUsUUFBUTtJQUNoQixVQUFVLEVBQUUsYUFBYTtJQUN6QixXQUFXLEVBQUUsY0FBYztDQUM5Qjs7QUFFRCxNQUFNLEtBQU8sOEJBQThCLEdBQTRCO0lBQ25FLEdBQUcsRUFBRSxLQUFLO0lBQ1YsTUFBTSxFQUFFLFFBQVE7SUFDaEIsS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFJLEVBQUUsTUFBTTtDQUNmOzs7Ozs7O0FBRUQsU0FBUyxRQUFRLENBQU8sS0FBVSxFQUFFLFFBQWlEOztRQUM3RSxLQUFLLEdBQUcsQ0FBQyxDQUFDOztRQUNSLE1BQU0sR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNOztRQUN6QyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUU1QixPQUFPLEVBQUUsS0FBSyxHQUFHLE1BQU0sRUFBRTtRQUNyQixNQUFNLENBQUUsS0FBSyxDQUFFLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBRSxLQUFLLENBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDNUQ7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDOzs7Ozs7O0FBQ0QsU0FBUyxVQUFVLENBQUksTUFBa0MsRUFBRSxLQUFlO0lBQ3RFLE9BQU8sUUFBUSxDQUFDLEtBQUs7Ozs7SUFBRyxVQUFDLEdBQUc7UUFDeEIsT0FBTyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDekIsQ0FBQyxFQUFDLENBQUM7QUFDUCxDQUFDOzs7Ozs7QUFDRCxTQUFTLFlBQVksQ0FBSSxNQUFrQztJQUN2RCxPQUFPLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDekUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbm5lY3Rpb25Qb3NpdGlvblBhaXIgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cblxuZXhwb3J0IGNvbnN0IFBPU0lUSU9OX01BUDogeyBba2V5OiBzdHJpbmddOiBDb25uZWN0aW9uUG9zaXRpb25QYWlyIH0gPSB7XG4gICAgdG9wICAgICAgICAgOiB7XG4gICAgICAgIG9yaWdpblggOiAnY2VudGVyJyxcbiAgICAgICAgb3JpZ2luWSA6ICd0b3AnLFxuICAgICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgIH0sXG4gICAgdG9wQ2VudGVyICAgOiB7XG4gICAgICAgIG9yaWdpblggOiAnY2VudGVyJyxcbiAgICAgICAgb3JpZ2luWSA6ICd0b3AnLFxuICAgICAgICBvdmVybGF5WDogJ2NlbnRlcicsXG4gICAgICAgIG92ZXJsYXlZOiAnYm90dG9tJ1xuICAgIH0sXG4gICAgdG9wTGVmdCAgICAgOiB7XG4gICAgICAgIG9yaWdpblggOiAnc3RhcnQnLFxuICAgICAgICBvcmlnaW5ZIDogJ3RvcCcsXG4gICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICB9LFxuICAgIHRvcFJpZ2h0ICAgIDoge1xuICAgICAgICBvcmlnaW5YIDogJ2VuZCcsXG4gICAgICAgIG9yaWdpblkgOiAndG9wJyxcbiAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICB9LFxuICAgIHJpZ2h0ICAgICAgIDoge1xuICAgICAgICBvcmlnaW5YIDogJ2VuZCcsXG4gICAgICAgIG9yaWdpblkgOiAnY2VudGVyJyxcbiAgICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICAgIG92ZXJsYXlZOiAnY2VudGVyJ1xuICAgIH0sXG4gICAgcmlnaHRUb3AgICAgOiB7XG4gICAgICAgIG9yaWdpblggOiAnZW5kJyxcbiAgICAgICAgb3JpZ2luWSA6ICd0b3AnLFxuICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgfSxcbiAgICByaWdodEJvdHRvbSA6IHtcbiAgICAgICAgb3JpZ2luWCA6ICdlbmQnLFxuICAgICAgICBvcmlnaW5ZIDogJ2JvdHRvbScsXG4gICAgICAgIG92ZXJsYXlYOiAnc3RhcnQnLFxuICAgICAgICBvdmVybGF5WTogJ2JvdHRvbSdcbiAgICB9LFxuICAgIGJvdHRvbSAgICAgIDoge1xuICAgICAgICBvcmlnaW5YIDogJ2NlbnRlcicsXG4gICAgICAgIG9yaWdpblkgOiAnYm90dG9tJyxcbiAgICAgICAgb3ZlcmxheVg6ICdjZW50ZXInLFxuICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICB9LFxuICAgIGJvdHRvbUNlbnRlcjoge1xuICAgICAgICBvcmlnaW5YIDogJ2NlbnRlcicsXG4gICAgICAgIG9yaWdpblkgOiAnYm90dG9tJyxcbiAgICAgICAgb3ZlcmxheVg6ICdjZW50ZXInLFxuICAgICAgICBvdmVybGF5WTogJ3RvcCdcbiAgICB9LFxuICAgIGJvdHRvbUxlZnQgIDoge1xuICAgICAgICBvcmlnaW5YIDogJ3N0YXJ0JyxcbiAgICAgICAgb3JpZ2luWSA6ICdib3R0b20nLFxuICAgICAgICBvdmVybGF5WDogJ3N0YXJ0JyxcbiAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgfSxcbiAgICBib3R0b21SaWdodCA6IHtcbiAgICAgICAgb3JpZ2luWCA6ICdlbmQnLFxuICAgICAgICBvcmlnaW5ZIDogJ2JvdHRvbScsXG4gICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgICAgb3ZlcmxheVk6ICd0b3AnXG4gICAgfSxcbiAgICBsZWZ0ICAgICAgICA6IHtcbiAgICAgICAgb3JpZ2luWCA6ICdzdGFydCcsXG4gICAgICAgIG9yaWdpblkgOiAnY2VudGVyJyxcbiAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxuICAgICAgICBvdmVybGF5WTogJ2NlbnRlcidcbiAgICB9LFxuICAgIGxlZnRUb3AgICAgIDoge1xuICAgICAgICBvcmlnaW5YIDogJ3N0YXJ0JyxcbiAgICAgICAgb3JpZ2luWSA6ICd0b3AnLFxuICAgICAgICBvdmVybGF5WDogJ2VuZCcsXG4gICAgICAgIG92ZXJsYXlZOiAndG9wJ1xuICAgIH0sXG4gICAgbGVmdEJvdHRvbSAgOiB7XG4gICAgICAgIG9yaWdpblggOiAnc3RhcnQnLFxuICAgICAgICBvcmlnaW5ZIDogJ2JvdHRvbScsXG4gICAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nXG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfNF9QT1NJVElPTlMgPSBvYmplY3RWYWx1ZXMoW1xuICAgIFBPU0lUSU9OX01BUC50b3AsIFBPU0lUSU9OX01BUC5yaWdodCwgUE9TSVRJT05fTUFQLmJvdHRvbSwgUE9TSVRJT05fTUFQLmxlZnRcbl0pO1xuXG5leHBvcnQgY29uc3QgRVhURU5ERURfT1ZFUkxBWV9QT1NJVElPTlMgPSBvYmplY3RWYWx1ZXMoW1xuICAgIFBPU0lUSU9OX01BUC50b3AsIFBPU0lUSU9OX01BUC50b3BMZWZ0LCBQT1NJVElPTl9NQVAudG9wUmlnaHQsIFBPU0lUSU9OX01BUC5yaWdodCwgUE9TSVRJT05fTUFQLnJpZ2h0VG9wLFxuICAgIFBPU0lUSU9OX01BUC5yaWdodEJvdHRvbSwgUE9TSVRJT05fTUFQLmJvdHRvbSwgUE9TSVRJT05fTUFQLmJvdHRvbUxlZnQsIFBPU0lUSU9OX01BUC5ib3R0b21SaWdodCxcbiAgICBQT1NJVElPTl9NQVAubGVmdCwgUE9TSVRJT05fTUFQLmxlZnRUb3AsIFBPU0lUSU9OX01BUC5sZWZ0Qm90dG9tXG5dKTtcblxuZXhwb3J0IGNvbnN0IFRPUF9QT1NJVElPTl9QUklPUklUWSA9IG9iamVjdFZhbHVlcyhbXG4gICAgUE9TSVRJT05fTUFQLnRvcCxcbiAgICBQT1NJVElPTl9NQVAuYm90dG9tLFxuICAgIFBPU0lUSU9OX01BUC5yaWdodEJvdHRvbSxcbiAgICBQT1NJVElPTl9NQVAubGVmdEJvdHRvbSxcbiAgICBQT1NJVElPTl9NQVAuYm90dG9tTGVmdCxcbiAgICBQT1NJVElPTl9NQVAuYm90dG9tUmlnaHRcbl0pO1xuXG5leHBvcnQgY29uc3QgQk9UVE9NX1BPU0lUSU9OX1BSSU9SSVRZID0gb2JqZWN0VmFsdWVzKFtcbiAgICBQT1NJVElPTl9NQVAuYm90dG9tLFxuICAgIFBPU0lUSU9OX01BUC50b3AsXG4gICAgUE9TSVRJT05fTUFQLnRvcExlZnQsXG4gICAgUE9TSVRJT05fTUFQLnRvcFJpZ2h0LFxuICAgIFBPU0lUSU9OX01BUC5yaWdodEJvdHRvbSxcbiAgICBQT1NJVElPTl9NQVAubGVmdEJvdHRvbVxuXSk7XG5cbmV4cG9ydCBjb25zdCBSSUdIVF9QT1NJVElPTl9QUklPUklUWSA9IG9iamVjdFZhbHVlcyhbXG4gICAgUE9TSVRJT05fTUFQLnJpZ2h0LFxuICAgIFBPU0lUSU9OX01BUC5sZWZ0LFxuICAgIFBPU0lUSU9OX01BUC5sZWZ0VG9wLFxuICAgIFBPU0lUSU9OX01BUC5sZWZ0Qm90dG9tLFxuICAgIFBPU0lUSU9OX01BUC50b3AsXG4gICAgUE9TSVRJT05fTUFQLmJvdHRvbVxuXSk7XG5cbmV4cG9ydCBjb25zdCBMRUZUX1BPU0lUSU9OX1BSSU9SSVRZID0gb2JqZWN0VmFsdWVzKFtcbiAgICBQT1NJVElPTl9NQVAubGVmdCxcbiAgICBQT1NJVElPTl9NQVAucmlnaHQsXG4gICAgUE9TSVRJT05fTUFQLnJpZ2h0VG9wLFxuICAgIFBPU0lUSU9OX01BUC5yaWdodEJvdHRvbSxcbiAgICBQT1NJVElPTl9NQVAudG9wLFxuICAgIFBPU0lUSU9OX01BUC5ib3R0b21cbl0pO1xuXG5leHBvcnQgY29uc3QgUklHSFRfVE9QX1BPU0lUSU9OX1BSSU9SSVRZID0gb2JqZWN0VmFsdWVzKFtcbiAgICBQT1NJVElPTl9NQVAucmlnaHRUb3AsXG4gICAgUE9TSVRJT05fTUFQLmxlZnRUb3AsXG4gICAgUE9TSVRJT05fTUFQLmxlZnQsXG4gICAgUE9TSVRJT05fTUFQLmxlZnRCb3R0b20sXG4gICAgUE9TSVRJT05fTUFQLnRvcExlZnQsXG4gICAgUE9TSVRJT05fTUFQLmJvdHRvbUxlZnRcbl0pO1xuXG5leHBvcnQgY29uc3QgUklHSFRfQk9UVE9NX1BPU0lUSU9OX1BSSU9SSVRZID0gb2JqZWN0VmFsdWVzKFtcbiAgICBQT1NJVElPTl9NQVAucmlnaHRCb3R0b20sXG4gICAgUE9TSVRJT05fTUFQLmxlZnRCb3R0b20sXG4gICAgUE9TSVRJT05fTUFQLmxlZnQsXG4gICAgUE9TSVRJT05fTUFQLmxlZnRUb3AsXG4gICAgUE9TSVRJT05fTUFQLnRvcExlZnQsXG4gICAgUE9TSVRJT05fTUFQLmJvdHRvbUxlZnRcbl0pO1xuXG5leHBvcnQgY29uc3QgTEVGVF9UT1BfUE9TSVRJT05fUFJJT1JJVFkgPSBvYmplY3RWYWx1ZXMoW1xuICAgIFBPU0lUSU9OX01BUC5sZWZ0VG9wLFxuICAgIFBPU0lUSU9OX01BUC5yaWdodFRvcCxcbiAgICBQT1NJVElPTl9NQVAucmlnaHQsXG4gICAgUE9TSVRJT05fTUFQLnJpZ2h0Qm90dG9tLFxuICAgIFBPU0lUSU9OX01BUC50b3BSaWdodCxcbiAgICBQT1NJVElPTl9NQVAuYm90dG9tUmlnaHRcbl0pO1xuXG5leHBvcnQgY29uc3QgTEVGVF9CT1RUT01fUE9TSVRJT05fUFJJT1JJVFkgPSBvYmplY3RWYWx1ZXMoW1xuICAgIFBPU0lUSU9OX01BUC5sZWZ0Qm90dG9tLFxuICAgIFBPU0lUSU9OX01BUC5yaWdodEJvdHRvbSxcbiAgICBQT1NJVElPTl9NQVAucmlnaHQsXG4gICAgUE9TSVRJT05fTUFQLnJpZ2h0VG9wLFxuICAgIFBPU0lUSU9OX01BUC50b3BSaWdodCxcbiAgICBQT1NJVElPTl9NQVAuYm90dG9tUmlnaHRcbl0pO1xuXG5leHBvcnQgY29uc3QgVE9QX0xFRlRfUE9TSVRJT05fUFJJT1JJVFkgPSBvYmplY3RWYWx1ZXMoW1xuICAgIFBPU0lUSU9OX01BUC50b3BMZWZ0LFxuICAgIFBPU0lUSU9OX01BUC50b3BSaWdodCxcbiAgICBQT1NJVElPTl9NQVAuYm90dG9tTGVmdCxcbiAgICBQT1NJVElPTl9NQVAuYm90dG9tLFxuICAgIFBPU0lUSU9OX01BUC5ib3R0b21SaWdodCxcbiAgICBQT1NJVElPTl9NQVAubGVmdEJvdHRvbSxcbiAgICBQT1NJVElPTl9NQVAucmlnaHRCb3R0b21cbl0pO1xuXG5leHBvcnQgY29uc3QgVE9QX1JJR0hUX1BPU0lUSU9OX1BSSU9SSVRZID0gb2JqZWN0VmFsdWVzKFtcbiAgICBQT1NJVElPTl9NQVAudG9wUmlnaHQsXG4gICAgUE9TSVRJT05fTUFQLnRvcExlZnQsXG4gICAgUE9TSVRJT05fTUFQLmJvdHRvbVJpZ2h0LFxuICAgIFBPU0lUSU9OX01BUC5ib3R0b20sXG4gICAgUE9TSVRJT05fTUFQLmJvdHRvbUxlZnQsXG4gICAgUE9TSVRJT05fTUFQLmxlZnRCb3R0b20sXG4gICAgUE9TSVRJT05fTUFQLnJpZ2h0Qm90dG9tXG5dKTtcblxuZXhwb3J0IGNvbnN0IEJPVFRPTV9SSUdIVF9QT1NJVElPTl9QUklPUklUWSA9IG9iamVjdFZhbHVlcyhbXG4gICAgUE9TSVRJT05fTUFQLmJvdHRvbVJpZ2h0LFxuICAgIFBPU0lUSU9OX01BUC5ib3R0b21MZWZ0LFxuICAgIFBPU0lUSU9OX01BUC50b3BSaWdodCxcbiAgICBQT1NJVElPTl9NQVAudG9wLFxuICAgIFBPU0lUSU9OX01BUC50b3BMZWZ0LFxuICAgIFBPU0lUSU9OX01BUC5sZWZ0VG9wLFxuICAgIFBPU0lUSU9OX01BUC5yaWdodFRvcFxuXSk7XG5cbmV4cG9ydCBjb25zdCBCT1RUT01fTEVGVF9QT1NJVElPTl9QUklPUklUWSA9IG9iamVjdFZhbHVlcyhbXG4gICAgUE9TSVRJT05fTUFQLmJvdHRvbUxlZnQsXG4gICAgUE9TSVRJT05fTUFQLmJvdHRvbVJpZ2h0LFxuICAgIFBPU0lUSU9OX01BUC50b3BMZWZ0LFxuICAgIFBPU0lUSU9OX01BUC50b3AsXG4gICAgUE9TSVRJT05fTUFQLnRvcFJpZ2h0LFxuICAgIFBPU0lUSU9OX01BUC5yaWdodFRvcCxcbiAgICBQT1NJVElPTl9NQVAubGVmdFRvcFxuXSk7XG5cbmV4cG9ydCBjb25zdCBQT1NJVElPTl9QUklPUklUWV9TVFJBVEVHWSA9IHtcbiAgICB0b3A6IFRPUF9QT1NJVElPTl9QUklPUklUWSxcbiAgICB0b3BMZWZ0OiBUT1BfTEVGVF9QT1NJVElPTl9QUklPUklUWSxcbiAgICB0b3BSaWdodDogVE9QX1JJR0hUX1BPU0lUSU9OX1BSSU9SSVRZLFxuICAgIGJvdHRvbTogQk9UVE9NX1BPU0lUSU9OX1BSSU9SSVRZLFxuICAgIGJvdHRvbUxlZnQ6IEJPVFRPTV9MRUZUX1BPU0lUSU9OX1BSSU9SSVRZLFxuICAgIGJvdHRvbVJpZ2h0OiBCT1RUT01fUklHSFRfUE9TSVRJT05fUFJJT1JJVFksXG4gICAgbGVmdDogTEVGVF9QT1NJVElPTl9QUklPUklUWSxcbiAgICBsZWZ0VG9wOiBMRUZUX1RPUF9QT1NJVElPTl9QUklPUklUWSxcbiAgICBsZWZ0Qm90dG9tOiBMRUZUX0JPVFRPTV9QT1NJVElPTl9QUklPUklUWSxcbiAgICByaWdodDogUklHSFRfUE9TSVRJT05fUFJJT1JJVFksXG4gICAgcmlnaHRUb3A6IFJJR0hUX1RPUF9QT1NJVElPTl9QUklPUklUWSxcbiAgICByaWdodEJvdHRvbTogUklHSFRfQk9UVE9NX1BPU0lUSU9OX1BSSU9SSVRZXG59O1xuXG5leHBvcnQgY29uc3QgUE9TSVRJT05fVE9fQ1NTX01BUDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgdG9wOiAndG9wJyxcbiAgICB0b3BMZWZ0OiAndG9wLWxlZnQnLFxuICAgIHRvcFJpZ2h0OiAndG9wLXJpZ2h0JyxcbiAgICByaWdodDogJ3JpZ2h0JyxcbiAgICByaWdodFRvcDogJ3JpZ2h0LXRvcCcsXG4gICAgcmlnaHRCb3R0b206ICdyaWdodC1ib3R0b20nLFxuICAgIGxlZnQ6ICdsZWZ0JyxcbiAgICBsZWZ0VG9wOiAnbGVmdC10b3AnLFxuICAgIGxlZnRCb3R0b206ICdsZWZ0LWJvdHRvbScsXG4gICAgYm90dG9tOiAnYm90dG9tJyxcbiAgICBib3R0b21MZWZ0OiAnYm90dG9tLWxlZnQnLFxuICAgIGJvdHRvbVJpZ2h0OiAnYm90dG9tLXJpZ2h0J1xufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfNF9QT1NJVElPTlNfVE9fQ1NTX01BUDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7XG4gICAgdG9wOiAndG9wJyxcbiAgICBib3R0b206ICdib3R0b20nLFxuICAgIHJpZ2h0OiAncmlnaHQnLFxuICAgIGxlZnQ6ICdsZWZ0J1xufTtcblxuZnVuY3Rpb24gYXJyYXlNYXA8VCwgUz4oYXJyYXk6IFRbXSwgaXRlcmF0ZWU6IChpdGVtOiBULCBpbmRleDogbnVtYmVyLCBhcnI6IFRbXSkgPT4gUyk6IFNbXSB7XG4gICAgbGV0IGluZGV4ID0gLTE7XG4gICAgY29uc3QgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG4gICAgY29uc3QgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHJlc3VsdFsgaW5kZXggXSA9IGl0ZXJhdGVlKGFycmF5WyBpbmRleCBdLCBpbmRleCwgYXJyYXkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBiYXNlVmFsdWVzPFQ+KG9iamVjdDogeyBba2V5OiBzdHJpbmddOiBUIH0gfCBUW10sIHByb3BzOiBzdHJpbmdbXSk6IFRbXSB7XG4gICAgcmV0dXJuIGFycmF5TWFwKHByb3BzLCAgKGtleSkgPT4ge1xuICAgICAgICByZXR1cm4gb2JqZWN0WyBrZXkgXTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdFZhbHVlczxUPihvYmplY3Q6IHsgW2tleTogc3RyaW5nXTogVCB9IHwgVFtdKTogVFtdIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyBbXSA6IGJhc2VWYWx1ZXMob2JqZWN0LCBPYmplY3Qua2V5cyhvYmplY3QpKTtcbn1cbiJdfQ==