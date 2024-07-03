import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const BeanList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
`;

const BeanItem = styled.li`
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`;
const API_BASE_URL = "https://jellybellywikiapi.onrender.com/api";

const BeanImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BeanInfo = styled.div`
  padding: 10px;
`;

const BeanName = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const BeanDescription = styled.p`
  margin-bottom: 5px;
`;

const BeanLink = styled(Link)`
  display: block;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
`;
function BeanListContainer() {
  const [beans, setBeans] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBeans = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/beans?pageIndex=${page}&pageSize=10`
        );
        setBeans([...beans, ...response.data.items]);
        setHasMore(response.data.items.length > 0);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchBeans();
  }, [page]);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <AppContainer>
      <Title>Мир фасоли</Title>
      <InfiniteScroll
        dataLength={beans.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p style={{ textAlign: "center" }}>Загрузка...</p>}
        endMessage={<p style={{ textAlign: "center" }}>Больше фасолей нет</p>}
      >
        <BeanList>
          {beans.map((bean) => (
            <BeanItem key={bean.beanId}>
              <Link to={`/beans/${bean.beanId}`}>
                <BeanImage src={bean.imageUrl} alt={bean.flavorName} />
                <BeanInfo>
                  <BeanName>{bean.flavorName}</BeanName>
                  <BeanDescription>{bean.description}</BeanDescription>
                </BeanInfo>
              </Link>
              <BeanLink to={`/beans/${bean.beanId}`}>Подробнее</BeanLink>
            </BeanItem>
          ))}
        </BeanList>
      </InfiniteScroll>
    </AppContainer>
  );
}

export default BeanListContainer;
