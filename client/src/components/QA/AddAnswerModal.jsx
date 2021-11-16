import React, { useContext, useState } from 'react';
import Modal from '../Shared/Modal.jsx';
import { QAContext } from './QAContext.jsx';
import Input from './Input.jsx';
import { postAnswer } from '../../request.js';
import { InputContainer } from '../styles/QA/AddAnswerModal.styled';

const AddAnswerModal = (props) => {
  const { toggleModal, triggerReload} = useContext(QAContext);
  const [formData, setFormData] = useState({
    body: '',
    name: '',
    email: '',
    photos: []
  });

  const handleChange = e => {
    let newData = { ...formData };
    newData[e.target.name] = e.target.value;
    setFormData(newData);
  };

  const handleSubmit = e => {
    postAnswer(props.question_id, formData)
      .then(response => triggerReload())
      .catch(err => console.error('There was an error >>>', err));
  };

  /**
   * Name key/attribute must match the state keyname corresponding to the respective input element
   * e.g. state object has key named 'photos' then input name attribute must be 'photos'
   *
   * @type {Array<Object>}
   */
  const inputs = [
    {
      label: 'Answer',
      htmlFor: 'answer-input',
      id: 'answer-input',
      type: 'text',
      name: 'body',
      placeholder: 'Enter your answer...',
    },
    {
      label: 'Username',
      htmlFor: 'username-input',
      id: 'username-input',
      type: 'text',
      name: 'name',
      placeholder: 'Enter your username...',
    },
    {
      label: 'Email',
      htmlFor: 'email-input',
      id: 'email-input',
      type: 'email',
      name: 'email',
      placeholder: 'john@smith.com',
    },
    {
      label: 'Photos',
      htmlFor: 'photos-input',
      id: 'photos-input',
      type: 'text',
      name: 'photos',
      placeholder: 'enter some photos'
    }
  ];

  return (
    <Modal toggleModal={() => toggleModal('showAnswerModal')} headerText={"Write your answer:"} handleSubmit={handleSubmit}>
        {inputs.map(({ label, htmlFor, id, type, name, placeholder }) => (
          <Input
            key={id}
            handleChange={handleChange}
            inputValue={formData[name]}
            label={label}
            htmlFor={htmlFor}
            id={id}
            type={type}
            name={name}
            placeholder={placeholder}
          />
        ))}
    </Modal>
  );
};

export default AddAnswerModal;
