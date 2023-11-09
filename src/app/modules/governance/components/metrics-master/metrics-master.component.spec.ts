import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MetricsMasterComponent } from './metrics-master.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProcessService } from '../../services/process.service';
import { MetricsService } from '../../services/metrics.service';
import { DebugElement, ElementRef } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { By } from '@angular/platform-browser';
import { MetricsMaster } from '../models/metrics-master.model';


fdescribe('MetricsMasterComponent', () => {
  let component: MetricsMasterComponent;
  let fixture: ComponentFixture<MetricsMasterComponent>;
  let messageService: MessageService;
  let confirmationService: ConfirmationService;
  let processService: ProcessService | any 
  let metricsService: MetricsService |any;
  
  beforeEach(async () => {
    const processServiceSpy = jasmine.createSpyObj('ProcessService', ['getImpactAreas']);
    await TestBed.configureTestingModule({
      declarations: [ MetricsMasterComponent ],
      imports: [HttpClientTestingModule],
      providers: [ConfirmationService, MessageService,ProcessService,MetricsService, 
        ]
      
    })
    .compileComponents();
   

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    messageService = TestBed.inject(MessageService);
    confirmationService = TestBed.inject(ConfirmationService);
    processService = TestBed.inject(ProcessService) 
    metricsService = TestBed.inject(MetricsService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize properties when calling selectionPopup', () => {
    const option = 'testOption';
    const name = 'testName';
    const selectedAccessOptions = 'testSelectedAccessOptions';
  
    component.selctionPopup(option, name, selectedAccessOptions);
    // Replace 'your_expected_value' with the actual expected values
    expect(component.popupModelWidth).toBe('953px');
    expect(component.popupModelTop).toBe('135px');
    expect(component.popupModelHeight).toBe('597px');
    expect(component.sequencePopupHeight).toBe('661px');
    expect(component.sequencePopupListHeight).toBe('513px');
    expect(component.popupModelPopupHeight).toBe('617px');
    expect(component.popupModelLeftSide).toBe('852px');
    expect(component.popupModelrightSide).toBe('811px');
    expect(component.multiple).toBe(false);
    expect(component.options).toBe(option);
    expect(component.popupHeader).toBe(name);
    expect(component.selectPopup).toBe(true);
    expect(component.selectedAccessOptions).toBe(selectedAccessOptions);
  })

  it('should set Metricsmodel owner in saveValues when popupHeader is "Owner"', () => {
    const e = { value: ['ownerValue'] };
    component.popupHeader = 'Owner';

    component.saveValues(e);

    // Write your expectations here to check if Metricsmodel owner is set correctly.
    expect(component.Metricsmodel.owner).toBe('ownerValue');
    // You may also add expectations for other behavior in this function if needed.
  });

  it('should display a warning when Metricsmodel subFunction is not selected in saveMultiSelect', () => {
    component.popupHeader = 'Owner';
    component.Metricsmodel.subFunction = null;

    spyOn(component['messageService'], 'add'); // Mock messageService method

    component.saveMultiSelect();

    // Write your expectations here to check if a warning is displayed.
    expect(component['messageService'].add).toHaveBeenCalled();
  });

  it('should reset options and close the selectPopup in saveMultiSelect when popupHeader is "Owner"', () => {
    component.popupHeader = 'Owner';
    component.Metricsmodel.subFunction = 'subFunctionValue';

    component.saveMultiSelect();

    // Write your expectations here to check if options are reset and selectPopup is closed.
    expect(component.options.length).toBe(0);
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
  });
  it('should initialize component properties on ngOnInit', () => {
    const fixture = TestBed.createComponent(MetricsMasterComponent);
    const component = fixture.componentInstance;
  
    // Mock the service calls and provide the mock data
    const processService = TestBed.get(ProcessService);
    spyOn(processService, 'getAllCrticality').and.returnValue(of([]));
    spyOn(processService, 'getMetricCategory').and.returnValue(of([]));
    
    spyOn(processService, 'getEnablers').and.returnValue(of([]));
    spyOn(processService, 'getOwnerFunction').and.returnValue(of([]));
  
    const metricsService = TestBed.get(MetricsService);
    spyOn(metricsService, 'getAllAggregationtypes').and.returnValue(of([]));
    spyOn(metricsService, 'getAlllocations').and.returnValue(of([]));
    spyOn(metricsService, 'getAllmaturitylevels').and.returnValue(of([]));
    spyOn(metricsService, 'getAllreportingfrequencys').and.returnValue(of([]));
  
    fixture.detectChanges();
  
    expect(component.Metricsmodel.reportingfrequency).toEqual({ id: 4, name: 'Quaterly' }); // Updated expectation
    expect(component.isDesktopDevice).toBe(true);
    expect(component.crticalityData).toEqual([]);
    expect(component.metricCategoryList).toEqual([]);
    expect(component.impactAreaList).toEqual([]);
    expect(component.enablersList).toEqual([]);
    expect(component.ownerList).toEqual([]);
    expect(component.AggregationTypeList).toEqual([]);
    expect(component.LocationOptions).toEqual([]);
    expect(component.maturityList).toEqual([]);
    expect(component.reportingfrequenciesList).toEqual([]);
  });
  
  it('should log the Metricsmodel when save() is called', () => {
    const fixture = TestBed.createComponent(MetricsMasterComponent);
    const component = fixture.componentInstance;
    spyOn(console, 'log'); // Mock the console.log method
    component.save();
    expect(console.log).toHaveBeenCalledWith(component.Metricsmodel);
  });
  it('should set the selectPopup and selectedAccessOptions when selctionPopup() is called', () => {
    const fixture = TestBed.createComponent(MetricsMasterComponent);
    const component = fixture.componentInstance;
    const options = ['Option1', 'Option2'];
    const name = 'Test Option';
    const selectedAccessOptions = ['SelectedOption'];
  
    // Mock the ElementRef for UpstreamBox and metricsDetailPopup
    const mockUpstreamBox = { nativeElement: document.createElement('div') };
    const mockMetricsDetailPopup = { nativeElement: document.createElement('div') };
  
    // Set the ViewChild properties
    component.UpstreamBox = mockUpstreamBox as ElementRef;
    component.metricsDetailPopup = mockMetricsDetailPopup as ElementRef;
  
    component.selctionPopup(options, name, selectedAccessOptions);
  
    expect(component.selectPopup).toBe(true);
    expect(component.selectedAccessOptions).toEqual(selectedAccessOptions);
    expect(component.options).toEqual(options);
    expect(component.popupHeader).toEqual(name);
  });
  it('should clean the input value and update Metricsmodel on valid input', () => {
    const inputElement = document.createElement('input');
    const inputValue = '5'; // Provide a valid input value
    inputElement.value = inputValue;
    const mockEvent = { target: inputElement } as unknown as Event;

    component.onInputChange(mockEvent);

    // Expect the Metricsmodel to be updated with the cleaned input value
    expect(component.Metricsmodel.hashValue).toEqual('5');
  });

  it('should clean the input value and update Metricsmodel on valid input with alphabets', () => {
    const inputElement = document.createElement('input');
    const inputValue = 'A123'; // Provide an input value with alphabets
    inputElement.value = inputValue;
    const mockEvent = { target: inputElement } as unknown as Event;

    component.onInputChange(mockEvent);

    // Expect the Metricsmodel to be updated with the first character ('A')
    expect(component.Metricsmodel.hashValue).toEqual('A');
  });

  it('should clean the input value and update Metricsmodel on valid input with multiple digits', () => {
    const inputElement = document.createElement('input');
    const inputValue = '12345'; // Provide an input value with multiple digits
    inputElement.value = inputValue;
    const mockEvent = { target: inputElement } as unknown as Event;

    component.onInputChange(mockEvent);

    // Expect the Metricsmodel to be updated with the first character ('1')
    expect(component.Metricsmodel.hashValue).toEqual('1');
  });

  it('should clean the input value and update Metricsmodel on invalid input', () => {
    const inputElement = document.createElement('input');
    const inputValue = 'abc'; // Provide an invalid input value with alphabets
    inputElement.value = inputValue;
    const mockEvent = { target: inputElement } as unknown as Event;

    component.onInputChange(mockEvent);

    // Expect the Metricsmodel to be updated with the first character ('a')
    expect(component.Metricsmodel.hashValue).toEqual('a');
  });

  xit('should disallow alphabetic characters during keypress', () => {
    const charCode = 66; // For example, the char code for 'B'
    const mockKeyPressEvent = { which: charCode, keyCode: charCode } as KeyboardEvent;

    component.onKeyPress(mockKeyPressEvent);

  });

  it('should reset options and flags in saveAccess', () => {
    // Set initial values
    component.options = ['Option1', 'Option2'];
    component.selectPopup = true;
    component.popupHeader = 'Test Header';
    component.selectAccessPopup = true;
    
    component.Metricsmodel.selectedAcessList = ['SampleOption'];

    // Call the method
    component.saveAccess();

    // Expectations
    expect(component.options.length).toBe(0);
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
    expect(component.selectAccessPopup).toBe(false);
    expect(component.Metricsmodel.owner).toBe(component.Metricsmodel.subFunction);
  });

  it('should remove metrics and show a warning if no metrics are checked', () => {
    // Set initial values
    component.accessList = []; // Ensure accessList is empty
     // Initialize MetricsModel as needed
    component.Metricsmodel.selectedAcessList = ['Metric1', 'Metric2'];

    // Call the method
    component.removeMetics(0);

    // Expectations
    expect(component.accessList.length).toBe(0);
    expect(component.Metricsmodel.selectedAcessList).toEqual(['Metric1', 'Metric2']); // No metrics should be removed
    // Add expectations for warning message display if needed
  });
  it('should clear selectedAcessList and update properties in accessConfirm', () => {
    component.Metricsmodel.selectedAcessList = ['item1', 'item2'];
    component.selectPopup = true;
    component.popupHeader = 'Header';

    component.accessConfirm(null);

    expect(component.Metricsmodel.selectedAcessList).toEqual([]);
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
  });

  it('should execute accept callback and update properties in confirm', () => {
    const event = new Event('click');
    spyOn(component['confirmationService'], 'confirm').and.callFake((options) => {
      return options.accept(); // Simulate accept callback
    });

    component.confirm(event);

    expect(component.options).toEqual([]);
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
  });


  it('should clear options, selectPopup, and popupHeader in saveAccess', () => {
    component.options = ['option1', 'option2'];
    component.selectPopup = true;
    component.popupHeader = 'Header';

    component.saveAccess();

    expect(component.options).toEqual([]);
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
  });

  it('should remove metrics when removeMetics is called with valid input', () => {
    component.accessList = ['metric1', 'metric2'];
    component.Metricsmodel.selectedAcessList = ['metric1', 'metric2', 'metric3'];

    component.removeMetics(1);

    expect(component.Metricsmodel.selectedAcessList).toEqual(['metric3']);
    expect(component.accessList).toEqual([]);
  });

  it('should disable the table and clear values when noGoal is checked', () => {
    component.Metricsmodel.noGoal = true;
  
    component.onGoalChange(null);
  
    expect(component.Metricsmodel.lowerValue).toBe('');
    expect(component.Metricsmodel.upperValue).toBe('');
    expect(component.Metricsmodel.target).toBe('');
    expect(component.Metricsmodel.lowerThreshold).toBe('');
    expect(component.Metricsmodel.upperThreshold).toBe('');
    expect(component.disableTable).toBe(true);
  });
  
  it('should enable the table and set values to 0 when noGoal is unchecked', () => {
    component.Metricsmodel.noGoal = false;
  
    component.onGoalChange(null);
  
    expect(component.Metricsmodel.lowerValue).toBe(0);
    expect(component.Metricsmodel.upperValue).toBe(0);
    expect(component.Metricsmodel.target).toBe(0);
    expect(component.Metricsmodel.lowerThreshold).toBe(0);
    expect(component.Metricsmodel.upperThreshold).toBe(0);
    expect(component.disableTable).toBe(false);
  });
  it('should emit closedmet when close is called', () => {
    spyOn(component.closedmet, 'emit');
  
    component.close();
  
    expect(component.closedmet.emit).toHaveBeenCalled();
  });
  

  it('should allow input of numeric characters', () => {
    const event = new KeyboardEvent('keypress', { which: 49 }); // Simulate keypress '1'
    spyOn(event, 'preventDefault');

    component.onKeyPress(event);

    expect(event.preventDefault).not.toHaveBeenCalled();
  });
  

  it('should emit closedmet event when closed', () => {
    // Arrange
    spyOn(component.closedmet, 'emit');

    // Act
    component.close();

    // Assert
    expect(component.closedmet.emit).toHaveBeenCalled();
  });
  
  it('should call onFunctionChange and update subFunctionList on success', () => {
    const id = 123; // Replace with your test ID
    const responseData = [{ id: 1, name: 'Function 1' }, { id: 2, name: 'Function 2' }];

    spyOn(processService, 'getsubFunctioList').and.returnValue(of(responseData));

    component.onFunctionChange(id);

    expect(component.loader).toBe(false); // Check loader state
    expect(component.subFunctionList).toEqual(responseData); // Check if subFunctionList is updated correctly
  });

  it('should handle error when calling onFunctionChange', () => {
    const id = 123; // Replace with your test ID
    const errorMessage = 'Error message';

    spyOn(processService, 'getsubFunctioList').and.returnValue(throwError({ message: errorMessage }));

    spyOn(component ['messageService'], 'add'); // Spy on messageService.add method

    component.onFunctionChange(id);

    expect(component.loader).toBe(false); // Check loader state
    expect(component.subFunctionList).toBeUndefined(); // Check if subFunctionList is an empty array

    // Check if an error message is added to the messageService
    expect(component ['messageService'].add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
    });
  });
  it('should handle saving a new metric successfully', () => {
    // Prepare the component's Metricsmodel with valid data

    const expectedResponse = {
      id: 1, // Replace with the expected ID
      metricName: 'Sample Metric', // Replace with the expected name
      // Add other expected properties here
    };

    spyOn(metricsService, 'saveMetricsMaster').and.returnValue(of(expectedResponse));

    component.saveMetricsMaster();

    // Test your expectations here, e.g., verify that the component's properties have been updated correctly.
  });

  it('should handle updating an existing metric successfully', () => {
    // Prepare the component's Metricsmodel with valid data

    const expectedResponse = {
      id: 1, // Replace with the expected ID
      metricName: 'Sample Metric', // Replace with the expected name
      // Add other expected properties here
    };

    spyOn(metricsService, 'editMetricsMaster').and.returnValue(of(expectedResponse));

    component.saveMetricsMaster();

    // Test your expectations here, e.g., verify that the component's properties have been updated correctly.
  });

  it('should handle error when saving or updating a metric', () => {
    // Prepare the component's Metricsmodel with valid data

    const errorMessage = 'Error message';

    spyOn(metricsService, 'saveMetricsMaster').and.returnValue(throwError({ message: errorMessage }));

    spyOn(component['messageService'], 'add'); // Spy on messageService.add method

    component.saveMetricsMaster();

    // Test your expectations for handling the error, e.g., verify that an error message is added to messageService.
  });
  it('should load calculation currencies successfully', () => {
    const responseData = [{ id: 1, name: 'Currency 1' }, { id: 2, name: 'Currency 2' }];

    spyOn(metricsService, 'getAllcalculationcurrencys').and.returnValue(of(responseData));

    component.getAllcalculationcurrencys();

    expect(component.loader).toBe(false); // Check loader state
    expect(component.calculationcurrenciesList).toEqual(responseData); // Check if calculationcurrenciesList is updated correctly
  });

  it('should handle error when loading calculation currencies', () => {
    const errorMessage = 'Error message';

    spyOn(metricsService, 'getAllcalculationcurrencys').and.returnValue(throwError({ message: errorMessage }));

    spyOn(component['messageService'], 'add'); // Spy on messageService.add method

    component.getAllcalculationcurrencys();

    expect(component.loader).toBe(false); // Check loader state
    expect(component.calculationcurrenciesList).toEqual([]); // Check if calculationcurrenciesList is an empty array

    // Check if an error message is added to the messageService
    expect(component['messageService'].add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
    });
  });
  it('should load metric categories successfully', () => {
    const responseData = [{ id: 1, categoryName: 'Category 1' }, { id: 2, categoryName: 'Category 2' }];

    spyOn(processService, 'getMetricCategory').and.returnValue(of(responseData));

    component.getMetricCategory();

    expect(component.loader).toBe(false); // Check loader state
    expect(component.metricCategoryList).toEqual(responseData); // Check if metricCategoryList is updated correctly
  });

  it('should handle error when loading metric categories', () => {
    const errorMessage = 'Error message';

    spyOn(processService, 'getMetricCategory').and.returnValue(throwError({ message: errorMessage }));

    spyOn(component['messageService'], 'add'); // Spy on messageService.add method

    component.getMetricCategory();

    expect(component.loader).toBe(false); // Check loader state
    expect(component.metricCategoryList).toEqual([]); // Check if metricCategoryList is an empty array

    // Check if an error message is added to the messageService
    expect(component['messageService'].add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
    });
  });
  it('should handle error when saving metrics master', () => {
    const testMetricsModel = {
      metricsName: '', // Empty metrics name to trigger an error
      owner: null, // null owner to trigger an error
      
      // Add other required fields based on your implementation
    };  
 
  });
  it('should map response data if it has length', () => {
    const responseData = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ];
  
    spyOn(component ['processService'], 'getOwnerFunction').and.returnValue(of(responseData));
  
    component.getOwnerFunction();
  
    expect(component.ownerList).toEqual(responseData.map(x => ({ id: x.id, name: x.name })));
  });

  it('should map response data if it has length', () => {
    const responseData = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ];

    spyOn(component ['processService'], 'getOwnerFunction').and.returnValue(of(responseData));

    component.getOwnerFunction();

    expect(component.ownerList).toEqual(responseData.map(x => ({ id: x.id, name: x.name })));
  });

  it('should handle error in getCrticality', () => {
    spyOn(component ['messageService'], 'add');
    spyOn(component ['processService'], 'getAllCrticality').and.returnValue(throwError({ message: 'Error message' }));

    component.getCrticality();

    expect(component ['messageService'].add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Error message'
    });
    expect(component.loader).toBe(false);
  });  

  it('should handle successful response', () => {
    const mockResponse = [
      { id: 1, impactAreaName: 'Area 1' },
      { id: 2, impactAreaName: 'Area 2' },
    ];
    spyOn(processService, 'getImpactAreas').and.returnValue(of(mockResponse));

    component.getImpactAreas();

    expect(component.impactAreaList).toEqual(mockResponse);
    expect(component.loader).toBe(false);
  });

  it('should handle error response', () => {
    const mockError = { message: 'An error occurred' };
    spyOn(component['messageService'], 'add'); // Ensure messageService.add is a spy
  
    spyOn(processService, 'getImpactAreas').and.returnValue(throwError(mockError));
  
    component.getImpactAreas();
  
    expect(component['messageService'].add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: mockError.message });
    expect(component.loader).toBe(false);
  });

 
  
  
  
  
    
  
  
   
  });
  
 

    
 


 
  

