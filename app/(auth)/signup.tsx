import { signUp } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    const { error } = await signUp(email, password);

    if (error) alert(error.message);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button title="Sign Up" onPress={handleSignup} />
      <Button title="Login" onPress={() => router.replace("/login")} />
    </View>
  );
}
