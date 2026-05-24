# Preloader SPEC — Logo Reveal → Wordmark Settle

> 给 Codex 的执行指令。不新增依赖，framer-motion 驱动。

## 动效节奏

```
0ms        300ms       800ms      1000ms     1200ms
|           |           |           |           |
[  停顿  ] [ 缩小+移动 ] [ 遮罩淡出 ] [ navbar ] [ token开始 ]
```

全屏黑遮罩 → 居中 "MagicYstudio" 大字 → 等比缩小+FLIP 位移到 Hero 右上角 wordmark 位置 → 遮罩退场 → TokenAssembler 接力。

## 文件清单

| 操作 | 文件 | 说明 |
|------|------|------|
| 新增 | `components/site/preloader.tsx` | "use client"，全屏遮罩 + 居中 wordmark + framer-motion 序列动画 |
| 改 | `app/layout.tsx` | `<Preloader />` 插在 `{children}` 前 |
| 改 | `components/site/hero-profile-section.tsx` | 右上角 wordmark div 加 `id="wordmark-anchor"` |
| 改 | `components/site/token-assembler.tsx` | `initialDelayMs` 默认值 500 → 1200 |
| 改 | `components/site/navbar.tsx` | 入场动画 delay 从 0 改为 ~1000ms |

## Preloader 组件行为契约

1. `fixed inset-0 z-[10000] bg-background`，比 CursorCockpit(9999) 更高
2. 居中文字：`MagicY`(text-foreground) + `studio`(text-muted-foreground)，font-mono uppercase tracking-[0.18em]，初始 ~2rem
3. 300ms 停顿后，文字缩小到 0.72rem + FLIP 移动到 `#wordmark-anchor` 的 getBoundingClientRect() 位置
4. 移动完成后遮罩 opacity→0 退场（200ms），然后 unmount 或 display:none
5. `sessionStorage.getItem('preloader-seen')` 存在时跳过，直接不渲染
6. `prefers-reduced-motion: reduce` 时跳过
7. Safety timeout: 最多 2s 后强制退场

## 约束

- 不新增 npm 依赖
- 三色信号铁律不可破（preloader 只用 foreground/muted-foreground，无彩色）
- preloader 在场时 Hero 的 `#wordmark-anchor` 用 `opacity: 0` 隐藏，退场后恢复
- commit: `feat(v3): preloader logo reveal`
