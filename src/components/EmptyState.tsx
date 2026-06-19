import { View } from 'react-native';

import {
  Heading,
  Text,
} from '@gluestack-ui/themed';

export default function EmptyState() {
  return (
    <View className="flex-1 items-center justify-center px-8 py-20">
      <Heading
        size="xl"
        color="$textDark700"
        textAlign="center"
      >
        Nenhuma tarefa cadastrada
      </Heading>

      <Text
        size="md"
        color="$textLight500"
        textAlign="center"
        mt="$2"
      >
        Adicione uma nova tarefa para ela aparecer aqui.
      </Text>
    </View>
  );
}
