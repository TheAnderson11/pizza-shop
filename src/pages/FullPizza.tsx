import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: FC = () => {
  const { id } = useParams();
  const [pizzaData, setPizzaData] = useState<{
    id: number,
    imageUrl: string,
    title: string,
    price: number,
  }>();
  const navigate = useNavigate();
  useEffect(() => {
    const axiosOnePizza = async () => {
      try {
        const { data } = await axios.get(
          'https://64aaf2bd0c6d844abedf0487.mockapi.io/items/' + id,
        );
        setPizzaData(data);
      } catch (error) {
        alert('Закройте окно и продожите пользоваться сайтом');
        navigate('/');
      }
    };
    axiosOnePizza();
  }, []);
  if (!pizzaData) return 'Loading...';
  return (
    <div className="container">
      <h3>ID: {pizzaData.id}</h3>
      <img src={pizzaData.imageUrl} alt="" />
      <h2>PizzaName: {pizzaData.title}</h2>
      <br />
      <h2>Price: {pizzaData.price}</h2>
    </div>
  );
};

export default FullPizza;
