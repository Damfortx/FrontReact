import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, } from 'reactstrap';
import {  NotificationManager } from 'react-notifications';
import axios from './../axios'
const CreateUser = ({ modal, toggle, id }) => {

    const countries = ['Colombia', 'Estados Unidos']
    const domain = '@cidenet.com.'
    const [isDocumentValid, setIsDocumentValid] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [secondLastName, setSecondLastName] = useState('')
    const [country, setCountry] = useState(countries[0])
    const [documentType, setDocumentType] = useState('Cédula de Ciudadanía')
    const [document, setDocument] = useState('')
    const [mail, setMail] = useState('')
    const [addmissionDate, setAddmissionDate] = useState('')
    const [area, setArea] = useState('Administración')
    const state = 'Activo'
    const offset = new Date().getTimezoneOffset();
    let date = new Date(new Date().getTime() - (offset * 60000)).toISOString().substr(0, 16)
    var daysLimit = new Date()
    daysLimit = new Date(daysLimit.setDate(daysLimit.getDate() - 30)).toISOString().substr(0, 10);
     
    const clearFields = () => {
        setMiddleName('')
        setFirstName('')
        setLastName('')
        setSecondLastName('')
        setCountry(countries[0])
        setDocumentType('Cédula de Ciudadanía')
        setDocument('')
        setAddmissionDate('')
        setArea('Administración')
        setMail('')
    }

    const confirm = async () => id ? updateEmployee() : createEmployee()


    async function createEmployee() {
       // await verifyDocument()

        try {
            await axios.post('/employees', {
                firstName, middleName, lastName, secondLastName, country, documentType, document
                , mail, addmissionDate, area, state, createdDate: date
            });

            NotificationManager.success('El empleado se ha registrado correctamente', 'Exito');
            toggle()
        } catch (error) {
            NotificationManager.error('Error al registrar el usuario', 'Error'); 
        }
    }
    async function updateEmployee() {
        try {
            await axios.put('/employees/' + id, {
                firstName, middleName, lastName, secondLastName, country, documentType, document
                , mail, addmissionDate, area, state, updateDate: date
            });

            NotificationManager.success('El empleado se ha modificado correctamente', 'Exito');
            toggle()
        } catch (error) {
            NotificationManager.success('Ha ocurrido un error al modificar al usuario', 'Error');
        }
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/employees/' + id);
                setAddmissionDate(data.addmissionDate)
                setFirstName(data.firstName)
                setArea(data.area)
                setCountry(data.country)
                setDocument(data.document)
                setDocumentType(data.documentType)
                setLastName(data.lastName)
                date = data.currentDate
                setMail(data.mail)
                setMiddleName(data.middleName)
                setSecondLastName(data.secondLastName)

            } catch (error) {

            }
        }
        if (id) {
            fetchUser()
        }
    }, [id])
    useEffect(() => {
        let subDomain = 'us'
        if (country === countries[0])
            subDomain = 'co'

        const getMail = async () => {
            const { data } = await axios.get('/employees/mail', { params: { firstName: firstName.toLowerCase().replace(/\s/g, ""), lastName: lastName.toLowerCase().replace(/\s/g, "") } });
            setMail(data + domain + subDomain)
        }

        if (firstName.length > 0 && lastName.length > 0)
            getMail()
    }, [firstName, lastName, country])

    const verifyDocument = async () => {
        try {
            const { data } = await axios.get('/employees/document', { params: { document, documentType } });
            if (data===true)
                NotificationManager.warning('El documento ya se encuantra registrado', 'Precaucion');
                console.log('verify');
        } catch (error) {
            console.log(error,"fmomom");

            NotificationManager.error('Ha ocurrido un error al verificar el documento del usuario', 'Error')
        }


    }


    const handleChange = e => {
        if (e.currentTarget.value.match(/^[A-Z]*$/)) {
            e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
        }
    };
    const handleChangeSpaces = e => {
        if (e.currentTarget.value.match(/^[A-Z ]*$/)) {
            e.currentTarget.value = e.currentTarget.value
        }
    };
    const handleKeyDownSpaces = e => {
        if (!e.key.match(/^[A-Z ]*$/)) {
            e.preventDefault();
        }
    };
    const handleKeyDown = e => {
        if (!e.key.match(/^[A-Z]*$/)) {
            e.preventDefault();
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} onClosed={clearFields} >
            <Form>
                <ModalHeader toggle={toggle}>Nuevo Empleado</ModalHeader>
                <ModalBody>

                    <Row>
                        <Col> <label
                            className="form-control-label"
                        >Primer nombre</label>
                            <Input
                                type="text"
                                maxLength="20"
                                onKeyPress={handleKeyDown}

                                onChange={(e) => {
                                    handleChange(e)
                                    setFirstName(e.currentTarget.value)
                                }}
                                value={firstName}
                                required
                            />

                        </Col>
                        <Col>
                            <label
                                className="form-control-label"
                            >Otros nombres</label>
                            <Input
                                type="text"
                                maxLength="50"
                                onKeyPress={handleKeyDownSpaces}
                                onChange={(e) => {
                                    handleChangeSpaces(e)
                                    setMiddleName(e.currentTarget.value)
                                }}
                                value={middleName}
                            />
                        </Col>

                    </Row>

                    <Row>
                        <Col> <label
                            className="form-control-label"
                        >Primer Apellido</label>
                            <Input
                                type="text"
                                maxLength="20"
                                style={{ textTransform: 'uppercase' }}
                                onKeyPress={handleKeyDownSpaces}
                                onChange={(e) => {
                                    handleChangeSpaces(e)
                                    setLastName(e.currentTarget.value)
                                }}
                                required
                                value={lastName}
                            />

                        </Col>
                        <Col>
                            <label
                                className="form-control-label"
                            >Segundo Apellido</label>
                            <Input
                                type="text"
                                maxLength="20"
                                onKeyPress={handleKeyDown}
                                onChange={(e) => {
                                    handleChange(e)
                                    setSecondLastName(e.currentTarget.value)
                                }}
                                value={secondLastName}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col> <label
                            className="form-control-label"
                        >Pais de empleo</label>
                            <Input
                                type="select"
                                name="country"
                                id="country"
                                onChange={(e) => setCountry(e.currentTarget.value)}
                                value={country}
                                required
                            >
                                <option>{countries[0]}</option>
                                <option>{countries[1]}</option>

                            </Input>

                        </Col>
                        <Col>
                            <label
                                className="form-control-label"
                            >Correo</label>
                            <Input
                                type="text"
                                name="mail"
                                id="mail"
                                disabled
                                value={mail}
                                required
                            />
                        </Col>

                    </Row>
                    <Row>
                        <Col> <label
                            className="form-control-label"
                        > Tipo de Identificación</label>
                            <Input
                                type="select"
                                name="documentType"
                                id="documentType"
                                onChange={(e) => setDocumentType(e.currentTarget.value)}
                                value={documentType}
                                required
                            >
                                <option>Cédula de Ciudadanía</option>
                                <option> Cédula de Extranjería </option>
                                <option>Pasaporte</option>
                                <option>Permiso Especial</option>
                            </Input>

                        </Col>
                        <Col>
                            <label
                                className="form-control-label"
                            >Número de Identificación</label>
                            <Input
                                className="form-control "
                                type="text"
                                maxLength="20"
                                onChange={(e) => setDocument(e.currentTarget.value)}
                                value={document}
                                required
                            />
                            {isDocumentValid ? console.log("valid") : console.log("no valid")}
                            {isDocumentValid ? null :
                                <div className="invalid-feedback">
                                    Documento Invalido
                                </div>}

                        </Col>

                    </Row>
                    <Row>
                        <Col> <label
                            className="form-control-label"
                        > Fecha de ingreso</label>

                            <Input
                                type="date"
                                name="date"
                                id="date"
                                min={daysLimit}
                                max={new Date().toISOString().substr(0, 10)}
                                onChange={(e) => setAddmissionDate(e.currentTarget.value)}
                                value={addmissionDate}
                                required
                            />

                        </Col>
                        <Col>
                            <label
                                className="form-control-label"
                            >Area</label>
                            <Input
                                type="select"
                                name="area"
                                id="area"
                                onChange={(e) => setArea(e.currentTarget.value)}
                                value={area}
                                required
                            ><option>Administración</option>
                                <option>Financiera</option>
                                <option>Compras</option>
                                <option>Infraestructura</option>
                                <option>Operación</option>
                                <option>Talento Humano</option>
                                <option>Servicios Varios</option>
                            </Input>
                        </Col>

                    </Row>
                    <Row>
                        <Col> <label
                            className="form-control-label"
                        >Estado</label>
                            <Input
                                type="text"
                                name="state"
                                id="state"
                                disabled
                                value={state}

                            />

                        </Col>
                        <Col>
                            <label
                                className="form-control-label"
                            >Fecha y hora de {id ? 'edicion' : 'registro'}</label>
                            <Input
                                type="datetime-local"
                                name="register"
                                id="register"
                                value={date}
                                disabled
                            />
                        </Col>

                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={confirm} type="submit">{id ? 'Editar' : 'Agregar'}</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Form>
        </Modal>
    );
}

export default CreateUser;