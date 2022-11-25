interface IServiceConfig {
  devProxyBaseUrl: string,
  devBaseUrl: string,
  devTimeout: number,

  prodProxyBaseUrl: string,
  prodBaseUrl: string,
  prodTimeout: number,
}

const ServiceConfig: IServiceConfig = {
  devProxyBaseUrl: "/api/wjhs",
  devBaseUrl: "http://localhost",
  devTimeout: 15000,

  prodProxyBaseUrl: "/api/wjhs",
  prodBaseUrl: "http://ilovesshan.com",
  prodTimeout: 5000,
}

export default ServiceConfig;