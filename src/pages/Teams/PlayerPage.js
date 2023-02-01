import React from 'react'
import { ScrollView, VStack } from 'native-base'

import Container from '../../components/Container'

import CreoleProfileCard from '../../components/ProfileComponents/CreoleProfileCard'
import DominoesProfileCard from '../../components/ProfileComponents/DominoesProfileCard'
import ContactCard from '../../components/ProfileComponents/ContactCard'
import PlayerProfileComponent from '../../components/TeamComponents/PlayerProfileComponent'
import PlayerContactCard from '../../components/TeamComponents/PlayerContactCard'


const PlayerPage = ({ navigation, route }) => {

  const player = route?.params

  const email = player?.playerName?.split(' ').join('').toLowerCase()

  return (
    <Container
      hiddenNavBar={true}
    >
      <ScrollView
        minH='100%'
      >
        <VStack
          p={5}
          mt={15}
          space={3.5}
          minH='100%'
          alignItems='center'
        >
          <PlayerProfileComponent
            player={player}
            navigation={navigation}
          />
          <CreoleProfileCard
            gamesPlayed={13}
            gamesWon={10}
            gamesLost={3}
            arrimeBueno={12}
            arrimeMalo={2}
            bocheBueno={0}
            bocheMalo={4}
            marranaBuena={1}
            marranaMala={0}
            mingoFuera={1}
          />
          <DominoesProfileCard
            gamesPlayed={20}
            gamesWon={12}
            gamesLost={8}
            points={150}
          />
          <PlayerContactCard
            playerEmail={`${email}@gmail.com`}
            playerPhones='+2563152648'
          />
        </VStack>
      </ScrollView>
    </Container>
  )

}

export default PlayerPage