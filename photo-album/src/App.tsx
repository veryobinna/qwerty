import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Photos from './components/Photos';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Thumbnails from './components/Thumbnails';
import NotFound from './components/NotFound';
import ErrorBoundary from './ErrorBoundary';
import { PHOTO_API } from './constants';
class AppRoutes extends Component {
  state = {
    photos: [],
  };

  componentDidMount() {
    fetch(PHOTO_API)
      .then((resp) => resp.json())
      .then((resp) => this.setState({ photos: resp }))
      .catch((err) => console.error(err));
  }

  render(): React.ReactNode {
    return (
      <Routes>
        <Route
          path="/"
          element={<Thumbnails thumbnails={this.state.photos} />}
        />
        <Route
          path="/photos/:id"
          element={<Photos photos={this.state.photos} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen justify-between">
        <div>
          <Header />
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
