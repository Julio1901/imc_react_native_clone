import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, Vibration, Pressable} from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){
    
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setBMIStatus] = useState("Please enter weight and height");
    const [bmi, setBMI] = useState(null);
    const [textButton, setButtonText] = useState("Calculate");
    const [errorMessage, setErrorMessage] = useState(null);

    function calculateBMI(){
        let heightFormat = height.replace(",", ".")
        return setBMI((weight/(heightFormat * heightFormat)).toFixed(2))
    }

    function verificationImc(){
        if(bmi == null){
            Vibration.vibrate();
            setErrorMessage("Campo obrigatório*")
        }
    }

    function validateBMI() {
        if (weight !== null && height !== null) {
            calculateBMI()
            setHeight(null)
            setWeight(null)
            setBMIStatus("Your BMI is: ")
            setButtonText("Calculate Again")
            setErrorMessage(null)
        
        }else{
            verificationImc()
            setBMI(null)
            setButtonText("Calculate")
            setBMIStatus("Please enter weight and height")
        }
    }

    return (
     
        <View style={styles.formContext}>
            {bmi == null ? 
            <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Height</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setHeight} value={height} placeholder="1.75" keyboardType="numeric"/>
                <Text style={styles.formLabel}>Weight</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style={styles.input} onChangeText={setWeight} value={weight} placeholder="75.365" keyboardType="numeric"/>
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => { validateBMI(), Keyboard.dismiss()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </Pressable>
            : 
            <View style={styles.exibitionResultImc}>
                <ResultImc messageResultImc={messageImc} resultImc={bmi}/>
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => { validateBMI(), Keyboard.dismiss()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
      </View>
    );
}