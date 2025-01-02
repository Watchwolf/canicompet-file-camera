import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonSelect, AlertController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

// Convert a base64 string to a file object
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

@Component({
  selector: 'canicompet-file-camera',
  templateUrl: './canicompet-file-camera.component.html',
  styleUrls: ['./canicompet-file-camera.component.scss'],
  standalone: false
})
export class CanicompetFileCameraComponent implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;
  @ViewChild('selectOption') selectOption!: IonSelect;

  @Input() accept = "image/*,application/pdf";
  @Input() type = "file";
  @Output() ionChange = new EventEmitter<any>();

  isAndroidAndCameraAvailable = false
  latestInputEvent = null

  constructor(
    private translate: TranslateService,
    public alertController: AlertController) { }

  async ngOnInit() {
    //On Android we activate the camera
    if(Capacitor.getPlatform() == 'android') {
      const permissions = await Camera.requestPermissions();
      if(permissions.camera === 'denied') {
        this.isAndroidAndCameraAvailable = false;
      } else {
        this.isAndroidAndCameraAvailable = true;
      }
    }
  }

  //When the input file changes, we emit the event
  async onInputFileChange(event) {
    this.latestInputEvent = event;
    if(event.target.files[0].size / 1000 / 1000 > 20) {
      var alert = await this.alertController.create({
        header: this.translate.instant("Warning"),
        subHeader: this.translate.instant("File too large"),
        message: this.translate.instant("The file is larger than 20MB, it is too large to be selected."),
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.ionChange.emit(event);
    }
  }

  click(event) {
    //If is Android and Camera available, use our own custom drop down menu file/camera
    if(!this.isAndroidAndCameraAvailable)
      this.inputFile.nativeElement.click();
    else {
      //Else use the system input menu (ios/web)
      this.selectOption.value = undefined;
      this.selectOption.open(event);
    }

    //Set the previous input event to null to allow the user to re-select the same file
    if(this.latestInputEvent != null)
      this.latestInputEvent.target.value = null;
  }

  async selectOptionCB(event) {
    if(event.detail.value == undefined)
      return 

    if(event.detail.value == 'file') {
      this.inputFile.nativeElement.click();
    }
    else if(event.detail.value == 'camera') {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        allowEditing: false,
        source: CameraSource.Camera,
      });

      //Simulate <input> event
      const _event = { target: { files: [dataURLtoFile(image.dataUrl, 'file.' + image.format)]}}
      this.ionChange.emit(_event);
    }
  }

}
