import styled from "styled-components";
import { useState, useEffect } from "react";
import BeanDetailsDescriptionComponent from "../components/Description";
import axios from "axios";
import { useParams } from "react-router-dom";
const API_BASE_URL = "https://jellybellywikiapi.onrender.com/api";

const BeanDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const BeanImageDetails = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const BeanInfoDetails = styled.div`
  text-align: center;
`;

const BeanDetailsName = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const BeanDetailsSource = styled.a`
  color: #007bff;
  text-decoration: none;
`;

function BeanDetailsPage() {
  const { beanId } = useParams();
  const [bean, setBean] = useState(null);

  useEffect(() => {
    const fetchBean = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/beans/${beanId}`);
        setBean(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchBean();
  }, [beanId]);

  if (!bean) {
    return <div>Загрузка...</div>;
  }

  return (
    <BeanDetails>
      <BeanImageDetails src={bean.imageUrl} alt={bean.flavorName} />
      <BeanInfoDetails>
        <BeanDetailsName>{bean.flavorName}</BeanDetailsName>
        <BeanDetailsDescriptionComponent description={bean.description} />
        {bean.source && (
          <BeanDetailsSource
            href={bean.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Источник информации
          </BeanDetailsSource>
        )}
      </BeanInfoDetails>
    </BeanDetails>
  );
}

export default BeanDetailsPage;
