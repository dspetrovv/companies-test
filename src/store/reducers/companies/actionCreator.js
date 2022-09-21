import { CHANGE_COMPANY_INFO, CHANGE_COMPANY_TMP_INFO, CHANGE_EMPLOYEE_INFO, CHANGE_EMPLOYEE_TMP_INFO, CREATE_COMPANY, CREATE_EMPLOYEE, DELETE_COMPANY, DELETE_EMPLOYEE, GET_EMPLOYEES, SET_COMPANY_TMP_ID, SET_EMPLOYEE_TMP_ID } from '../../types';

export function changeCompanyInfo() {
  return {
    type: CHANGE_COMPANY_INFO
  };
}

export function setCompanyTmpId(tmpCompanyId) {
  return {
    type: SET_COMPANY_TMP_ID,
    payload: {
      tmpCompanyId
    }
  };
}

export function changeCompanyTmpInfo(tmpCompanyName, tmpAddress) {
  return {
    type: CHANGE_COMPANY_TMP_INFO,
    payload: {
      tmpCompanyName,
      tmpAddress
    }
  };
}

export function deleteCompany(id) {
  return {
    type: DELETE_COMPANY,
    payload: {
      id
    }
  };
}

export function createCompany() {
  return {
    type: CREATE_COMPANY,
    payload: {
      id: new Date().getTime(),
    }
  };
}

export function getEmployees(companyId) {
  return {
    type: GET_EMPLOYEES,
    payload: {
      id: companyId
    }
  };
}

export function setEmployeeTmpId(tmpEmployeeId) {
  return {
    type: SET_EMPLOYEE_TMP_ID,
    payload: {
      tmpEmployeeId
    }
  };
}

export function changeEmployeeInfo() {
  return {
    type: CHANGE_EMPLOYEE_INFO
  };
}

export function changeEmployeeTmpInfo(tmpEmployeeName, tmpEmployeeSurname, tmpEmployeePost) {
  return {
    type: CHANGE_EMPLOYEE_TMP_INFO,
    payload: {
      tmpEmployeeName,
      tmpEmployeeSurname,
      tmpEmployeePost
    }
  };
}

export function deleteEmployee(id, companyId) {
  return {
    type: DELETE_EMPLOYEE,
    payload: {
      id,
      companyId
    }
  };
}

export function createEmployee() {
  return {
    type: CREATE_EMPLOYEE,
    payload: {
      id: `${new Date().getTime()}`,
    }
  };
}
