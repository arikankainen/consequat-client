import React, { useState, useEffect } from 'react';
import { Photo } from '../../utils/types';
import EditTagsDialog from './EditTagsDialog';
import useSaveTags, { SaveTagsStatus } from '../../hooks/useSaveTags';
import {
  getUniqueValue,
  multiValue,
  uniqueList,
} from '../../utils/arrayHelpers';

export interface FormValues {
  tags: string;
  addedTags: string;
  deletedTags: string;
  tagsLocked?: boolean;
  addedTagsLocked?: boolean;
  deletedTagsLocked?: boolean;
}

const initialValues: FormValues = {
  tags: '',
  addedTags: '',
  deletedTags: '',
  tagsLocked: true,
  addedTagsLocked: true,
  deletedTagsLocked: true,
};

export interface EditTagsProps {
  open?: boolean;
  photos?: Photo[];
  handleOk?: () => void;
  handleCancel?: () => void;
}

const EditTags: React.FC<EditTagsProps> = props => {
  const [open, setOpen] = useState<boolean>(false);
  const [savedProps, setSavedProps] = useState<EditTagsProps>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [multi, setMulti] = useState(false);
  const saveTags = useSaveTags();

  useEffect(() => {
    if (props.open) {
      setSavedProps(props);
      setOpen(true);
      setSaving(false);
      setMessage('');
    } else {
      setOpen(false);
    }
  }, [props]);

  useEffect(() => {
    if (savedProps.photos && savedProps.photos.length > 1) setMulti(true);
    else setMulti(false);

    if (savedProps.photos) {
      const photos = savedProps.photos;
      const tags = uniqueList(photos.map(photo => photo.tags.join(', ')));
      initialValues.tags = getUniqueValue(tags);
      initialValues.tagsLocked = multiValue(tags);
    }
  }, [savedProps]); // eslint-disable-line

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = (values: FormValues) => {
    setSaving(true);
    if (savedProps.photos) {
      const ids = savedProps.photos.map(photo => photo.id);

      saveTags.execute({
        id: ids,
        addedTags: values.addedTags
          .split(',')
          .map(tag => tag.trim().toLowerCase()),
        deletedTags: values.deletedTags
          .split(',')
          .map(tag => tag.trim().toLowerCase()),
      });
    }
  };

  useEffect(() => {
    if (saveTags.response.status === SaveTagsStatus.ready) {
      setMessage('');
      handleCancel();
    } else if (saveTags.response.status === SaveTagsStatus.error) {
      setMessage('Error!');
      setSaving(false);
    }
  }, [saveTags.response.status]); // eslint-disable-line

  return (
    <EditTagsDialog
      open={open}
      message={message}
      saving={saving}
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      multi={multi}
    />
  );
};

export default EditTags;
