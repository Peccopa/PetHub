import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development', // можно поменять на 'production' для продакшена
  entry: './index.js', // точка входа
  output: {
    path: path.resolve(__dirname, 'dist'), // папка сборки
    filename: 'bundle.js', // итоговый JS
    clean: true, // очищать dist перед сборкой
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // все js/jsx файлы
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset', // автоматически выбирает между resource и inline
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // < 8kb преобразуется в base64
          },
        },
      },
      {
        test: /\.css$/i, // для стилей
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // берём наш html как шаблон
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // чтобы можно было писать import App from './App'
  },
  devtool: 'source-map', // полезно для дебага
};
