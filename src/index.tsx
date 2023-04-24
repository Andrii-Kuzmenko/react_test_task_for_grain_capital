import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import  App  from './App';
import './index.scss';
import { HomePage } from './components/HomePage';
import {
  HashRouter as Router, Navigate, Route, Routes,
} from 'react-router-dom';
import { UsersPage } from './components/UsersPage';
import { ErrorPage } from './components/ErrorPage';
import { UserPage } from './components/UserPage';


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/users">
              <Route index element={<UsersPage />} />
              <Route path=":userId" element={<UserPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>,
    </Provider>
);
