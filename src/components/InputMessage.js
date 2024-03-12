import { useState, useEffect } from 'react';
import { getCurrentMessage, setMessage } from '../utils';
import styled from '@emotion/styled';

const InputMessage = () => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const submitMessage = () => {
    setSubmitting(true);
    setMessage(inputValue, (res) => {
      setSubmitting(false);
      if (res.status === 200) {
        setCurrentMessage(inputValue);
        setInputValue('');
      }
    });
  };

  useEffect(
    () => getCurrentMessage(({ message }) => setCurrentMessage(message)),
    []
  );

  return (
    <>
      <InputWrapper>
        <input value={inputValue} onChange={onInputChange} />
        <button onClick={submitMessage} disabled={submitting}>
          Submit
        </button>
      </InputWrapper>
      {submitting && <div>Submitting</div>}
      <p>Current message:</p>
      <b>{currentMessage}</b>
      {/* <Psmall>
        This message is repeatedly displayed on the Raspberry Pi&apos;s Sense
        HAT
      </Psmall> */}
    </>
  );
};

export default InputMessage;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  input {
    width: 8em;
    margin-right: 0.5em;
  }
`;