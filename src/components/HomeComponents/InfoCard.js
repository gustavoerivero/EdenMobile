import { Box, VStack, Text } from 'native-base'
import React from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { cutText } from '../../utilities/functions'

import colors from '../../styled-components/colors'

import styles from './styled-components/styles'

const InfoCard = ({ navigation, id = 0, type = 3, title = '', date = '', hour = '', location = '', area = '', description = '', image = '' }) => {

  return (
    <Box
      id={id}
      border='1'
      borderRadius='lg'
      bgColor='white'
      shadow={1}
      minH={160}
    >
      <TouchableOpacity
        onPress={() => {
          if (type === 1)
            navigation?.navigate('CreoleBallsTournamentPage', {
              id: id,
              type: type,
              title: title,
              date: date,
              hour: hour,
              location: location,
              area: area,
              description: description,
              image: image,
            })
          if (type === 3)
            navigation?.navigate('EventPage', {
              id: id,
              type: type,
              title: title,
              date: date,
              hour: hour,
              location: location,
              area: area,
              description: description,
              image: image,
            })
        }}
      >

        <ImageBackground
          source={{
            uri: image ? image : 'ac'
          }}
          imageStyle={styles.imageBackground}
          resizeMode='cover'
        >
          <LinearGradient
            colors={[colors.infoCard.topColor, colors.infoCard.middleColor, colors.infoCard.middleBottomColor, colors.infoCard.bottomColor]}
            style={styles.gradient}
          >
            <VStack
              space={0}
              justifyContent='flex-end'
              minH={130}
              alignSelf='flex-end'
              m={5}
            >
              <Text
                fontSize='xl'
                bold
                color='white'
                textAlign='right'
              >
                {cutText(title, 30)}
              </Text>
              <Text
                color='white'
                textAlign='right'
              >
                {cutText(date.toLowerCase(), 45)}
              </Text>
            </VStack>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Box>
  )
}

export default InfoCard