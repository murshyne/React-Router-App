import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Prices() {
  const { symbol } = useParams();

  const apiKey = "60FEA2F9-3962-4218-B26C-84E5DA84F23E";
  const url = `http://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  const [coin, setCoin] = useState(null);
  const getData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      setCoin(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loaded = () => {
    return (
      <div>
        <h1>
          {coin.asset_id_base}/{coin.asset_id_quote}
        </h1>
        <h2>{coin.rate}</h2>
      </div>
    );
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return coin && coin.rate ? loaded() : loading();
}
