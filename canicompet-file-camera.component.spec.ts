import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CanicompetFileCameraComponent } from './canicompet-file-camera.component';

describe('CanicompetFileCameraComponent', () => {
  let component: CanicompetFileCameraComponent;
  let fixture: ComponentFixture<CanicompetFileCameraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CanicompetFileCameraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CanicompetFileCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
