import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const MatterhornCard = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://static.wixstatic.com/media/3d9313_45b151504946477791c3add537ac398a~mv2.png' }}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        <View style={styles.innerBorder} />

        <LinearGradient
        colors={['transparent', 'rgba(10,10,10,0.65)', 'rgba(10,10,10,0.9)']}
        style={styles.gradientOverlay}
        />

        <View style={styles.badge}>
          <Image
            source={require('../assets/icons/home.png')} // or use an SVG icon
            style={styles.badgeIcon}
          />
          <Text style={styles.badgeText}>4,478 m</Text>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>🏔️ Matterhorn</Text>
          <Text style={styles.subtitle}>Zermatt, Switzerland</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Take the tour ➔</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default MatterhornCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    aspectRatio: 9 / 15.5,
    borderRadius: 28,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    shadowColor: '#FFD666',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  cardImage: {
    resizeMode: 'cover',
  },
  innerBorder: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    bottom: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255, 214, 102, 0.1)',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(250, 204, 21, 0.85)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#422006',
  },
  textBlock: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold', // You must load this font via `expo-font` or link it manually
    fontSize: 26,
    color: '#f8fafc',
    marginBottom: 4,
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#facc15',
    borderRadius: 999,
    paddingHorizontal: 24,
    paddingVertical: 12,
    shadowColor: '#a06e00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#422006',
    fontWeight: '600',
    fontSize: 14,
  },
});
