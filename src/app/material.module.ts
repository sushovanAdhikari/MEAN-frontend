import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';

import {
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatTableModule,
    MatDialogModule,
    MatSelectModule

} from '@angular/material' ;


@NgModule({
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatDialogModule,
        MatSelectModule
    ],
    exports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule, 
        MatTableModule,
        MatDialogModule,
        MatSelectModule
    ],
})

export class MaterialModule {}