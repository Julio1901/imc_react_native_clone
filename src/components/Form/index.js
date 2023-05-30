import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){
    
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setBMIStatus] = useState("Please enter weight and height");
    const [bmi, setBMI] = useState(null)
    const [textButton, setButtonText] = useState("Calculate");

    function calculateBMI(){
        return setBMI((weight/(height * height)).toFixed(2))
    }
    function validateBMI() {
        if (weight !== null && height !== null) {
            calculateBMI();
            setHeight(null);
            setWeight(null);
            setBMIStatus("Your BMI is: ");
            setButtonText("Calculate Again");
            return;
        }
        setBMI(null);
        setButtonText("Calculate");
        setBMIStatus("Please enter weight and height");
    }

    return (
      <View style={styles.formContext}>
        <View style={styles.form}>
            <Text style={styles.formLabel}>Height</Text>
            <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder="1.75" keyboardType="numeric"/>
            <Text style={styles.formLabel}>Weight</Text>
            <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder="75.365" keyboardType="numeric"/>
            <TouchableOpacity style={styles.buttonCalculator} onPress={() => { validateBMI()}}>
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
        </View>
        <ResultImc messageResultImc={messageImc} resultImc={bmi}/>
      </View>
    );
}