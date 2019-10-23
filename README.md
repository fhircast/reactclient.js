# reactclient.js

[FHIRcast](http://fhircast.org/) WebSocket client prototype in React.

The implementation is based on the WebSocket channel proposal described in [FHIRcast sandbox](https://github.com/fhircast/sandbox.js).

:sparkles: **A new version of the client is currently being developed in [develop branch](https://github.com/fhircast/reactclient.js/tree/develop): refactored code, support for [.Net FHIRcast WebSocket specification](https://github.com/fhircast/.net), and a new UI.** :sparkles:

![Screen Capture Demo](https://github.com/akalliokoski/fhircast-websocket-demo/blob/master/doc/fhircast-websocket-demo-min.gif)

## Get started

##### Install yarn
[yarn](https://yarnpkg.com/lang/en/) is a fast, reliable, and secure dependency management tool. [Installation instructions](https://yarnpkg.com/en/docs/install#mac-stable) for  your particular platform can be found [in the official documentation](https://yarnpkg.com/en/docs/install#mac-stable).

##### Running on localhost:3000
```
git clone https://github.com/fhircast/reactclient.js.git
yarn install
yarn start
```

##### Running two clients on different ports
```
PORT=3006 yarn start
PORT=3007 yarn start
```

###### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
