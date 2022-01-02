import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

const ScrollToIndexComponent = () => {
  const [indexs, setIndexCountryCode] = useState<number>(0);

  const ref: any = useRef<FlatList>(null);
  useEffect(() => {
    ref.current?.scrollToIndex({
      index: indexs,
      animated: true,
      viewOffset: 50,
      visualViewport: 1,
    });
  }, [indexs]);
  const dataCountryCode = [
    {
      id: 1,
      name: "Mỹ",
    },
    {
      id: 2,
      name: "Nhật",
    },
    {
      id: 3,
      name: "Anh",
    },
    {
      id: 4,
      name: "Đức",
    },
    {
      id: 5,
      name: "Úc",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={ref}
        initialScrollIndex={indexs}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            ref.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
        data={dataCountryCode}
        renderItem={({ item, index }) => {
          return (
            <View
              key={item.id}
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Pressable
                style={{
                  backgroundColor: index === indexs ? "black" : "white",
                  padding: 8,
                  margin: 8,
                  borderWidth: 1,
                  borderColor: "black",
                  width: 100,
                  borderRadius: 60,
                  alignItems: "center",
                }}
                onPress={() => {
                  setIndexCountryCode(index);
                }}
              >
                <Text style={{ color: index === indexs ? "white" : "black" }}>
                  {item.name}
                </Text>
              </Pressable>
            </View>
          );
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ScrollToIndexComponent;
