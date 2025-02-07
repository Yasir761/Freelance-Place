const getItemsFromLocalStorage = async (name) => {
  const data = localStorage.getItem(name);
  if (!data) return null;

  const parseData = await JSON.parse(data);
  return parseData;
};

const setItemsToLocalStorage = (name, data) => {
  if (!data) return null;
  
  const stringifyData = JSON.stringify(data);
  localStorage.setItem(name, stringifyData);
  return true;
};

const removeItemFromLocalstorage = async (name) => {
  localStorage.removeItem(name);
  return true;
};

export {
  getItemsFromLocalStorage,
  setItemsToLocalStorage,
  removeItemFromLocalstorage,
};
