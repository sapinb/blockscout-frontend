import { Skeleton, Flex, Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const TxInternalsSkeletonMobile = ({ isPending }: {isPending?: boolean}) => {
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

  return (
    <>
      { !isPending && <Skeleton h={ 6 } w="100%" mb={ 12 }/> }
      <Flex columnGap={ 3 } h={ 8 } mb={ 6 }>
        <Skeleton w="36px" flexShrink={ 0 }/>
        <Skeleton w="36px" flexShrink={ 0 }/>
        <Skeleton w="100%"/>
      </Flex>
      <Box>
        { Array.from(Array(2)).map((item, index) => (
          <Flex
            key={ index }
            flexDirection="column"
            paddingBottom={ 3 }
            paddingTop={ 4 }
            borderTopWidth="1px"
            borderColor={ borderColor }
            _last={{
              borderBottomWidth: '1px',
            }}
          >
            <Flex h={ 6 }>
              <Skeleton w="100px" mr={ 2 } h={ 6 }/>
              <Skeleton w="100px" h={ 6 }/>
            </Flex>
            <Skeleton w="100%" h="30px" mt={ 3 }/>
            <Skeleton w="50%" h={ 6 } mt={ 3 }/>
            <Skeleton w="50%" h={ 6 } mt={ 2 }/>
            <Skeleton w="100%" h={ 6 } mt={ 6 }/>
            <Skeleton w="50%" h={ 6 } mt={ 2 }/>
            <Skeleton w="50%" h={ 6 } mt={ 2 }/>
          </Flex>
        )) }
      </Box>
    </>
  );
};

export default TxInternalsSkeletonMobile;