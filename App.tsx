/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useCallback, memo } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

//Nesse código, toda mudança de estado do componente pai, o componente filho será renderizado também.
// const Filho = ({ atualiza }) => {
//   console.log("FILHO ATUALIZOU");
//   return <Button title="Adicionar +1 filho" onPress={() => atualiza(3)}>Atualiza</Button>;
// }

// function Pai() {
//   console.log("PAI ATUALIZOU");

//   const [counter, setCounter] = useState(0);

//   const atualiza = (novoValor) => {
//     console.log("novoValor", novoValor)
//   }

//   return (
//     <>
//       <Text>{counter}</Text>
//       <Button title="Adicionar +1 pai" onPress={() => setCounter((c) => c+ 1)}/>
//       <Filho atualiza={atualiza}/>
//     </>
//   );
// }

//skips re-rendering a component when its props are unchanged\
//prefered to use with child components
const Filho = memo(({ atualiza }) => {
  console.log("FILHO ATUALIZOU");
  return <Button title="Adicionar +1 filho" onPress={() => atualiza(3)}>Atualiza</Button>;
});

function Pai() {
  console.log("PAI ATUALIZOU");

  const [counter, setCounter] = useState(0);

  //cache a funcion definition between re-renders
  //On the following renders, React, will compare the dependencies, with the dependencies you passed during
  //the previous render. If none of the dependencies have changed, will return the same function as before.
  const atualiza = useCallback((novoValor) => {
    console.log("novoValor", novoValor)
  }, []);
  
  //como a função useCallback está cacheada, a prop passada para o componente filho nunca é alterada,
  //e como o componente filho está usando a função memo, ele não será renderizado até que a função do useCallback seja alterada
  return (
    <>
      <Text>{counter}</Text>
      <Button title="Adicionar +1 pai" onPress={() => setCounter((c) => c+ 1)}/>
      <Filho atualiza={atualiza}/>
    </>
  );
}

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Pai></Pai>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
