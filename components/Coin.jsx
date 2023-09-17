import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

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

export const Icons = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const Coin = ({ symbol, index, id }) => {
  const navigation = useNavigation()
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 50,
    }).start();
  }, []);

  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <TouchableOpacity style={{flex: 0.31}} onPress={() => navigation.navigate("Detail", {symbol, id})}>
      <Wrapper style={{ opacity, transform: [{ scale }] }}>
        <Icons source={{ uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}` }}></Icons>
        <CoinSymbol>{symbol}</CoinSymbol>
      </Wrapper>
    </TouchableOpacity>
  );
};

export default Coin;
