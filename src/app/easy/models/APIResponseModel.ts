export class APIResponseModel {
    responseDateTime: string;
    responseStatus: any;
    successMsg: string;
    errMsg: string;
    requestDateTime: string;
    responseBusinessData: any;
    responseCode: number;
  
    constructor(responseDateTime: string, responseStatus: any, successMsg: string, errMsg: string, requestDateTime: string, responseBusinessData: any, responseCode: number) {
      this.responseDateTime = responseDateTime;
      this.responseStatus = responseStatus;
      this.successMsg = successMsg;
      this.errMsg = errMsg;
      this.requestDateTime = requestDateTime;
      this.responseBusinessData = responseBusinessData,
        this.responseCode = responseCode;
    }
  }
  