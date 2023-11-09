import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationFormComponent } from './location-form.component';
import { LocationService } from '../../Services/location.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
fdescribe('LocationFormComponent', () => {
  let component: LocationFormComponent;
  let fixture: ComponentFixture<LocationFormComponent>;
  let locationService: LocationService;
  let messageService: MessageService;
  let confirmationService: ConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationFormComponent],
      providers: [LocationService, MessageService, ConfirmationService,],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(LocationFormComponent);
    component = fixture.componentInstance;
    locationService = TestBed.inject(LocationService);
    messageService = TestBed.inject(MessageService);
    confirmationService = TestBed.inject(ConfirmationService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    expect(component.fileName).toBeUndefined();
    expect(component.menuItems.length).toBe(2); // Adjust as per your menu items
    expect(component.loader).toBeFalsy();
    expect(component.locationDtails.locationName).toBeUndefined();
    expect(component.PlatformTypes).toEqual([]);
    expect(component.locationtypes).toEqual([]);
    expect(component.countryList).toEqual([]);
    expect(component.cityList).toEqual([]);
  });

  it('should call getallPlatformTypes on ngOnInit', () => {
    spyOn(component, 'getallPlatformTypes');
    component.ngOnInit();
    expect(component.getallPlatformTypes).toHaveBeenCalled();
  });

  it('should get PlatformTypes successfully', () => {
    const platformTypes = [{ name: 'Platform 1' }, { name: 'Platform 2' }];
    spyOn(locationService, 'getAllPlatformTypes').and.returnValue(of(platformTypes));
    component.getallPlatformTypes();
    expect(component.PlatformTypes).toEqual(platformTypes);
    expect(component.loader).toBeFalsy();
  });
  
  
  it('should call getallPlatformTypes, getAllLocationTypes, getAllCountry, and getAllCities on ngOnInit', () => {
    // Arrange
    const locationService = TestBed.inject(LocationService); // Replace with your actual service
    const mockModel = { item: { id: 1 } };

    spyOn(locationService, 'getAllPlatformTypes').and.returnValue(of([]));
    spyOn(locationService, 'getAllLocationTypes').and.returnValue(of([]));
    spyOn(locationService, 'getAllCountry').and.returnValue(of([]));
    spyOn(locationService, 'getAllCities').and.returnValue(of([]));
    spyOn(locationService, 'getlocationById').and.returnValue(of({}));

    // Act
    component.model = mockModel;
    component.ngOnInit();

    // Assert
    expect(locationService.getAllPlatformTypes).toHaveBeenCalled();
    expect(locationService.getAllLocationTypes).toHaveBeenCalled();
    expect(locationService.getAllCountry).toHaveBeenCalled();
    expect(locationService.getAllCities).toHaveBeenCalled();
    expect(locationService.getlocationById).toHaveBeenCalled();
    expect(component.model).toEqual(mockModel);
  });

  it('should set fileName on fileChange', () => {
    // Arrange
    const mockEvent = {
      target: {
        files: [{ name: 'test-file.txt' }],
      },
    } as any;

    // Act
    component.fileChange(mockEvent);

    // Assert
    expect(component.fileName).toEqual('test-file.txt');
  });

  
});