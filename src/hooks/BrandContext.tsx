// Os contextos são responsáveis por armazenar os dados que 
//serão compartilhados entre componentes. Idealmente, os contexts
//ficam armazenados numa pasta própria e devem ser chamados indiretamente usando o hook useContext() nos componentes filhos


import { createContext, useState } from "react";

//contexto criado
export const BrandContext = createContext({});

//criando o provedor do contexto
export function BrandContextProvider({ children }) {

    //vai ser possível utlizar esse estado em todos os filhos reativamente
    const [counterBrandContext, setCounterBrandContext] = useState(0);

    //atribui ao atributo {value} o que quer ser compartilhado para os filhos
    return (
        <BrandContext.Provider value={{counterBrandContext, setCounterBrandContext}}>
            {children}
        </BrandContext.Provider>
    );
}