function getEmployeeCompaniesAfterDelete(state, companyId, employeeId) {
  return [ ...state.companies.map(company => {
    const deletingCompany = company.id === companyId ? company : undefined;
    if (deletingCompany) {
      const employees = [];
      for (let i = 0; i < deletingCompany.employees.length; i++) {
        if (deletingCompany.employees[i].id === employeeId) {
          continue;
        }
        employees.push(deletingCompany.employees[i]);
      }
      return {
        ...deletingCompany,
        employees
      };
    }
    return company;
  })];
}

function deleteEmployees(state, id) {
  return [ ...state.employees.employees.filter(employee => employee.id !== id)];
}

function getEmployeeCompaniesAfterCreate(state, employeeId) {
  return [ ...state.companies.map(company => {
    const updatingCompany = company.id === state.employees.companyId ? company : undefined;
    if (updatingCompany) {
      const newEmployee = {
        id: employeeId,
        name: state.tmpEmployeeName,
        surname: state.tmpEmployeeSurname,
        post: state.tmpEmployeePost
      };
      return {
        ...updatingCompany,
        employees: [ ...updatingCompany.employees, newEmployee ]
      };
    }
    return company;
  })];
}

function createEmployee(state, id) {
  return [
    ...state.employees.employees,
    {
      id,
      name: state.tmpEmployeeName,
      surname: state.tmpEmployeeSurname,
      post: state.tmpEmployeePost
    }
  ];
}

function getEmployees(state) {
  return [ ...state.employees.employees.map(employee => {
    const changingEmployee = employee.id === state.tmpEmployeeId ? employee : undefined;
    if (changingEmployee) {
      return {
        ...changingEmployee,
        name: state.tmpEmployeeName,
        surname: state.tmpEmployeeSurname,
        post: state.tmpEmployeePost
      };
    }
    return employee;
  })];
}

function findEmployees(state, id) {
  const company = state.companies.find(comp => comp.id === id);
  if (company) {
    return company.employees;
  }
  return [];
}

function getEmployeeCompanies(state) {
  return [ ...state.companies.map(company => {
    const changingCompany = company.id === state.employees.companyId ? company : undefined;
    if (changingCompany) {
      const employees = [];
      for (let i = 0; i < changingCompany.employees.length; i++) {
        if (changingCompany.employees[i].id === state.tmpEmployeeId) {
          employees.push({ ...changingCompany.employees[i], name: state.tmpEmployeeName, surname: state.tmpEmployeeSurname, post: state.tmpEmployeePost });
          continue;
        }
        employees.push(changingCompany.employees[i]);
      }
      return {
        ...changingCompany,
        employees
      };
    }
    return company;
  })];
}

export const employeeFunctions = {
  getEmployeeCompaniesAfterDelete,
  deleteEmployees,
  getEmployeeCompaniesAfterCreate,
  createEmployee,
  getEmployees,
  findEmployees,
  getEmployeeCompanies,
};