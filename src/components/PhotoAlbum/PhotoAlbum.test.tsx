import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import PhotoAlbum from './PhotoAlbum';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('photo albums', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      myPhotos: {
        collapsed: ['testId', 'fakeId'],
      },
    });

    store.dispatch = jest.fn();
  });

  test('works and all buttons can be clicked', () => {
    const handleUploadClick = jest.fn();
    const handleEditClick = jest.fn();
    const handleDeleteClick = jest.fn();
    const handleSelectClick = jest.fn();

    render(
      <Provider store={store}>
        <PhotoAlbum
          name="TestAlbum"
          description="This is a test description"
          id="testId"
          photoCount={1}
          uploadButtonVisible={true}
          onUploadClick={handleUploadClick}
          deleteButtonVisible={true}
          onDeleteClick={handleDeleteClick}
          editButtonVisible={true}
          onEditClick={handleEditClick}
          selectButtonVisible={true}
          onSelectClick={handleSelectClick}
        >
          <div></div>
        </PhotoAlbum>
      </Provider>
    );

    expect(screen.getByText('TestAlbum')).toBeInTheDocument();
    expect(screen.getByText('This is a test description')).toBeInTheDocument();
    expect(screen.getByText('1 photo')).toBeInTheDocument();

    const uploadButton = screen.getByText('Upload').closest('button');
    if (uploadButton) fireEvent.click(uploadButton);
    expect(uploadButton).toBeInTheDocument();
    expect(handleUploadClick).toBeCalledTimes(1);

    const editButton = screen.getByText('Edit').closest('button');
    if (editButton) fireEvent.click(editButton);
    expect(editButton).toBeInTheDocument();
    expect(handleEditClick).toBeCalledTimes(1);

    const deleteButton = screen.getByText('Delete').closest('button');
    if (deleteButton) fireEvent.click(deleteButton);
    expect(deleteButton).toBeInTheDocument();
    expect(handleDeleteClick).toBeCalledTimes(1);

    const selectButton = screen.getByText('check-circle-regular.svg').closest('button');
    if (selectButton) fireEvent.click(selectButton);
    expect(selectButton).toBeInTheDocument();
    expect(handleSelectClick).toBeCalledTimes(1);
  });

  test('is initially collapsed, can be expanded and collapsed', () => {
    render(
      <Provider store={store}>
        <PhotoAlbum name="TestAlbum" id="testId" photoCount={1}>
          <div></div>
        </PhotoAlbum>
      </Provider>
    );

    fireEvent.click(screen.getByText('chevron-down-solid_modified.svg'));
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'EXPAND_ALBUM', data: 'testId' });

    fireEvent.click(screen.getByText('chevron-up-solid_modified.svg'));
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'COLLAPSE_ALBUM', data: 'testId' });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  test('is initially expanded, can be collapsed and expanded', () => {
    render(
      <Provider store={store}>
        <PhotoAlbum name="TestAlbum" id="testId2" photoCount={1}>
          <div></div>
        </PhotoAlbum>
      </Provider>
    );

    fireEvent.click(screen.getByText('chevron-up-solid_modified.svg'));
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'COLLAPSE_ALBUM', data: 'testId2' });

    fireEvent.click(screen.getByText('chevron-down-solid_modified.svg'));
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'EXPAND_ALBUM', data: 'testId2' });

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });
});
