import styled from 'styled-components';

export const BgPatternImg = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  min-height: 100vh;
  background-image: url('/images/bg-pattern-01.png'),
    url('/images/bg-pattern-02.png');
  background-size: 800px auto, 400px auto;
  background-position: left bottom, right top;
  background-repeat: no-repeat, no-repeat;
`;

export const LoginLogo = styled.img`
  width: 300px;
  margin-left: 40px;
  margin-top: 30px;
`;

export const SignTotalWrap = styled.div`
  position: relative;
  width: 920px;
  min-height: 510px;
  margin: 0 auto;
  background-image: url('/images/bg-pet-img.png');
  background-size: 590px auto;
  background-position: right top;
  background-repeat: no-repeat, no-repeat;
`;

export const BgPetImg = styled.img`
  position: absolute;
  right: 0;
  width: 600px;
`;

export const SignDiv = styled.div`
  margin-top: 40px;
  width: 380px;
  padding: 30px;
  padding-bottom: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 8px 8px 15px 0px rgba(60, 6, 6, 0.28);
  margin-bottom: ${(props) => (props.bottomGap === 'true' ? '80px' : '0px')};
`;

export const SignTitle = styled.p`
  color: #282828;
  padding: 10px;
  padding-bottom: 25px;
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  box-sizing: border-box;
`;

export const Hr = styled.hr`
  border: 0.1px solid #a9a9a9;
  margin-top: 0px;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  border: 1px solid #a9a9a9;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  margin-bottom: 20px;
  font-size: 20px;

  &::placeholder {
    color: #a8a8a8;
  }
`;

export const SignButton = styled.button`
  border: 0px;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  margin-bottom: 20px;
  font-size: 25px;
  background-color: #ff6732;
  color: #fff;
  cursor: pointer;
`;

export const TxtP = styled.p`
  color: #777;

  a {
    color: #f18a11;
  }
`;

export const CopyrightP = styled.p`
  color: #fff;
  position: absolute;
  bottom: 30px;
  right: 40px;
  display: block;
  text-align: right;
`;
