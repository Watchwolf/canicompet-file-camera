# README #

The component canicompet-file-camera replace the classic <input type="file">. 

The problem with the classic <input> is with Android : 

*  When you use it on ios or on the web browser, a prompt ask the user if he wish to select a file or take a photo.
*  On Android, the prompt does not exists and Android directly open the media manager to select a file.

I have written this component to add a prompt on Android. The component act like a classic <input>.

Feel free to copy it and modify it as your convenient.

I have created it in part of my projects : [https://canicompet.com](https://canicompet.com "https://canicompet.com") and [https://canigps.fr](https://canigps.fr "https://canigps.fr")

### How do I get set up? ###

1.  Clone the repository in your project
2.  Import the component in *.module.ts
```
import { CanicompetFileCameraModule } from '.../component/canicompet-file-camera/canicompet-file-camera-module';
@NgModule({
  imports: [
    ...,
    CanicompetFileCameraModule
  ],
  declarations: [...Page]
})
```

3.  Use it in place of <input type="file">
```
<canicompet-file-camera type="file" (change)="onFileChange($event)" accept="image/*" #uploadFile/>
<ion-button slot="end" (click)="uploadFile.click($event)">
   <ion-icon name="camera"></ion-icon>
   {{ 'Take photo' | translate }}
</ion-button>
```

4. Define the callback
```
onFileChange(fileChangeEvent: any) {
   var file = fileChangeEvent.target.files[0];
}
```
