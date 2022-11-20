import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,FlatList,Image,SafeAreaView} from 'react-native';
import styled, {css} from 'styled-components/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
let data = [
  {
    title: 1,
  },
  {
    title: 2,
  },
  {
    title: 3,
  },
  {
    title: 4,
  },
  {
    title: 5,
  },
  {
    title: 6,
  }
];

const ItemCon = styled.View`
  flex-direction: column;
  align-items: center;
  max-width: ${props => props.width + "px"};
  width:  ${props => props.width + "px"};
`

const ItemImage = styled.Image`
  width: 100%;
  height: 200px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const ItemDesc = styled.View`
  margin-top: 10px;
`

const ItemTitle = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  font-weight: bold;
  width:  ${props => props.width + "px"};
  background: transparent;
`

const ItemPrice = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  line-height: 12px;
  width:  ${props => props.width + "px"};
`

const Item = ({width}) => (
  <ItemCon width={width}>
    <ItemImage
        source={{
          uri: 'https://cdn.slim9.biz/webp/web/product/medium/202209/70c7ada46898fa4b0f26e3e2b2ecebe4.webp',
        }}
    />
    <ItemDesc>
      <ItemTitle width={width}>[★특가PACK★] 보들브라탑 1개</ItemTitle>
      <ItemPrice width={width}>35,900원</ItemPrice>
    </ItemDesc>
  </ItemCon>
);

const SkeletonItem = ({width})=>{
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <View>
        <View style={{width: width, height: 200}} />
        <View style={{marginTop: 10}}>
          <View style={{width: width, height: 20}} />
          <View style={{marginTop: 6, fontSize: 14, lineHeight: 18}}>Hello world</View>
        </View>
      </View>
    </SkeletonPlaceholder>
  )
}

export default function App() {
  const margins = 15 * 2;
  const numColumns = 2;
  const [containerWidth, setContainerWidth] = useState(0);


  const [loading,setLoading] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      let newArr = [];
      for(let i = 0; i < 100; i++){
        newArr.push({title : i})
      }
      data = newArr;
      setLoading(true);
    },5000)
  },[])
  return (
    <>
    <SafeAreaView>
      <View style={{paddingHorizontal: 16,marginTop:20}}>
          <FlatList
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom:20
            }}
            onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
            renderItem={({item}) => (
              !loading ? <SkeletonItem width={(containerWidth - margins) / numColumns}/> : <Item width={(containerWidth - margins) / numColumns}/>
            )}
            keyExtractor={(item, index) => index}
            numColumns={numColumns}
          />
      </View>
    </SafeAreaView>

    </>
  );
}