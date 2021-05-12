import express from 'express';
import mongoose from 'mongoose';

import Record  from './models/Record';

import { ENV_PORT, ENV_MONGO_URI } from './config/keys';


//-------------------
const port = ENV_PORT  || 4001;
const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());  
//-------------------

const db = mongoose.connect(ENV_MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true  });



/* ----- simply for test -- use get -- */
app.get('/api/TestGetData/:par1/:par2', (req, res) => {

  const par1 =  req.params.par1; 
  const par2 =  req.params.par2; 

  const result = { 
                  code:0,
                  msg: 'success',
                  params: { 'par1': par1, 'par2': par2 }
                 };  

  res.status(200).send(result);

});
/* ----- /simply for test -- use get -- */

app.post('/api/SaveData', async (req, res) => {

  /*
  {
  "key":"TAKwGc6Jr4i8Z487",
  "createdAt":"2017-01-28T01:22:14.398Z",
  "counts":[]
  }
  */

const { key, createdAt, counts } = req.body;

    const record = new Record({
      key,
      createdAt,
      counts
    });
        
    try {

        await record.save();

        const result = { 
                  code:0,
                  msg: 'success',
                  record
                 };

      res.send(result);

    } catch (err) {

      const result = { 
        code:1,
        msg: err        
       };

      res.status(422).send(result);
    }
//------


});


app.post('/api/ListDataByFilter', async (req, res) => {

  try {
          
        const { startDate, endDate, minCount, maxCount } = req.body;


        let startDateStr:string=`${startDate}T00:00:00Z`;
        let endDateStr:string=`${endDate}T00:00:00Z`;

        const records =  await Record.aggregate([
                        { $match: { "createdAt": 
                                      { 
                                          "$gte" : new Date(startDateStr), 
                                          "$lte" : new Date(endDateStr)  
                                      }
                        }},
                        { $project: {
                          "_id":0,
                          "key": 1,
                          "createdAt": 1,
                          "totalCount": {
                                        "$sum": "$counts"
                                        }
                        }},
                        { $match: { "totalCount": 
                                      { 
                                          "$gte" : minCount, 
                                          "$lte" : maxCount
                                      }
                        }}
      ]);
    
      res.status(200).send({
          "code":0,
          "msg":"Success",
          "records": records
          }); 
           
  } catch (error) {

      res.status(400).send({
          "code":1,
          "msg": error,
          "records": []
          }); 

  }

});




(async () => {
                          
    //--- Step 1.1 --- Do all possible initialization operations for solution  --
            
    // e.g. Solution based default parameters could be fetched from database    

    try {  

      ;  
    } catch (err) {            
        console.log(err);
    }
    
    //--- /Step 1.1 --- Do all possible initialization operations for solution  --



    //--- Step 1.2 --- start service listening --

    try {
        app.listen(port, async () => {        
            console.log(`\nListening on port ${port} - ${ new Date() }\n`);            
        });

    } catch (error) {
        console.log(error as string);
    }

    //--- /Step 1.2 --- start service listening --
     
})();

