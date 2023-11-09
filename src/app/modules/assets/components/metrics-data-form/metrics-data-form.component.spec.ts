import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MetricsDataFormComponent } from './metrics-data-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MetricsDataService } from './metrics-data.service';
import { ProcessService } from 'src/app/modules/governance/services/process.service';
import { MetricsService } from 'src/app/modules/governance/services/metrics.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';



fdescribe('MetricsDataFormComponent', () => {
  let component: MetricsDataFormComponent;
  let fixture: ComponentFixture<MetricsDataFormComponent>;
  let confirmationService: ConfirmationService;
  let messageService: MessageService;
  let metricsDataService: MetricsDataService;
  let processService: ProcessService;
  let metricsService: MetricsService;
  let cdr: ChangeDetectorRef;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetricsDataFormComponent],
      providers: [ConfirmationService, MessageService, MetricsDataService, ProcessService, MetricsService,{ provide: ComponentFixtureAutoDetect, useValue: true }, ],
      imports: [HttpClientTestingModule],
      
    });

    fixture = TestBed.createComponent(MetricsDataFormComponent);
    component = fixture.componentInstance;
    confirmationService = TestBed.inject(ConfirmationService);
    messageService = TestBed.inject(MessageService);
    metricsDataService = TestBed.inject(MetricsDataService);
    processService = TestBed.inject(ProcessService);
    metricsService = TestBed.inject(MetricsService);
    cdr = fixture.debugElement.injector.get(ChangeDetectorRef);

    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call getFunctionList and populate functionList', () => {
    spyOn(component, 'getFunctionList').and.callThrough();
    component.ngOnInit();
    expect(component.functionList).toBeDefined();
    // You can add more expectations based on your actual implementation.
  });
  
  xit('should display a confirmation dialog', fakeAsync(() => {
    const confirmSpy = spyOn(confirmationService, 'confirm').and.callFake((params) => {
      return params.accept(); // Simulate user accepting the confirmation dialog
    });
  
    // Trigger the component behavior that leads to the confirm method call.
    component.someMethodThatShouldTriggerConfirmation();
  
    // Use tick to handle asynchronous operations.
    tick();
  
    expect(confirmSpy).toHaveBeenCalled();
    // Add expectations for the behavior after the confirmation.
  }));
 
  it('should set selectPopup and update properties for non-empty name', () => {
    // Arrange
    const option = ['Option1', 'Option2'];
    const name = 'SampleName';
    const selectedOption = 'SelectedOption';
    const label = 'SampleLabel';

    // Act
    component.selctionPopup(option, name, selectedOption, label);
    cdr.detectChanges(); // Trigger change detection

    // Assert
    expect(component.selectPopup).toBe(true);
    expect(component.options).toEqual(option);
    expect(component.popupHeader).toBe(name);
    expect(component.label).toBe(label);
  });

  it('should set selectPopup and update properties for an empty name', () => {
    // Arrange
    const option = ['Option1', 'Option2'];
    const name = '';
    const selectedOption = 'SelectedOption';
    const label = 'SampleLabel';

    // Act
    component.selctionPopup(option, name, selectedOption, label);
    cdr.detectChanges(); // Trigger change detection

    // Assert
    expect(component.selectPopup).toBe(true);
    expect(component.options).toEqual(option);
    expect(component.popupHeader).toBe(name);
    expect(component.label).toBe(label);
  });
  
  it('should save values when the popupHeader is "function"', () => {
    // Arrange
    component.popupHeader = 'function';
    const e = { value: 'someValue' };

    // Act
    component.saveValues(e);

    // Assert
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
    // Add more assertions as needed to check the behavior of your method.
  });

  it('should save values when the popupHeader is "Process"', () => {
    // Arrange
    component.popupHeader = 'Process';
    const e = { value: 'someValue' };

    // Act
    component.saveValues(e);

    // Assert
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
    // Add more assertions as needed to check the behavior of your method.
  });
  it('should fetch reporting trend list on initialization', () => {
    const reportingTrendList = [{ name: 'Trend 1' }, { name: 'Trend 2' }]; // Replace this with sample data
    spyOn(metricsDataService, 'getReportingTrendList').and.returnValue(of(reportingTrendList));

    component.ngOnInit();

    expect(metricsDataService.getReportingTrendList).toHaveBeenCalled();
    expect(component.reportingTrendList).toEqual(reportingTrendList);
  });
  it('should fetch reporting frequencies', () => {
    const reportingFrequencies = [{ id: 1, name: 'Frequency 1' }, { id: 2, name: 'Frequency 2' }];
    spyOn(metricsService, 'getAllreportingfrequencys').and.returnValue(of(reportingFrequencies));

    component.getAllreportingfrequencys();

    expect(component.loader).toBe(false); // Ensure loader is set to false after the request
    expect(component.reportingfrequenciesList).toEqual(reportingFrequencies);
  });
  it('should throw an error when someMethodThatShouldTriggerConfirmation is called', () => {
    expect(() => component.someMethodThatShouldTriggerConfirmation()).toThrowError('Method not implemented.');
  });

  it('should throw an error when ItemList is called', () => {
    expect(() => component.ItemList('someData')).toThrowError('Method not implemented.');
  });
  

  it('should not confirm when conformation is false', () => {
    spyOn(confirmationService, 'confirm');

    component.confirm(<Event>{ target: null });

    expect(confirmationService.confirm).not.toHaveBeenCalled();
  });
  it('should trigger a click event on the file input element', () => {
  // Arrange
  const clickSpy = spyOn(component.fileInput.nativeElement, 'click');

  // Act
  component.openFileInput();

  // Assert
  expect(clickSpy).toHaveBeenCalled();
});

it('should update MetricsFilterData for "function"', () => {
  // Arrange
  component.popupHeader = 'function';
  component.selectPopup = true;
  const e = { value: { id: 1 } }; // Replace with your sample data

  // Act
  component.saveValues(e);

  // Assert
  expect(component.selectPopup).toBe(false);
  expect(component.popupHeader).toBe('');
  expect(component.MetricsFilterData.function).toEqual(e.value);
  expect(component.MetricsFilterData.subFunction).toBe(null);
  // Add more assertions based on your actual implementation
});

it('should update MetricsFilterData for "Process"', () => {
  // Arrange
  component.popupHeader = 'Process';
  component.selectPopup = true;
  const e = { value: { id: 2, subProcess: [] } }; // Replace with your sample data

  // Act
  component.saveValues(e);

  // Assert
  expect(component.selectPopup).toBe(false);
  expect(component.popupHeader).toBe('');
  expect(component.MetricsFilterData.process).toEqual(e.value);
  expect(component.MetricsFilterData.subProcess).toBe(null);
  // Add more assertions based on your actual implementation
});

it('should update MetricsFilterData for "subFunction"', () => {
  // Arrange
  component.popupHeader = 'subFunction';
  component.selectPopup = true;
  const e = { value: { id: 3 } }; // Replace with your sample data

  // Act
  component.saveValues(e);

  // Assert
  expect(component.selectPopup).toBe(false);
  expect(component.popupHeader).toBe('');
  expect(component.MetricsFilterData.subFunction).toEqual(e.value);
  expect(component.MetricsFilterData.process).toBe(null);
  expect(component.MetricsFilterData.subProcess).toBe(null);
  // Add more assertions based on your actual implementation
});

it('should update MetricsFilterData for "subProcess"', () => {
  // Arrange
  component.popupHeader = 'subProcess';
  component.selectPopup = true;
  const e = { value: { id: 4 } }; // Replace with your sample data

  // Act
  component.saveValues(e);

  // Assert
  expect(component.selectPopup).toBe(false);
  expect(component.popupHeader).toBe('');
  expect(component.MetricsFilterData.subProcess).toEqual(e.value);
  // Add more assertions based on your actual implementation
});
  
it('should retrieve reporting formats successfully', () => {
  // Arrange
  const mockResponse = [{ id: 1, name: 'Format 1' }]; // Replace with your sample data
  spyOn(metricsService, 'getAllreportingformats').and.returnValue(of(mockResponse));

  // Act
  component.getAllreportingformats();

  // Assert
  expect(component.loader).toBe(false);
  expect(component.reportingformatsList).toEqual(mockResponse);
});

// it('should handle an error when retrieving reporting formats', () => {
//   // Arrange
//   const errorMessage = 'An error occurred.';
//   spyOn(metricsService, 'getAllreportingformats').and.returnValue(throwError({ message: errorMessage }));
//   spyOn(messageService, 'add');

//   // Act
//   component.getAllreportingformats();

//   // Assert
//   expect(component.loader).toBe(false);
//   expect(messageService.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: errorMessage });
// });
});


  


  




  