# Chronest

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-4b5563.svg)](LICENSE)
![Platform: Windows First](https://img.shields.io/badge/platform-Windows%20first-6b7280.svg)
![Stack: Tauri + React + Rust](https://img.shields.io/badge/stack-Tauri%20%2B%20React%20%2B%20Rust-9ca3af.svg)
![Status: Pre-1.0](https://img.shields.io/badge/status-pre--1.0-d1d5db.svg)

中文 | [English](README.EN.md)

Chronest 是一个本地优先的桌面自动化日历应用。它的核心目标不是做成单纯的 Git 工具，也不是做成 cron 的图形壳，而是提供一个以“日期和时间”为中心的本地任务调度与插件化自动化工作台。

## 当前状态

`Chronest` 目前仍然是一个 `early scaffold`，**not production-ready**。

这意味着当前仓库更适合：

- 验证产品方向
- 迭代桌面交互和调度模型
- 讨论插件体系与权限边界

暂时不适合：

- 直接投入生产环境
- 承载高风险自动化任务
- 作为稳定的长期桌面工具分发给普通用户

## 项目定位

Chronest 现在的方向是：

- 以日历为核心的自动化入口
- 可在指定目录、指定时刻执行本地命令或插件任务
- 使用 SQLite 存储任务、设置和运行记录
- 通过插件体系扩展能力，Git 只是官方插件之一

项目目前仍处于 `pre-1.0` 早期阶段，仓库主要提供：

- `Tauri + React + TypeScript + Vite` 桌面端基础结构
- SQLite 初始化、任务 schema 与运行历史表
- 基于 `react-day-picker` 的月历底盘
- 基于 `lunar-javascript` 的农历 / 节气 / 节日副文本
- 数据目录切换与历史记录清理的基础命令链路
- 权限与 capability 初步配置
- 官方 Git 插件 manifest 占位

## 开发运行

```bash
npm install
npm run tauri dev
```

验证命令：

```bash
npm run check
npx tsc --noEmit
cargo check --manifest-path ./src-tauri/Cargo.toml --no-default-features
```

## 目录结构

- `src/`：前端 UI
- `src/locales/`：前端 i18n 资源
- `src/assets/`：前端静态资源，例如图标
- `src-tauri/`：Rust 运行时、Tauri 入口、权限与 SQLite 初始化
- `plugins/`：官方插件与未来社区插件目录
- `docs/`：架构与设计文档

## 近期路线

1. 从日历中直接创建和编辑任务
2. 后台调度与运行历史
3. 本地命令执行与失败处理
4. 官方 Git 自动化流程
5. 密钥从 SQLite 迁移到系统安全存储
6. 插件权限模型与安装机制
7. 数据目录切换、迁移与恢复默认目录的完整体验

## 文档

- 英文文档见：[README.EN.md](README.EN.md)
- 贡献说明见：[CONTRIBUTING.md](CONTRIBUTING.md)
- 安全说明见：[SECURITY.md](SECURITY.md)
- 架构文档见：[docs/architecture.md](docs/architecture.md)

## 许可证

本项目使用 `Apache-2.0` 许可证。

你可以在 [`LICENSE`](LICENSE) 中查看完整文本。
