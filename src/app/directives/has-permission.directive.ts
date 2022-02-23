import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  @Input('appHasPermission') role: string;

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    console.log('Directive init');

    this.authService.getUser().subscribe(_ => {
      if (this.authService.hasRole(this.role)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        console.log('Access only allowed for admin-role');
      }
      else {
        this.viewContainer.clear();
        console.log('Access granted');
      }
    });
  }

}
