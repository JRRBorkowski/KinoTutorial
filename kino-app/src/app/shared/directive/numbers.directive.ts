import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: 'input[appNumbers]',
  standalone: true,
})
export class NumbersDirective {
  private el = inject(ElementRef);

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
