function getCompanies(state) {
  return [ ...state.companies.map(company => {
    const changingCompany = company.id === state.tmpCompanyId ? company : undefined;
    if (changingCompany) {
      return {
        ...changingCompany,
        companyName: state.tmpCompanyName,
        address: state.tmpAddress
      };
    }
    return company;
  })];
}

function deleteCompany(state, id) {
  const companies = [];
  for (let i = 0; i < state.companies.length; i++) {
    if (state.companies[i].id === id) {
      continue;
    }
    companies.push(state.companies[i]);
  }
  if (state.employees.companyId === id) {
    return { ...state, companies, employees: { companyId: -1, employees: [] } };
  }
  return { ...state, companies };
}

function createCompany(state, id) {
  return {
    ...state,
    companies: [
      ...state.companies,
      {
        id,
        companyName: state.tmpCompanyName,
        address: state.tmpAddress,
        employees: []
      }
    ]
  };
}

export const companyFunctions = {
  getCompanies,
  deleteCompany,
  createCompany,
};