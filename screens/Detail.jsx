import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import { Icons } from '../components/Coin'
import {useQuery} from 'react-query'
import { history, info } from '../api'

const Container = styled.View``

const Detail = ({ navigation, route: {params: {symbol, id}}}) => {
  console.log(id)
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Icons source={{ uri: `https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}` }}></Icons>
    })
  }, [])
  
  const {isLoading: infoLoading, data: infoData} = useQuery(['coinInfo', id], info)
  const {isLoading: historyLoading, data: historyData} = useQuery(['coinHistory', id], history)

  console.log(infoData)

  return (
    <Container></Container>
  )
}

export default Detail