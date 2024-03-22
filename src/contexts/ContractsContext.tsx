import React, { createContext, useState } from "react";
import { Contract } from "../api/getContracts";

interface ContractContextData {
  contracts: Contract[];
  setContracts: React.Dispatch<React.SetStateAction<Contract[]>>;
}

export const ContractsContext = createContext<ContractContextData>({
  contracts: [],
  setContracts: () => {},
});

interface ContextProviderProps {
  children: React.ReactNode;
}

export const ContractsProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  return (
    <ContractsContext.Provider value={{ contracts, setContracts }}>
      {children}
    </ContractsContext.Provider>
  );
};
