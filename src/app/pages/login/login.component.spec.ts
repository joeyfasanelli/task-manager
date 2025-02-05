import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms'; // Import required module
import { RouterTestingModule } from '@angular/router/testing'; // Mock Router
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent], // Declare the component
      imports: [ReactiveFormsModule, RouterTestingModule], // Required modules
      providers: [{ provide: AuthService, useValue: authServiceMock }] // Mock AuthService
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService login on form submit', () => {
    authServiceMock.login.and.returnValue(of({ token: 'mockToken' })); // Mock expected response

    component.loginForm.setValue({ email: 'test@example.com', password: 'password' });
    component.login();
    
    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should show an error message on failed login', () => {
    authServiceMock.login.and.returnValue(throwError(() => new Error('Invalid credentials')));
    
    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword' });
    component.login();
    
    expect(component.errorMessage).toBe('Invalid credentials. Please try again.');
  });
});
