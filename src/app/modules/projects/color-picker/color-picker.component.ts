import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnInit, OnChanges {
  static colors: Array<ColorModel> = [
    { value: 'steak-0', viewValue: 'Berry red', color: 'rgb(184, 37, 95)' },
    { value: 'pizza-1', viewValue: 'Red', color: 'rgb(219, 64, 53)' },
    { value: 'tacos-2', viewValue: 'Orange', color: 'rgb(255, 153, 51)' },
    { value: 'tacos-2', viewValue: 'Yellow', color: 'rgb(250, 208, 0)' },
    { value: 'tacos-2', viewValue: 'Olive Green', color: 'rgb(126, 204, 73)' },
    { value: 'tacos-2', viewValue: 'Lime Green', color: 'rgb(126, 204, 73)' },
    { value: 'tacos-2', viewValue: 'Green', color: 'rgb(41, 148, 56)' },
    { value: 'tacos-2', viewValue: 'Mint Green', color: 'rgb(106, 204, 188)' },
    { value: 'tacos-2', viewValue: 'Teal', color: 'rgb(21, 143, 173)' },
    { value: 'tacos-2', viewValue: 'Sky Blue', color: 'rgb(20, 170, 245)' },
    { value: 'tacos-2', viewValue: 'Blue', color: 'rgb(64, 115, 255)' },
    { value: 'tacos-2', viewValue: 'Light Blue', color: 'rgb(150, 195, 235)' },
    { value: 'tacos-2', viewValue: 'Grape', color: 'rgb(136, 77, 255)' },
    { value: 'tacos-2', viewValue: 'Violet', color: 'rgb(175, 56, 235)' },
    { value: 'tacos-2', viewValue: 'Lavender', color: 'rgb(235, 150, 235)' },
    { value: 'tacos-2', viewValue: 'Magenta', color: 'rgb(224, 81, 148)' },
    { value: 'tacos-2', viewValue: 'Salmon', color: 'rgb(255, 141, 133)' },
    { value: 'tacos-2', viewValue: 'Charcoal', color: 'rgb(128, 128, 128)' },
    { value: 'tacos-2', viewValue: 'Grey', color: 'rgb(184, 184, 184)' },
    { value: 'tacos-2', viewValue: 'Taupe', color: 'rgb(204, 172, 147)' },
  ];

  get colors() {
    return ColorPickerComponent.colors;
  }

  @Output() colorChecked = new EventEmitter<ColorModel>();
  @Input() isDisabled: boolean;
  @Input() valueSelected: ColorModel;
  selectedColor: ColorModel = this.colors[0];
  colorForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.colorForm = new FormGroup({
      color: new FormControl({ value: this.valueSelected, disabled: this.isDisabled }, [])
    });
    this.colorForm.patchValue({ color: this.valueSelected });
    this.selectedColor = this.valueSelected;
  }

  onCheckColor(color: ColorModel) {
    this.selectedColor = color;
    this.colorChecked.emit(color);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.colorForm) {
      this.isDisabled ? this.colorForm.controls.color.disable() : this.colorForm.controls.color.enable();
    }
  }
}
