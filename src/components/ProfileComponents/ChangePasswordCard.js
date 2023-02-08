import React, {useState} from 'react';
import {TouchableOpacity, useWindowDimensions, Linking} from 'react-native';
import {
  Box,
  HStack,
  VStack,
  Text,
  Divider,
  Stack,
  Button,
  Checkbox,
} from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../styled-components/colors';

import {cutText} from '../../utilities/functions';
import Modal from '../Modal';
import StyledField from './StyledField';
import StyledSwitch from '../StyledSwitch';

const ChangePasswordCard = () => {

  const layout = useWindowDimensions();

  const handlePress = () => {
    Linking.openURL('https://medinajosedev.com/nova/password/reset');
  }

  return (
    <Box
      minW="100%"
      maxW="100%"
      maxH="14%"
      p={2}
      mb={4}
      bgColor={colors.white}
      shadow={5}
      borderRadius={10}>
      <HStack w="100%">
        <VStack w="100%" space={1}>
          <Text bold fontSize="sm" color={colors.gray}>
            Cambio de contraseña
          </Text>
          <Divider bgColor={colors.navBar.activeColor} borderRadius={50} />
          <VStack m={2} space={1} alignItems="center">
            <Button
            onPress={handlePress}
            w='80%'
            h='72%'
            borderRadius={10}
            shadow={3}
            justifyContent='center'
            alignItems='center'
            bgColor={colors.button.bgPrimary}
              >
                <Text
                  bold
                  fontSize='md'
                  color={colors.white}
                >
              Cambiar contraseña
            </Text>
          </Button>
          </VStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ChangePasswordCard;