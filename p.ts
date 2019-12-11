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

interface Ip {
}

interface Ip_S1 extends Ip {
    send_BYE_to_s1(bye: BYE): Promise<Ip_S2>;
    send_CALC_to_s2(calc: CALC): Promise<Ip_S1>;
    send_CALC_to_s1(calc: CALC): Promise<Ip_S1>;
    send_CALC_to_s5(calc: CALC): Promise<Ip_S1>;
    send_CALC_to_s4(calc: CALC): Promise<Ip_S1>;
    send_CALC_to_s3(calc: CALC): Promise<Ip_S1>;
}

interface Ip_S2 extends Ip {
    send_BYE_to_s2(bye: BYE): Promise<Ip_S3>;
}

interface Ip_S3 extends Ip {
    send_BYE_to_s3(bye: BYE): Promise<Ip_S4>;
}

interface Ip_S4 extends Ip {
    send_BYE_to_s4(bye: BYE): Promise<Ip_S5>;
}

interface Ip_S5 extends Ip {
    send_BYE_to_s5(bye: BYE): Promise<Ip_S6>;
}

interface Ip_S6 extends Ip {
    recv(): Promise<Ip_S6_5 | Ip_S6_5 | Ip_S6_5 | Ip_S6_5 | Ip_S6_5 | Ip_S7_1 | Ip_S8_1 | Ip_S9_1 | Ip_S10_1 | Ip_S11_1>;
}

interface Ip_S6_1 extends Ip_S6 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S6_2 extends Ip_S6 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S6_3 extends Ip_S6 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S6_4 extends Ip_S6 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S6_5 extends Ip_S6 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S11 extends Ip {
    recv(): Promise<Ip_S11_5 | Ip_S11_5 | Ip_S11_5 | Ip_S11_5 | Ip_S12_5 | Ip_S13_5 | Ip_S14_5 | Ip_S15_5>;
}

interface Ip_S11_1 extends Ip_S11 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S11_2 extends Ip_S11 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S11_3 extends Ip_S11 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S11_4 extends Ip_S11 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S11_5 extends Ip_S11 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S15 extends Ip {
    recv(): Promise<Ip_S15_4 | Ip_S15_4 | Ip_S15_4 | Ip_S16_5 | Ip_S17_5 | Ip_S18_5>;
}

interface Ip_S15_1 extends Ip_S15 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S15_2 extends Ip_S15 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S15_3 extends Ip_S15 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S15_4 extends Ip_S15 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S15_5 extends Ip_S15 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S18 extends Ip {
    recv(): Promise<Ip_S18_3 | Ip_S18_3 | Ip_S19_5 | Ip_S20_5>;
}

interface Ip_S18_1 extends Ip_S18 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S18_2 extends Ip_S18 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S18_3 extends Ip_S18 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S18_4 extends Ip_S18 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S18_5 extends Ip_S18 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S20 extends Ip {
    recv(): Promise<Ip_S20_2 | Ip_S21_5>;
}

interface Ip_S20_1 extends Ip_S20 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S20_2 extends Ip_S20 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S20_3 extends Ip_S20 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S20_4 extends Ip_S20 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S20_5 extends Ip_S20 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S21 extends Ip {
}

interface Ip_S21_1 extends Ip_S21 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S21_2 extends Ip_S21 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S21_3 extends Ip_S21 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S21_4 extends Ip_S21 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S21_5 extends Ip_S21 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S19 extends Ip {
    recv(): Promise<Ip_S19_2 | Ip_S21_5>;
}

interface Ip_S19_1 extends Ip_S19 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S19_2 extends Ip_S19 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S19_3 extends Ip_S19 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S19_4 extends Ip_S19 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S19_5 extends Ip_S19 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S17 extends Ip {
    recv(): Promise<Ip_S17_3 | Ip_S17_3 | Ip_S22_5 | Ip_S20_5>;
}

interface Ip_S17_1 extends Ip_S17 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S17_2 extends Ip_S17 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S17_3 extends Ip_S17 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S17_4 extends Ip_S17 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S17_5 extends Ip_S17 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S22 extends Ip {
    recv(): Promise<Ip_S22_2 | Ip_S21_5>;
}

interface Ip_S22_1 extends Ip_S22 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S22_2 extends Ip_S22 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S22_3 extends Ip_S22 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S22_4 extends Ip_S22 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S22_5 extends Ip_S22 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S16 extends Ip {
    recv(): Promise<Ip_S16_3 | Ip_S16_3 | Ip_S22_5 | Ip_S19_5>;
}

interface Ip_S16_1 extends Ip_S16 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S16_2 extends Ip_S16 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S16_3 extends Ip_S16 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S16_4 extends Ip_S16 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S16_5 extends Ip_S16 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S14 extends Ip {
    recv(): Promise<Ip_S14_4 | Ip_S14_4 | Ip_S14_4 | Ip_S23_5 | Ip_S24_5 | Ip_S18_5>;
}

interface Ip_S14_1 extends Ip_S14 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S14_2 extends Ip_S14 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S14_3 extends Ip_S14 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S14_4 extends Ip_S14 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S14_5 extends Ip_S14 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S24 extends Ip {
    recv(): Promise<Ip_S24_3 | Ip_S24_3 | Ip_S25_5 | Ip_S20_5>;
}

interface Ip_S24_1 extends Ip_S24 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S24_2 extends Ip_S24 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S24_3 extends Ip_S24 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S24_4 extends Ip_S24 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S24_5 extends Ip_S24 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S25 extends Ip {
    recv(): Promise<Ip_S25_2 | Ip_S21_5>;
}

interface Ip_S25_1 extends Ip_S25 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S25_2 extends Ip_S25 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S25_3 extends Ip_S25 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S25_4 extends Ip_S25 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S25_5 extends Ip_S25 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S23 extends Ip {
    recv(): Promise<Ip_S23_3 | Ip_S23_3 | Ip_S25_5 | Ip_S19_5>;
}

interface Ip_S23_1 extends Ip_S23 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S23_2 extends Ip_S23 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S23_3 extends Ip_S23 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S23_4 extends Ip_S23 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S23_5 extends Ip_S23 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S13 extends Ip {
    recv(): Promise<Ip_S13_4 | Ip_S13_4 | Ip_S13_4 | Ip_S26_5 | Ip_S24_5 | Ip_S17_5>;
}

interface Ip_S13_1 extends Ip_S13 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S13_2 extends Ip_S13 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S13_3 extends Ip_S13 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S13_4 extends Ip_S13 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S13_5 extends Ip_S13 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S26 extends Ip {
    recv(): Promise<Ip_S26_3 | Ip_S26_3 | Ip_S25_5 | Ip_S22_5>;
}

interface Ip_S26_1 extends Ip_S26 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S26_2 extends Ip_S26 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S26_3 extends Ip_S26 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S26_4 extends Ip_S26 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S26_5 extends Ip_S26 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S12 extends Ip {
    recv(): Promise<Ip_S12_4 | Ip_S12_4 | Ip_S12_4 | Ip_S26_5 | Ip_S23_5 | Ip_S16_5>;
}

interface Ip_S12_1 extends Ip_S12 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S12_2 extends Ip_S12 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S12_3 extends Ip_S12 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S12_4 extends Ip_S12 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S12_5 extends Ip_S12 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S10 extends Ip {
    recv(): Promise<Ip_S10_5 | Ip_S10_5 | Ip_S10_5 | Ip_S10_5 | Ip_S27_5 | Ip_S28_5 | Ip_S29_5 | Ip_S15_5>;
}

interface Ip_S10_1 extends Ip_S10 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S10_2 extends Ip_S10 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S10_3 extends Ip_S10 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S10_4 extends Ip_S10 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S10_5 extends Ip_S10 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S29 extends Ip {
    recv(): Promise<Ip_S29_4 | Ip_S29_4 | Ip_S29_4 | Ip_S30_5 | Ip_S31_5 | Ip_S18_5>;
}

interface Ip_S29_1 extends Ip_S29 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S29_2 extends Ip_S29 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S29_3 extends Ip_S29 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S29_4 extends Ip_S29 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S29_5 extends Ip_S29 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S31 extends Ip {
    recv(): Promise<Ip_S31_3 | Ip_S31_3 | Ip_S32_5 | Ip_S20_5>;
}

interface Ip_S31_1 extends Ip_S31 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S31_2 extends Ip_S31 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S31_3 extends Ip_S31 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S31_4 extends Ip_S31 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S31_5 extends Ip_S31 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S32 extends Ip {
    recv(): Promise<Ip_S32_2 | Ip_S21_5>;
}

interface Ip_S32_1 extends Ip_S32 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S32_2 extends Ip_S32 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S32_3 extends Ip_S32 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S32_4 extends Ip_S32 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S32_5 extends Ip_S32 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S30 extends Ip {
    recv(): Promise<Ip_S30_3 | Ip_S30_3 | Ip_S32_5 | Ip_S19_5>;
}

interface Ip_S30_1 extends Ip_S30 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S30_2 extends Ip_S30 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S30_3 extends Ip_S30 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S30_4 extends Ip_S30 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S30_5 extends Ip_S30 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S28 extends Ip {
    recv(): Promise<Ip_S28_4 | Ip_S28_4 | Ip_S28_4 | Ip_S33_5 | Ip_S31_5 | Ip_S17_5>;
}

interface Ip_S28_1 extends Ip_S28 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S28_2 extends Ip_S28 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S28_3 extends Ip_S28 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S28_4 extends Ip_S28 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S28_5 extends Ip_S28 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S33 extends Ip {
    recv(): Promise<Ip_S33_3 | Ip_S33_3 | Ip_S32_5 | Ip_S22_5>;
}

interface Ip_S33_1 extends Ip_S33 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S33_2 extends Ip_S33 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S33_3 extends Ip_S33 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S33_4 extends Ip_S33 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S33_5 extends Ip_S33 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S27 extends Ip {
    recv(): Promise<Ip_S27_4 | Ip_S27_4 | Ip_S27_4 | Ip_S33_5 | Ip_S30_5 | Ip_S16_5>;
}

interface Ip_S27_1 extends Ip_S27 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S27_2 extends Ip_S27 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S27_3 extends Ip_S27 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S27_4 extends Ip_S27 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S27_5 extends Ip_S27 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S9 extends Ip {
    recv(): Promise<Ip_S9_5 | Ip_S9_5 | Ip_S9_5 | Ip_S9_5 | Ip_S34_5 | Ip_S35_5 | Ip_S29_5 | Ip_S14_5>;
}

interface Ip_S9_1 extends Ip_S9 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S9_2 extends Ip_S9 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S9_3 extends Ip_S9 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S9_4 extends Ip_S9 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S9_5 extends Ip_S9 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S35 extends Ip {
    recv(): Promise<Ip_S35_4 | Ip_S35_4 | Ip_S35_4 | Ip_S36_5 | Ip_S31_5 | Ip_S24_5>;
}

interface Ip_S35_1 extends Ip_S35 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S35_2 extends Ip_S35 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S35_3 extends Ip_S35 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S35_4 extends Ip_S35 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S35_5 extends Ip_S35 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S36 extends Ip {
    recv(): Promise<Ip_S36_3 | Ip_S36_3 | Ip_S32_5 | Ip_S25_5>;
}

interface Ip_S36_1 extends Ip_S36 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S36_2 extends Ip_S36 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S36_3 extends Ip_S36 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S36_4 extends Ip_S36 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S36_5 extends Ip_S36 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S34 extends Ip {
    recv(): Promise<Ip_S34_4 | Ip_S34_4 | Ip_S34_4 | Ip_S36_5 | Ip_S30_5 | Ip_S23_5>;
}

interface Ip_S34_1 extends Ip_S34 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S34_2 extends Ip_S34 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S34_3 extends Ip_S34 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S34_4 extends Ip_S34 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S34_5 extends Ip_S34 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S8 extends Ip {
    recv(): Promise<Ip_S8_5 | Ip_S8_5 | Ip_S8_5 | Ip_S8_5 | Ip_S37_5 | Ip_S35_5 | Ip_S28_5 | Ip_S13_5>;
}

interface Ip_S8_1 extends Ip_S8 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S8_2 extends Ip_S8 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S8_3 extends Ip_S8 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S8_4 extends Ip_S8 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S8_5 extends Ip_S8 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S37 extends Ip {
    recv(): Promise<Ip_S37_4 | Ip_S37_4 | Ip_S37_4 | Ip_S36_5 | Ip_S33_5 | Ip_S26_5>;
}

interface Ip_S37_1 extends Ip_S37 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S37_2 extends Ip_S37 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S37_3 extends Ip_S37 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S37_4 extends Ip_S37 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S37_5 extends Ip_S37 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S7 extends Ip {
    recv(): Promise<Ip_S7_5 | Ip_S7_5 | Ip_S7_5 | Ip_S7_5 | Ip_S37_5 | Ip_S34_5 | Ip_S27_5 | Ip_S12_5>;
}

interface Ip_S7_1 extends Ip_S7 {
    readonly messageFrom: roles.s3;
    readonly messageType: messages.BYE;
    message: BYE;
}

interface Ip_S7_2 extends Ip_S7 {
    readonly messageFrom: roles.s4;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S7_3 extends Ip_S7 {
    readonly messageFrom: roles.s5;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S7_4 extends Ip_S7 {
    readonly messageFrom: roles.s2;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

interface Ip_S7_5 extends Ip_S7 {
    readonly messageFrom: roles.s1;
    readonly messageType: messages.RESULT;
    message: RESULT;
}

abstract class p implements Ip {
    constructor(protected transitionPossible: boolean = true) { }
    ;
    protected checkOneTransitionPossible() {
        if (!this.transitionPossible)
            throw new OneTransitionPossibleException("Only one transition possible from a state");
        this.transitionPossible = false;
    }
}

class p_S1 extends p implements Ip_S1 {
    constructor() {
        super();
    }
    async send_BYE_to_s1(bye: BYE): Promise<Ip_S2> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s1, bye);
        return new Promise(resolve => resolve(new p_S2));
    }
    async send_CALC_to_s2(calc: CALC): Promise<Ip_S1> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s2, calc);
        return new Promise(resolve => resolve(new p_S1));
    }
    async send_CALC_to_s1(calc: CALC): Promise<Ip_S1> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s1, calc);
        return new Promise(resolve => resolve(new p_S1));
    }
    async send_CALC_to_s5(calc: CALC): Promise<Ip_S1> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s5, calc);
        return new Promise(resolve => resolve(new p_S1));
    }
    async send_CALC_to_s4(calc: CALC): Promise<Ip_S1> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s4, calc);
        return new Promise(resolve => resolve(new p_S1));
    }
    async send_CALC_to_s3(calc: CALC): Promise<Ip_S1> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s3, calc);
        return new Promise(resolve => resolve(new p_S1));
    }
}

class p_S2 extends p implements Ip_S2 {
    constructor() {
        super();
    }
    async send_BYE_to_s2(bye: BYE): Promise<Ip_S3> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s2, bye);
        return new Promise(resolve => resolve(new p_S3));
    }
}

class p_S3 extends p implements Ip_S3 {
    constructor() {
        super();
    }
    async send_BYE_to_s3(bye: BYE): Promise<Ip_S4> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s3, bye);
        return new Promise(resolve => resolve(new p_S4));
    }
}

class p_S4 extends p implements Ip_S4 {
    constructor() {
        super();
    }
    async send_BYE_to_s4(bye: BYE): Promise<Ip_S5> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s4, bye);
        return new Promise(resolve => resolve(new p_S5));
    }
}

class p_S5 extends p implements Ip_S5 {
    constructor() {
        super();
    }
    async send_BYE_to_s5(bye: BYE): Promise<Ip_S6> {
        super.checkOneTransitionPossible();
        await sendMessage(roles.p, roles.s5, bye);
        return new Promise(resolve => resolve(new p_S6));
    }
}

class p_S6 extends p implements Ip_S6 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S6_5 | Ip_S6_5 | Ip_S6_5 | Ip_S6_5 | Ip_S6_5 | Ip_S7_1 | Ip_S8_1 | Ip_S9_1 | Ip_S10_1 | Ip_S11_1> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S6_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s5: {
                    resolve(new p_S6_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S6_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S6_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S6_5((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S7_1((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S8_1((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S9_1((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S10_1((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S11_1((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S6_1 extends p_S6 implements Ip_S6_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S6_2 extends p_S6 implements Ip_S6_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S6_3 extends p_S6 implements Ip_S6_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S6_4 extends p_S6 implements Ip_S6_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S6_5 extends p_S6 implements Ip_S6_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}

class p_S11 extends p implements Ip_S11 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S11_5 | Ip_S11_5 | Ip_S11_5 | Ip_S11_5 | Ip_S12_5 | Ip_S13_5 | Ip_S14_5 | Ip_S15_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s2);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S11_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s5: {
                    resolve(new p_S11_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S11_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S11_5((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S12_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S13_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S14_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S15_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S11_1 extends p_S11 implements Ip_S11_1 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S11_2 extends p_S11 implements Ip_S11_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S11_3 extends p_S11 implements Ip_S11_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S11_4 extends p_S11 implements Ip_S11_4 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S11_5 extends p_S11 implements Ip_S11_5 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}

class p_S15 extends p implements Ip_S15 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S15_4 | Ip_S15_4 | Ip_S15_4 | Ip_S16_5 | Ip_S17_5 | Ip_S18_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s5);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S15_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s5: {
                    resolve(new p_S15_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S15_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S16_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S17_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S18_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S15_1 extends p_S15 implements Ip_S15_1 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S15_2 extends p_S15 implements Ip_S15_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S15_3 extends p_S15 implements Ip_S15_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S15_4 extends p_S15 implements Ip_S15_4 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S15_5 extends p_S15 implements Ip_S15_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S18 extends p implements Ip_S18 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S18_3 | Ip_S18_3 | Ip_S19_5 | Ip_S20_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s4);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S18_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S18_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S19_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S20_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S18_1 extends p_S18 implements Ip_S18_1 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S18_2 extends p_S18 implements Ip_S18_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S18_3 extends p_S18 implements Ip_S18_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S18_4 extends p_S18 implements Ip_S18_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S18_5 extends p_S18 implements Ip_S18_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S20 extends p implements Ip_S20 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S20_2 | Ip_S21_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s3);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s3: {
                    resolve(new p_S20_2((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S21_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S20_1 extends p_S20 implements Ip_S20_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S20_2 extends p_S20 implements Ip_S20_2 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S20_3 extends p_S20 implements Ip_S20_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S20_4 extends p_S20 implements Ip_S20_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S20_5 extends p_S20 implements Ip_S20_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S21 extends p implements Ip_S21 {
    constructor() {
        super();
        receiveMessageServer.terminate();
    }
}
class p_S21_1 extends p_S21 implements Ip_S21_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S21_2 extends p_S21 implements Ip_S21_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S21_3 extends p_S21 implements Ip_S21_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S21_4 extends p_S21 implements Ip_S21_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S21_5 extends p_S21 implements Ip_S21_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S19 extends p implements Ip_S19 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S19_2 | Ip_S21_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s4);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S19_2((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S21_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S19_1 extends p_S19 implements Ip_S19_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S19_2 extends p_S19 implements Ip_S19_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S19_3 extends p_S19 implements Ip_S19_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S19_4 extends p_S19 implements Ip_S19_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S19_5 extends p_S19 implements Ip_S19_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S17 extends p implements Ip_S17 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S17_3 | Ip_S17_3 | Ip_S22_5 | Ip_S20_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s5);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s5: {
                    resolve(new p_S17_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S17_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S22_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S20_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S17_1 extends p_S17 implements Ip_S17_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S17_2 extends p_S17 implements Ip_S17_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S17_3 extends p_S17 implements Ip_S17_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S17_4 extends p_S17 implements Ip_S17_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S17_5 extends p_S17 implements Ip_S17_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S22 extends p implements Ip_S22 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S22_2 | Ip_S21_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s5);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s5: {
                    resolve(new p_S22_2((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S21_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S22_1 extends p_S22 implements Ip_S22_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S22_2 extends p_S22 implements Ip_S22_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S22_3 extends p_S22 implements Ip_S22_3 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S22_4 extends p_S22 implements Ip_S22_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S22_5 extends p_S22 implements Ip_S22_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S16 extends p implements Ip_S16 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S16_3 | Ip_S16_3 | Ip_S22_5 | Ip_S19_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s5);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S16_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s5: {
                    resolve(new p_S16_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S22_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S19_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S16_1 extends p_S16 implements Ip_S16_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S16_2 extends p_S16 implements Ip_S16_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S16_3 extends p_S16 implements Ip_S16_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S16_4 extends p_S16 implements Ip_S16_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S16_5 extends p_S16 implements Ip_S16_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S14 extends p implements Ip_S14 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S14_4 | Ip_S14_4 | Ip_S14_4 | Ip_S23_5 | Ip_S24_5 | Ip_S18_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s2);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S14_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S14_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S14_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S23_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S24_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S18_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S14_1 extends p_S14 implements Ip_S14_1 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S14_2 extends p_S14 implements Ip_S14_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S14_3 extends p_S14 implements Ip_S14_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S14_4 extends p_S14 implements Ip_S14_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S14_5 extends p_S14 implements Ip_S14_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S24 extends p implements Ip_S24 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S24_3 | Ip_S24_3 | Ip_S25_5 | Ip_S20_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s2);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s3: {
                    resolve(new p_S24_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S24_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S25_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S20_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S24_1 extends p_S24 implements Ip_S24_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S24_2 extends p_S24 implements Ip_S24_2 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S24_3 extends p_S24 implements Ip_S24_3 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S24_4 extends p_S24 implements Ip_S24_4 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S24_5 extends p_S24 implements Ip_S24_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S25 extends p implements Ip_S25 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S25_2 | Ip_S21_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s2);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s2: {
                    resolve(new p_S25_2((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S21_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S25_1 extends p_S25 implements Ip_S25_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S25_2 extends p_S25 implements Ip_S25_2 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S25_3 extends p_S25 implements Ip_S25_3 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S25_4 extends p_S25 implements Ip_S25_4 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S25_5 extends p_S25 implements Ip_S25_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S23 extends p implements Ip_S23 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S23_3 | Ip_S23_3 | Ip_S25_5 | Ip_S19_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s2);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S23_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S23_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S25_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S19_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S23_1 extends p_S23 implements Ip_S23_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S23_2 extends p_S23 implements Ip_S23_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S23_3 extends p_S23 implements Ip_S23_3 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S23_4 extends p_S23 implements Ip_S23_4 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S23_5 extends p_S23 implements Ip_S23_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S13 extends p implements Ip_S13 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S13_4 | Ip_S13_4 | Ip_S13_4 | Ip_S26_5 | Ip_S24_5 | Ip_S17_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s2);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s5: {
                    resolve(new p_S13_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S13_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S13_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S26_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S24_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S17_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S13_1 extends p_S13 implements Ip_S13_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S13_2 extends p_S13 implements Ip_S13_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S13_3 extends p_S13 implements Ip_S13_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S13_4 extends p_S13 implements Ip_S13_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S13_5 extends p_S13 implements Ip_S13_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S26 extends p implements Ip_S26 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S26_3 | Ip_S26_3 | Ip_S25_5 | Ip_S22_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s2);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s5: {
                    resolve(new p_S26_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S26_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S25_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S22_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S26_1 extends p_S26 implements Ip_S26_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S26_2 extends p_S26 implements Ip_S26_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S26_3 extends p_S26 implements Ip_S26_3 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S26_4 extends p_S26 implements Ip_S26_4 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S26_5 extends p_S26 implements Ip_S26_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S12 extends p implements Ip_S12 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S12_4 | Ip_S12_4 | Ip_S12_4 | Ip_S26_5 | Ip_S23_5 | Ip_S16_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s2);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S12_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s5: {
                    resolve(new p_S12_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S12_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S26_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S23_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S16_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S12_1 extends p_S12 implements Ip_S12_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S12_2 extends p_S12 implements Ip_S12_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S12_3 extends p_S12 implements Ip_S12_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S12_4 extends p_S12 implements Ip_S12_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S12_5 extends p_S12 implements Ip_S12_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S10 extends p implements Ip_S10 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S10_5 | Ip_S10_5 | Ip_S10_5 | Ip_S10_5 | Ip_S27_5 | Ip_S28_5 | Ip_S29_5 | Ip_S15_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S10_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s5: {
                    resolve(new p_S10_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S10_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S10_5((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S27_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S28_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S29_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S15_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S10_1 extends p_S10 implements Ip_S10_1 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S10_2 extends p_S10 implements Ip_S10_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S10_3 extends p_S10 implements Ip_S10_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S10_4 extends p_S10 implements Ip_S10_4 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S10_5 extends p_S10 implements Ip_S10_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}

class p_S29 extends p implements Ip_S29 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S29_4 | Ip_S29_4 | Ip_S29_4 | Ip_S30_5 | Ip_S31_5 | Ip_S18_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S29_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S29_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S29_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S30_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S31_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S18_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S29_1 extends p_S29 implements Ip_S29_1 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S29_2 extends p_S29 implements Ip_S29_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S29_3 extends p_S29 implements Ip_S29_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S29_4 extends p_S29 implements Ip_S29_4 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S29_5 extends p_S29 implements Ip_S29_5 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S31 extends p implements Ip_S31 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S31_3 | Ip_S31_3 | Ip_S32_5 | Ip_S20_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s3: {
                    resolve(new p_S31_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S31_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S32_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S20_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S31_1 extends p_S31 implements Ip_S31_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S31_2 extends p_S31 implements Ip_S31_2 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S31_3 extends p_S31 implements Ip_S31_3 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S31_4 extends p_S31 implements Ip_S31_4 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S31_5 extends p_S31 implements Ip_S31_5 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S32 extends p implements Ip_S32 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S32_2 | Ip_S21_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s1: {
                    resolve(new p_S32_2((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S21_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S32_1 extends p_S32 implements Ip_S32_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S32_2 extends p_S32 implements Ip_S32_2 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S32_3 extends p_S32 implements Ip_S32_3 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S32_4 extends p_S32 implements Ip_S32_4 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S32_5 extends p_S32 implements Ip_S32_5 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S30 extends p implements Ip_S30 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S30_3 | Ip_S30_3 | Ip_S32_5 | Ip_S19_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S30_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S30_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S32_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S19_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S30_1 extends p_S30 implements Ip_S30_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S30_2 extends p_S30 implements Ip_S30_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S30_3 extends p_S30 implements Ip_S30_3 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S30_4 extends p_S30 implements Ip_S30_4 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S30_5 extends p_S30 implements Ip_S30_5 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S28 extends p implements Ip_S28 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S28_4 | Ip_S28_4 | Ip_S28_4 | Ip_S33_5 | Ip_S31_5 | Ip_S17_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s5: {
                    resolve(new p_S28_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S28_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S28_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S33_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S31_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S17_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S28_1 extends p_S28 implements Ip_S28_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S28_2 extends p_S28 implements Ip_S28_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S28_3 extends p_S28 implements Ip_S28_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S28_4 extends p_S28 implements Ip_S28_4 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S28_5 extends p_S28 implements Ip_S28_5 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S33 extends p implements Ip_S33 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S33_3 | Ip_S33_3 | Ip_S32_5 | Ip_S22_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s5: {
                    resolve(new p_S33_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S33_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S32_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S22_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S33_1 extends p_S33 implements Ip_S33_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S33_2 extends p_S33 implements Ip_S33_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S33_3 extends p_S33 implements Ip_S33_3 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S33_4 extends p_S33 implements Ip_S33_4 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S33_5 extends p_S33 implements Ip_S33_5 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S27 extends p implements Ip_S27 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S27_4 | Ip_S27_4 | Ip_S27_4 | Ip_S33_5 | Ip_S30_5 | Ip_S16_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S27_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s5: {
                    resolve(new p_S27_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S27_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S33_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S30_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S16_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S27_1 extends p_S27 implements Ip_S27_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S27_2 extends p_S27 implements Ip_S27_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S27_3 extends p_S27 implements Ip_S27_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S27_4 extends p_S27 implements Ip_S27_4 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S27_5 extends p_S27 implements Ip_S27_5 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S9 extends p implements Ip_S9 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S9_5 | Ip_S9_5 | Ip_S9_5 | Ip_S9_5 | Ip_S34_5 | Ip_S35_5 | Ip_S29_5 | Ip_S14_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S9_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S9_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S9_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S9_5((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S34_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S35_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S29_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S14_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S9_1 extends p_S9 implements Ip_S9_1 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S9_2 extends p_S9 implements Ip_S9_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S9_3 extends p_S9 implements Ip_S9_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S9_4 extends p_S9 implements Ip_S9_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S9_5 extends p_S9 implements Ip_S9_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}

class p_S35 extends p implements Ip_S35 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S35_4 | Ip_S35_4 | Ip_S35_4 | Ip_S36_5 | Ip_S31_5 | Ip_S24_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s3: {
                    resolve(new p_S35_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S35_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S35_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S36_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S31_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S24_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S35_1 extends p_S35 implements Ip_S35_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S35_2 extends p_S35 implements Ip_S35_2 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S35_3 extends p_S35 implements Ip_S35_3 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S35_4 extends p_S35 implements Ip_S35_4 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S35_5 extends p_S35 implements Ip_S35_5 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S36 extends p implements Ip_S36 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S36_3 | Ip_S36_3 | Ip_S32_5 | Ip_S25_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s2) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s2: {
                    resolve(new p_S36_3((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S36_3((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S32_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S25_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S36_1 extends p_S36 implements Ip_S36_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S36_2 extends p_S36 implements Ip_S36_2 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S36_3 extends p_S36 implements Ip_S36_3 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S36_4 extends p_S36 implements Ip_S36_4 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S36_5 extends p_S36 implements Ip_S36_5 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S34 extends p implements Ip_S34 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S34_4 | Ip_S34_4 | Ip_S34_4 | Ip_S36_5 | Ip_S30_5 | Ip_S23_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S34_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S34_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S34_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S36_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S30_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S23_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S34_1 extends p_S34 implements Ip_S34_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S34_2 extends p_S34 implements Ip_S34_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S34_3 extends p_S34 implements Ip_S34_3 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S34_4 extends p_S34 implements Ip_S34_4 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S34_5 extends p_S34 implements Ip_S34_5 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S8 extends p implements Ip_S8 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S8_5 | Ip_S8_5 | Ip_S8_5 | Ip_S8_5 | Ip_S37_5 | Ip_S35_5 | Ip_S28_5 | Ip_S13_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s3) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s3) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s5: {
                    resolve(new p_S8_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s3: {
                    resolve(new p_S8_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S8_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S8_5((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s3: {
                    resolve(new p_S37_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S35_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S28_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S13_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S8_1 extends p_S8 implements Ip_S8_1 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S8_2 extends p_S8 implements Ip_S8_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S8_3 extends p_S8 implements Ip_S8_3 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S8_4 extends p_S8 implements Ip_S8_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S8_5 extends p_S8 implements Ip_S8_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}

class p_S37 extends p implements Ip_S37 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S37_4 | Ip_S37_4 | Ip_S37_4 | Ip_S36_5 | Ip_S33_5 | Ip_S26_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s5: {
                    resolve(new p_S37_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S37_4((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S37_4((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S36_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S33_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S26_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S37_1 extends p_S37 implements Ip_S37_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S37_2 extends p_S37 implements Ip_S37_2 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S37_3 extends p_S37 implements Ip_S37_3 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S37_4 extends p_S37 implements Ip_S37_4 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S37_5 extends p_S37 implements Ip_S37_5 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}

class p_S7 extends p implements Ip_S7 {
    constructor() {
        super();
    }
    async recv(): Promise<Ip_S7_5 | Ip_S7_5 | Ip_S7_5 | Ip_S7_5 | Ip_S37_5 | Ip_S34_5 | Ip_S27_5 | Ip_S12_5> {
        try {
            super.checkOneTransitionPossible();
        }
        catch (exc) {
            return new Promise((resolve, reject) => reject(exc));
        }
        const msgPredicate: (message: Message) => boolean = m => (m.name === RESULT.name && m.from === roles.s4) || (m.name === RESULT.name && m.from === roles.s5) || (m.name === RESULT.name && m.from === roles.s2) || (m.name === RESULT.name && m.from === roles.s1) || (m.name === BYE.name && m.from === roles.s4) || (m.name === BYE.name && m.from === roles.s5) || (m.name === BYE.name && m.from === roles.s2) || (m.name === BYE.name && m.from === roles.s1);
        const msg = await messageDB.remove(msgPredicate);
        return new Promise(resolve => {
            switch (msg.name + msg.from) {
                case RESULT.name + roles.s4: {
                    resolve(new p_S7_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s5: {
                    resolve(new p_S7_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s2: {
                    resolve(new p_S7_5((<RESULT>msg)));
                    break;
                }
                case RESULT.name + roles.s1: {
                    resolve(new p_S7_5((<RESULT>msg)));
                    break;
                }
                case BYE.name + roles.s4: {
                    resolve(new p_S37_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s5: {
                    resolve(new p_S34_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s2: {
                    resolve(new p_S27_5((<BYE>msg)));
                    break;
                }
                case BYE.name + roles.s1: {
                    resolve(new p_S12_5((<BYE>msg)));
                    break;
                }
            }
        });
    }
}
class p_S7_1 extends p_S7 implements Ip_S7_1 {
    readonly messageFrom = roles.s3;
    readonly messageType = messages.BYE;
    constructor(public message: BYE) {
        super();
    }
}
class p_S7_2 extends p_S7 implements Ip_S7_2 {
    readonly messageFrom = roles.s4;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S7_3 extends p_S7 implements Ip_S7_3 {
    readonly messageFrom = roles.s5;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S7_4 extends p_S7 implements Ip_S7_4 {
    readonly messageFrom = roles.s2;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}
class p_S7_5 extends p_S7 implements Ip_S7_5 {
    readonly messageFrom = roles.s1;
    readonly messageType = messages.RESULT;
    constructor(public message: RESULT) {
        super();
    }
}

type p_Start = Ip_S1;
type p_End = Ip_S21;

async function executeProtocol(f: (p_Start: p_Start) => Promise<p_End>, host: string, port: number) {
    console.log(`p started ${new Date()}`);
    await initialize(roles.p, port, host);
    let done = await f(new p_S1());
    return new Promise<p_End>(resolve => resolve(done));
}

export { Ip, Ip_S2, Ip_S3, Ip_S4, Ip_S5, Ip_S6, Ip_S11, Ip_S15, Ip_S18, Ip_S20, Ip_S19, Ip_S17, Ip_S22, Ip_S16, Ip_S14, Ip_S24, Ip_S25, Ip_S23, Ip_S13, Ip_S26, Ip_S12, Ip_S10, Ip_S29, Ip_S31, Ip_S32, Ip_S30, Ip_S28, Ip_S33, Ip_S27, Ip_S9, Ip_S35, Ip_S36, Ip_S34, Ip_S8, Ip_S37, Ip_S7, messages, p_Start, p_End, executeProtocol, roles };

