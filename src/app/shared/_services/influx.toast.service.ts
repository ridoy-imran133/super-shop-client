import { Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})

export class InfluxToastaService {

  constructor(private toastrService: NbToastrService) { }

  config: NbToastrConfig;

  index = 1;
  destroyByClick = true;
  duration = 4 * 1000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.BOTTOM_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'primary';


  public showToast(type: string, title: string, body: string) {
    const config = {
      status: type as NbComponentStatus,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.index += 1;
    this.toastrService.show(body, title, config);
  }
}
