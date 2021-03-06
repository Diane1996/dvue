let prompt = require('../common/prompt');
let cmd = require('../common/cmd');
let {log, chalk} = require('../common/log');
let {compose} = require('../common/util');
let config = require('../../config/templates');

const customSchema = {
    properties: {
        git : {
            description: "模板名称",
            message: '模板名称不能为空',
            require: true,
        },
        npm: {
            description: 'npm名称',
            message: 'npm名称不能为空',
            require: true,
        }
    }
}

const parseCommands = (url, branch, npm) => [{
    cmd: `git clone ${url} ${npm}`,
}, {
    cmd: `git checkout ${branch}`,
}, {
    cmd: `echo 项目初始化结束`
}]

const valitInfo = (git, list) => {
    if (config[git] == undefined) {
        log(chalk.red(['项目不存在，请输入项目列表中的项目\n', list].join('')))
        process.exit(0);
    } 
     return git;
}

const getInfo = git => config[git]

const generatorProject = async function () {
    const {git, npm} = await prompt(customSchema);
    const list = await cmd({cmd: 'dvue list'});
    const {git: url, branch} = compose(valitInfo, getInfo)(git, list)

    console.log(url, branch);
    const commands = parseCommands(url, branch, npm);
    // 这里不能使用forEach,每个forEach回调都是一个aync函数，而每个async函数互不关联
    for (let i = 0; i < commands.length; i++) {
        log(chalk.green(await cmd(commands[i])))
    }
}

module.exports = generatorProject;
