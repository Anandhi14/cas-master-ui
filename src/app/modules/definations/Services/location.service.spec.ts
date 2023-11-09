import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from './location.service';
import { environment } from 'src/environments/environment';

fdescribe('LocationService', () => {
  let locationService: LocationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService],
    });

    locationService = TestBed.inject(LocationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(locationService).toBeTruthy();
  });

  it('should retrieve all platform types', () => {
    const expectedData = ['PlatformType1', 'PlatformType2'];

    locationService.getAllPlatformTypes().subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/platform-types`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedData);
  });

  it('should retrieve all location types', () => {
    const expectedData = ['LocationType1', 'LocationType2'];

    locationService.getAllLocationTypes().subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/location-types`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedData);
  });

  it('should retrieve all countries', () => {
    const expectedData = ['Country1', 'Country2'];

    locationService.getAllCountry().subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/countries`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedData);
  });

  it('should retrieve cities by country ID', () => {
    const countryId = 123;
    const expectedData = ['City1', 'City2'];

    locationService.getAllCities(countryId).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/cities/by-country/${countryId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedData);
  });

  it('should save a location', () => {
    const payload = { name: 'Location1' };

    locationService.SaveLocation(payload).subscribe(data => {
      expect(data).toEqual(payload);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations`);
    expect(req.request.method).toEqual('POST');

    req.flush(payload);
  });

  it('should handle errors when saving a location', () => {
    const payload = { name: 'Location1' };

    locationService.SaveLocation(payload).subscribe(
      data => {
        fail('Should have encountered an error');
      },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations`);
    expect(req.request.method).toEqual('POST');

    req.error(new ErrorEvent('network error'));
  });

  it('should edit a location', () => {
    const locationId = 1;
    const payload = { name: 'Location1' };

    locationService.editLocation(locationId, payload).subscribe(data => {
      expect(data).toEqual(payload);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations/${locationId}`);
    expect(req.request.method).toEqual('PUT');

    req.flush(payload);
  });

  it('should handle errors when editing a location', () => {
    const locationId = 1;
    const payload = { name: 'Location1' };

    locationService.editLocation(locationId, payload).subscribe(
      data => {
        fail('Should have encountered an error');
      },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations/${locationId}`);
    expect(req.request.method).toEqual('PUT');

    req.error(new ErrorEvent('network error'));
  });

  it('should get a location by ID', () => {
    const locationId = 1;
    const expectedData = { id: locationId, name: 'Location1' };

    locationService.getlocationById(locationId).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations/${locationId}`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedData);
  });

  it('should handle errors when getting a location by ID', () => {
    const locationId = 1;

    locationService.getlocationById(locationId).subscribe(
      data => {
        fail('Should have encountered an error');
      },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations/${locationId}`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('network error'));
  });

  it('should delete a location', () => {
    const locationId = 1;

    locationService.deleteLoction(locationId).subscribe(data => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations/${locationId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({});
  });

  it('should handle errors when deleting a location', () => {
    const locationId = 1;

    locationService.deleteLoction(locationId).subscribe(
      data => {
        fail('Should have encountered an error');
      },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations/${locationId}`);
    expect(req.request.method).toEqual('DELETE');

    req.error(new ErrorEvent('network error'));
  });

  it('should retrieve all locations', () => {
    const expectedData = ['Location1', 'Location2'];

    locationService.getAllLocations().subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedData);
  });

  it('should handle errors when retrieving all locations', () => {
    locationService.getAllLocations().subscribe(
      data => {
        fail('Should have encountered an error');
      },
      error => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/locations`);
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('network error'));
  });

  // Add more test cases for edge cases and additional scenarios

});
