import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ToastrService } from './toastr.service';

fdescribe('ToastrService', () => {
  let toastrService: ToastrService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        ToastrService,
        { provide: MessageService, useValue: spy }
      ]
    });

    toastrService = TestBed.inject(ToastrService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should be created', () => {
    expect(toastrService).toBeTruthy();
  });

  it('should show success message', () => {
    const message = 'Success message';
    toastrService.showSuccess(message);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'success', summary: 'Success', detail: message });
  });

  it('should show error message', () => {
    const message = 'Error message';
    toastrService.showError(message);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: message });
  });
});
