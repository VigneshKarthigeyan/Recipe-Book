import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropdownDirective } from './dropdown.directive';
import { placeHolderDirective } from './placeholder/placeholder.directive';

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        placeHolderDirective
    ],
    imports:[
        CommonModule
    ],
    exports: [
        CommonModule,
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective,
        placeHolderDirective
    ]
})

export class SharedModule {}