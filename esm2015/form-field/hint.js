import { Directive, Input } from '@angular/core';
let nextUniqueId = 0;
export class McHint {
    constructor() {
        this.id = `mc-hint-${nextUniqueId++}`;
    }
}
McHint.decorators = [
    { type: Directive, args: [{
                selector: 'mc-hint',
                host: {
                    class: 'mc-hint',
                    '[attr.id]': 'id'
                }
            },] }
];
McHint.propDecorators = {
    id: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGludC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3BhY2thZ2VzL21vc2FpYy9mb3JtLWZpZWxkL2hpbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakQsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBU3JCLE1BQU0sT0FBTyxNQUFNO0lBUG5CO1FBUWEsT0FBRSxHQUFXLFdBQVcsWUFBWSxFQUFFLEVBQUUsQ0FBQztJQUN0RCxDQUFDOzs7WUFUQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsU0FBUztvQkFDaEIsV0FBVyxFQUFFLElBQUk7aUJBQ3BCO2FBQ0o7OztpQkFFSSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5cbmxldCBuZXh0VW5pcXVlSWQgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ21jLWhpbnQnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdtYy1oaW50JyxcbiAgICAgICAgJ1thdHRyLmlkXSc6ICdpZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1jSGludCB7XG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGBtYy1oaW50LSR7bmV4dFVuaXF1ZUlkKyt9YDtcbn1cbiJdfQ==