export const EXPAND_ALBUM = 'EXPAND_ALBUM';
export const COLLAPSE_ALBUM = 'COLLAPSE_ALBUM';

interface AlbumState {
  collapsed: string[];
}

export const initialState: AlbumState = {
  collapsed: [],
};

export interface ExpandAlbum {
  type: typeof EXPAND_ALBUM;
  data: string;
}

export interface CollapseAlbum {
  type: typeof COLLAPSE_ALBUM;
  data: string;
}

type Actions = ExpandAlbum | CollapseAlbum;

export const expandAlbum = (id: string): ExpandAlbum => {
  return {
    type: EXPAND_ALBUM,
    data: id,
  };
};

export const collapseAlbum = (id: string): CollapseAlbum => {
  return {
    type: COLLAPSE_ALBUM,
    data: id,
  };
};

export const myPhotosReducer = (
  state = initialState,
  action: Actions
): AlbumState => {
  switch (action.type) {
    case EXPAND_ALBUM:
      return {
        collapsed: [...state.collapsed.filter(c => c !== action.data)],
      };
    case COLLAPSE_ALBUM:
      return {
        collapsed: [...state.collapsed, action.data],
      };
    default:
      return state;
  }
};
