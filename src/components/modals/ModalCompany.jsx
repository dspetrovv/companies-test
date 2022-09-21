import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCompanyTmpInfo } from "../../store/reducers/companies/actionCreator";
import { changeModalValidation } from "../../store/reducers/modal/actionCreator";

export default function ModalCompany({ companyName = '', companyAddress = '' }) {
  let [ company, setCompany ] = useState({
    companyName,
    companyAddress,
  });
  const dispatch = useDispatch();
  let isValid = useSelector(state => state.modal.isValid);
  useEffect(() => {
    dispatch(changeCompanyTmpInfo(company.companyName, company.companyAddress));
  }, [company.companyName, company.companyAddress]);

  function inputHandler(e) {
    setCompany((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
    if (!isValid && company.companyName.trim().length && company.companyAddress.trim().length) {
      dispatch(changeModalValidation(true));
    } else if (isValid && (!company.companyName.trim().length || !company.companyAddress.trim().length)) {
      dispatch(changeModalValidation(false));
    }
  }
  return (
    <>
      <input
        type="text"
        name="companyName"
        placeholder="Название компании"
        value={ company.companyName }
        onChange={(e) => inputHandler(e)}
      />
      <input
        type="text"
        name="companyAddress"
        placeholder="Адрес компании"
        value={ company.companyAddress }
        onChange={(e) => inputHandler(e)}
      />
    </>
  );
}