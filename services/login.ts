const API_HOST = "http://138.94.76.170:8023";

type LoginResponseType = {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

export class LoginService {
  async login(email: string, password: string): Promise<LoginResponseType> {
    const body = {
      email,
      password,
    };
    const url = `${API_HOST}/api/login`;

    const request = await fetch(url, {
      method: "POST",
      headers: {},
      body: JSON.stringify(body),
    });

    if (!request.ok) {
      throw new Error("Erro ao fazer login");
    }

    const response = await request.json();
    return response;
  }
}
