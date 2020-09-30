import React, { useState, useEffect } from 'react';
import { Photo } from '../../utils/types';
import EditTagsDialog from './EditTagsDialog';
import useSaveTags, { SaveTagsStatus } from '../../hooks/useSaveTags';
import { TagType } from './Tag/Tag';

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
  const [tagFieldValue, setTagFieldValue] = useState('');
  const [sharedTags, setSharedTags] = useState<string[]>([]);
  const [uniqueTags, setUniqueTags] = useState<string[]>([]);
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const [deletedTags, setDeletedTags] = useState<string[]>([]);
  const saveTags = useSaveTags();

  useEffect(() => {
    if (props.open) {
      setUniqueTags([]);
      setSharedTags([]);
      setAddedTags([]);
      setDeletedTags([]);
      setSavedProps(props);
      setOpen(true);
      setSaving(false);
      setMessage('');
    } else {
      setOpen(false);
    }
  }, [props]);

  useEffect(() => {
    if (savedProps.photos) {
      const photos = savedProps.photos;

      const tags = Array.from(new Set(photos.map(photo => photo.tags).flat()));

      const shared = tags.filter(tag => {
        return photos.every(photo => photo.tags.includes(tag));
      });

      const unique = tags.filter(tag => {
        return !photos.every(photo => photo.tags.includes(tag));
      });

      setUniqueTags(unique);
      setSharedTags(shared);
    }
  }, [savedProps]); // eslint-disable-line

  const handleCancel = () => {
    if (savedProps.handleCancel) savedProps.handleCancel();
  };

  const handleSubmit = () => {
    setSaving(true);
    if (savedProps.photos) {
      const ids = savedProps.photos.map(photo => photo.id);

      saveTags.execute({
        id: ids,
        addedTags,
        deletedTags,
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

  const handleTagFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagFieldValue(event.target.value);
  };

  const handleAddTag = () => {
    const allTags = tagFieldValue
      .split(',')
      .map(tag => tag.trim().toLowerCase());
    const onlyUniqueTags = Array.from(new Set([...addedTags, ...allTags]));
    const onlyNewTags = onlyUniqueTags.filter(tag => !sharedTags.includes(tag));

    setAddedTags(onlyNewTags);
    setTagFieldValue('');
  };

  const handleTagFieldKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.keyCode === 13) handleAddTag();
  };

  const handleDeleteTag = (text: string, tagType: TagType) => {
    switch (tagType) {
      case TagType.added:
        setAddedTags(addedTags.filter(tag => tag !== text));
        break;

      case TagType.shared:
        setSharedTags(sharedTags.filter(tag => tag !== text));
        setDeletedTags(deletedTags.concat(text));
        break;

      case TagType.unique:
        setUniqueTags(uniqueTags.filter(tag => tag !== text));
        setDeletedTags(deletedTags.concat(text));
        break;
    }
  };

  return (
    <EditTagsDialog
      open={open}
      message={message}
      saving={saving}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleTagFieldChange={handleTagFieldChange}
      handleTagFieldKeyUp={handleTagFieldKeyUp}
      handleAddTag={handleAddTag}
      handleDeleteTag={handleDeleteTag}
      tagFieldValue={tagFieldValue}
      sharedTags={sharedTags}
      uniqueTags={uniqueTags}
      addedTags={addedTags}
    />
  );
};

export default EditTags;
