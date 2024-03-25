import axios from "axios";

export interface Article {
  id: number;
  naziv: string;
  dobavljač: string;
  status: string;
}

export const getArticlesById = async () => {
  // export const getArticlesById = async (contractId: number) => {
  // TO-DO!: Kod spajanja na pravi API sa stvarnom datom, trebalo bi sa client-a slati nekakav ID (u ovom slučaju najbolje bi bilo ID ugovora prema kojem se na backendu query-aju artikli tako da u responseu dobijemo samo artikle koji pripadaju samo tom određenom kupoprodajnom ugovoru). Druga solucija je ta da u inicijalnom getContracts API pozivu dobijamo u response-u kao property u svakom objektu ugovora "articles" array te ga prikažemo na SingleContract page-u. Što se tiče brzine i performansi, smatram da je prva solucija bolja i optimiziranija.
  return await axios.get<Article[]>("/purchase-contracts-react/articles.json");
};
