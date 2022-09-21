import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEmployeeTmpInfo } from "../../store/reducers/companies/actionCreator";
import { changeModalValidation } from "../../store/reducers/modal/actionCreator";

export default function ModalEmployee({ employeeName = '', employeeSurname = '', employeePost = '' }) {
  let [ employee, setEmployee ] = useState({
    employeeName,
    employeeSurname,
    employeePost,
  });
  const dispatch = useDispatch();
  let isValid = useSelector(state => state.modal.isValid);
  useEffect(() => {
    dispatch(changeEmployeeTmpInfo(employee.employeeName, employee.employeeSurname, employee.employeePost));
  }, [employee.employeeName, employee.employeeSurname,  employee.employeePost]);

  function inputHandler(e) {
    setEmployee((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
    if (!isValid && employee.employeeName.trim().length && employee.employeeSurname.trim().length && employee.employeePost) {
      dispatch(changeModalValidation(true));
    } else if (isValid && (!employee.employeeName.trim().length || !employee.employeeSurname.trim().length || !employee.employeePost.trim().length)) {
      dispatch(changeModalValidation(false));
    }
  }
  return (
    <>
      <input
        type="text"
        name="employeeName"
        placeholder="Имя"
        value={ employee.employeeName }
        onChange={(e) => inputHandler(e)} style={{ padding: '3px 0 0' }}
      />
      <input
        type="text"
        name="employeeSurname"
        placeholder="Фамилия"
        value={ employee.employeeSurname }
        onChange={(e) => inputHandler(e)} style={{ padding: '3px 0 0' }}
      />
      <input
        type="text"
        name="employeePost"
        placeholder="Пост"
        value={ employee.employeePost }
        onChange={(e) => inputHandler(e)} style={{ padding: '3px 0 0' }}
      />
    </>
  );
}