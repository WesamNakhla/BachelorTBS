// 📁 src/styles/DashboardStyles/StatCardsStyles.ts

import styled from "styled-components";

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

export const StyledCard = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color}10;
  border: 2px solid ${({ $color }) => $color};
  border-radius: 16px;
  padding: 20px;
  color: ${({ $color }) => $color};
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const IconCircle = styled.div<{ $color: string }>`
  background: ${({ $color }) => $color};
  color: white;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

export const StatDetails = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }

  p {
    margin: 4px 0 0;
    font-size: 18px;
    font-weight: bold;
  }
`;
