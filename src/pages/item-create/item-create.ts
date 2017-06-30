import { Component, ViewChild, ElementRef } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';

import { Camera,CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {
  @ViewChild('fileInput') fileInput;
  @ViewChild('canVas') canvas: ElementRef; ;

  isReadyToSave: boolean;

  item: any;

  form: FormGroup;

  imgs: Array<any> = [];
  imgs1: Array<any> = [];
  test : any;
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera) {
    if(localStorage.getItem('token')){
      this.form = formBuilder.group({
        img: [''],
        name: [JSON.parse(localStorage.getItem('token')).local.name],
        email: [JSON.parse(localStorage.getItem('token')).local.email],
        text: [''],
        img1: ['']
      });
    }

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  ionViewDidLoad() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96,
        quality: 1,
        mediaType: this.camera.MediaType.PICTURE
      }).then((data) => {
        this.form.patchValue({ 'img': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  myCanvas(imageData) {
    console.log(this.canvas);
      let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
      var img = new Image;
      img.onload = () => {
        console.log(img);
        context.drawImage(img,0,0,img.width,img.height,0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.test = this.canvas.nativeElement.toDataURL('image/jpg', 0.3);
        this.imgs1.push(this.test);


      }
      img.src = imageData;

  }

  processWebImage(event) {
    let files = event.target.files;
    for (let file of files){
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this.imgs.push(imageData);
        this.myCanvas(imageData);
      };

      reader.readAsDataURL(file);
    }
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['img'].value + ')'
  }

  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    if (!this.form.valid) { return; }
    this.form.patchValue({ 'img': JSON.stringify(this.imgs)});
    this.form.patchValue({ 'img1': JSON.stringify(this.imgs1)});
    console.log(this.form.value);
    this.viewCtrl.dismiss(this.form.value);
  }


}
