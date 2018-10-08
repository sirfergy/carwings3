# carwings3
A Node.js client library for the Nissan Leaf "Carwings" API.

This library makes use of version "3" of the Carwings API.

## Usage
First, install the package using npm:

    npm install carwings3 --save

Then, require the package and use it like so:

    import { Service } from "carwings3";

    const service = new Service(vin);
    const loggedIn = await service.login(username, password);
    const result = await service.activateHvac();

## Acknowledgements

This library was inspired by [Jason Horne's](https://github.com/jdhorne) [`pywings2`](https://github.com/jdhorne/pycarwings2) Carwings library for Python.

## License

MIT
