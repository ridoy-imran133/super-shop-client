import { Component, OnInit } from '@angular/core';
import { SlideInterface } from './ImageSlider/types/slide.interface';

@Component({
  selector: 'ngx-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  slides: SlideInterface[] = [
    {url: 'assets/images/camera1.jpg', title: 'c1'},
    {url: 'assets/images/camera2.jpg', title: 'c2'},
    {url: 'assets/images/camera3.jpg', title: 'c3'},
    {url: 'assets/images/camera4.jpg', title: 'c4'}
  ];
}
