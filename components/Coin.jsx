import React, { useEffect, useRef } from "react";
import { Animated, View } from 'react-native';
import styled from 'styled-components/native'

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  align-items: center;
  background-color: #4c4c4c;
  padding: 15px 10px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinSymbol = styled.Text`
  color: white;
`;

const Icons = styled.Image`
width: 40px;
height: 40px;
border-radius: 20px;
margin-bottom: 10px;
`

const Coin = ({ symbol, index }) => {
  const opacity = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 50
    }).start()
  }, [])

  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1]
  })

  return (
    <Wrapper style={{ flex: 0.31,  opacity, transform: [{scale}]}}>
      <Icons source={{ uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}` }}></Icons>
      <CoinSymbol>{symbol}</CoinSymbol>
    </Wrapper>
  );
};

export default Coin;
