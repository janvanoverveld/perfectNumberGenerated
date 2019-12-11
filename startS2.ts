import {s2_Start,s2_End,executeProtocol, messages} from './s2';
import {BYE,CALC,RESULT} from './Message';
import {getSumOfDivisors} from './getSumOfDivisors';
//import * as fs from 'fs';

/*
const tempLOGFOLDER = "./log/";
var logger     = fs.createWriteStream( tempLOGFOLDER + 'startS2runtimeLog.txt', { flags: 'w' });
var loggerPN   = (tekst:string) => { logger.write(tekst+'\r\n');};
const startDate = new Date();

function logTime ( kenmerk:string){
   const endDate = new Date();
   let timeDiff = endDate.getTime() - startDate.getTime();
   timeDiff /= 1000; // strip the ms
   const seconds = Math.round(timeDiff);
   loggerPN( `${kenmerk} -> ${seconds} seconds`);
}
*/

async function protocol(s1:s2_Start):Promise<s2_End> {
   //logTime(`A`);
   let resolver:((s2_End)=>void)|null=null;
   let promise = new Promise<s2_End>( (resolve,reject) => resolver = resolve );
   const mapWithSumOfDivisors:Map<number,number>=new Map();
   //
   let nextstate = await s1.recv();
   while (nextstate.messageType === messages.CALC ) {
      if (nextstate.message) {
         mapWithSumOfDivisors.set(nextstate.message.valueFrom,nextstate.message.valueTo);
         nextstate = await nextstate.recv();
      }
   }
   //logTime(`B`);
   //
   if ( nextstate.messageType === messages.BYE ){
      for ( let [key,value] of mapWithSumOfDivisors ){
         //logTime(`s2 ${key}   ${value}`);
         for ( let i = key; i<value; i++){
            const sumOfDivisors = getSumOfDivisors(i);
            if ( sumOfDivisors === i ){
               nextstate = await nextstate.send_RESULT_to_p(new RESULT( i, sumOfDivisors ));
            }
         }
      }
      //logTime(`voor done`);
      const done = await nextstate.send_BYE_to_p(new BYE());
      //logTime(`${done.constructor.name}`);
      if (resolver) {
           // @ts-ignore
           resolver(done);
      }
   }
   return promise;
}

async function start(args:string[]){
   let par1 = args[2];
   let port = 40001;
   if (par1) {
      if (!Number.isNaN(Number(par1))) port = Number(par1);
   }
   //logTime(`S2 port = ${port}`);
   await executeProtocol(protocol,'localhost',port);
   //logTime(`na await`);   
}

start(process.argv);