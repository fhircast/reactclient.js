# FHIRcast Websocket Demo

React app for prototyping [FHIRcast](http://fhircast.org/) websocket client. The implementation is based on the websocket channel proposal described in [FHIRcast sandbox](https://github.com/fhircast/sandbox.js).

NOTE: Uses [React Hooks](https://reactjs.org/docs/hooks-intro.html) which is an upcoming feature, currently in React v16.8.0-alpha.1.

### Online Demo

| App           | URL                                          | Notes  |
| ------------- | -------------------------------------------- | ------ |
| Client 1      | https://fhircast.z6.web.core.windows.net/    |        |
| Client 2      | https://fhircast2.z19.web.core.windows.net/  |        |
| Hub           | https://fhircast-ws.azurewebsites.net/       | [Fork](https://github.com/akalliokoski/sandbox.js) of [fhircast/sandbox.js](https://github.com/fhircast/sandbox.js)|

##### Known issues with the online demo

* ~~**Hub:** Published event is sent also to the websocket the event was published from.~~ :white_check_mark: Fixed in [the forked sandbox.js](https://github.com/akalliokoski/sandbox.js/commit/cf88e090738ea94ff0519f48096a3f594d305ca1).
* **Hub:** Subscribed topic is ignored when published event is sent to websocket client.

###### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
