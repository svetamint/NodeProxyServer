import Exception from "./Exception.js";

class ValidationException extends Exception {
    constructor(code, message) {
        super(code, message);
    }
}

export default ValidationException;