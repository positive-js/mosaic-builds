import { Directive, Input } from '@angular/core';
import { CdkTreeNodeDef } from '@ptsecurity/cdk/tree';
export class McTreeNodeDef extends CdkTreeNodeDef {
}
McTreeNodeDef.decorators = [
    { type: Directive, args: [{
                selector: '[mcTreeNodeDef]',
                inputs: ['when: mcTreeNodeDefWhen'],
                providers: [{ provide: CdkTreeNodeDef, useExisting: McTreeNodeDef }]
            },] }
];
McTreeNodeDef.propDecorators = {
    data: [{ type: Input, args: ['mcTreeNode',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wYWNrYWdlcy9tb3NhaWMvdHJlZS9ub2RlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFRdEQsTUFBTSxPQUFPLGFBQWlCLFNBQVEsY0FBaUI7OztZQUx0RCxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsTUFBTSxFQUFFLENBQUMseUJBQXlCLENBQUM7Z0JBQ25DLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLENBQUM7YUFDdkU7OzttQkFFSSxLQUFLLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1RyZWVOb2RlRGVmIH0gZnJvbSAnQHB0c2VjdXJpdHkvY2RrL3RyZWUnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW21jVHJlZU5vZGVEZWZdJyxcbiAgICBpbnB1dHM6IFsnd2hlbjogbWNUcmVlTm9kZURlZldoZW4nXSxcbiAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IENka1RyZWVOb2RlRGVmLCB1c2VFeGlzdGluZzogTWNUcmVlTm9kZURlZiB9XVxufSlcbmV4cG9ydCBjbGFzcyBNY1RyZWVOb2RlRGVmPFQ+IGV4dGVuZHMgQ2RrVHJlZU5vZGVEZWY8VD4ge1xuICAgIEBJbnB1dCgnbWNUcmVlTm9kZScpIGRhdGE6IFQ7XG59XG4iXX0=