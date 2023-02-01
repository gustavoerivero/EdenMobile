import React from 'react'
import { Divider, FlatList, Stack, Text, VStack, View } from 'native-base'

import Container from '../../components/Container'

import colors from '../../styled-components/colors'

import ProfileTeamComponent from '../../components/TeamComponents/ProfileTeamComponent'
import PlayerPreviewCard from '../../components/TeamComponents/PlayerPreviewCard'

const TeamPage = ({ navigation, route }) => {

  const team = route?.params

  return (
    <Container
      hiddenNavBar={true}
    >
      <View
        minH='100%'
      >
        <VStack
          p={5}
          mt={15}
          space={3.5}
          minH='100%'
        >
          <ProfileTeamComponent
            navigation={navigation}
            team={team}
          />
          <Text
            bold
            fontSize='md'
            color={colors.gray}
          >
            Jugadores del equipo
          </Text>
          <Stack>
            <Divider />
            <FlatList
              minH='73%'
              maxH='73%'
              data={team?.teamMembers}
              keyExtractor={item => item?.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Stack
                  p={1}
                >
                  <PlayerPreviewCard
                    playerID={item?.id}
                    playerName={item?.name}
                    playerImage={item?.image}
                    playerPosition={item?.id === 0 ? 'Capitán' : 'Jugador'}
                    navigation={navigation}
                  />
                </Stack>
              )}
            />
            <Divider />
          </Stack>

        </VStack>
      </View>
    </Container>
  )

}

export default TeamPage