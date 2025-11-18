import {
  afterNextRender,
  Component,
  effect,
  EnvironmentInjector,
  inject,
  Inject,
  runInInjectionContext,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { Bulletin } from '../../../../../core/models/bulletin.model';
import { BulletinService } from '../../../../../core/services/bulletin.service';

export interface BulletinFormData {
  mode: 'create' | 'edit';
  bulletin?: Bulletin;
}

@Component({
  selector: 'app-bulletin-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './bulletin-form.component.html',
  styleUrls: ['./bulletin-form.component.css'],
})
export class BulletinFormComponent {
  //להוציא ל OnInit
  form: FormGroup;
  mode: 'create' | 'edit';
  titleText = '';

  constructor(
    private fb: FormBuilder,
    private bulletinService: BulletinService,
    private dialogRef: MatDialogRef<BulletinFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BulletinFormData
  ) {
    const env = inject(EnvironmentInjector);

    queueMicrotask(() => {
      runInInjectionContext(env, () => {
        effect(() => {
          if (this.bulletinService.saveComplete()) {
            this.dialogRef.close({ ok: true });
            this.bulletinService.resetSaveFlag();
          }
        });
      });
    });

    this.mode = data?.mode ?? 'create';
    console.log(data);

    this.form = this.fb.group({
      Title: [
        data?.bulletin?.title ?? '',
        [Validators.required, Validators.maxLength(120)],
      ],
      Description: [
        data?.bulletin?.description ?? '',
        [Validators.required, Validators.maxLength(2000)],
      ],
      Date: [
        data?.bulletin?.date ?? new Date().toISOString(),
        Validators.required,
      ],
    });

    this.titleText =
      this.mode === 'create' ? 'יצירת מודעה חדשה' : 'עריכת מודעה';
  }

  get Title() {
    return this.form.get('Title');
  }
  get Description() {
    return this.form.get('Description');
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Bulletin = {
      id: this.data?.bulletin?.id ?? 0,
      title: this.form.value.Title,
      description: this.form.value.Description,
      date: this.form.value.Date,
    };

    if (this.mode === 'create') {
      this.bulletinService.create(payload);
    } else {
      const id = this.data.bulletin!.id;
      this.bulletinService.update(id, payload);
    }
    this.dialogRef.close({ ok: true });
  }

  cancel() {
    this.dialogRef.close({ ok: false });
  }
}
