import styled from "styled-components";
import { negativeColor, positiveColor, textPrimaryColor, textSecondaryColor } from "../../constants/colors";

export const ItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  color: ${textPrimaryColor};
  div span {
    color: ${textSecondaryColor};
    margin-right: 10px;
  }
`;

export const Value = styled.div`
  font-size: 16px;
  text-align: right;
  margin-right: 8px;
  color: ${(props) =>
    props.color === "income" ? positiveColor : negativeColor};
`;

export const RightContainer = styled.div`
  display: flex;
  color: ${textSecondaryColor};
`;
