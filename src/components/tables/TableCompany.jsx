import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCompanyInfo, createCompany, deleteCompany, getEmployees, setCompanyTmpId } from "../../store/reducers/companies/actionCreator";
import { changeModalVisibility } from "../../store/reducers/modal/actionCreator";
import ModalCompany from "../modals/ModalCompany";
import TableSelect from "./TableSelect";

function TableCompany() {
  let companies = useSelector(state => {
    let tableCompanies = [];
    for (const comp of state.companies.companies) {
      tableCompanies.push({
        id: comp.id,
        companyName: comp.companyName,
        employees: comp.employees.length,
        address: comp.address
      });
    }
    return tableCompanies;
  });
  // let selectedCompany = useSelector(state => state.companies.employees.companyId);
  let [ selectedCompanies, setSelectedCompanies ] = useState([]);
  const dispatch = useDispatch();

  function setSelectedCompaniesHandler(companies) {
    setTimeout(() => {
      setSelectedCompanies(companies);
    });
    if (companies.length - 1 < 0) {
      dispatch(getEmployees(-1));
    } else {
      dispatch(getEmployees(companies[companies.length - 1].id));
    }
  }

  function deleteCompanyHandler(id) {
    dispatch(deleteCompany(id));
  }
  function deleteSelectedCompanies() {
    // employees object id field
    for (const company of selectedCompanies) {
      dispatch(deleteCompany(company.id));
    }
  }

  function openEditCompanyModal(company) {
    dispatch(
      changeModalVisibility(
        true,
        <ModalCompany
          companyName={company.companyName}
          companyAddress={company.address}
        />,
        !!(company.companyName && company.address),
        () => {
          dispatch(changeCompanyInfo());
          dispatch(changeModalVisibility(false));
        }
      )
    );
    dispatch(setCompanyTmpId(company.id));
  }

  function openCreateCompanyModal() {
    dispatch(
      changeModalVisibility(
        true,
        <ModalCompany />,
        false,
        () => {
          dispatch(createCompany());
          dispatch(changeModalVisibility(false));
        }
      )
    );
  }

  const head = [
    { id: 1, fieldName: 'Название' },
    { id: 2, fieldName: 'Сотрудников' },
    { id: 3, fieldName: 'Адрес' }
  ];

  return (
    <div>
      <div className="theader">
        <span className="theader__text">Компании</span>
        <button className="btn" onClick={() => openCreateCompanyModal()}>Создать</button>
      </div>
      <TableSelect
        head={head}
        bodyData={companies}
        onEditField={openEditCompanyModal}
        onSelectField={setSelectedCompaniesHandler}
        onDeleteField={deleteCompanyHandler}
        onDeleteSelectedFields={deleteSelectedCompanies}
      />
    </div>
  )
}

export default TableCompany;