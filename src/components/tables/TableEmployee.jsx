import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEmployeeInfo, createEmployee, deleteEmployee, setEmployeeTmpId } from "../../store/reducers/companies/actionCreator";
import { changeModalVisibility } from "../../store/reducers/modal/actionCreator";
import ModalEmployee from "../modals/ModalEmployee";
import TableSelect from "./TableSelect";

function TableEmployee() {
  let employees = useSelector(state => {
    let tableEmployees = [];
    for (const emp of state.companies.employees.employees) {
      tableEmployees.push({
        id: emp.id,
        name: emp.name,
        surname: emp.surname,
        post: emp.post
      });
    }
    return tableEmployees;
  });
  const companyId = useSelector(state => state.companies.employees.companyId);
  let [ selectedEmployees, setSelectedEmployees ] = useState([]);
  const dispatch = useDispatch();
  
  const head = [
    { id: 1, fieldName: 'Имя' },
    { id: 2, fieldName: 'Фамилия' },
    { id: 3, fieldName: 'Должность' }
  ];

  function setSelectedEmployeesHandler(employees) {
    setTimeout(() => {
      setSelectedEmployees(employees);
    });
  }

  function deleteEmployeeHandler(id) {
    dispatch(deleteEmployee(id, companyId));
  }

  function deleteSelectedEmployees() {
    for (const employee of selectedEmployees) {
      dispatch(deleteEmployee(employee.id, companyId));
    }
  }

  function openEmployeeModal(employee) {
    dispatch(
      changeModalVisibility(
        true,
        <ModalEmployee
          employeeName={employee.name}
          employeeSurname={employee.surname}
          employeePost={employee.post}
        />,
        !!(employee.name && employee.surname && employee.post),
        () => {
          dispatch(changeEmployeeInfo());
          dispatch(changeModalVisibility(false));
        }
      )
    );
    dispatch(setEmployeeTmpId(employee.id));
  }

  function openCreateEmployeeModal() {
    dispatch(
      changeModalVisibility(
        true,
        <ModalEmployee />,
        false,
        () => {
          dispatch(createEmployee());
          dispatch(changeModalVisibility(false));
        }
      )
    );
  }

  return (
    <div>
      <div className="theader">
        <span className="theader__text">Сотрудники</span>
        { companyId !== -1 ? <button className="btn" onClick={() => openCreateEmployeeModal()}>Добавить</button> : null}
      </div>
    {
      companyId !== -1
        ? <TableSelect
            head={head}
            bodyData={employees}
            onEditField={openEmployeeModal}
            onSelectField={setSelectedEmployeesHandler}
            onDeleteField={deleteEmployeeHandler}
            onDeleteSelectedFields={deleteSelectedEmployees}
          />
        : null
    }
  </div>
  )
}

export default TableEmployee;