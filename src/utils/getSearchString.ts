export interface SearchString {
  name?: boolean;
  location?: boolean;
  description?: boolean;
  tags?: boolean;
  search: string;
}

const getSearchString = (input: SearchString) => {
  return `/photos/?name=${input.name || false}&location=${
    input.location || false
  }&description=${input.description || false}&tags=${
    input.tags || false
  }&keyword=${input.search}`;
};

export default getSearchString;
