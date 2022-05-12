import {Position} from "./position";
import {Department} from "./department";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  gender: string;
  position: Position;
  department: Department;
}
