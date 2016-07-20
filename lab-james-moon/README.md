# Create TCP Chat Server
This uses Node to create a basic chat server. Their information will be pushed into a client pool with a unique ID and user name. Any message sent from the client will be broadcasted to other clients connected to the server. Upon someone closing their connection, the client's information will be removed from the pool.

## Test
Clone down and then in your terminal type:
`npm install`

Start the server:
`node server`

Connect a client:
`telnet localhost 3000`

Run the test:
`mocha test/test_the_server.js`
