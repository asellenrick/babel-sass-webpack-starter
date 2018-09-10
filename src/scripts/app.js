import {delayValue} from './delayValue';

async function init(){
  const val1 = await delayValue(1,"Hello");
  const val2 = await delayValue(1,"World");
  console.log(val1,val2);
}

init();