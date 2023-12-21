import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators'

export const TimeInterceptor: HttpInterceptorFn = (req, next) => {

  const start = performance.now();
  return next(req)
  .pipe(
    tap(() => {
      const time = (performance.now() - start) + 'ms'
      console.info(req.url, time);
    })
  );
};
