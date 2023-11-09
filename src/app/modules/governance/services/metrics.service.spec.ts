import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MetricsService } from './metrics.service';

fdescribe('MetricsService', () => {
  let service: MetricsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MetricsService],
    });

    service = TestBed.inject(MetricsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all aggregation types', () => {
    const expectedData = []; // Replace with your expected data

    service.getAllAggregationtypes().subscribe((response) => {
      expect(response).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/aggregationtypes`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should get all locations', () => {
    const expectedData = []; // Replace with your expected data

    service.getAlllocations().subscribe((response) => {
      expect(response).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/locations`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should save metrics master', () => {
    const payload = {}; // Replace with your payload
    const expectedData = {}; // Replace with your expected data

    service.saveMetricsMaster(payload).subscribe((response) => {
      expect(response).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/metrics`);
    expect(req.request.method).toBe('POST');
    req.flush(expectedData);
  });

  it('should handle errors when saving metrics master', () => {
    const payload = {}; // Replace with your payload

    service.saveMetricsMaster(payload).subscribe(
      () => {
        fail('Expected an error, but request succeeded');
      },
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/metrics`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Test error'));
  });

  it('should get metrics master by id', () => {
    const id = 1; // Replace with your specific id
    const expectedData = {}; // Replace with your expected data

    service.getMetricsMaster(id).subscribe((response) => {
      expect(response).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/metrics/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });

  it('should handle errors when getting metrics master by id', () => {
    const id = 1; // Replace with your specific id

    service.getMetricsMaster(id).subscribe(
      () => {
        fail('Expected an error, but request succeeded');
      },
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${service.apiUrl}/api/metrics/${id}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Test error'));
  });

  // Write similar test cases for the other methods in MetricsService.
});
