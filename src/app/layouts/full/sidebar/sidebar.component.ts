import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[DemoMaterialModule, NgFor, NgIf, RouterModule, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
 
  public menuItems=[
    { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
    {state:'tache',type:'link',name:'Taches',icon:'gpp_good'},
    {state:'maintenance',type:'link',name:'Maintenance',icon:'handyman'},
    {state:'equipement',type:'link',name:'Equipement',icon:'checklist'},
    {state:'responsable',type:'link',name:'Responsable',icon:'people_outline'},
     /*{ state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy' },
    { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
    { state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
    { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },

   
    
    { state: 'lists', type: 'link', name: 'Lists', icon: 'view_list' },
    { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
    { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
    {
      state: 'expansion',
      type: 'link',
      name: 'Expansion Panel',
      icon: 'vertical_align_center'
    },
    { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
    { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
    {
      state: 'progress-snipper',
      type: 'link',
      name: 'Progress snipper',
      icon: 'border_horizontal'
    },
    {
      state: 'progress',
      type: 'link',
      name: 'Progress Bar',
      icon: 'blur_circular'
    },
    {
      state: 'dialog',
      type: 'link',
      name: 'Dialog',
      icon: 'assignment_turned_in'
    },
    { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
    { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
    {
      state: 'slide-toggle',
      type: 'link',
      name: 'Slide Toggle',
      icon: 'all_inclusive'
    }*/
  ];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
