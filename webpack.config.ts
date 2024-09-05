import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import webpack from "webpack";
// import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Mode = "production" | "development";

type EnvVariables = {
  mode: Mode;
  port: number;
};

export default (env: EnvVariables) => {
  console.log(env);

  const isDev = env.mode === "production";

  return {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      isDev ? new webpack.ProgressPlugin() : undefined,
    ],
    devtool: isDev && "inline-source-map",
    devServer: isDev && {
      port: env.port ?? 3000,
      open: true,
    },
  };
};
