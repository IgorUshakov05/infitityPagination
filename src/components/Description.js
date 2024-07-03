import styled from "styled-components";
const BeanDetailsDescription = styled.p`
  margin-bottom: 10px;
`;

const BeanDetailsDescriptionComponent = (description) => {
  return <BeanDetailsDescription>{description}</BeanDetailsDescription>;
};

export default BeanDetailsDescriptionComponent;
