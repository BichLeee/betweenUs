import { signIn } from "@/lib/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await signIn(email, password);

    if (error) alert(error.message);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
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

      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={() => router.replace("/signup")} />
    </View>
  );
}
