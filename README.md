================================

Node.js example illustrating how to write a clustered RESTful API using the express library.

================================

1. Generate some sample data - create user:

POST https://expressbatchproxy.herokuapp.com/user
  payload: 
    {"username" : "jsmith",  "first_name" : "John", "last_name" : "Smith"}
  
2. Run the batch job - get user:

POST http://expressbatchproxy.herokuapp.com/batch
  payload: 
    {"batch": [
        {"path": "/user/1", "method": "GET"},
        {"path": "/user/2", "method": "GET"},
        {"path": "/user/3", "method": "GET"},
        {"path": "/user/4", "method": "GET"}]
    }