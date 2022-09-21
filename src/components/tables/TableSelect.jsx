import React, { useState } from "react";

function TableSelect({ head, bodyData, onEditField, onSelectField, onDeleteField, onDeleteSelectedFields }) {
  let [selectedFields, setSelectedFields] = useState([]);
  let [isAllSelected, setIsAllSelected] = useState(false);

  function selectField(field) {
    let newFields = [];
    setSelectedFields(prev => {
      const selected = prev.find(sel => sel.id === field.id);
      if (selected !== undefined) {
        newFields = [ ...prev.filter(val => val.id !== selected.id) ];
        return newFields;
      }
      newFields = [ ...prev, field ];
      return newFields;
    });
    if (isAllSelected) {
      setIsAllSelected(false);
      onSelectField([]);
      return;
    }
    setTimeout(() => {
      onSelectField(newFields);
    });
  }

  function selectAllFields() {
    if (isAllSelected && selectedFields.length === bodyData.length) {
      setIsAllSelected(false)
      setSelectedFields([]);
      onSelectField([]);
      return;
    }
    for (let i = 0; i < bodyData.length; i++) {
      const selected = selectedFields.find(val => val.id === bodyData[i].id);
      if (selected === undefined) {
        setTimeout(() => {
          selectField(bodyData[i]);
        });
      }
    }
    onSelectField(bodyData);
    setIsAllSelected(true);
  }

  function editField(data) {
    onEditField(data);
  }

  function deleteField(id) {
    setSelectedFields(prev => {
      const selected = prev.find(sel => sel.id === id);
      if (selected !== undefined) {
        return [ ...prev.filter(val => val.id !== selected.id) ];
      }
      return [ ...prev ];
    });
    onDeleteField(id);
  }

  function deleteSelectedField() {
    onDeleteSelectedFields();
    setSelectedFields([]);
    setIsAllSelected(false)
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={() => selectAllFields()}
            />
          </th>
          { head.map(th => <th key={th.id}>{ th.fieldName }</th>) }
          <th className="table__icons">
            { /* Если выбрано, то добавим иконку удаления */
              selectedFields.length
                ? <img
                    className="table__icon-trash"
                    src={`../assets/icons/trash.svg`}
                    alt="Delete"
                    onClick={() => deleteSelectedField()}
                  />
                : null
            }
          </th>
        </tr>
      </thead>
      <tbody>
        { bodyData.map(data => (
          <tr className={`table__row${selectedFields.findIndex(field => field.id === data.id) !== -1 ? ' table__row_selected' : ''}`} key={data.id}>
            <td>
              <input
                type="checkbox"
                name={data.name}
                id={data.id}
                checked={selectedFields.findIndex(field => field.id === data.id) !== -1}
                onChange={() => selectField(data)}
              />
            </td>
            { Object.keys(data).map((key, index) => (key !== 'id' ? <td key={index}>{ data[key] }</td> : null)) }
            <td className="table__icons">
              <img src={`../assets/icons/pen.svg`} alt="Edit" onClick={() => editField(data)} />
              <img className="table__icon-trash" src={`../assets/icons/trash.svg`} alt="Delete" onClick={() => deleteField(data.id)} />
            </td>
          </tr>
          ))
        }
        {
          !bodyData.length
          && <tr className="table__row">
              <td className="table__empty" colSpan={head.length + 2}>
              Пусто
              </td>
            </tr>
          }
      </tbody>
    </table>
  );
}

export default TableSelect;