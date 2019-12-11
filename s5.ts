import { receiveMessageServer } from "./receiveMessageServer";
import { BYE, CALC, RESULT, Message } from "./Message";
import { sendMessage } from "./sendMessage";
import { roles, initialize, connectedRoles, OneTransitionPossibleException } from "./globalObjects";
import { messageDB } from "./messageDB";

enum messages {
    BYE = "BYE",
    CALC = "CALC",
    RESULT = "RESULT"
}

interface Is5 {
}

interface Is5_S1 extends Is5 {
    readonly messageFrom: roles.p;
    readonly messageType: messages.CALC;
    message?: CALC;
    recv(): Promise<Is5_S2 | Is5_S1>;
}

interface Is5_S2 extends Is5 {
    readonly messageFrom: roles.p;
    readonly messageType: messages.BYE;
    message?: BYE;
    send_RESULT_to_p(result: RESULT): Promise<Is5_S2>;
    send_BYE_to_p(bye: BYE): Promise<Is5_S3>;
}

interface Is5_S3 extends Is5 {
}

abstract class s5 implements Is5 {
    constructor(protected transitionPossible: boolean = true) { }
    ;
    protected checkOneTransitionPossible() {
        if (!this.transitionPossible)
            throw new OneTransitionPossibleException("Only one transition possible from a state");
        this.transitionPossible = false;
    }
}

class s5_S1 extends s5 implements Is5_S1 {
    readonly messageFrom = roles.p;
    readonly messageType = messages.CALC;
    constructor(public message?: CALC) {
        super();
    }
    async recv(): Promise<Is5_S2 | Is5_S1> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === BYE.name && m.from === roles.p) || (m.name === CALC.name && m.from === roles.p);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case BYE.name + roles.p: {
                    resolve(new s5_S2((<BYE>msg)));
                    break;
                }
                case CALC.name + roles.p: {
                    resolve(new s5_S1((<CALC>msg)));
                    break;
                }
            }
        });
    }
}

class s5_S2 extends s5 implements Is5_S2 {
    readonly messageFrom = roles.p;
    readonly messageType = messages.BYE;
    constructor(public message?: BYE) {
        super();
    }
    async send_RESULT_to_p(result: RESULT): Promise<Is5_S2> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.s5, roles.p, result);
        return new Promise(resolve => resolve(new s5_S2));
    }
    async send_BYE_to_p(bye: BYE): Promise<Is5_S3> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.s5, roles.p, bye);
        return new Promise(resolve => resolve(new s5_S3));
    }
}

class s5_S3 extends s5 implements Is5_S3 {
    constructor() {
        super();
        receiveMessageServer.terminate();
    }
}

type s5_Start = Is5_S1;
type s5_End = Is5_S3;

async function executeProtocol(f: (s5_Start: s5_Start) => Promise<s5_End>, host: string, port: number) {
    console.log(`s5 started ${new Date()}`);
    await initialize(roles.s5, port, host);
    let done = await f(new s5_S1());
    return new Promise<s5_End>(resolve => resolve(done));
}

export { Is5, Is5_S2, messages, s5_Start, s5_End, executeProtocol, roles };

