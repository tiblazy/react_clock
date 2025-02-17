import React, { Component } from 'react';
import './App.scss';
import { getRandomName } from './common/getRandomName';
import { Clock } from './components/Clock';

type State = {
  clockName: string;
  hasClock: boolean;
};

export class App extends Component<{}, State> {
  state: State = {
    clockName: 'Clock-0',
    hasClock: true,
  };

  nameTimerId = 0;

  // handleContextMenuClick(event: MouseEvent) {
  //   event.preventDefault();
  //   this.setState({ hasClock: false });
  // }

  // handleClick() {
  //   this.setState({
  //     hasClock: true,
  //   });
  // }

  componentDidMount(): void {
    this.nameTimerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3300);
    document.addEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();
      this.setState({ hasClock: false });
    });

    document.addEventListener('click', () => {
      this.setState({ hasClock: true });
    });
  }

  componentDidUpdate(
    _prevProps: Readonly<{}>,
    prevState: Readonly<State>,
  ): void {
    if (prevState.clockName !== this.state.clockName) {
      if (this.state.hasClock) {
        console.warn(
          `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
        );
      }
    }
  }

  componentWillUnmount(): void {
    if (this.nameTimerId) {
      window.clearInterval(this.nameTimerId);
    }

    document.removeEventListener('contextmenu', (event: MouseEvent) => {
      event.preventDefault();

      this.setState({ hasClock: false });
    });

    document.removeEventListener('click', () => {
      this.setState({ hasClock: true });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        {this.state.hasClock && <Clock name={this.state.clockName} />}
      </div>
    );
  }
}
