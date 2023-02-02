/**
 * Code stolen from
 * https://medium.com/@AustinMatherne/angular-let-directive-a168d4248138
 */
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
  ngLet: T;
}

@Directive({
  selector: '[ngLet]',
})
export class LetDirective<T> {
  private context: LetContext<T> = { ngLet: null as any };

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<LetContext<T>>
  ) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  @Input()
  set ngLet(value: T) {
    this.context.ngLet = value;
  }
}
