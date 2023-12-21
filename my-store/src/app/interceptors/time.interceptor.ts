import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class TimeInterceptor implements HttpInterceptor{

  constructor(){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const start = performance.now();
    return next
    .handle(request)
    .pipe(
      tap(req => {
        const time = (performance.now() - start) + 'ms';
        console.log(request.url, time);
      })
    )
  }
}
