# Guard

### Setup
To set up the application and populate the database with example data:
1. After cloning the project to a local device, use a command prompt to enter the backend, install dependencies, and start the backend:
   ```
   $ cd Guard/backend
   $ npm install
   $ npm start
   ```

    This should start the backend service on port 4000, and connect to the MongoDB database:
    ![figure1.png](report/imgs/figure1.png)

    Figure 1: Successful start of backend service.

2. In another command prompt, enter the frontend, install dependencies, and start the frontend service:
   ```
   $ cd Guard/frontend
   $ npm install
   $ npm start
   ```

    This should start the frontend service on port 8080:
    ![figure2.png](report/imgs/figure2.png)

    Figure 2: Successful start of frontend service.

3. Import test data into MongoDB:
   1. In the /tests folder, there is a file called Guard - Password Manager.postman_collection.json which is an export of a Postman collection.
   2. Import the collection file into Postman:
      ![figure3.png](report/imgs/figure3.png)

      Figure 3: Project collection imported into Postman.
   3. Run the Create test data folder:
      ![figure4.png](report/imgs/figure4.png)

      Figure 4: Run folder to create test data.
      ![figure5.png](report/imgs/figure5.png)

      Figure 5: Run folder to create test data.
      
      This should successfully execute all requests, with all tests passing:
      ![figure6.png](report/imgs/figure6.png)

      Figure 6: Data is imported successfully with all tests passed. 

      This should create the collections and data in MongoDB, which can be viewed using MongoDB Compass:
      ![figure7.png](report/imgs/figure7.png)

      Figure 7: Successful creation of database in MongoDB.

4. Visit the frontend on http://localhost:8080/login and log in using the test credentials:
    - Username: johnsmith
    - Password: this is a test password
