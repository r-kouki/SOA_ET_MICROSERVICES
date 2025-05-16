# gRPC Hello World Example

This project demonstrates a simple gRPC service with a Node.js server.

## Objectives

*   Set up a gRPC service that receives requests and sends structured responses using an efficient communication protocol.
*   Create a reverse proxy that acts as an interface for clients and forwards requests to the gRPC service (Note: This part is mentioned in the objectives but not implemented in the provided server.js).

## Tools Used

*   Node.js
*   protobuf
*   gRPC
*   @grpc/proto-loader

## Setup and Installation

### 1. Prerequisites

*   **Protobuf:** Install Protocol Buffers from the official website: [https://protobuf.dev/downloads/](https://protobuf.dev/downloads/)
    *   On Ubuntu, you can install it using:
        ```bash
        sudo snap install protobuf --classic
        ```
    *   Ensure `protoc` is in your system's PATH.

*   **Node.js:** Install Node.js from the official website: [https://nodejs.org/en/download](https://nodejs.org/en/download)
    *   On Ubuntu, you can install it using:
        ```bash
        sudo snap install node --classic
        ```

### 2. Create Project Directory

The project files (`hello.proto`, `server.js`, and this `README.md`) are already created in the `grpc-tp` directory.

### 3. Initialize npm and Install Dependencies

Navigate to the `grpc-tp` directory in your terminal and run the following commands:

*   Initialize the npm project:
    ```bash
    npm init -y
    ```
    *(The `-y` flag accepts default values for `npm init`)*

*   Install gRPC and proto-loader dependencies:
    ```bash
    npm install @grpc/grpc-js @grpc/proto-loader
    ```

### 4. Project Files

*   **`hello.proto`**: Defines the service and message structures for gRPC.
    ```protobuf
    syntax = "proto3";

    package hello;

    service Greeter {
      rpc SayHello (HelloRequest) returns (HelloReply) {}
    }

    message HelloRequest {
      string name = 1;
    }

    message HelloReply {
      string message = 1;
    }
    ```

*   **`server.js`**: Implements the gRPC server logic.
    ```javascript
    const grpc = require('@grpc/grpc-js');
    const protoLoader = require('@grpc/proto-loader');
    const path = require('path');

    const PROTO_PATH = path.join(__dirname, 'hello.proto');
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
    const helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

    function sayHello(call, callback) {
      const { name } = call.request;
      const reply = { message: 'Bonjour, ' + name + '!' };
      callback(null, reply);
    }

    function main() {
      const server = new grpc.Server();
      server.addService(helloProto.Greeter.service, { SayHello: sayHello });
      const port = '0.0.0.0:50051';
      server.bindAsync(port, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Serveur gRPC démarré sur ${port}`); // Corrected template literal
      });
    }

    main();
    ```

## Running the Server

1.  Navigate to the `tp4/grpc-tp` directory in your terminal.
2.  Start the gRPC server:
    ```bash
    node server.js
    ```
    You should see the output: `Serveur gRPC démarré sur 0.0.0.0:50051`

## Testing with Postman

1.  Open Postman.
2.  Create a new request (New -> gRPC Request).
3.  **Enter Server URL**: `localhost:50051`
4.  **Import .proto file**:
    *   You can either upload the `hello.proto` file or, if Postman supports it, use server reflection (though our current server doesn't explicitly enable reflection). For file import, locate and select the `hello.proto` file from your `tp4/grpc-tp` directory.
5.  **Select Service and Method**:
    *   Service: `Greeter`
    *   Method: `SayHello`
6.  **Compose Message (JSON)**:
    Enter the following JSON in the message body:
    ```json
    {
        "name": "TestUser"
    }
    ```
7.  Click **Invoke**. You should receive a response similar to:
    ```json
    {
        "message": "Bonjour, TestUser!"
    }
    ``` 