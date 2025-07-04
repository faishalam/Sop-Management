export type TInputLogin = {
  password: string;
  nrp: string;
};

export type TLoginResponse = {
  access_token: string;
  role: string;
};

export type TInputRegister = {
  username: string;
  nrp: string;
  password: string;
};

export type TRegisterResponse = {
  id: string;
  access_token: string;
  role: string;
  username: string;
};

export type TUserLoggedInResponse = {
  nrp: string;
  username: string;
  role: string;
};
