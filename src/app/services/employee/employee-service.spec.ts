import {EmployeeService} from './employee-service';
import {TestBed} from "@angular/core/testing";

describe('EmployeeService', () => {
  it('should create an instance', () => {
    const service: EmployeeService = TestBed.get(EmployeeService);
    expect(service).toBeTruthy();
  });
});
