import React from 'react';
import ListHeader from '../ListHeader/ListHeader';

interface UploadListHeaderProps {
  pictureCount: number;
  selectedCount: number;
  selectedFile: File | null;
}

const UploadListHeader: React.FC<UploadListHeaderProps> = ({
  pictureCount,
  selectedCount,
  selectedFile,
}) => {
  let filenameValue = '';

  if (selectedFile !== null && selectedCount === 1) {
    filenameValue = selectedFile.name;
  } else if (selectedCount === 0) {
    filenameValue = 'No photo selected';
  } else if (selectedCount > 1) {
    filenameValue = 'Multiple photos selected';
  }

  return (
    <ListHeader
      items={[
        {
          name: 'Selected',
          value: `${selectedCount} of ${pictureCount}`,
        },
        {
          name: 'Photo',
          value: filenameValue,
        },
      ]}
    />
  );
};

export default UploadListHeader;
