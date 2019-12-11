import * as child from 'child_process';
import * as fs from 'fs';

const sleep = async (ms) => new Promise( resolve => setTimeout(resolve, ms) );
const mediatorFileName = 'mediator.js';
const logDir = './log';

const tempLOGFOLDER = "log/";
var loggerPerfectNumberResults = fs.createWriteStream( tempLOGFOLDER + 'perfectNumberResults.txt', { flags: 'w' });
var logPerfectNumberResults    = (tekst:string) => { loggerPerfectNumberResults.write(tekst+'\r\n');};
var loggerTiming               = fs.createWriteStream( tempLOGFOLDER + 'timingResults.txt', { flags: 'w' });
var logTiming                  = (tekst:string) => { loggerTiming.write(tekst+'\r\n');};

//async function logTiming(tekst:string){
//  fs.appendFile('./log/timingResults.txt', `${tekst} \n`, (err) => { if (err) throw err; } );
//}

var globalPortNumber = 40000;

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

function writeLogFile(fileName:string,data:string){
    const logFileName=`${__dirname}/../log/${fileName.substr(0,fileName.indexOf('.'))}.log`;
    fs.writeFile( logFileName
    ,             data
    ,             (err) => { if(err) { console.log(`fs error bij ${fileName}`);
                                       console.log(`${err}`); }
                             else {
                                null;
                                //console.log(`logfile ${logFileName}  for ${fileName} was created`);
                                //if (fileName!==mediatorFileName) process.stdout.write(data);
                                //console.log(data)
                             }
                           } );
}

var resolver: (() => void) | null = null;

async function executeStartP(maxNumbers:number,groupSize:number):Promise<void>{
    let promise = new Promise<void>( resolve => resolver = resolve );
    //console.log(`start startP.js ${new Date()} ${maxNumbers}  ${groupSize}  `);
    const parameters = [`${__dirname}/startP.js`];
    parameters.push(`${maxNumbers}`);
    parameters.push(`${groupSize}`);
    parameters.push(`${globalPortNumber++}`);
    child.execFile( 'node'
    , parameters
    , (err,data) => { if (err){
                         console.log(`error bij startP.js`);
                         console.log(`${err}`);
                         writeLogFile('startP.js',err.message);
                      }
                      else {
                          logPerfectNumberResults(`${data}`);
                      }
                      //console.log(`klaar startP   ${new Date()} `);
                      //console.log(`${data}`);
                      if (resolver) resolver();
                      //if (resolver) setTimeout(resolver,1000);
                     } );
    //console.log(`eind executeNodeProcess startP.js`);
    return promise;
};

async function executeNodeProcess(fileName:string){
    //console.log(`start ${fileName}   ${new Date()} `);
    const parameters = [`${__dirname}/${fileName}`];
    parameters.push(`${globalPortNumber++}`);
    child.execFile( 'node'
    , parameters
    , (err,data) => { if (err){
                         console.log(`error bij ${fileName}`);
                         console.log(`${err}`);
                         writeLogFile(fileName,err.message);
                      }
                      else {
                           writeLogFile(fileName,data);
                           //console.log(`${data}`);
                      }
                      //console.log(`klaar ${fileName}   ${new Date()} `);
                      //console.log(`${data}`);
                    });
};

var timingResolver: ( (number) => void) | null = null;

async function startCountNumbers(totalNumbers:number,groupSize:number):Promise<number>{
   const startTime = new Date();
   let promise = new Promise<number>( resolve => timingResolver = resolve );
   executeNodeProcess(mediatorFileName);
   // first mediator
   await sleep(100);
   const startupLocalProtocolFiles = fs.readdirSync(__dirname).filter((f)=>f.includes('start'));
   for ( const startFile of startupLocalProtocolFiles ){
       if ( startFile !== 'start.js' && startFile !== 'startP.js' )
          executeNodeProcess( startFile );
   }
   console.log(`total numbers to do ${totalNumbers}`);
   executeStartP(totalNumbers,groupSize).then(
      () => {
         const endTime  = new Date();
         let timeDiff = endTime.getTime() - startTime.getTime();
         timeDiff /= 1000; // strip the ms
         const seconds = Math.round(timeDiff);
         //console.log( `${totalNumbers} : ${seconds} seconds`);
         if ( timingResolver ) {
             timingResolver(seconds);
         }
      }
   )
   return promise;
}

async function startGroup(groupSize:number){
   console.log(`groupSize ${groupSize}`);
   let totalNumbers:number = 0;
   let timing=0;
   // 1
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 2
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 3
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 4
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 5
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 6
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 7
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 8
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 9
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
   // 10
   timing = await startCountNumbers(totalNumbers+=100000,groupSize);
   //console.log( `${groupSize};${totalNumbers};${timing}`);
   logTiming(`${groupSize};${totalNumbers};${timing}`);
}

async function startMulti(){
   //1
   await startGroup(100);
   await startGroup(1000);
   await startGroup(10000);
   //2
   await startGroup(100);
   await startGroup(1000);
   await startGroup(10000);
   //3
   await startGroup(100);
   await startGroup(1000);
   await startGroup(10000);
   //4
   await startGroup(100);
   await startGroup(1000);
   await startGroup(10000);
   //5
   /*
   await startGroup(100);
   await startGroup(1000);
   await startGroup(10000);
   //6
   await startGroup(100);
   await startGroup(1000);
   await startGroup(10000);
   //7   
   await startGroup(100);
   await startGroup(1000);
   await startGroup(10000);
   */
}

startMulti();
