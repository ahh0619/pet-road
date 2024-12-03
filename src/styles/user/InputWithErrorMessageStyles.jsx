import styled from "styled-components";
import { Input } from "../PubLoginStyle";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.p`
  font-size: 0.6rem;
  color: tomato;
  margin-top: 5px;
  padding-left: 5px;
  height: 0.6rem;
`;

export const AuthInput = styled(Input)`
  margin-bottom: 0;
`