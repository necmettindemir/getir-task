
-------------------------------------------------------------------

- The aim of this study is to develop a REST API function that query MongoDB.

- Query will be a bit complicated rather than ordinary query.
  The details are explained in the following pages.

- The task code is fully typescript. 
  So, to run this task in production mode "npm run build" should run as shown in package.json so that .js file can be produced.

-------------------------------------------------------------------

CONTENT

1) Http Request and Reponse content examples
2) MongoDB Query
3) Possible Enhancements

-------------------------------------------------------------------


1) Http Request and Reponse content samples



The body content for the POST method of REST API function /api/ListDataByFilter
will be as shown below.

The following body content can be sent by some API test tools such as 
Postman, Insomnia, etc. to API method. 

{ "startDate": "2017-01-01", 
  "endDate": "2017-12-31",  
  "minCount": 100, 
  "maxCount": 300 
 }


The response will be received as below

{
  "code": 0,
  "msg": "Success",
  "records": [
    {
      "key": "TAKwGc6Jr4i8Z487",
      "createdAt": "2017-01-28T01:22:14.398Z",
      "totalCount": 170
    },
    {
      "key": "TAKwGc6Jr4i8Z487",
      "createdAt": "2017-01-28T01:22:14.398Z",
      "totalCount": 120
    }
  ]
}




--- simple get and post test -----
/*
- The following script can be used directly in google chrome developer console.
- By this way it is possible to test API method without POSTMAN, INSOMNIA, etc

- Both the following code snippets can be used in chrome developer console sequentially.
*/

At first, run "http://<base-url>/api/TestGetData/10/20" in address bar of chrome.

// can be used in chrome developer tools to test for GET request
const response = await fetch('http://<base-url>/api/TestGetData/10/20')
console.log(await response.json())


// can be used in chrome developer tools to test for POST request 
let r = await fetch('http://<base-url>/api/ListDataByFilter', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
            {'startDate': '2017-01-01',
            'endDate': '2018-12-31',
            'minCount': 100,
            'maxCount': 300}
      ),
    })
console.log(await r.json())


--- /simple get and post test -----

-------------------------------------------------------------------

2) MongoDB Query


Data(documents) in record collection is as below.

-records
  -_id
  - key
  - createdAt
  - counts[]



- The aim to get the result record in a form as below.

    - key
    - createdAt
    - totalCount (of counts[])


- So, MongoDB query should include match,project,aggregation,etc. as shown below.

- StartDateStr, endDateStr, minCount, maxCount are parameters of the following MongoDB query


const records =  await Record.aggregate([
      { $match: { "createdAt": 
                    { 
                        "$gte" : new Date(startDateStr), 
                        "$lte" : new Date(endDateStr)  
                    }
      } 
      },
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
      } 
    }
   ]);

-------------------------------------------------------------------

3) Possible Enhancements

For the simplicity of the task over engineering is avoided.
However, the following enhancements could be implemented.

3.1) JWT impelementation could be added

3.2) A middleware for authentication control could be added to API methods

3.3) Swagger for REST API documentation could be added

3.4) For the case of microservice architecture Dockerfile is added. 
     YAML configuration file for Kubernetes could be added as well. 

3.5) Route mechanism could be added to the solution

3.6) Dependency Injection could be implemented so that different DBs can be used

-------------------------------------------------------------------





