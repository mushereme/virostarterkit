import { Platform, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  box: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowOffset: {
          height: 10,
          width: 10,
        },
      },
      android: {
        elevation: 5,
        // backgroundColor: 'rgba(0, 0, 0, 1)',
      },
    }),
  },
});

export default Shadow = ({ children }) => {
    return (
        <View style={styles.box}>{children}</View>
    );
};