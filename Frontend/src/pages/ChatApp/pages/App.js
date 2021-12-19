import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loading from '../components/animations/Loading';
import '../styles/index.css';
import MetaData from '../../../components/Helmet/MetaData'

const Room = lazy(() => import('../components/room/Room'));

export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
    <MetaData title={"Messenger"} />
      <Suspense fallback={<Loading title='Loading App Pages' />}>
        <Room />
      </Suspense>
    </div>
  );
}
