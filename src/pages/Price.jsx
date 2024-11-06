import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Prices() {
  const { symbol } = useParams();

  const apiKey = import.meta.env.VITE_API_KEY;
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
