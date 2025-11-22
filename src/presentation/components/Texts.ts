import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: Lato;
  font-size: 18px;
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  line-height: 22px;
`;

export const H3 = styled.h3`
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  line-height: 18px;
  text-align: center;
`;

export const BodyText = styled.span`
  font-family: Lato;
  font-size: 14px;
  font-weight: 400;
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
`;

export const SmallText = styled.span`
  font-family: Lato;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
  line-height: 14px;
`;

export const H2CategoryTitle = styled.span`
  font-family: Lato;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: ${(props) =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.black};
`;
