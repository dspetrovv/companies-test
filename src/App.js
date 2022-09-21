import React from "react";
import ModalWindow from "./components/ModalWindow";
import TableCompany from "./components/tables/TableCompany";
import TableEmployee from "./components/tables/TableEmployee";

function App() {
  return (
    <div>
      <ModalWindow />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1024px', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <TableCompany />
          <TableEmployee />
        </div>
      </div>
    </div>
  );
}

export default App;
