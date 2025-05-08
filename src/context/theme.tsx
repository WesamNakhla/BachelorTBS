// import { ReactNode, createContext, useContext, useState } from "react";

// interface ThemeContextType {
//     isDark: boolean,
//     setIsDark: (isDark: boolean)=> void
// }

// export const MyThemeContext = createContext<ThemeContextType | undefined>(undefined);


// export const ThemeProvider = ({children}: { children: ReactNode })=>{
//     const [ isDark ,setIsDark ] = useState(false);

//     return (
//         <MyThemeContext.Provider value={{ isDark, setIsDark }}>
//         {children}
//         </MyThemeContext.Provider>
//     )

// }

// //custom hook

// export const useTheme = ()=>{
//     const context = useContext(MyThemeContext);
//     if(!context){
//         throw new Error("useTheme must be used inside MyThemeProvider");
//     }
//     return context;
// }
import { FC, ReactNode, createContext, useContext, useState } from "react";

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export const MyThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <MyThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </MyThemeContext.Provider>
  )
};

export const useTheme = () => {
  const context = useContext(MyThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
