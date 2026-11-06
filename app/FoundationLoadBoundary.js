import React from 'react';

// React.lazy caches a rejected import. Resetting only this boundary would not
// retry it; recovery explicitly reloads the page, without clearing local data.
export default class FoundationLoadBoundary extends React.Component {
  state = {failed: false};
  heading = React.createRef();

  static getDerivedStateFromError() { return {failed: true}; }
  componentDidCatch() { this.heading.current?.focus(); }

  render() {
    const back = React.createElement('button', {
      type: 'button', className: 'button secondary', onClick: this.props.onBack,
    }, '返回课程');
    if (this.state.failed) {
      return React.createElement('section', {className: 'white-panel', 'aria-labelledby': 'foundation-load-error'},
        React.createElement('h2', {id: 'foundation-load-error', tabIndex: -1, ref: this.heading}, '课程暂时无法显示'),
        React.createElement('p', {role: 'alert'}, '请检查网络连接后重新载入。如果仍无法显示，可以先返回课程，稍后再试。'),
        React.createElement('p', null, '重新载入后，可继续使用当前浏览器已保存的学习记录。'),
        React.createElement('div', {className: 'button-row'},
          React.createElement('button', {type: 'button', className: 'button', onClick: () => window.location.reload()}, '重新载入'), back));
    }
    return React.createElement(React.Suspense, {fallback:
      React.createElement('section', {className: 'white-panel', 'aria-label': '课程加载'},
        React.createElement('p', {role: 'status'}, '正在加载侍酒师100课程…'), back)
    }, this.props.children);
  }
}
