const {exec} = require('child_process');

module.exports = ({cmd, cwd}) => new Promise((res) => {
    exec(cmd, {
        cwd: cwd || process.cwd(),  // cwd 当前工作路径
        env: process.env,// env 环境变量
    }, (error, stdout) => {
        if (error) {
            console.log(error);
            process.exit();
        }
        res(stdout);    // stdout 标准输出
    })
})