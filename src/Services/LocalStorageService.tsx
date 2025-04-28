const SetItem = (key: any, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
}
const GetItem = (key: string) => {
  return JSON.parse(localStorage.getItem(key) as string) ;
}
const RemoveItem = (key: string) => {
  localStorage.removeItem(key);
}
export {SetItem, GetItem, RemoveItem};
