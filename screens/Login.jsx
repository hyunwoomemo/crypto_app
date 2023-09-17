import React, { useRef, useState } from "react";
import styled from "styled-components";
import { BLACK_COLOR } from "../colors";
import auth from "@react-native-firebase/auth";
import { ActivityIndicator, Alert } from "react-native";

const Container = styled.View`
  background-color: ${BLACK_COLOR};
  flex: 1;
  align-items: center;
  color: white;
  padding: 60px 20px;
`;
const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  color: white;
  background-color: rgba(255, 255, 255, 0.5);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 16px;
`;

const Join = () => {
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmitEmailEditing = () => {
    passwordInput.current.focus();
  };

  const onSubmitPasswordEditing = async () => {
    setLoading(true);
    if (email === "" || password === "") {
      setLoading(false)
      return Alert.alert("Fill in the form.");
    }

    if (loading) return;

    try {
      console.log('login')
      await auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
      console.log(err.code);
      // switch (err.code) {
      // }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <TextInput
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Email"
        returnKeyType="next"
        returnKeyLabel="next"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor="gray"
      />
      <TextInput ref={passwordInput} secureTextEntry placeholder="Password" returnKeyType="done" value={password} onChangeText={(text) => setPassword(text)} placeholderTextColor="gray" />
      <Btn onPress={onSubmitPasswordEditing}>{loading ? <ActivityIndicator color="white" /> : <BtnText>Login</BtnText>}</Btn>
    </Container>
  );
};

export default Join;
