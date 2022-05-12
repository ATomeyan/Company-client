import {Employee} from "./employee";

export interface Records {
  id: number;
  entranceTime: string;
  exitTime: string;
  employee: Employee;
}
