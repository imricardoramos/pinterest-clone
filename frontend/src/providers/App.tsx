import { createContext, useContext } from "react";

type AppContextType =
  | undefined
  | {
      floatingMessageDismissed: boolean;
      setFloatingMessageDismissed: (param: boolean) => void;
    };
const AppContext = createContext<AppContextType>(undefined);

export function AppProvider({
  value,
  children,
}: {
  value: AppContextType;
  children: React.ReactNode;
}) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context == undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
