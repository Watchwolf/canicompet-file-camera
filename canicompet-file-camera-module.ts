import {NgModule} from '@angular/core';
import {CanicompetFileCameraComponent} from './canicompet-file-camera.component';
import {CommonModule} from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CanicompetFileCameraComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    CanicompetFileCameraComponent
  ]
})
export class CanicompetFileCameraModule {
}
