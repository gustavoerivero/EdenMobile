import React, {useState} from 'react';
import {TouchableOpacity, useWindowDimensions} from 'react-native';
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

const ContactCard = ({userProp={}}) => {

  const userData = userProp

  const [email, setEmail] = useState('gustavoerivero.p63@gmail.com');
  const [phones, setPhones] = useState(userProp?.data?.telefono || []);
  const [activePhones, setActivePhones] = useState(true);

  const [editModal, setEditModal] = useState(false);

  const layout = useWindowDimensions();

  return (
    <Box
      minW="100%"
      maxW="100%"
      minH={120}
      p={2}
      pb={3}
      bgColor={colors.white}
      shadow={5}
      borderRadius={10}>
      <HStack w="100%">
        <VStack w="100%" space={1}>
          <Text bold fontSize="sm" color={colors.gray}>
            Contacto
          </Text>
          <Divider bgColor={colors.navBar.activeColor} borderRadius={50} />
          <VStack mx={3} space={1}>
            <HStack alignItems="center" space={2}>
              <Icon name="mail-outline" size={20} color={colors.gray} />
              <Text fontSize="xs" color={colors.gray}>
                {cutText(userData?.data?.email, 42)}
              </Text>
            </HStack>
            {
            phones?.length > 0 && (
              <VStack>
              
              {phones
              ?.filter(item => item.es_publico === '1')
              ?.map((item, key) => (
              
              <HStack key={phones} alignItems="center" space={2}>
              <Icon name="phone-portrait-outline" size={20} color={colors.gray} />
              <Text fontSize="xs" color={colors.gray}> {cutText(item?.numero, 42)} </Text>
              </HStack>
              ))}
              </VStack>
              )
            }
          </VStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default ContactCard;
