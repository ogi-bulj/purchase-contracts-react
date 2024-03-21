import axios from "axios";

export interface Contract {
  id: number;
  kupac: string;
  broj_ugovora: string;
  datum_akontacije: string;
  rok_isporuke: string;
  status: string;
}

export const getContracts = async () => {
  // TO-DO!: S produkcijskim API-jem i stvarnom datom, trebali bi biti zaštićeni API pozivi, što znači da bi trebali slati Bearer token u headersu kako bi dobili pristup ruti i response.
  return await axios.get<Contract[]>("../../../__mocks__/contracts.json");
};
