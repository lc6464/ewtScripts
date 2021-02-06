# 升学E网通相关程序，具有各种不同的功能。
> 有了这些程序，同学们可开心了！<br/>
> **请不要滥用此仓库中的所有程序！**

### 使用说明
- `CSharp/`
  - `.cs` 文件均为 C# 源代码文件
  - `.exe` 文件均为编译后的可执行二进制文件，请在 `Windows 10 x64` 环境下使用 `PowerShell` 或者 `cmd` 运行。
    - Windows 10 自带运行环境。
    - Windows x86 未测试。
    - Linux 可尝试 `mono` ，但不一定成功（未测试）。
- `Python/`
  - 装了 Python 的人应该都会用吧？
  - 编写说明看下面吧。
- `TypeScriptAndJavaScript/`
  - `TampermonkeyScripts/` 文件夹下的 JavaScript 文件 `.js` 请作为油猴脚本使用，可在油猴扩展程序的“实用工具”选项卡中找到 `Install from URL`，将对应的 RAW 的 URL 填入并安装即可。
  - `BrowserScripts/` 文件夹下的 JavaScript 文件 `.js` 请在浏览器的开发人员工具中的控制台执行，不要作为油猴脚本使用。
  - TypeScript 文件 `.ts` 均为开发的源代码，在浏览器中不能正常运行，请在开发人员工具控制台运行/在油猴中安装 JavaScript 文件 `.js`。另外，此储存库中的所有 `.ts` 文件均为 `TypeScript` 源代码，而不是 `MPEG2-TS` 视频文件。
  - 油猴扩展程序 `Tampermonkey` 安装：
    - `Microsoft Edge`
      - 适用于 `Chromium` 的介绍页：[从 Microsoft Edge 加载项网站获取](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd "扩展介绍页")
      - 适用于 `Legacy` 的介绍页：[从 Microsoft Store 获取](https://www.microsoft.com/zh-cn/p/tampermonkey/9nblggh5162s "扩展介绍页")
    - `Google Chrome`: [Chrome 网上应用店](https://chrome.google.com/webstore/category/extensions "官方网站")，需要翻墙，请自行搜索。
    - 适用于 `Firefox` 的介绍页: [从 Firefox 附加组件网站获取](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/ "扩展介绍页")
    - 其他浏览器请自行上网查询。
  - `NodeJS/` 文件夹下的 `.js` 文件请通过 NodeJS 运行，你可能需要先看一下 require 了什么。

### 如何贡献
- 如果您有好的想法，您可以通过 `Issue` 向我提出。
- 如果您发现了缺陷，您可以通过 `Issue` 向我提出。
- 如果您有能力实现您的或者他人的想法，您可以通过 `Pull Request` 做出贡献。
- 如果您有能力解决您或他人遇到的缺陷，您可以通过 `Pull Request` 做出贡献。

### 编写说明
- [TypeScript](https://www.typescriptlang.org/zh/ "TypeScript 官网")
  - 编译器版本：`4.1.3`
- [Python](https://www.python.org "Python 官网")
  - 使用 `Python 3.9.0` 验证通过。
  - 理论上来说支持 `Python 3.6` 及更高版本，Python 3 应该都没问题，但建议使用较新版本。
- [CSharp](https://dotnet.microsoft.com ".NET 官网")
  - 基于 .NET Framework 4.8（应该是吧）。
  - 使用 `Visual Studio` 包含的编译器 `csc.exe` 编译。
- 制作者：[LC](https://lcwebsite.cn "LC网站")
- 声明：本储存库内所有文本文件中均不包含任何恶意代码，可执行二进制文件均由文本文件使用可信的编译器编译而来，可放心使用！若您发现真的有第三方提交的恶意代码的存在，恳请您通过 Issue 或者在[我的网站](https://lcwebsite.cn "LC网站")中查找联系方式报告！