import {connectedRoles,roles} from './globalObjects';

export abstract class Message {
    public from:roles=roles.mediator;
    constructor(public name:string){};
}

export class ROLEMESSAGE extends Message {
    public host:string;
    public port:number;
    constructor(public roleName:roles){
        super(ROLEMESSAGE.name);
        this.host = connectedRoles.getInfo(roleName).host;
        this.port = connectedRoles.getInfo(roleName).port;
    }
}
export class CALC extends Message {
    constructor(public valueFrom: number, public valueTo:number ) {
        super(CALC.name);
    }
}
export class RESULT extends Message {
    constructor(public value: number, public sumOfDivisors:number) {
        super(RESULT.name);
    }
}
export class BYE extends Message {
    constructor() {
        super(BYE.name);
    }
}
