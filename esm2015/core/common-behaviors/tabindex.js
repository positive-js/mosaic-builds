import { coerceNumberProperty } from '@angular/cdk/coercion';
export function mixinTabIndex(base, defaultTabIndex = 0) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.defaultTabIndex = defaultTabIndex;
            this._tabIndex = defaultTabIndex;
        }
        get tabIndex() {
            return this.disabled ? -1 : this._tabIndex;
        }
        set tabIndex(value) {
            // If the specified tabIndex value is null or undefined, fall back to the default value.
            this._tabIndex = value != null ? coerceNumberProperty(value) : this.defaultTabIndex;
        }
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvY29yZS9jb21tb24tYmVoYXZpb3JzL3RhYmluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBZ0I3RCxNQUFNLFVBQVUsYUFBYSxDQUFvQyxJQUFPLEVBQUUsZUFBZSxHQUFHLENBQUM7SUFDekYsT0FBTyxLQUFNLFNBQVEsSUFBSTtRQWNyQixZQUFZLEdBQUcsSUFBVztZQUN0QixLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztZQWRuQixvQkFBZSxHQUFHLGVBQWUsQ0FBQztZQVcxQixjQUFTLEdBQVcsZUFBZSxDQUFDO1FBSTVDLENBQUM7UUFiRCxJQUFJLFFBQVE7WUFDUixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9DLENBQUM7UUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFhO1lBQ3RCLHdGQUF3RjtZQUN4RixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ3hGLENBQUM7S0FPSixDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHsgQWJzdHJhY3RDb25zdHJ1Y3RvciwgQ29uc3RydWN0b3IgfSBmcm9tICcuL2NvbnN0cnVjdG9yJztcbmltcG9ydCB7IENhbkRpc2FibGUgfSBmcm9tICcuL2Rpc2FibGVkJztcblxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bmFtaW5nLWNvbnZlbnRpb25cbmV4cG9ydCBpbnRlcmZhY2UgSGFzVGFiSW5kZXgge1xuICAgIHRhYkluZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEhhc1RhYkluZGV4Q3RvciA9IENvbnN0cnVjdG9yPEhhc1RhYkluZGV4PiAmIEFic3RyYWN0Q29uc3RydWN0b3I8SGFzVGFiSW5kZXg+O1xuXG4vKiogTWl4aW4gdG8gYXVnbWVudCBhIGRpcmVjdGl2ZSB3aXRoIGEgYHRhYkluZGV4YCBwcm9wZXJ0eS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpblRhYkluZGV4PFQgZXh0ZW5kcyBBYnN0cmFjdENvbnN0cnVjdG9yPENhbkRpc2FibGU+PihiYXNlOiBULCBkZWZhdWx0VGFiSW5kZXg/OiBudW1iZXIpOiBIYXNUYWJJbmRleEN0b3IgJiBUO1xuXG5leHBvcnQgZnVuY3Rpb24gbWl4aW5UYWJJbmRleDxUIGV4dGVuZHMgQ29uc3RydWN0b3I8Q2FuRGlzYWJsZT4+KGJhc2U6IFQsIGRlZmF1bHRUYWJJbmRleCA9IDApOiBIYXNUYWJJbmRleEN0b3IgJiBUIHtcbiAgICByZXR1cm4gY2xhc3MgZXh0ZW5kcyBiYXNlIGltcGxlbWVudHMgSGFzVGFiSW5kZXgge1xuICAgICAgICBkZWZhdWx0VGFiSW5kZXggPSBkZWZhdWx0VGFiSW5kZXg7XG5cbiAgICAgICAgZ2V0IHRhYkluZGV4KCk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA/IC0xIDogdGhpcy5fdGFiSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBzZXQgdGFiSW5kZXgodmFsdWU6IG51bWJlcikge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHNwZWNpZmllZCB0YWJJbmRleCB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZCwgZmFsbCBiYWNrIHRvIHRoZSBkZWZhdWx0IHZhbHVlLlxuICAgICAgICAgICAgdGhpcy5fdGFiSW5kZXggPSB2YWx1ZSAhPSBudWxsID8gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpIDogdGhpcy5kZWZhdWx0VGFiSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF90YWJJbmRleDogbnVtYmVyID0gZGVmYXVsdFRhYkluZGV4O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgICAgICAgICBzdXBlciguLi5hcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG59XG4iXX0=