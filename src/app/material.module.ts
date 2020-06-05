import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule, MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { NgModule } from '@angular/core';

const muiModules = [
  MatSidenavModule,
  MatDividerModule,
  MatCardModule,
  MatPaginatorModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatTabsModule,
  MatListModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatChipsModule,
  MatSnackBarModule,
  MatDialogModule,
  MatMenuModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [],
  imports: [muiModules],
  exports: [muiModules]
})
export class MaterialModule {
}
