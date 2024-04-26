# python flask template

这是一个简单的 Python 的项目模板，包含了常用的功能模块，可以快速搭建 Python 项目。

## 📦 包含功能

+ env 环境变量
+ config 配置文件，支持多环境配置 (application.{mode}.yaml)
+ database 数据库连接(sqlmodel)
+ 简单权限验证 jwt (RABC)
+ redis 缓存
+ logging 日志配置
+ args 命令行参数
+ docker
+ banner

## 📖 使用方法

```bash
# 安装依赖
rye sync

# 运行项目
rye run start
# or
rye run start -h
```

## 🔨 切换版本

```bash
# 切换到python3.8环境
rye pin 3.8
rye sync
```

## 🐋 docker 镜像构建

```bash
# 构建镜像
docker build -t flask-template .

# 运行容器
docker run -p 8080:8080 -d flask-template
```

## ⚡ 注意事项

#### 环境变量加载 [env.py](./src/core/env.py)

环境变量忽略大小写。

#### 配置文件加载 [config.py](./src/core/config.py)

配置由：`application.yaml` + `application.{mode}.yaml` 合并加载。

`{mode}` 则由 `ENV` 环境变量 `MODE` 控制，默认值为 `dev`。

#### 日志配置 logging

参考 [logging.config 文档](https://docs.python.org/zh-cn/3/library/logging.config.html)。

#### 命令行参数解析 [args.py](./src/core/args.py)

参考 [argparse 文档](https://docs.python.org/zh-cn/3/library/argparse.html)。