interface IConfig {
  BACKEND_URL: string;
}

const config: IConfig = {
  BACKEND_URL: `${import.meta.env.VITE_API_URL}`,
};

export default config;
