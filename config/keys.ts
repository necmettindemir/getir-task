
import * as prod from './prod';
import * as dev from './dev';

export let ENV_MONGO_URI:string; 
export let ENV_PORT:number; 

if (process.env.NODE_ENV === 'production') {
  
  ENV_MONGO_URI = prod.ENV_MONGO_URI; 
  ENV_PORT = prod.ENV_PORT; 

} else {
  
    ENV_MONGO_URI = dev.ENV_MONGO_URI; 
    ENV_PORT = dev.ENV_PORT; 

}
  