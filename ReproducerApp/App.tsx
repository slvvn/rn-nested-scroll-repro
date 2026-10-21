/**
 * Android: a horizontal paging ScrollView (the pager) holds a vertical ScrollView,
 * which holds a horizontal ScrollView with nestedScrollEnabled (the carousel).
 *
 * 1. Swipe the cards sideways: the carousel scrolls.
 * 2. Tap RESET, scroll the grey area up or down, then swipe the cards again:
 *    the pager moves instead (peak > 0) and the carousel does not.
 */
import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

const COLORS = ['#e57373', '#64b5f6', '#81c784', '#ffb74d', '#ba68c8'];

export default function App() {
  const { width } = useWindowDimensions();
  const pagerRef = useRef<ScrollView>(null);
  const carouselRef = useRef<ScrollView>(null);
  const verticalRef = useRef<ScrollView>(null);
  const [pagerX, setPagerX] = useState(0);
  const [pagerPeak, setPagerPeak] = useState(0);
  const [carouselX, setCarouselX] = useState(0);

  const reset = () => {
    pagerRef.current?.scrollTo({ x: 0, animated: false });
    carouselRef.current?.scrollTo({ x: 0, animated: false });
    verticalRef.current?.scrollTo({ y: 0, animated: false });
    setPagerX(0);
    setPagerPeak(0);
    setCarouselX(0);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 40 }}>
      <Text
        testID="status"
        style={{ fontSize: 20, padding: 8, color: 'black' }}
      >
        {`pager=${Math.round(pagerX)} peak=${Math.round(pagerPeak)} carousel=${Math.round(carouselX)}`}
      </Text>
      <Pressable
        testID="reset"
        onPress={reset}
        style={{ padding: 8, backgroundColor: '#ddd', alignSelf: 'flex-start' }}
      >
        <Text style={{ color: 'black' }}>RESET</Text>
      </Pressable>
      <ScrollView
        ref={pagerRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        onScroll={e => {
          const x = e.nativeEvent.contentOffset.x;
          setPagerX(x);
          setPagerPeak(peak => Math.max(peak, x));
        }}
        style={{ flex: 1 }}
      >
        <ScrollView ref={verticalRef} style={{ width }}>
          <View style={{ height: 300, backgroundColor: '#eee' }}>
            <Text style={{ padding: 8, color: 'black' }}>
              Page 1: scroll me vertically
            </Text>
          </View>
          <ScrollView
            ref={carouselRef}
            horizontal
            nestedScrollEnabled
            scrollEventThrottle={16}
            onScroll={e => setCarouselX(e.nativeEvent.contentOffset.x)}
            style={{ height: 160 }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <View
                key={i}
                style={{
                  width: 140,
                  height: 140,
                  margin: 10,
                  backgroundColor: COLORS[i % COLORS.length],
                }}
              >
                <Text style={{ color: 'black' }}>card {i}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={{ height: 1500, backgroundColor: '#f6f6f6' }} />
        </ScrollView>
        <View style={{ width, backgroundColor: '#cfd8dc' }}>
          <Text style={{ padding: 8, color: 'black' }}>Page 2</Text>
        </View>
      </ScrollView>
    </View>
  );
}
