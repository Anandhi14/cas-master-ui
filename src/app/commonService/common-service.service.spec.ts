import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonServiceService } from './common-service.service';

fdescribe('CommonServiceService', () => {
  let commonService: CommonServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonServiceService],
    });

    commonService = TestBed.inject(CommonServiceService);
  });

  it('should be created', () => {
    expect(commonService).toBeTruthy();
  });

  it('should have an initial value of showAddbutton as false', () => {
    expect(commonService.showAddbutton).toBeFalse();
  });

  it('should have an initial value of rowData as an empty object', () => {
    expect(commonService.rowData).toEqual({});
  });

  it('should emit and receive breadcrumb data', fakeAsync(() => {
    const testData = ['Home', 'Category', 'Subcategory'];
    let receivedData: any;

    commonService.breadCrumbChanged.subscribe((data) => {
      receivedData = data;
    });

    commonService.breadCrumbData(testData);

    // Use tick to simulate the passage of time
    tick();

    expect(receivedData).toEqual(testData);
  }));

  it('should update showAddbutton', () => {
    commonService.showAddbutton = true;
    expect(commonService.showAddbutton).toBeTrue();
  });

  it('should update rowData', () => {
    const data = { name: 'John', age: 30 };
    commonService.rowData = data;
    expect(commonService.rowData).toEqual(data);
  });
});
