import mongoose from 'mongoose';
import  { ENV_MONGO_URI, ENV_PORT } from '../config/keys';


describe('all-tests', () => {

    describe('env-variables-tests', () => {


        it('ENV-MONGO-URI must exists', async () => {

            //assign
            let mongoUri = ENV_MONGO_URI;
            
            //act
            let len = ENV_MONGO_URI.length;

            //assert                        
            expect(len).toBeGreaterThan(0);

        });

        it('ENV_PORT must exists', async () => {

            //assign
            let port = ENV_PORT;
            
            //act
            let portExist: boolean = (port > 0) ? true : false;

            //assert                        
            expect(portExist).toBeTruthy();

        });

    });
    

    describe('mongo-integration-tests', () => {

   
        it('When MONGODB is ON it should return number of collections greater than 0', async () => {

          //... could be implemented here..

        });

        
    });
    
});
 
 