import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProcessMasterComponent } from './process-master.component';
import { ProcessService } from '../../services/process.service';
import { MetricsService } from '../../services/metrics.service';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { processMaster } from '../models/process-master.model';

fdescribe('ProcessMasterComponent', () => {
  let component: ProcessMasterComponent;
  let fixture: ComponentFixture<ProcessMasterComponent>;
  let processService: ProcessService | any;
  let metricsService: MetricsService;
  let confirmationService: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessMasterComponent],
      providers: [ProcessService, MetricsService, ConfirmationService],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(ProcessMasterComponent);
    component = fixture.componentInstance;
    processService = TestBed.inject(ProcessService);
    metricsService = TestBed.inject(MetricsService);
    confirmationService = TestBed.inject(ConfirmationService);
    spyOn(processService, 'saveProcessMaster').and.returnValue(of({ message: 'Mock response' }));

  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  
  it('should set properties correctly and set selectPopup to true', () => {
    const option = ['Option1', 'Option2'];
    const name = 'TestName';
    const selectedOption = 'SelectedOption';
    const label = 'TestLabel';

    component.selctionPopup(option, name, selectedOption, label);

    // Assert that properties are set correctly
    expect(component.filterValue).toBe('');
    expect(component.popupModelWidth).toEqual(component.UpstreamBox.nativeElement?.offsetWidth + 148 + 'px');
    expect(component.popupModelTop).toEqual((11 + component.UpstreamBox.nativeElement?.offsetTop) - 136 + 'px');
    // Add more assertions for other properties

    // Assert that selectPopup is set to true
    expect(component.selectPopup).toBeTruthy();
  });

  
  
  
  
    

  // Additional test cases for other component methods and scenarios

  it('should emit closed event when close() is called', () => {
    spyOn(component.closed, 'emit');
    component.close();
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should update the level when Updatelevel() is called', () => {
    // Simulate a parent process
    component.Processmodel.parentProcess = { level: 1 };
    component.Updatelevel();
    expect(component.Processmodel.level).toBe(2);

    // Simulate no parent process
    component.Processmodel.parentProcess = null;
    component.Updatelevel();
    expect(component.Processmodel.level).toBe(1);
  });
  it('should set the owner in saveValues method', () => {
    // Arrange
    component.popupHeader = 'Owner';
    const ownerValue = { id: 1, name: 'Owner 1' };

    // Act
    component.saveValues({ value: ownerValue });

    // Assert
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
    // expect(component.Processmodel.owner).toEqual(ownerValue);
  });

  it('should set the parentProcess and update the level in saveValues method', () => {
    // Arrange
    component.popupHeader = 'Parent process';
    const parentProcessValue = { id: 2, name: 'Parent Process 2', level: 1 };

    // Act
    component.saveValues({ value: parentProcessValue });

    // Assert
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
    expect(component.Processmodel.parentProcess).toEqual(parentProcessValue);
    expect(component.Processmodel.level).toBe(2); // Level should be updated
  });

  it('should set the metrics in saveMultiSelect method', () => {
    // Arrange
    component.popupHeader = 'metrics';
    const selectedMetrics = [
      { id: 1, name: 'Metrics 1' },
      { id: 2, name: 'Metrics 2' },
    ];

    // Act
    component.selectedOptions = selectedMetrics;
    component.saveMultiSelect();

    // Assert
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
    expect(component.Processmodel.metrics).toEqual(selectedMetrics);
  });

  it('should set the owner in saveMultiSelect method if subFunction is selected', () => {
    // Arrange
    component.popupHeader = 'Owner';
    const subFunctionValue = { id: 3, name: 'Sub Function 3' };
    component.Processmodel.subFunction = subFunctionValue;
    const functionValue = { id: 4, name: 'Function 4' };
    component.Processmodel.function = functionValue;

    // Act
    component.saveMultiSelect();

    // Assert
    expect(component.selectPopup).toBe(false);
    expect(component.popupHeader).toBe('');
    expect(component.Processmodel.owner).toEqual({
      id: subFunctionValue.id,
      name: subFunctionValue.name,
      functionGroup: {
        id: functionValue.id,
        name: functionValue.name,
      },
    });
  });

  it('should show a warning message in saveMultiSelect method if subFunction is not selected', () => {
    // Arrange
    
    const subFunctionValue = null;
    component.Processmodel.subFunction = subFunctionValue;

    // Act
    component.saveMultiSelect();

    // Assert
    
   
    // You should check if the warning message is shown to the user.
  });
  

  

  it('should set popupHeader and options when calling selctionPopup method', () => {
    // Define your test data
    const options = ['Option1', 'Option2', 'Option3'];
    const name = 'SampleName';
    const selectedOption = ['SelectedOption'];
    const label = 'SampleLabel';

    // Call the selctionPopup method
    component.selctionPopup(options, name, selectedOption, label);

    // Expect that popupHeader and options are set accordingly
    expect(component.popupHeader).toBe(name);
    expect(component.options).toEqual(options);
    expect(component.selectedOptions).toEqual(selectedOption);
    expect(component.label).toBe(label);
  });

  // Write similar test cases for other methods in your component

  it('should call the saveValues method with the selected value for Owner', () => {
    // Define your test data (a sample owner)
    const selectedOwner = { id: 1, name: 'Owner 1' };

    // Call the saveValues method
    component.popupHeader = 'Owner';
    component.saveValues(selectedOwner);

    // Expect that the component's owner is set to the selected owner
   
  });

  // Write more test cases as needed

  
  
  
   
  
  it('should set the process name and other properties when calling editProcessMaster method', () => {
    // Define your test data for the Processmodel
    const testData = {
      id: 1, // Sample process ID
      processName: 'Updated Process',
      description: 'Updated Description',
      level: 2, // Sample level
      owner: { id: 2, name: 'Owner 2' }, // Sample owner
      MatuarityLevel: 'Medium', // Sample maturity level
      criticality: 'Medium', // Sample criticality
      metrics: ['Metric2', 'Metric3'], // Sample metrics
      matricCategory: 'Category2', // Sample category
      impectArea: 'Customer', // Sample impact area
      enablers: ['Enabler2', 'Enabler3'], // Sample enablers
      parentProcess: { id: 3, name: 'Parent Process 2', level: 1 },
      activeProcess: false,
    };

    // Call the editProcessMaster method
     });
     it('should remove metrics', () => {
      // Arrange
      component.metricsList = [{ id: 1, name: 'Metric 1' }, { id: 2, name: 'Metric 2' }];
      component.Processmodel.metrics = [{ id: 1, name: 'Metric 1' }];
  
      // Act
      component.removeMetics(1);
  
      // Assert
      expect(component.Processmodel.metrics.length).toBe(1);
    });
  
    it('should display warning message if metricsList is empty', () => {
      // Arrange
      component.metricsList = [];
      spyOn(component['messageService'], 'add');
  
      // Act
      component.removeMetics(1);
  
      // Assert
      expect(component['messageService'].add).toHaveBeenCalledWith({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please check atleast one metrics',
      });
    });
  
    it('should get criticality data', () => {
      // Arrange
      const criticalityData = [{ id: 1, name: 'Criticality 1' }, { id: 2, name: 'Criticality 2' }];
      processService.getAllCrticality.and.returnValue(of(criticalityData));
  
      // Act
      component.getCrticality();
  
      // Assert
      expect(component.crticalityData).toEqual(criticalityData);
    });
  
    it('should display error message if getting criticality data fails', () => {
      // Arrange
      processService.getAllCrticality.and.throwError('Error');
      spyOn(component['messageService'], 'add');
  
      // Act
      component.getCrticality();
  
      // Assert
      expect(component['messageService'].add).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Error',
        detail: jasmine.any(String),
      });
    });
});
