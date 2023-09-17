import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import auth from '@react-native-firebase/auth'
import { coins } from '../api'
import {useQuery} from 'react-query'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { BLACK_COLOR } from '../colors'
import Coin from '../components/Coin'

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
`;
const Loader = styled.View`
  flex: 1;
  background-color: ${BLACK_COLOR};
  justify-content: center;
  align-items: center;
`;

const List = styled.FlatList`
padding: 20px 10px;
  width: 100%;
`

const Home = () => {
  const {data, isLoading, } = useQuery("coins", coins)
  const [cleanData, setCleanData] = useState([]);
  useEffect(() => {
    if (data) {
      setCleanData(data.filter((coin) => coin.rank != 0 && coin.is_active && !coin.is_new))
    }
  }, [data])

  if (isLoading) {
    return <Loader><ActivityIndicator color="white" size='large'/></Loader>
  }

  return (
    <Container>
      <List
        data={cleanData}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between"
        }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <Coin id={item.id} index={index} style={{flex: 0.31}} symbol={item.symbol}>
        </Coin>}
      />
    </Container>
  )
}

export default Home