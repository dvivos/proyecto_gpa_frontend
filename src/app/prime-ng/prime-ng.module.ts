import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

// Módulos de PrimeNg
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FieldsetModule} from 'primeng/fieldset';
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import { RippleModule } from 'primeng/ripple';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TreeModule} from 'primeng/tree';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {DialogModule} from 'primeng/dialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import { PasswordModule } from "primeng/password";
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],exports: [
    ButtonModule,
    CardModule,
    FieldsetModule,
    MenubarModule,
    ToolbarModule,
    TableModule,
    InputTextModule,
    PanelModule,
    MenuModule,
    RippleModule,
    PanelMenuModule,
    TreeModule,
    BlockUIModule,
    ProgressSpinnerModule,
    DialogModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    ToastModule,
    DropdownModule,
    PasswordModule,
    TabViewModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimeNgModule { }
