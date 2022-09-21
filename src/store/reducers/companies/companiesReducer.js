import {
  CHANGE_COMPANY_INFO,
  CHANGE_COMPANY_TMP_INFO,
  CHANGE_EMPLOYEE_INFO,
  CHANGE_EMPLOYEE_TMP_INFO,
  CREATE_COMPANY,
  CREATE_EMPLOYEE,
  DELETE_COMPANY,
  DELETE_EMPLOYEE,
  GET_EMPLOYEES,
  SET_COMPANY_TMP_ID,
  SET_EMPLOYEE_TMP_ID
} from "../../types";

import { companyFunctions } from './company-functions';
import { employeeFunctions } from './employee-functions';

const initialState = {
  companies: [{
    id: new Date().getTime(),
    companyName: 'Company',
    address: 'Syktyvkar',
    employees: [
      {
        id: `${new Date().getTime()}1`,
        name: 'Employee',
        surname: 'First',
        post: 'Manager'
      },
      {
        id: `${new Date().getTime()}2`,
        name: 'Employee',
        surname: 'Second',
        post: 'Teacher'
      },
    ],
  }],
  employees: {
    companyId: -1,
    employees: [],
  },
  selectedCompanyId: -1,

  tmpCompanyId: -1,
  tmpCompanyName: '',
  tmpAddress: '',

  tmpEmployeeId: -1,
  tmpEmployeeName: '',
  tmpEmployeeSurname: '',
  tmpEmployeePost: ''
};

export default function companiesReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COMPANY_INFO:
      return { ...state, companies: companyFunctions.getCompanies(state)};
    case SET_COMPANY_TMP_ID:
      return { ...state, tmpCompanyId: action.payload.tmpCompanyId};
    case CHANGE_COMPANY_TMP_INFO:
      return { ...state, tmpCompanyName: action.payload.tmpCompanyName, tmpAddress: action.payload.tmpAddress };
    case DELETE_COMPANY:
      return companyFunctions.deleteCompany(state, action.payload.id);
    case CREATE_COMPANY:
      return companyFunctions.createCompany(state, action.payload.id);
    case GET_EMPLOYEES:
      return {
        ...state,
        selectedCompanyId: action.payload.id,
        employees: { companyId: action.payload.id, employees: employeeFunctions.findEmployees(state, action.payload.id)}
      };
    case SET_EMPLOYEE_TMP_ID:
      return { ...state, tmpEmployeeId: action.payload.tmpEmployeeId };
    case CHANGE_EMPLOYEE_TMP_INFO:
      return {
        ...state,
        tmpEmployeeName: action.payload.tmpEmployeeName,
        tmpEmployeeSurname: action.payload.tmpEmployeeSurname,
        tmpEmployeePost: action.payload.tmpEmployeePost
      };
    case CHANGE_EMPLOYEE_INFO:
      return {
        ...state,
        companies: employeeFunctions.getEmployeeCompanies(state),
        employees: {
          ...state.employees,
          employees: employeeFunctions.getEmployees(state)
        }
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        companies: employeeFunctions.getEmployeeCompaniesAfterDelete(state, action.payload.companyId, action.payload.id),
        employees: {
          ...state.employees,
          employees: employeeFunctions.deleteEmployees(state, action.payload.id)
        }
      };
    case CREATE_EMPLOYEE: 
      return {
        ...state,
        companies: employeeFunctions.getEmployeeCompaniesAfterCreate(state, action.payload.id),
        employees: {
          ...state.employees,
          employees: employeeFunctions.createEmployee(state, action.payload.id)
        }
      }
    default:
      return state;
  }
}
