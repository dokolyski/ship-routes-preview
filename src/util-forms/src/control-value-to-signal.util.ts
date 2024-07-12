import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { startWith } from 'rxjs';

export function controlValueToSignal(control: AbstractControl) {
  return toSignal(control.valueChanges.pipe(startWith(control.value)));
}
