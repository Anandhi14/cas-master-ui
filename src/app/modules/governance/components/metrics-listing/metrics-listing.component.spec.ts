import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetricsListingComponent } from './metrics-listing.component';
import { ProcessService } from '../../services/process.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('MetricsListingComponent', () => {
  let component: MetricsListingComponent;
  let fixture: ComponentFixture<MetricsListingComponent>;
  let processService: ProcessService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetricsListingComponent],
      providers: [ProcessService],
      // Add HttpClientTestingModule to configure HttpClient for testing
      imports: [HttpClientTestingModule],
    });
  
    fixture = TestBed.createComponent(MetricsListingComponent);
    component = fixture.componentInstance;
    processService = TestBed.inject(ProcessService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  xit('should fetch metrics on initialization', () => {
    // Simulate the metrics returned by the service
    const mockMetrics = [
      { metricName: 'Metric 1' },
      { metricName: 'Metric 2' },
    ];
  
    // Stub the processService to return the mock metrics
    spyOn(processService, 'getMetrics').and.returnValue(of(mockMetrics));
  
    // Trigger the ngOnInit method
    component.ngOnInit();
  
    // Expect the metrics to be assigned to the component's metricsList
    expect(component.metricsList).toEqual(mockMetrics);
  
    // You can also assert that the component's metricsList has the correct length
    expect(component.metricsList.length).toBe(2);
  });
  

  it('should update pagination data', () => {
    component.itemsPerPage = 5;
    component.metricsList = Array(15).fill({ id: 1, metricName: 'Test Metric' });
    component.updatePaginationData();

    expect(component.totalPages).toBe(3);
    expect(component.displayedMetricsList.length).toBe(5);
  });

  it('should navigate to the next page', () => {
    component.itemsPerPage = 5;
    component.metricsList = Array(15).fill({ id: 1, metricName: 'Test Metric' });
    component.updatePaginationData();

    component.navigatePage(1);

    expect(component.currentPage).toBe(2);
    expect(component.displayedMetricsList.length).toBe(5);
  });

  it('should navigate to the previous page', () => {
    component.itemsPerPage = 5;
    component.metricsList = Array(15).fill({ id: 1, metricName: 'Test Metric' });
    component.updatePaginationData();
    component.currentPage = 2;

    component.navigatePage(-1);

    expect(component.currentPage).toBe(1);
    expect(component.displayedMetricsList.length).toBe(5);
  });

  it('should handle click events', () => {
    const mockProcess = { id: 1, name: 'Test Process' };
    component.onCardClick(mockProcess);

    expect(component.SlectedModel).toEqual(mockProcess);
    expect(component.showMetricsMaster).toBe(true);
  });

  it('should close the popup master', () => {
    component.closePopupMaster();

    expect(component.showMetricsMaster).toBe(false);
  });
});
