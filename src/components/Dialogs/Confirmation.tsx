import React, { useState, useEffect } from 'react';
import ConfirmationDialog from './ConfirmationDialog';

export interface ConfirmationProps {
  open?: boolean;
  topic?: string;
  text?: string;
  text2?: string;
  progress?: number;
  progress2?: number;
  disableOk?: boolean;
  disableCancel?: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<ConfirmationProps>({});

  useEffect(() => {
    if (props.open) {
      setSavedProps(props);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props]);

  return (
    <ConfirmationDialog
      open={open}
      topic={savedProps.topic}
      text={savedProps.text}
      text2={savedProps.text2}
      progress={savedProps.progress}
      progress2={savedProps.progress2}
      disableOk={savedProps.disableOk}
      disableCancel={savedProps.disableCancel}
      handleOk={savedProps.handleOk}
      handleCancel={savedProps.handleCancel}
    />
  );
};

export default Confirmation;
