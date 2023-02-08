import { Box, VStack, Text, HStack } from 'native-base'
import React from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { cutText } from '../../utilities/functions'

import colors from '../../styled-components/colors'

import styles from './styled-components/styles'

const InfoCard = ({ navigation, id = 0, type = 3, title = '', date = '', hour = '', location = '', area = '', description = '', image = '', tournament = null, subtype = null }) => {

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
          if (type === 'B') {
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
              tournament: tournament
            })
          } else if (type === 'D') {
            navigation?.navigate('DominoTournamentPage', {
              id: id,
              type: type,
              title: title,
              date: date,
              hour: hour,
              location: location,
              area: area,
              description: description,
              image: image,
              tournament: tournament
            })
          } else {
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
          }
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
              <HStack
                space={1}
                justifyContent='flex-end'
              >
                <Text
                  color='white'
                  textAlign='right'
                  italic
                  fontSize='xs'
                >
                  {type === 'D' ? 'Torneo de dominó' : type === 'B' ? 'Torneo de bolas criollas' : type === 'O' ? 'Torneo' : type === 'E' ? 'Evento' : 'Actividad'}
                </Text>
                {subtype &&
                  <Text
                    color='white'
                    textAlign='right'
                    italic
                    fontSize='xs'
                  >
                    {subtype?.toLowerCase()}
                  </Text>
                }
              </HStack>
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
                {cutText(date, 45)}
              </Text>
            </VStack>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Box>
  )
}

export default InfoCard