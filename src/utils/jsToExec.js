require('shelljs/global')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
// const config = require('../../vue.config.js')
const axios = require('axios')

function resolve(dir) {
  return path.join(__dirname, '../' + dir)
}

// console.log(__dirname)
const rootDir = '/Users/wk/文稿/my/module/'

const newDir = rootDir + 'new/'
const moduleDir = rootDir + 'ihc-front'

const fileName = 'dlihc-front'

const newFileDir = newDir + fileName

// // Sync call to exec()
exec('node --version', { silent: true }).output

function isFileExisted(name, callback) {
  fs.access(name, err => {
    if(err && err.code == "ENOENT"){
      // console.log("文件和目录不存在")
      callback(true)
    }else {
      // console.log("文件和目录存在")
      // console.log(err, 'erro')
      callback(false)
    }
  })
}


isFileExisted(newFileDir, function (res) {
  console.log(res, 'res')
  if(res) {
    exec(`mkdir -p ${newDir}${fileName}`, function(status, output) {
      // console.log(status, output)
      // 创建一级目录
      console.log(chalk.green(`> ${fileName} 文件夹创建成功`))
      exec(`cp -r ${moduleDir}/. ${newDir}${fileName}`), function(status, output) {
      }
      console.log(chalk.green(`> ${moduleDir} > ${newDir}${fileName} 文件夹复制成功`))

    })
  }else {
    console.log(chalk.green(`> ${newDir}${fileName}文件夹已存在`))
  }
})

// exec(`cp -r ${moduleDir}/. ${newDir}${fileName}`), function(status, output) {
//   console.log(chalk.green(`> ${moduleDir} 文件夹复制成功`))
// }
//
//

function getSetting() {
  return new Promise((resolve, reject) => {
    axios.get('https://www.baidu.com', {
      params: {
        ID: 12345
      }
    })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (error) {
        reject.log(error);
      });
  })
}

const settingjs = `${newDir}${fileName}/src/setting.js`
isFileExisted(settingjs, function (res) {
  console.log(settingjs)
  if (res) {
    exec(`touch ${settingjs}`, function (error) {
      console.log(chalk.green(`> ${settingjs}新建成功`))
      // let settingObj = sessionStorage.getItem('settingObj')
      let result = getSetting()
      console.log(result)
      if (!error) {
        // fs.writeFileSync(settingjs, `module.exports = ${(settingObj)}`, {
        //   encoding: 'UTF-8'
        // })
      }
    })
  } else {
    console.log(chalk.green(`> setting.js文件已存在`))
    if (!which('git')) {
      echo('Sorry, this script requires git');
      exit(1);
    }
    getSetting().then(res => {
      console.log(res.status, 111)
      if(res.status === 200) {
        let settingObj = {
          projectName: '琴岛e保',
          baseColor: '#3181BC',
          bgColor: '#f5f5f5',
          secondColor: '#64C191',
          isShowCountDown: true, // 是否显示参保倒计时
          expiryDate: '2021/10/11 24:00:00', // 参保截止日期
          isShowShare: true, // 是否显示分享按钮
          indexPage: {
            homeTop: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-top-v1.png'],
            supportPlan: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab1-v1.png'],
            productFeature: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab2-1-v2-1.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab2-1-v2.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab2-2-v2.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab2-3-v2.png'],
            claimCase: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab3.png'],
            commonPro: ['https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab4-v2.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab4-1-v2.png', 'https://webrabbit.oss-cn-beijing.aliyuncs.com/dalian/images/home-tab4-2-v2.png'],
            goInsureTip: '您将进入由中国人寿、泰康养老、平安养老、太平养老、人保健康5家保险公司联合承保的“琴岛e保”参保操作页面，请您仔细阅读并理解页面内容，并确保所填信息真实准确。根据相关要求，您在参保页面上的操作将被记录并保存，敬请知悉。'
          },
        }
        settingObj = JSON.stringify(settingObj)
        fs.writeFileSync(settingjs, `module.exports = ${(settingObj)}`, {
          encoding: 'UTF-8'
        })
        console.log(chalk.green(`> 写入settingjs成功`))
      }
    })
    // console.log(result, '123')
  }
})


