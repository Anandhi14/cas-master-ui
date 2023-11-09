import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GovernanceService } from './governance.service';
import { environment } from 'src/environments/environment';

fdescribe('GovernanceService', () => {
  let service: GovernanceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GovernanceService],
    });
    service = TestBed.inject(GovernanceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get process count', () => {
    const mockProcessCount = 42; // Replace with your expected response
    service.getProcessCount().subscribe((data) => {
      expect(data).toBe(mockProcessCount);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/process/count`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProcessCount);
  });

  it('should get metrics count', () => {
    const mockMetricsCount = 24; // Replace with your expected response
    service.getMetricsCount().subscribe((data) => {
      expect(data).toBe(mockMetricsCount);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/metrics/count`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMetricsCount);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
