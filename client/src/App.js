import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state = {
    response: []
  };

  componentDidMount() {
    this.callApi()
      .then(body => this.setState({ response: body }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/alerts');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">
        <div>
          <ul>
            {
              this.state.response.map((alert) => {
                return (
                  <div>
                      <p class="alertTitle">Alert #{ alert.id }</p>
                      <p>Client: { alert.client }</p>
                      <p>Category: { alert.category }</p>
                      <p>Status: { alert.status }</p>
                      <p>Score: { alert.score }</p>
                      <p>Date: { alert.date }</p>
                      <p>Summary: { alert.summary }</p>
                  </div>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;