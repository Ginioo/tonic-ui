# @tonic-ui/react

## 2.5.1

### Patch Changes

- feat(react): add exports for `DefaultPropsProvider` and `useDefaultProps` by [@cheton](https://github.com/cheton) in [#950](https://github.com/trendmicro-frontend/tonic-ui/pull/950)

- feat(react/Popper): use the `useDefaultProps` hook for managing default props by [@cheton](https://github.com/cheton) in [#950](https://github.com/trendmicro-frontend/tonic-ui/pull/950)

- fix(react/theme): fixed a logical error in the `CSSVariables` component by correcting the condition to check for empty `cssVariables` by [@cheton](https://github.com/cheton) in [#953](https://github.com/trendmicro-frontend/tonic-ui/pull/953)

## 2.5.0

### Minor Changes

- feat(react): add `createTheme` for theme customization by [@cheton](https://github.com/cheton) in [#947](https://github.com/trendmicro-frontend/tonic-ui/pull/947)

### Patch Changes

- chore: update package description by [@cheton](https://github.com/cheton) in [`16744b9`](https://github.com/trendmicro-frontend/tonic-ui/commit/16744b95e35f4b97371f1ad685553915dd2d43ad)
- Updated dependencies [[`16744b9`](https://github.com/trendmicro-frontend/tonic-ui/commit/16744b95e35f4b97371f1ad685553915dd2d43ad)]
  - @tonic-ui/react-base@2.0.2
  - @tonic-ui/react-hooks@2.0.1
  - @tonic-ui/react-icons@2.1.1
  - @tonic-ui/styled-system@2.0.3
  - @tonic-ui/theme@2.0.1
  - @tonic-ui/utils@2.1.1

## 2.4.0

### Minor Changes

- feat(react/toast): enhance inline toast transition management by [@cheton](https://github.com/cheton) in [#941](https://github.com/trendmicro-frontend/tonic-ui/pull/941)

### Patch Changes

- Updated dependencies [[`22ccadf`](https://github.com/trendmicro-frontend/tonic-ui/commit/22ccadf3e35dac1bb20c43df2d8c2b1a5bf6d6fc)]
  - @tonic-ui/utils@2.1.0

## 2.3.0

### Minor Changes

- feat: improve `disabled` prop handling in `Button` and `ButtonGroup` by [@cheton](https://github.com/cheton) in [#930](https://github.com/trendmicro-frontend/tonic-ui/pull/930)

- fix: resolve bug with `isNameConflictRef.current` in `Checkbox` and `Radio` components by [@cheton](https://github.com/cheton) in [#935](https://github.com/trendmicro-frontend/tonic-ui/pull/935)

- feat(`react/scrollbar`): add `scrollViewProps` to enable passing custom props to the `ScrollView` component by [@cheton](https://github.com/cheton) in [#939](https://github.com/trendmicro-frontend/tonic-ui/pull/939)

## 2.2.0

### Minor Changes

- feat: introduce `DefaultPropsProvider` for setting default props in React components by [@cheton](https://github.com/cheton) in [#922](https://github.com/trendmicro-frontend/tonic-ui/pull/922)

## 2.1.0

### Minor Changes

- feat(react/DatePicker): add `closeOnSelect` prop to automatically close the date picker after a date is selected by [@cheton](https://github.com/cheton) in [#903](https://github.com/trendmicro-frontend/tonic-ui/pull/903)

- test(react/DatePicker): resolve failing test snapshots by [@cheton](https://github.com/cheton) in [#906](https://github.com/trendmicro-frontend/tonic-ui/pull/906)

- feat(react/Calendar): enhance keyboard navigation and date selection by [@cheton](https://github.com/cheton) in [#909](https://github.com/trendmicro-frontend/tonic-ui/pull/909)

### Patch Changes

- fix(react/OverflowTooltip): show the tooltip only when the string is truncated and the `disabled` prop is not true by [@tinaClin](https://github.com/tinaClin) in [#913](https://github.com/trendmicro-frontend/tonic-ui/pull/913)
- Updated dependencies [[`fa0f6cf`](https://github.com/trendmicro-frontend/tonic-ui/commit/fa0f6cf55672689cc2058c512f65afe3854e8e9a), [`272869f`](https://github.com/trendmicro-frontend/tonic-ui/commit/272869f92a6614a66767200a9a4cdf3d50bc07b1)]
  - @tonic-ui/utils@2.0.1
  - @tonic-ui/styled-system@2.0.2

## 2.0.3

### Patch Changes

- fix(react/OverflowTooltip): resolve tooltip misalignment issue with popup menu items by [@tinaClin](https://github.com/tinaClin) in [#894](https://github.com/trendmicro-frontend/tonic-ui/pull/894)

- feat(react): improve tooltip placement and offset calculations by [@cheton](https://github.com/cheton) in [#897](https://github.com/trendmicro-frontend/tonic-ui/pull/897)
