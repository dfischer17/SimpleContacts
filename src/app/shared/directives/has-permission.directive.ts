import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit {

  @Input('appHasPermission') requiredRole: string;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    console.log('HasPermissionDirective::ngOnInit');
    if (JSON.parse(sessionStorage.getItem('currentUser')).role === this.requiredRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainer.clear();
    }
  }
}
