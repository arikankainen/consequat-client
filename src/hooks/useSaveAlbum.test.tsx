import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { renderHook, act } from '@testing-library/react-hooks';
import useSaveAlbum, { SaveAlbumStatus } from './useSaveAlbum';
import { EDIT_ALBUM, CREATE_ALBUM } from '../utils/queries';
import { MockedProvider } from '@apollo/client/testing';
import { InMemoryCache } from '@apollo/client';

const successMocks = [
  {
    request: {
      query: CREATE_ALBUM,
      variables: { name: 'createName', description: 'createDesc' },
    },
    result: {
      data: {
        createAlbum: {
          name: 'createName',
          description: 'createDesc',
          id: 'createId',
        },
      },
    },
  },
  {
    request: {
      query: EDIT_ALBUM,
      variables: { name: 'editName', description: 'editDesc', id: 'testId' },
    },
    result: {
      data: {
        editAlbum: {
          name: 'editName',
          description: 'editDesc',
          id: 'testId',
        },
      },
    },
  },
];

const errorMocks = [
  {
    request: {
      query: CREATE_ALBUM,
      variables: { name: 'createName', description: 'createDesc' },
    },
    error: new Error('error'),
  },
  {
    request: {
      query: EDIT_ALBUM,
      variables: { name: 'editName', description: 'editDesc', id: 'testId' },
    },
    error: new Error('error'),
  },
];

const initialCache = {
  ROOT_QUERY: {
    me: {
      username: 'testUser',
      fullname: 'testName',
      email: 'test@mail.com',
      id: 'testId',
      isAdmin: false,
      photos: [],
      albums: [
        {
          name: 'testName',
          description: 'testDesc',
          photos: [],
          id: 'testId',
        },
      ],
    },
  },
};

describe('albums', () => {
  test('album can be created', async () => {
    const cache = new InMemoryCache({ addTypename: false }).restore(initialCache);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrapper = ({ children }: any) => (
      <MockedProvider cache={cache} mocks={successMocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useSaveAlbum(), { wrapper });
    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.idle,
    });

    act(() => {
      result.current.execute({ name: 'createName', description: 'createDesc' });
    });

    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.saving,
    });

    await waitForNextUpdate();

    expect(result.current.response).toMatchObject({
      data: { name: 'createName', description: 'createDesc', id: 'createId' },
      status: SaveAlbumStatus.ready,
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.idle,
    });
  });

  test('album can be modified', async () => {
    const cache = new InMemoryCache({ addTypename: false }).restore(initialCache);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrapper = ({ children }: any) => (
      <MockedProvider cache={cache} mocks={successMocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useSaveAlbum(), { wrapper });
    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.idle,
    });

    act(() => {
      result.current.execute({
        id: 'testId',
        name: 'editName',
        description: 'editDesc',
      });
    });

    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.saving,
    });

    await waitForNextUpdate();

    expect(result.current.response).toMatchObject({
      data: { name: 'editName', description: 'editDesc', id: 'testId' },
      status: SaveAlbumStatus.ready,
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.idle,
    });
  });

  test('handle error and reset', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // hide console error messages from hook useSaveAlbum
    });

    const cache = new InMemoryCache({ addTypename: false }).restore(initialCache);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const wrapper = ({ children }: any) => (
      <MockedProvider cache={cache} mocks={errorMocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useSaveAlbum(), { wrapper });
    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.idle,
    });

    act(() => {
      result.current.execute({
        id: 'testId',
        name: 'editName',
        description: 'editDesc',
      });
    });

    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.saving,
    });

    await waitForNextUpdate();

    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.error,
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.response).toMatchObject({
      data: undefined,
      status: SaveAlbumStatus.idle,
    });
  });
});
