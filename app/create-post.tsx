import { ErrorText } from "@/components/ErrorText";
import { FormContainer } from "@/components/FormContainer";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

type IFormInput = {
  title: string;
  description: string;
};

export default function CreatePostScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <FormContainer>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              label="Título"
              mode="outlined"
              value={value}
              error={!!errors.title}
              style={styles.input}
              placeholder="Informe o título do post"
              autoCorrect={false}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          );
        }}
        name="title"
      />
      {errors.title && <ErrorText>Este campo é obrigatório.</ErrorText>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              label="Descrição"
              mode="outlined"
              value={value}
              error={!!errors.description}
              multiline={true}
              numberOfLines={5}
              style={[styles.input, styles.description]}
              placeholder="Informe a descrição do post"
              autoCorrect={false}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          );
        }}
        name="description"
      />
      {errors.description && <ErrorText>Este campo é obrigatório.</ErrorText>}

      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Postar
      </Button>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
  },
  input: {
    marginTop: 8,
  },
  description: {
    height: 200,
  },
  button: {
    marginTop: 16,
  },
});
