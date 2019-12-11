import {p_Start,p_End,executeProtocol,Ip,Ip_S4,Ip_S5,Ip_S6,Ip_S7,Ip_S11,} from './p';
import {CALC,RESULT,BYE,Message} from './Message';
//import * as fs from 'fs';

//const tempLOGFOLDER = "log/";
//var logger   = fs.createWriteStream( tempLOGFOLDER + 'logP.txt', { flags: 'w' });
//var log      = (tekst:string) => { logger.write(tekst+'\r\n');};

var   maxNumbers=10000;
var   maxGroupSize=1000;
var   portNumber=30000;
const perfectNumberArray:number[]=[];

async function protocol(s1:p_Start):Promise<p_End> {
   let resolver:((p_End)=>void)|null=null;
   let promise = new Promise<p_End>( (resolve,reject) => resolver = resolve );
   let state0=s1;
   let cntr=1;
   for(let i=0;i<maxNumbers;i+=maxGroupSize) {
      const calc=new CALC(i,i+maxGroupSize);
      switch (cntr) { case 1:  { state0 = await state0.send_CALC_to_s1(calc);  break; }
                      case 2:  { state0 = await state0.send_CALC_to_s2(calc);  break; }
                      case 3:  { state0 = await state0.send_CALC_to_s3(calc);  break; }
                      case 4:  { state0 = await state0.send_CALC_to_s4(calc);  break; }
                      case 5:  { state0 = await state0.send_CALC_to_s5(calc);  break; }
      }
      ++cntr;
      if (cntr === 6) cntr = 1;
   }
   //
   let state1  = await state0.send_BYE_to_s1(new BYE());
   let state2  = await state1.send_BYE_to_s2(new BYE());
   let state3  = await state2.send_BYE_to_s3(new BYE());
   let state4  = await state3.send_BYE_to_s4(new BYE());
   let state5  = await state4.send_BYE_to_s5(new BYE());
   //
   let state6 = await state5.recv();
   if ( state6.message && state6.message.name === RESULT.name ) {
      const result = <RESULT>state6.message;
      if ( result.sumOfDivisors === result.value ){
         //console.log(`perfect number ${result.value}`);
         perfectNumberArray.push(result.value);
      }
   }

   let byeCounter = 0;
   let stateX  = await state6.recv();
   while ( byeCounter < 5 ) {
      //console.log(`${stateX.messageFrom} ${stateX.messageType} ${stateX.constructor.name} ${byeCounter}`);      
      // @ts-ignore   een check of de recv functie voorkomt
      if ( typeof stateX.recv !== 'function') break;
      if ( stateX.message && stateX.message.name === RESULT.name ) {
         const result = <RESULT>stateX.message;
         if ( result.sumOfDivisors === result.value ){
            //console.log(`perfect number ${result.value}`);
            perfectNumberArray.push(result.value);
         }
      } 
      if ( stateX.message && stateX.message.name === BYE.name ) {
         byeCounter++;
      }
      // @ts-ignore
      stateX  = await stateX.recv();
   };
   //console.log(`-- na loop -- ${stateX.messageFrom} ${stateX.messageType} ${stateX.constructor.name} ${byeCounter}`);      
   const done    = <p_End> stateX;
   if ( resolver ) {
      resolver = <((p_End)=>void)>resolver;
      resolver(done);
   }
   return promise;
}

async function start(pars:string[]){
   //console.log(`startP -> ${pars}`);
   let par1 = pars[2];
   let par2 = pars[3];
   let par3 = pars[4];
   if (par1) {
      //console.log(`par 1 = ${par1}`);
      if (!Number.isNaN(Number(par1))) maxNumbers = Number(par1);
   }
   if (par2) {
      //console.log(`par 2 = ${par2}`);
      if (!Number.isNaN(Number(par2))) maxGroupSize = Number(par2);
   }
   if (par3) {
      //console.log(`par 3 = ${par2}`);
      if (!Number.isNaN(Number(par3))) portNumber = Number(par3);
   }
   //console.log(`total numbers to process    = ${maxNumbers}`);
   //console.log(`size of groups of numbers   = ${maxGroupSize}`);
   //console.log(`portnumber of the P role is = ${portNumber}`);   
   //console.time("generated perfectNumber Timing");
   await executeProtocol(protocol,'localhost',portNumber);
   console.log(`perfectnumbers = ${perfectNumberArray}`);
   //console.timeEnd("generated perfectNumber Timing");
}

start(process.argv);