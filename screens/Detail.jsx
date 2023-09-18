import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Icons } from "../components/Coin";
import { useQuery } from "react-query";
import { history, info } from "../api";
import { BLACK_COLOR } from "../colors";
import { VictoryChart, VictoryLine , VictoryScatter} from "victory-native";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${BLACK_COLOR};
`;

const Detail = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Icons source={{ uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}` }}></Icons>,
    });
  }, []);

  const { isLoading: infoLoading, data: infoData } = useQuery(["coinInfo", id], info);
  const { isLoading: historyLoading, data: historyData } = useQuery(["coinHistory", id], history);

  const [victoryData, setVictoryData] = useState(null);

  useEffect(() => {
    if (historyData) {
      setVictoryData(historyData.map((price) => ({ x: new Date(price.timestamp).getTime(), y: price.price })));
    }
  }, [historyData]);

  return (
    <Container>
      {!victoryData ? null : (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interpolation="monotoneX"
            data={victoryData} style={{ data: { stroke: '#1abc9c' } }} />
          <VictoryScatter
            data={victoryData} style={{data: {fill: '#1abc9c'}}}
          />
        </VictoryChart>
      )}
    </Container>
  );
};

export default Detail;
