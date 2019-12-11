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

interface Is1 {
}

interface Is1_S1 extends Is1 {
    readonly messageFrom: roles.p;
    readonly messageType: messages.CALC;
    message?: CALC;
    recv(): Promise<Is1_S2 | Is1_S1>;
}

interface Is1_S2 extends Is1 {
    readonly messageFrom: roles.p;
    readonly messageType: messages.BYE;
    message?: BYE;
    send_RESULT_to_p(result: RESULT): Promise<Is1_S2>;
    send_BYE_to_p(bye: BYE): Promise<Is1_S3>;
}

interface Is1_S3 extends Is1 {
}

abstract class s1 implements Is1 {
    constructor(protected transitionPossible: boolean = true) { }
    ;
    protected checkOneTransitionPossible() {
        if (!this.transitionPossible)
            throw new OneTransitionPossibleException("Only one transition possible from a state");
        this.transitionPossible = false;
    }
}

class s1_S1 extends s1 implements Is1_S1 {
    readonly messageFrom = roles.p;
    readonly messageType = messages.CALC;
    constructor(public message?: CALC) {
        super();
    }
    async recv(): Promise<Is1_S2 | Is1_S1> {
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
                    resolve(new s1_S2((<BYE>msg)));
                    break;
                }
                case CALC.name + roles.p: {
                    resolve(new s1_S1((<CALC>msg)));
                    break;
                }
            }
        });
    }
}

class s1_S2 extends s1 implements Is1_S2 {
    readonly messageFrom = roles.p;
    readonly messageType = messages.BYE;
    constructor(public message?: BYE) {
        super();
    }
    async send_RESULT_to_p(result: RESULT): Promise<Is1_S2> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.s1, roles.p, result);
        return new Promise(resolve => resolve(new s1_S2));
    }
    async send_BYE_to_p(bye: BYE): Promise<Is1_S3> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.s1, roles.p, bye);
        return new Promise(resolve => resolve(new s1_S3));
    }
}

class s1_S3 extends s1 implements Is1_S3 {
    constructor() {
        super();
        receiveMessageServer.terminate();
    }
}

type s1_Start = Is1_S1;
type s1_End = Is1_S3;

async function executeProtocol(f: (s1_Start: s1_Start) => Promise<s1_End>, host: string, port: number) {
    console.log(`s1 started ${new Date()}`);
    await initialize(roles.s1, port, host);
    let done = await f(new s1_S1());
    return new Promise<s1_End>(resolve => resolve(done));
}

export { Is1, Is1_S2, messages, s1_Start, s1_End, executeProtocol, roles };

