import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {

  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  constructor(private dialogRef: MatDialogRef<ImageCropperComponent>) {
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  onUpload() {
    this.dialogRef.close(this.dataURLtoFile(this.croppedImage, 'file.jpeg'));
  }

  imageLoaded() {
    this.showCropper = true;
  }
}
