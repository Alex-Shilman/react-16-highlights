import React, { memo } from 'react';

const SomeSlowComponent = ({ max }) => {
  console.log('SomeSlowComponent rendering for:', max)
  const nums = [];
  for (let i=0;i<max; i++) {
    nums.push(i);
  }
  const sum = nums.reduce((sum, val) => sum=sum+val, 0);
  return (
    `Sum of first ${max} integers: ${sum}`
  );
};

const MemoSlowComponent = memo(SomeSlowComponent);

class MemoDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0, 
      zeros: 6,
      memo: true,
    };
    this.incrementCount = this.incrementCount.bind(this);
    this.incrementZeros = this.incrementZeros.bind(this);
    this.toggleMemo = this.toggleMemo.bind(this);
  }
  toggleMemo() {
    this.setState({ memo: !this.state.memo })
  }
  incrementCount(by) {
    this.setState({ count: this.state.count + by })
  }
  incrementZeros(by) {
    this.setState({ zeros: this.state.zeros + by })
  }
  render() {
    const { count, memo, zeros } = this.state;
    const max = Math.pow(10, zeros);
    return (
      <div>
        <button onClick={this.toggleMemo} type='button'>{memo ? 'Turn off Memo' : 'Turn on Memo'}</button>
        <br />
        <button onClick={() => this.incrementCount(1)} type='button'>+1</button>
        <span>{`Count: ${count}`}</span>
        <button onClick={() => this.incrementCount(-1)} type='button'>-1</button>
        <br />
        <button onClick={() => this.incrementZeros(1)} type='button'>x10</button>
        <span>{`Sum up to: ${max}`}</span>
        <button onClick={() => this.incrementZeros(-1)} type='button'>/10</button>
        <br />
        {
          memo
          ? <MemoSlowComponent max={max} />
          : <SomeSlowComponent max={max} />
        }
      </div>
    )
  }
}

export default MemoDemo;