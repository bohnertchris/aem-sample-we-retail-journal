import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSegment, UrlMatchResult, RouteReuseStrategy } from '@angular/router';
import { MainContentComponent } from "./components/main-content/main-content.component";
import { AemPageDataResolver, AemPageRouteReuseStrategy } from "@adobe/cq-angular-editable-components";

export function AemPageMatcher(url: UrlSegment[]): UrlMatchResult {
  if (url.length) {
    return (
      {
        consumed: url,
        posParams: {
          path: url[url.length - 1]
        }
      }
    );
  }
}

const routes: Routes = [
  {
    matcher: AemPageMatcher,
    component: MainContentComponent,
    resolve: {
      path: AemPageDataResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AemPageDataResolver, {
    provide: RouteReuseStrategy,
    useClass: AemPageRouteReuseStrategy
  }]
})

export class AppRoutingModule {}
