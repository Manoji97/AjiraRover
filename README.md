## Ajira Rover Test Eimulation

    - Description
    - Build Details
        - Build Using docker
        - Build Using nodejs
    - Endpoints
    - Usage
    - Areas of Improvements
    - Contact

### Description:
Ajira has developed a rover for extra-terrestrial exploration. It can be configured to act differently in different environments.Before sending it on a voyage, we need to simulate an extra-terrestrial environment and test the rover The rover consists of the following internal modules.


> This Code is Developed from the Provided [Problem statement](https://cdn.skillenza.com/files/50311d7b-e4a7-4a4e-8be0-b5350326a467/ProblemStatement.pdf).


### Build Details:

This REST API is Completely developed with `nodejs` Backend using `express.js`.

I have added 2 modes of Installation for build.

    - Using Docker
    - Using node and npm


##### 1) Run Using Docker :

Please Follow the Instructions from the [Official Site](https://www.docker.com/products/docker-desktop) to Install `Docker` and `docker-compose`

After Installing Docker and docker-compose move to the Project directory run the below command

```docker
docker-compose up
```
this will expose the **API** at `http://localhost:8000/api`

##### 2) Build Using Nodejs:
    
Inorder to **Build** and **Test** this Project you will need to install `node` and `npm`.

Please Follow the Instructions from the `nodejs` from the [Official Site](https://nodejs.org/en/download/)

1)  Move to the Project Directory
    ```Docker
    cd AjiraRover
    ```
2) Install Packages
    ```Docker
    npm install
    ```
3) Initiate Production Server
    ```Docker
    npm run prodserver
    ```
this will expose the **API** at `http://localhost:8000/api`

### Endpoints:

According to the Problem Statement the API exposes the Following **URLs**


- To Configure the Environment:
    ```Docker
    -POST   http://localhost:8000/api/environment/configure
    ```

- To Update the Environment:
    ```Docker
    -PATCH  http://localhost:8000/api/environment
    ```
 - To Configure the Rover:
    ```Docker
    -POST   http://localhost:8000/api/rover/configure
    ```
 - To Move the Rover:
    ```Docker
    -POST   http://localhost:8000/api/rover/move
    ```
 - To Get the Rover and Environment Status:
    ```Docker
    -POST   http://localhost:8000/api/rover/status
    ```

### Areas of Improvements:
Though this Project doesnt invlove any `DataBases` and no Asynchronous Process we can still improve the Architecture.

- The **Inventory System**:
    - Currently the Inventory system is Implemented using the simple `Array`.
    - which pops the least priority item when inventory is full and removes the item if it is completely used.
    - On each Item Addition the inventory loops and chooses its position to maintain the `Sorted` order.
    - And unfortunately **Array Insertion and Removal is not O(n)**.

    
    >**Solution**: 
        with much Clarity in the Problem Statement this,
        the Simple Array can be replaced with complex DataStructures like 
            - `Priority Queue`
            - `Doubely Linked List`

- The Scenario Test:
    - With much more Detail in how the Scenarios are processed, A very better and efficient way of approch can be coded.



### Contact:
For Queries you can reach out to me on:

    Name:          M Manoji
    Contact:       9739691005
    Mail Id:       manoji1997m@gmail.com
    Git Profile:   https://github.com/Manoji97/
    Linked In:     