export function delayValue(seconds,value){
    return new Promise( (res,rej) => {
        window.setTimeout( ()=> {
        console.log(`Resolving ${value}`);
        res(value);
        },seconds*1000 );
    });
    }