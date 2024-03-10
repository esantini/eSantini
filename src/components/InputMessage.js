import { useState, useEffect } from 'react';

import { getCurrentMessage, setMessage } from '../utils';
import { B, P } from '../components';

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
      <div>
        <input value={inputValue} onChange={onInputChange} />
        <button onClick={submitMessage} disabled={submitting}>
          Submit
        </button>
        {submitting && <div>Submitting</div>}
      </div>
      <P>Current message:</P>
      <B>{currentMessage}</B>
      {/* <Psmall>
        This message is repeatedly displayed on the Raspberry Pi&apos;s Sense
        HAT
      </Psmall> */}
    </>
  );
};

export default InputMessage;
