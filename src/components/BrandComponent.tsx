import React, { useContext } from "react";

import { View, Text, Button } from "react-native";
import { BrandContext } from "../hooks/BrandContext";

export default function BrandComponent() {

    const {counterBrandContext, setCounterBrandContext} = useContext(BrandContext);

    return (
        <View>
            <Text>Contador do contexto BrandContext: {counterBrandContext}</Text>
            <Button 
                title="Incrementar contador do contexto"
                onPress={() => setCounterBrandContext(counterBrandContext + 1)}
            />
        </View>
    );
}