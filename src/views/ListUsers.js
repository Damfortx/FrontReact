import React, { useEffect, useState } from "react";
import { Table, Button, Input } from "reactstrap";
import CreateUser from "./CreateUser";
import PaginationList from "./../components/Pagination";
import axios from "./../axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import DeleteAlert from "./../components/DeleteAlert";
import { NotificationContainer ,NotificationManager} from "react-notifications";
const List = (props) => {
  const countries = ["Colombia", "Estados Unidos"];
  const select = "Seleccionar";
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState();
  const [total, setTotal] = useState(0);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [firstName, setFirtsName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [country, setCountry] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [document, setDocument] = useState("");
  const [mail, setMail] = useState("");
  const [employees, setEmployees] = useState([]);
  const [employeeSelected, setEmployeeSelected] = useState(null);
  const toggle = () => {
    setModal(!modal);
    if (modal) setEmployeeSelected(null);
    setUpdate(!update);
  };
  const toggleDelete = () => setDeleteModal(!deleteModal);

  const deleteEmployee = async () => {
    try { 
      await axios.delete("employees/" + deleteId);
      setDeleteId();
      NotificationManager.success('El empleado se ha eliminado correctamente', 'Exito');
      setUpdate(!update);
    } catch (error) {
        NotificationManager.error('Ha ocurrido un error al eliminar el empleado', 'Error');
    }
  };
  const employeeRow = (item) => (
    <tr>
      <th scope="row">1</th>
      <td>{item.lastName}</td>
      <td>{item.secondLastName}</td>
      <td>{item.firstName}</td>
      <td>{item.middleName}</td>
      <td>{item.country}</td>
      <td>{item.documentType}</td>
      <td>{item.document}</td>
      <td>{item.mail}</td>
      <td>{item.state}</td>
      <td>
        {" "}
        <Button
          className="btn-icon btn-2"
          outline
          color="danger"
          type="button"
          onClick={async () => {
            setDeleteId(item.document);
            toggleDelete();
          }}
        >
          <span className="btn-inner--icon">
            <DeleteIcon style={{ color: "#E10600" }} />
          </span>
        </Button>
      </td>
      <td>
        {" "}
        <Button
          className="btn-icon btn-2"
          color="warning"
          type="button"
          onClick={() => {
            setEmployeeSelected(item.document);
            toggle();
          }}
        >
          <span className="btn-inner--icon">
            <EditIcon />
          </span>
        </Button>
      </td>
    </tr>
  );

  useEffect(() => {
    async function getEmployees() {
      const params = {
        firstName,
        middleName,
        lastName,
        secondLastName,
        country,
        documentType,
        document,
        mail,
      };
      Object.keys(params).map((value) => {
        if (params[value].trim() === "" || params[value].trim() === select)
          delete params[value];
      });
      params.limit = 10;
      params.page = page;
      try {
        const { data } = await axios.get("employees/", { params });

        setEmployees(data.data);

        setTotal(data.total);
      } catch (error) {
        console.error(error);
      }
    }
    getEmployees();
  }, [
    update,
    firstName,
    middleName,
    lastName,
    secondLastName,
    country,
    documentType,
    document,
    mail,
    page,
  ]);

  return (
    <div className="container-fluid mt-2">
      <div className="col">
        <Button
          color="primary"
          onClick={toggle}
          className="float-sm-left mb-2"
          mb-auto
        >
          Nuevo empleado
        </Button>
      </div>

      <div className="mt-2">
        <Table striped size="sm" className="border table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>
                Primer Apellido
                <Input
                  bsSize="sm"
                  type="text"
                  id="LastName"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </th>
              <th>
                Segundo Apellido
                <Input
                  bsSize="sm"
                  type="text"
                  id="secondLastName"
                  onChange={(e) => {
                    setSecondLastName(e.target.value);
                  }}
                />
              </th>
              <th>
                Primer Nombre
                <Input
                  bsSize="sm"
                  type="text"
                  id="firstName"
                  onChange={(e) => {
                    setFirtsName(e.target.value);
                  }}
                />
              </th>
              <th>
                Otros Nombres
                <Input
                  bsSize="sm"
                  type="text"
                  id="middleName"
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                />
              </th>
              <th>
                Pais del empleo
                <Input
                  bsSize="sm"
                  type="select"
                  id="country"
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                >
                  <option>{select}</option>
                  <option>{countries[0]}</option>
                  <option>{countries[1]}</option>
                </Input>
              </th>
              <th>
                Tipo de Identificacion
                <Input
                  bsSize="sm"
                  type="select"
                  id="type"
                  onChange={(e) => {
                    setDocumentType(e.target.value);
                  }}
                >
                  <option>{select}</option>
                  <option>Cédula de Ciudadanía</option>
                  <option> Cédula de Extranjería </option>
                  <option>Pasaporte</option>
                  <option>Permiso Especial</option>
                </Input>
              </th>
              <th>
                Numero de Identificacion
                <Input
                  bsSize="sm"
                  type="text"
                  id="document"
                  onChange={(e) => {
                    setDocument(e.target.value);
                  }}
                />
              </th>
              <th>
                Correo
                <Input
                  bsSize="sm"
                  type="text"
                  id="mail"
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                />
              </th>
              <th>Estado</th>
              <th>Eliminar</th>
              <th>Editar</th>
            </tr>
          </thead>{" "}
          <tbody>{employees.map(employeeRow)}</tbody>
        </Table>
      </div>
      <div className="row justify-content-end mr-1">
        {" "}
        <PaginationList page={page} setPage={setPage} />
      </div>

      <CreateUser toggle={toggle} modal={modal} id={employeeSelected} />
      <DeleteAlert
        toggle={toggleDelete}
        modal={deleteModal}
        deleteEmployee={deleteEmployee}
      />
      <NotificationContainer />
    </div>
  );
};

export default List;
