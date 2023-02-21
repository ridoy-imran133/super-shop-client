import { Injectable } from '@angular/core';
import { FileModel } from '../../easy/models/FileModel';
import { InfluxToastaService } from '../../shared/_services/influx.toast.service';

@Injectable({
  providedIn: 'root'
})
export class FileSaveService {

  public _fileModel: FileModel;

  constructor(private _influxToastaService: InfluxToastaService){
    this._fileModel = new FileModel();
  }
  public onFileChange(event) {

    // Any file(s) selected from the input?
    if (event.target.files && event.target.files.length > 0) {
      for (let index = 0; index < event.target.files.length; index++) {
// tslint:disable-next-line:prefer-const
        let file = event.target.files[index];

        // Don't allow file sizes over 1MB
        if (file.size < 20 * 1048576) {

          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => {
            this._fileModel.FileName = file.name;
            this._fileModel.FileType = file.type;
            this._fileModel.FileSize = file.size;
            this._fileModel.FileByte = (reader.result as string).split(',').pop();
          };
          reader.onerror = function (error) {
          };

          return this._fileModel;

        } else {
          this._influxToastaService.showToast('danger', 'Response', 'File: ' + file.name + ' is too large to upload.');
        }
      }

    }
  }

};