import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit {

  @Input('appHasPermission') requiredRole: string;

  constructor(private authService: AuthenticationService, private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) { }

  ngOnInit(): void {
    console.log('HasPermissionDirective::ngOnInit');
    if (this.authService.getCurrentUser().role === this.requiredRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
    else {
      this.viewContainer.clear();
    }
  }
}
