import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Box, HStack, VStack, Text, Image, Stack } from 'native-base';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import colors from '../../styled-components/colors';
import styles from '../styled-components/styles';

const PlayerPreviewCard = ({
  navigation,
  route,
  playerID = 0,
  playerName = '',
  playerPosition = '',
  playerImage = '',
}) => {
  return (
    <Box minW="100%" maxW="100%" minH="65" borderRadius={15}>
      <HStack minW="100%" maxW="100%" minH="65" maxH="65">
        <Stack
          minW="20%"
          maxW="20%"
          minH="100%"
          maxH="100%"
          justifyContent="center"
          alignItems="center">
          {playerImage ? (
            <Image src={playerImage} alt={playerName} h="50" w="50" borderRadius={100}/>
          ) : (
            <Box
              w="50"
              h="50"
              borderRadius={50}
              bgColor={colors.navBar.activeColor}
              justifyContent="center"
              alignItems="center">
              <MaterialIcon name="group" color={colors.white} size={30} />
            </Box>
          )}
        </Stack>
        <VStack minW="60%" maxW="60%" minH="65" justifyContent="center">
          <Stack space={1}>
            <Text bold fontSize="sm" lineHeight={15} color={colors.text.description}>
              {playerName}
            </Text>
            <Text fontSize="xs" bold color={playerPosition === 'Capitán' ? colors.primary : colors.secondary}>
              {playerPosition}
            </Text>
          </Stack>
        </VStack>
        <TouchableOpacity
          style={styles.teamCard.buttonSection}
          onPress={() => {
            navigation?.navigate('PlayerPage', {
              playerID: playerID,
              playerName: playerName,
              playerImage: playerImage,
              playerPosition: playerPosition,
            });
          }}>
          <Box
            minW="100%"
            maxW="100%"
            minH="65"
            borderRightRadius={15}
            justifyContent="center"
            alignItems="center"
            bgColor={colors.teamCard.buttonBackground}>
            <MaterialIcon
              name="arrow-forward-ios"
              color={colors.white}
              size={25}
            />
          </Box>
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default PlayerPreviewCard;
