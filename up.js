const Client = require("ssh2-sftp-client");

const config = {
  path: {
    // 远程地址
    romotePath: "/usr/local/nginx/html/h5",
    // 本地地址
    localPath: "./unpackage/dist/build/h5",
  },
  romote: {
    // 服务器 ip 地址
    host: "116.63.139.209",
    // 端口号,默认是 22
    port: "22",
    // 登录的用户名
    username: "root",
    // 登录密码
    password: "Puhuilink@123",
  },
};

function main(localPath, romotePath) {
  const sftp = new Client();

  sftp
    .connect(config.romote)

    .then(() => {
      console.log(
        "----------------------------- 连接成功,上传中... -----------------------------"
      );

      return sftp.uploadDir(localPath, romotePath);
    })

    .then((data) => {
      console.log(
        "----------------------------- 上传完成,及时清除缓存 ----------------------------"
      );
    })

    .catch((err) => {
      console.log(
        "----------------------------- TMD失败了!出事了!快看看怎么回事! -----------------------------"
      );
      console.log(err);
    })

    .finally(() => {
      // 断开连接
      sftp.end();
    });
}

main(config.path.localPath, config.path.romotePath);
