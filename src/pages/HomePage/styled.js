import styled from "styled-components";
import { mainContrastColor, negativeColor, positiveColor, textPrimaryColor, textSecondaryColor } from "../../constants/colors";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: ${mainContrastColor};
`;

export const TransactionsContainer = styled.article`
  flex-grow: 1;
  height: 0px;
  background-color: ${mainContrastColor};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${textSecondaryColor};
`;

export const ListContainer = styled.article`
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  padding: 16px;
  color: ${textPrimaryColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    overflow-y: auto;
    scrollbar-width: none;
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
  article {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

export const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;

  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`;

export const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) =>
    props.color === "positivo" ? positiveColor : negativeColor};
`;
