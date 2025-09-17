import styled from 'styled-components';
import { primaryColor, primaryDarkColor } from '../../config/colors';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${primaryColor};
  padding: 20px;

  a {
    margin: 0 10px 0 0;
    color: #fff;
    font-weight: bold;
    transition: all 300ms;

    &:hover {
      color: ${primaryDarkColor};
    }
  }
`;
