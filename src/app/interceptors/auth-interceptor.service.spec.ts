import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // ✅ Import HttpClientModule for HttpClient
      providers: [
        AuthInterceptor, // ✅ Provide the interceptor itself
        {
          provide: HTTP_INTERCEPTORS, 
          useClass: AuthInterceptor, 
          multi: true
        } // ✅ Register as HTTP_INTERCEPTORS
      ]
    });

    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

