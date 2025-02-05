import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store token on login', () => {
    const mockResponse = { token: 'test-jwt-token' };
    service.login('test@example.com', 'password123').subscribe();

    const req = httpMock.expectOne('https://your-api.com/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(localStorage.getItem('authToken')).toBe(mockResponse.token);
  });

  it('should remove token on logout', () => {
    localStorage.setItem('authToken', 'test-jwt-token');
    service.logout();
    expect(localStorage.getItem('authToken')).toBeNull();
  });
});

