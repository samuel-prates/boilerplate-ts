import { StatusCodes } from "http-status-codes";

export class CommandResponse {
    constructor(private _status: StatusCodes, private _body: any){}

    get status(){
        return this._status;
    }

    get body() {
        return this._body;
    }
}