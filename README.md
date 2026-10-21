# Reproducer: nested horizontal ScrollView loses its first swipe after a vertical scroll (Android)

Made from the [React Native reproducer template](https://github.com/react-native-community/reproducer-react-native). The only change is [ReproducerApp/App.tsx](ReproducerApp/App.tsx).

The screen is a horizontal paging `ScrollView` (the pager). Its first page is a vertical `ScrollView` with a row of cards: a horizontal `ScrollView` with `nestedScrollEnabled`. The status line shows how far the pager moved (`pager`, and the most it moved, `peak`) and how far the cards moved (`carousel`).

## Steps

1. Run the app on Android.
2. Swipe the cards to the left. The cards scroll.
3. Tap RESET.
4. Scroll the grey area up a little. Start the drag above the cards.
5. Swipe the cards to the left again.

Expected: the cards scroll.

Actual: the cards stay put. The pager moves and snaps back, so `peak` goes above 0.
