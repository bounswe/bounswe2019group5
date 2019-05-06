import React from 'react';

class DataCacher extends React.Component {

  subComponentStateFactory(componentName){
    const setState = (state) => {
      const componentState = this.state[componentName] || {};
      for(let key in state){
        componentState[key] = state[key]
      }
      const newState = {};
      newState[componentName] = componentState;
      this.setState(newState);
    };
    return {
      initState: (state) => {
        setState(state);
      },
      setState: (state) => {
        setState(state);
      },
      getState: () => {
        return this.state[componentName] || {};
      }
    }
  }

  componentDidMount() {
    const historyState = window.history.state;
    if(historyState){
      this.setState(historyState);
    }else{
      if(this.propsInitialized)
        this.propsInitialized();
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    if(this.props !== nextProps){
      const historyState = window.history.state;
      if(historyState){
        this.setState(historyState);
      }else{
        if(this.propsChanged)
          this.propsChanged(nextProps);
      }
    }else{
      window.history.replaceState(nextState, window.location.href);
    }
    return true;
  }
}
export default DataCacher;