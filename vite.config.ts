import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default ({ mode }: ConfigEnv): UserConfig => {
  // 获取 .env 环境配置文件
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.VITE_BASE_PATH,
    plugins: [vue()],
    resolve: {
      // 配置路径别名。--->src下的代码
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
}
