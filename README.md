# ironboulder

一个带账号登录和云端同步的 HTML 训练程序页，训练数据保存在 Supabase。

## 使用

- 登录默认使用“邮箱 + 密码”，也可切换到“邮箱链接”作为备用登录
- 注册时强制填写邮箱和密码，注册后需到邮箱点击确认链接完成激活
- 邮箱链接登录后仍可在“个人档案与 TDEE”底部设置或修改密码
- 也可以直接双击 `fitness-climbing-strength-20260903.html` 做离线预览，但注册登录和云端同步需要联网
- 首页为 Dashboard，按“个人与热量、12 周训练计划、训练记录、体重记录”分菜单进入
- 首页顶部显示当前目标、体重趋势和每日热量看板，下方提供训练与体重快捷入口
- 在“个人档案与 TDEE”里填写身高、腰围、颈围（女性含臀围）、1RM、活动水平和目标，可估算体脂、瘦体重、BMR、TDEE 与三大营养素
- 每日热量和蛋白质目标仍可手动覆盖，估算结果可通过“套用推荐目标”写入手动目标
- 每周安排可改为训练、攀岩或休息
- 训练日可选择训练主题，也可点“编辑动作”从动作库搜索添加、删除、改组数与次数
- 页面按体重、1RM 和动作组次自动给出建议重量与 RPE 8 的参考值
- 动作库已按杠铃、哑铃和自重/基础器械精简，不含腿举机、倒蹬、绳索类等设备
- 每个训练和攀岩日可改时长与强度，页面会自动估算当天和整周消耗
- 12 周阶段可选：技术适应、容量积累、减载、力量、强度、顶峰等，每周 RPE 和推荐重量会自动变化
- “训练记录”可按星期记录实际重量、次数和 RPE，保存后显示在长线记录里
- “体重记录”可按周保存体重，并用 12 周柱状图查看趋势
- 改动会自动保存并同步到账号；换手机或电脑登录同一账号即可继续
- 同一个账号同一时刻只建议在一个设备上编辑，页面会自动合并
- 退出登录时会先尝试把最后改动推送到云端

## 本机发布

当前目录里的 `server.py` 只提供静态网页和素材，不提供任何数据接口：

```bash
cd outputs/fitness-program
python3 server.py
```

配合 Cloudflare 临时隧道可生成一个分享网址，Mac 关机后网址会失效。

## Supabase 回调地址

邮箱里的登录链接会跳回主页面，因此当前网页地址必须出现在 Supabase 的回调白名单里：

1. 打开 Supabase Dashboard -> Authentication -> URL Configuration
2. Site URL 填 `https://qzkkkk712.github.io/ironboulder/`
3. Redirect URLs 至少添加：
   - GitHub Pages：`https://qzkkkk712.github.io/ironboulder/**`
   - 当前正式网址，例如 `https://ethnic-gulf-sponsors-mounting.trycloudflare.com/fitness-climbing-strength-20260903.html`
   - 本机预览：`http://127.0.0.1:8765/**` 和 `http://localhost:8765/**`

若使用 Cloudflare 随机隧道，可添加 `https://*.trycloudflare.com/**`，这样隧道更换域名后仍可点击邮件里的旧链接跳转。

## 数据备份

旧的局域网同步数据已移动到 `../sync-data-backup.json`，Supabase 启用后不再读写该文件。

## 素材

动作动图来自 Exercises Dataset（https://github.com/hasaneyldrm/exercises-dataset），媒体 © Gym visual（https://gymvisual.com/）。
软件图标使用 `assets/icons/ironboulder.jpeg`，作为网页 favicon 和页面品牌图标。
