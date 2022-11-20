import { Box, VStack, Divider, Text } from 'native-base'
import React from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../styled-components/colors'

import styles from './styled-components/styles'

const InfoCard = ({ title = '', description = '', image = '' }) => {

  /**
   * Method to trim text strings under a maximum character limit.
   * @param {String} text Text string to cut out.
   * @param {Number} maxLength Maximum text length permitted.
   * @returns {String} Clipped text string.
   */
  const cutText = (text = '', maxLength = 255) => {
    return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text
  }

  return (
    <Box border="1" borderRadius="lg" bgColor='white' shadow={1} minH={160} >
      <TouchableOpacity>

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
                {cutText(description.toLowerCase(), 45)}
              </Text>
            </VStack>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Box>
  )
}

export default InfoCard