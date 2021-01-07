import { createContext } from 'react'

let AppContext = createContext({
  floatingMessageDismissed: false,
  setFloatingMessageDismissed: () => {},
});
export default AppContext
