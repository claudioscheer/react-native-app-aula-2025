import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

export default function LoginScreen() {
    return (
        <View style={styles.container}>

            <View style={styles.content}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    label="Email"
                    style={styles.input}
                    placeholder='Informe seu email'
                    autoCorrect={false}
                    keyboardType='email-address'
                />

                <TextInput
                    label="Senha"
                    mode="outlined"
                    style={styles.input}
                    placeholder='Informe sua senha'
                    autoCorrect={false}
                    secureTextEntry
                />

                <Button
                    style={styles.button}
                    icon="camera"
                    mode="contained"
                    onPress={() => console.log('Pressed')}>
                    Login
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        backgroundColor: '#f8f9fa',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
    },
    input: {
        marginTop: 8
    },
    button: {
        marginTop: 16,
    }
});