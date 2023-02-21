import { Injectable } from '@angular/core';
import { UserService } from '../../easy/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  constructor(private _UserService: UserService) { }

  onDownload(fileLocation): void {
    this._UserService.commonGet('Task/filetobase?fileLocation=' + fileLocation)
      .subscribe(
        response => {
          var val = JSON.stringify(response);
          //btVal = JSON.parse(JSON.stringify(response));
          this.downloadFile(fileLocation, response);
          //this.source.update(element, {FieldToUpdate: "NewValue"} );
          
        },
        error => {
          // this._influxToastaService.showToast('danger', 'Response', error.message);
        },
        () => {
        },
      );
  }


  public downloadFile(fileNamewithExtension, byteArray) {
    var arByffer = this.base64ToArrayBuffer(byteArray);
    var FilTypeToSave = this.getFileType(fileNamewithExtension);
    this.saveByteArray(fileNamewithExtension, arByffer, FilTypeToSave);

  }

  private base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }

  private getFileType(file) {
    let fileName = file;
    let checkFileType = fileName.split('.').pop();
    var fileType;
    
    if (checkFileType == "txt" || checkFileType == "TXT" ) {
      fileType = "text/plain";
    }
    else if (checkFileType == "pdf" || checkFileType == "PDF") {
      fileType = "application/pdf";
    }
    else if (checkFileType == "doc" || checkFileType == "DOC") {
      fileType = "application/vnd.ms-word";
    }
    else if (checkFileType == "docx" || checkFileType == "DOCX") {
      fileType = "application/vnd.ms-word";
    }
    else if (checkFileType == "xls" || checkFileType == "XLS" ) {
      fileType = "application/vnd.ms-excel";
    }
    else if (checkFileType == "png" || checkFileType == "PNG") {
      fileType = "image/png";
    }
    else if (checkFileType == "jpg" || checkFileType == "JPG" ) {
      fileType = "image/jpeg";
    }
    else if (checkFileType == "jpeg" || checkFileType == "JPEG") {
      fileType = "image/jpeg";
    }
    else if (checkFileType == "gif" || checkFileType == "GIF") {
      fileType = "image/gif";
    }
    else if (checkFileType == "csv" || checkFileType == "CSV") {
      fileType = "text/csv";
    }

    return fileType;
  }

  public saveByteArray(reportName, byte, fileType) {
    //var blob = new Blob([byte], { type: "application/octet-stream" });
    var blob = new Blob([byte], { type: fileType });

    console.log(blob);


    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
  };
}
