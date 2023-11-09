import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProcessListingComponent } from './process-listing.component';
import { ProcessService } from '../../services/process.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

fdescribe('ProcessListingComponent', () => {
  let component: ProcessListingComponent;
  let fixture: ComponentFixture<ProcessListingComponent>;
  let processService: ProcessService;
  let messageService: MessageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessListingComponent],
      providers: [ProcessService, MessageService],
        imports: [HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessListingComponent);
    component = fixture.componentInstance;
    processService = TestBed.inject(ProcessService);
    messageService = TestBed.inject(MessageService);

     spyOn(messageService, 'add');
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllProcess on initialization', () => {
    const getAllProcessSpy = spyOn(processService, 'getListingProcess').and.returnValue(of([]));

    fixture.detectChanges();

    expect(getAllProcessSpy).toHaveBeenCalled();
  });

  it('should handle the response from getAllProcess', () => {
    const mockResponse = [
      {
        id: 1,
        name: 'Process 1',
      },
      {
        id: 2,
        name: 'Process 2',
      },
    ];

    spyOn(processService, 'getListingProcess').and.returnValue(of(mockResponse));

    fixture.detectChanges();

    expect(component.ProcessList).toEqual(mockResponse);
    expect(component.processListCopy).toEqual(mockResponse);
    expect(component.currentPage).toEqual(1); // Assuming default values
    expect(component.totalPages).toEqual(1); // Assuming default values
  });

  // it('should handle errors from getAllProcess', () => {
  //   spyOn(processService, 'getListingProcess').and.returnValue(throwError({ message: 'Error occurred' }));
  //   const messageServiceSpy = spyOn(messageService, 'add');

  //   fixture.detectChanges();

  //   expect(messageServiceSpy).toHaveBeenCalledWith({
  //     severity: 'error',
  //     summary: 'Error',
  //     detail: 'Error occurred',
  //   });
  // });

  it('should update pagination data', () => {
    const mockResponse = Array.from({ length: 15 }, (_, i) => ({ id: i + 1, name: `Process ${i + 1}` }));

    spyOn(processService, 'getListingProcess').and.returnValue(of(mockResponse));

    fixture.detectChanges();

    expect(component.totalPages).toEqual(2);
    expect(component.displayedProcessList.length).toEqual(component.itemsPerPage); // Assuming default value for itemsPerPage
  });

  it('should handle success response from getChildActivitiesByids', (done) => {
    const mockResponse = [
      { id: 1, name: 'Process 1', processName: 'Process 1' },
      { id: 2, name: 'Process 2', processName: 'Process 2' },
    ];
    spyOn(processService, 'getChildActivitiesByids').and.returnValue(of(mockResponse));
  
    component.getChildActivitiesByids([1, 2]).then((result) => {
      expect(result).toBeTruthy();
      expect(component.ProcessList).toEqual(mockResponse);
      expect(component.loader).toBeFalse();
      done();
    });
  });
  

  it('should handle error response from getChildActivitiesByids', async () => {
    const errorMessage = 'An error occurred';
    spyOn(processService, 'getChildActivitiesByids').and.returnValue(throwError({ message: errorMessage }));
  
    const messageServiceSpy = spyOn(component['messageService'], 'add');
  
    try {
      await component.getChildActivitiesByids([1, 2]);
      fail('Expected an error, but the function succeeded.');
    } catch (error) {
      expect(messageServiceSpy).toHaveBeenCalledWith({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
      });
      expect(error).toBeTruthy();
      expect(component.loader).toBeFalse();
    }
  });
  
  it('should set SlectedModel and showProcessMaster to true on onAddClick when parentProcessobj has length', () => {
    component.parentProcessobj = ['someValue']; // Set parentProcessobj to have length

    component.onAddClick();

    expect(component.SlectedModel).toEqual({
      ParentModel: component.currentParentProcess,
      parent: true,
    });
    expect(component.showProcessMaster).toBeTrue();
  });

  it('should set SlectedModel to null on onAddClick when parentProcessobj is empty', () => {
    component.parentProcessobj = []; // Set parentProcessobj to be empty

    component.onAddClick();

    expect(component.SlectedModel).toBeNull();
  });

  
  it('should close the popup and set SlectedModel to the clicked process on onCardClick', () => {
    const mockProcess = { id: 1, name: 'Test Process' };

    component.onCardClick(mockProcess);

    expect(component.SlectedModel).toEqual(mockProcess);
    expect(component.showProcessMaster).toBeTrue();
  });

  it('should add an item to the parentProcessobj and update the menuItems', () => {
    const mockEvent = {
      name: 'Test Event',
      subProcess: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };

    // Ensure that parentProcessobj and menuItems are initially empty
    expect(component.parentProcessobj.length).toBe(0);
    expect(component.menuItems.length).toBe(2);

    // Call the showChildItems method
    component.showChildItems(mockEvent);

    // Expect that the item was added to parentProcessobj and menuItems were updated
    expect(component.parentProcessobj).toEqual([mockEvent]);
    expect(component.menuItems.length).toBe(3);
  });

 

  it('should add an item to the parentProcessobj and update the menuItems', () => {
    const mockEvent = {
      id: 123,  // Add the id property
      name: 'Test Event',
      subProcess: [{ id: 1 }, { id: 2 }, { id: 3 }],
    };
  
    // Ensure that parentProcessobj and menuItems are initially empty
    expect(component.parentProcessobj.length).toBe(0);
    expect(component.menuItems.length).toBe(2);
  
    // Call the showChildItems method
    component.showChildItems(mockEvent);
  
    // Expect that the item was added to parentProcessobj and menuItems were updated
    expect(component.parentProcessobj).toEqual([mockEvent]);
    expect(component.menuItems.length).toBe(3);
  });

  
   
  
  it('should navigate to the next page correctly', () => {
    // Mock the initial state
    component.currentPage = 1;

    // Call the navigatePage method to go to the next page
    component.navigatePage(1);

    // Add expectations to check if the current page has been updated correctly
    expect(component.currentPage).toBe(2);
  });

  it('should navigate to the previous page correctly', () => {
    // Mock the initial state
    component.currentPage = 2;

    // Call the navigatePage method to go to the previous page
    component.navigatePage(-1);

    // Add expectations to check if the current page has been updated correctly
    expect(component.currentPage).toBe(1);
  });
  it('should call processService.getListingProcess() and update ProcessList', () => {
    // Arrange
    const mockProcessList = [
      { id: 1, name: 'Process 1' },
      { id: 2, name: 'Process 2' },
    ];
    spyOn(processService, 'getListingProcess').and.returnValue(of(mockProcessList));

    // Act
    component.getAllProcess();

    // Assert
    expect(processService.getListingProcess).toHaveBeenCalled();
    expect(component.loader).toBe(false);
    expect(component.ProcessList).toEqual(mockProcessList);
  });

  
    
});
